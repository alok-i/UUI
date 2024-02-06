import { useCallback, useEffect, useState } from 'react';
import { DataSourceState, LazyDataSourceApi } from '../../../../../../../types';
import { TreeState } from '../../../newTree';
import { useSimplePrevious } from '../../../../../../../hooks';
import { isQueryChanged } from '../lazyTree/helpers';

export interface LoadResult<TItem, TId> {
    isUpdated: boolean;
    isOutdated: boolean;
    tree: TreeState<TItem, TId>;
    error?: Error;
}

export interface UseLoadDataProps<TItem, TId, TFilter = any> {
    tree: TreeState<TItem, TId>;
    api: LazyDataSourceApi<TItem, TId, TFilter>;
    dataSourceState?: DataSourceState<TFilter, TId>;
    forceReload?: boolean;
}

export function useLoadData<TItem, TId, TFilter = any>(
    { tree, api, dataSourceState, forceReload }: UseLoadDataProps<TItem, TId, TFilter>,
    deps: any[],
) {
    const prevDataSourceState = useSimplePrevious(dataSourceState);
    const prevDeps = useSimplePrevious(deps);
    const prevForceReload = useSimplePrevious(forceReload);

    const [loadedTree, setLoadedTree] = useState(tree);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const loadData = useCallback(async (
        sourceTree: TreeState<TItem, TId>,
        dsState: DataSourceState<TFilter, TId> = {},
    ): Promise<LoadResult<TItem, TId>> => {
        const loadingTree = sourceTree;

        try {
            const newTreePromise = sourceTree.loadAll<TFilter>({
                using: dsState.search ? 'visible' : undefined,
                options: {
                    api,
                    filter: {
                        ...dsState?.filter,
                    },
                },
                dataSourceState: dsState,
            });

            const newTree = await newTreePromise;
            const linkToTree = sourceTree;

            // If tree is changed during this load, than there was reset occurred (new value arrived)
            // We need to tell caller to reject this result
            const isOutdated = linkToTree !== loadingTree;
            const isUpdated = linkToTree !== newTree;
            return { isUpdated, isOutdated, tree: newTree };
        } catch (e) {
            // TBD - correct error handling
            console.error('useLoadData: Error while loading items.', e);
            return { isUpdated: false, isOutdated: false, tree: loadingTree, error: e };
        }
    }, [api]);

    const isDepsChanged = prevDeps?.length !== deps.length || (prevDeps ?? []).some((devVal, index) => devVal !== deps[index]);
    const shouldForceReload = prevForceReload !== forceReload && forceReload;

    useEffect(() => {
        if (isDepsChanged || shouldForceReload) {
            setIsFetching(true);
            if (!isQueryChanged(prevDataSourceState, dataSourceState)) {
                setIsLoading(true);
            }
            loadData(tree, dataSourceState)
                .then(({ isOutdated, isUpdated, tree: newTree }) => {
                    if (isUpdated && !isOutdated) {
                        setLoadedTree(newTree);
                    }
                })
                .finally(() => {
                    setIsFetching(false);
                    setIsLoading(false);
                });
        }
    }, [isDepsChanged, shouldForceReload]);

    return { tree: loadedTree, isLoading, isFetching };
}