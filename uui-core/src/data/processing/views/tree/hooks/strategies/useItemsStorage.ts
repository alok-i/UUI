import { useEffect, useMemo, useState } from 'react';
import { ItemsStorage, ItemsMap } from '../../../../../processing';
import { TreeState } from '../../newTree';

export interface UseItemsStorageProps<TItem, TId> {
    itemsMap?: ItemsMap<TId, TItem>;
    setItems?: ItemsStorage<TItem, TId>['setItems'];

    items?: TItem[] | TreeState<TItem, TId>;
    getId: (item: TItem) => TId;

}

export function useItemsStorage<TItem, TId>({ itemsMap: outerItemsMap, setItems, items, getId }: UseItemsStorageProps<TItem, TId>) {
    const treeOrItems = useMemo(
        () => items instanceof TreeState ? items : items,
        [items],
    );
    const itemsStorage = useMemo(() => {
        if (!outerItemsMap && !(treeOrItems instanceof TreeState)) {
            return new ItemsStorage({ items: treeOrItems, getId });
        }
        return null;
    }, [outerItemsMap]);

    const [itemsMap, setItemsMap] = useState(outerItemsMap ?? (
        treeOrItems instanceof TreeState
            ? treeOrItems.itemsMap
            : itemsStorage.getItemsMap()
    ));

    useEffect(() => {
        if (itemsStorage) {
            const unsubscribe = itemsStorage.subscribe(() => {
                setItemsMap(itemsStorage.getItemsMap());
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);

    const currentItemsMap = outerItemsMap ?? itemsMap;
    return {
        itemsMap: currentItemsMap,
        setItems: setItems ?? (
            treeOrItems instanceof TreeState
                ? treeOrItems.setItems
                : itemsStorage?.setItems ?? currentItemsMap.setItems
        ),
    };
}
