import { useMemo, useRef } from 'react';
import { useSimplePrevious } from '../../../../../../../hooks';
import { DataSourceState, SortingOption } from '../../../../../../../types';
import { TreeState } from '../../../newTree';

export type UseSortTreeProps<TItem, TId, TFilter = any> = {
    sortBy?(item: TItem, sorting: SortingOption): any;
    tree: TreeState<TItem, TId>;
    dataSourceState: DataSourceState<TFilter, TId>;
    isLoading?: boolean;
};

export function useSortTree<TItem, TId, TFilter = any>(
    {
        tree,
        dataSourceState: { sorting },
        sortBy,
        isLoading,
    }: UseSortTreeProps<TItem, TId, TFilter>,
    deps: any[],
): TreeState<TItem, TId> {
    const prevTree = useSimplePrevious(tree);
    const prevSorting = useSimplePrevious(sorting);
    const prevDeps = useSimplePrevious(deps);
    const sortedTreeRef = useRef<TreeState<TItem, TId>>(null);

    const sortTree = useMemo(() => {
        const isDepsChanged = prevDeps?.length !== deps.length || (prevDeps ?? []).some((devVal, index) => devVal !== deps[index]);
        if (sortedTreeRef.current === null || prevTree !== tree || sorting !== prevSorting || isDepsChanged) {
            sortedTreeRef.current = tree.sort({ sorting, sortBy });
        }
        return sortedTreeRef.current;
    }, [tree, sorting, ...deps]);

    if (isLoading) {
        return tree;
    }

    return sortTree;
}