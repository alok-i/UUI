import { useCallback, useMemo } from 'react';
import { PlainTreeStrategyProps } from './types';
import { useCreateTree } from './useCreateTree';
import { useFilterTree } from './useFilterTree';
import { useSearchTree } from './useSearchTree';
import { useSortTree } from './useSortTree';
import { useCheckingService, useFocusService, useFoldingService, useSelectingService } from '../../services';
import { UseTreeResult } from '../../types';
import { useDataSourceStateWithDefaults } from '../useDataSourceStateWithDefaults';

export function usePlainTreeStrategy<TItem, TId, TFilter = any>(
    { sortSearchByRelevance = true, ...restProps }: PlainTreeStrategyProps<TItem, TId, TFilter>,
    deps: any[],
): UseTreeResult<TItem, TId, TFilter> {
    const props = { ...restProps, sortSearchByRelevance };
    const fullTree = useCreateTree(props, deps);

    const {
        getId,
        getParentId,
        setDataSourceState,
        getFilter,
        getSearchFields,
        sortBy,
        rowOptions,
        getRowOptions,
        cascadeSelection,
    } = props;

    const dataSourceState = useDataSourceStateWithDefaults({ dataSourceState: props.dataSourceState });

    const filteredTree = useFilterTree(
        { tree: fullTree, getFilter, dataSourceState },
        [fullTree],
    );

    const searchTree = useSearchTree(
        { tree: filteredTree, getSearchFields, sortSearchByRelevance, dataSourceState },
        [filteredTree],
    );

    const tree = useSortTree(
        { tree: searchTree, sortBy, dataSourceState },
        [searchTree],
    );

    const checkingService = useCheckingService({
        tree,
        dataSourceState,
        setDataSourceState,
        cascadeSelection,
        getParentId,
        rowOptions,
        getRowOptions,
    });

    const foldingService = useFoldingService({
        dataSourceState, setDataSourceState, isFoldedByDefault: restProps.isFoldedByDefault, getId,
    });

    const focusService = useFocusService({ setDataSourceState });

    const selectingService = useSelectingService({ setDataSourceState });

    const getTreeRowsStats = useCallback(() => {
        const rootInfo = tree.getNodeInfo(undefined);

        return {
            completeFlatListRowsCount: undefined,
            totalCount: rootInfo.totalCount ?? tree.getTotalRecursiveCount() ?? 0,
        };
    }, [tree]);

    const getChildCount = useCallback((item: TItem): number | undefined => {
        if (props.getChildCount) {
            return props.getChildCount(item) ?? tree.getChildrenByParentId(getId(item)).length;
        }
        return tree.getChildrenByParentId(getId(item)).length;
    }, [tree, getId, props.getChildCount]);

    return useMemo(
        () => ({
            tree,
            rowOptions,
            getRowOptions,
            getChildCount,
            getParentId,
            getId,
            dataSourceState,
            getTreeRowsStats,
            ...checkingService,
            ...selectingService,
            ...focusService,
            ...foldingService,
        }),
        [
            tree,
            rowOptions,
            getRowOptions,
            dataSourceState,
            getTreeRowsStats,
            getChildCount,
            getParentId,
            getId,
            checkingService,
            selectingService,
            focusService,
            foldingService,
        ],
    );
}
