import isEqual from 'lodash.isequal';
import { useSimplePrevious } from '../../../../../../../hooks';
import { DataSourceState } from '../../../../../../../types';
import { isQueryChanged } from './helpers';
import { useCallback, useMemo } from 'react';

export interface UseLazyFetchingAdvisorProps<TId, TFilter = any> {
    dataSourceState: DataSourceState<TFilter, TId>;
    filter?: TFilter;
    forceReload?: boolean;
    backgroundReload?: boolean;
    showOnlySelected?: boolean;
}

export function useLazyFetchingAdvisor<TId, TFilter = any>({
    dataSourceState,
    filter,
    forceReload,
    backgroundReload,
    showOnlySelected,
}: UseLazyFetchingAdvisorProps<TId, TFilter>) {
    const areMoreRowsNeeded = useCallback((
        prevValue?: DataSourceState<TFilter, TId>,
        newValue?: DataSourceState<TFilter, TId>,
    ) => {
        const isFetchPositionAndAmountChanged = prevValue?.topIndex !== newValue?.topIndex
            || prevValue?.visibleCount !== newValue?.visibleCount;

        return isFetchPositionAndAmountChanged;
    }, []);

    const prevFilter = useSimplePrevious(filter);
    const prevDataSourceState = useSimplePrevious(dataSourceState);
    const prevShowOnlySelected = useSimplePrevious(showOnlySelected);

    const isFoldingChanged = !prevDataSourceState || dataSourceState.folded !== prevDataSourceState.folded;

    const shouldRefetch = useMemo(
        () => !prevDataSourceState
            || !isEqual(prevFilter, filter)
            || isQueryChanged(prevDataSourceState, dataSourceState)
            || (prevShowOnlySelected !== showOnlySelected && !showOnlySelected)
            || forceReload,
        [dataSourceState, filter, forceReload],
    );

    const moreRowsNeeded = areMoreRowsNeeded(prevDataSourceState, dataSourceState);

    const shouldReload = shouldRefetch && !backgroundReload;
    const shouldLoad = isFoldingChanged || moreRowsNeeded || shouldReload;
    const shouldFetch = shouldRefetch || isFoldingChanged || moreRowsNeeded;

    return useMemo(() => ({
        shouldLoad,
        shouldRefetch,
        shouldFetch,
        shouldReload,
    }), [shouldLoad, shouldRefetch, shouldFetch]);
}
