import { useMemo, useRef } from 'react';
import { useSimplePrevious } from '../../../../../../../hooks';
import { DataSourceState } from '../../../../../../../types';
import { TreeState } from '../../../newTree';

export type UseFilterTreeProps<TItem, TId, TFilter = any> = {
    getFilter?: (filter: TFilter) => (item: TItem) => boolean;
    tree: TreeState<TItem, TId>;
    dataSourceState: DataSourceState<TFilter, TId>;
    isLoading?: boolean;
};

export function useFilterTree<TItem, TId, TFilter = any>(
    { tree, dataSourceState: { filter }, getFilter, isLoading }: UseFilterTreeProps<TItem, TId, TFilter>,
    deps: any[],
) {
    const prevTree = useSimplePrevious(tree);
    const prevFilter = useSimplePrevious(filter);
    const prevDeps = useSimplePrevious(deps);

    const filteredTreeRef = useRef<TreeState<TItem, TId>>(null);

    const filteredTree = useMemo(() => {
        const isDepsChanged = prevDeps?.length !== deps.length || (prevDeps ?? []).some((devVal, index) => devVal !== deps[index]);
        if (filteredTreeRef.current === null || prevTree !== tree || filter !== prevFilter || isDepsChanged) {
            filteredTreeRef.current = tree.filter({ filter, getFilter });
        }
        return filteredTreeRef.current;
    }, [tree, filter, ...deps]);

    if (isLoading) {
        return tree;
    }

    return filteredTree;
}