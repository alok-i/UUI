import { useCallback, useEffect, useMemo, useState } from 'react';
import { LazyTreeProps } from './types';
import { useSimplePrevious } from '../../../../../../../hooks';
import { useFoldingService } from '../../../../dataRows/services';
import { useLoadData } from './useLoadData';
import { UseTreeResult } from '../../types';
import { useDataSourceStateWithDefaults, useSelectedOnlyTree, useItemsStorage, usePatchTree, useItemsStatusCollector } from '../../common';
import { TreeState } from '../../../newTree';
import { useLazyFetchingAdvisor } from './useLazyFetchingAdvisor';
import { getSelectedAndChecked } from '../../../newTree/treeStructure';
import { isSelectedOrCheckedChanged } from '../checked';

export function useLazyTree<TItem, TId, TFilter = any>(
    { flattenSearchResults = true, ...restProps }: LazyTreeProps<TItem, TId, TFilter>,
    deps: any[],
): UseTreeResult<TItem, TId, TFilter> {
    const props = { flattenSearchResults, ...restProps };
    const {
        filter, backgroundReload, showOnlySelected,
        isFoldedByDefault, getId, getParentId, setDataSourceState,
        cascadeSelection, getRowOptions, rowOptions, selectAll,
        getChildCount, itemsStatusMap, complexIds, patchItems, isDeletedProp, getPosition,
    } = props;

    const dataSourceState = useDataSourceStateWithDefaults({ dataSourceState: props.dataSourceState });
    const { itemsMap, setItems } = useItemsStorage({
        itemsMap: props.itemsMap,
        setItems: props.setItems,
        params: { getId, complexIds },
    });

    const itemsStatusCollector = useItemsStatusCollector({ itemsStatusMap, complexIds, getId }, []);

    const api = useMemo(
        () => itemsStatusCollector.watch(props.api),
        [itemsStatusCollector, props.api],
    );

    const blankTree = useMemo(() => TreeState.blank(props, itemsMap, setItems), deps);
    const [treeWithData, setTreeWithData] = useState(blankTree);

    const prevDataSourceState = useSimplePrevious(dataSourceState);

    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isForceReload, setIsForceReload] = useState(false);

    const { isFolded } = useFoldingService({
        getId,
        isFoldedByDefault,
        dataSourceState,
        setDataSourceState,
    });

    useEffect(() => {
        setTreeWithData(blankTree);
    }, [blankTree]);

    const { loadMissing, loadMissingOnCheck } = useLoadData({
        api,
        filter,
        dataSourceState,
        isFolded,
        fetchStrategy: props.fetchStrategy,
        flattenSearchResults: props.flattenSearchResults,
        getChildCount: props.getChildCount,
        cascadeSelection,
    });

    const loadMissingRecordsOnCheck = useCallback(async (id: TId, isChecked: boolean, isRoot: boolean) => {
        const newTree = await loadMissingOnCheck(tree, id, isChecked, isRoot);
        if (tree !== treeWithData || tree !== newTree) {
            setTreeWithData(newTree);
        }

        return newTree.full;
    }, [loadMissingOnCheck, setTreeWithData, treeWithData]);

    const { shouldRefetch, shouldLoad, shouldFetch } = useLazyFetchingAdvisor({
        dataSourceState,
        filter,
        forceReload: isForceReload,
        backgroundReload,
        showOnlySelected,
    });

    useEffect(() => {
        if (showOnlySelected && isSelectedOrCheckedChanged(dataSourceState, prevDataSourceState)) {
            itemsStatusCollector.setPending(getSelectedAndChecked(dataSourceState));

            loadMissing({
                tree: treeWithData,
                using: 'full',
                abortInProgress: shouldRefetch,
                dataSourceState: {
                    visibleCount: 0,
                    topIndex: 0,
                },
            })
                .then(({ isUpdated, isOutdated, tree: newTree }) => {
                    if (!isOutdated && (isUpdated || newTree !== treeWithData)) {
                        setTreeWithData(newTree);
                    }
                });
        }
    }, [showOnlySelected, dataSourceState.checked, dataSourceState.selectedId]);

    useEffect(() => {
        if (showOnlySelected) {
            return;
        }

        let currentTree = treeWithData;
        if (shouldRefetch) {
            setIsFetching(true);
            currentTree = treeWithData.clearStructure();
        }

        if (shouldLoad) {
            if (currentTree !== treeWithData) {
                setTreeWithData(currentTree);
            }
            setIsLoading(true);
        }

        if (shouldFetch) {
            loadMissing({
                tree: currentTree,
                using: 'visible',
                abortInProgress: shouldRefetch,
            })
                .then(({ isUpdated, isOutdated, tree: newTree }) => {
                    if (!isOutdated && (isUpdated || newTree !== treeWithData)) {
                        setTreeWithData(newTree);
                    }
                }).finally(() => {
                    setIsFetching(false);
                    setIsLoading(false);
                    if (isForceReload === true) {
                        setIsForceReload(false);
                    }
                });
        }
    }, [shouldFetch, shouldLoad, shouldRefetch, treeWithData, setTreeWithData]);

    const treeWithSelectedOnly = useSelectedOnlyTree({
        tree: treeWithData,
        dataSourceState,
        isLoading: isLoading || isFetching,
    }, [treeWithData]);

    const tree = usePatchTree({
        tree: treeWithSelectedOnly,
        patchItems: showOnlySelected ? null : patchItems,
        isDeletedProp,
        getPosition,
    });

    const reload = useCallback(() => {
        setIsForceReload(true);
    }, [props, setTreeWithData]);

    const totalCount = useMemo(() => {
        const { totalCount: rootTotalCount } = tree.visible.getItems(undefined);

        return rootTotalCount ?? tree.visible.getTotalCount?.() ?? 0;
    }, [tree.visible]);

    return {
        tree: showOnlySelected ? tree.selectedOnly : tree.visible,
        selectionTree: tree.full,
        totalCount,
        dataSourceState,
        setDataSourceState,
        isFoldedByDefault,
        getId,
        getParentId,
        cascadeSelection,
        getRowOptions,
        rowOptions,
        getChildCount,
        reload,
        isFetching,
        isLoading,
        getItemStatus: itemsStatusCollector.getItemStatus(itemsMap),
        loadMissingRecordsOnCheck,
        showOnlySelected,
        selectAll,
    };
}