import { IBaseMap } from '../../../../types';

export type OnUpdate<TId, TItem> = (newItemsMap: ItemsMap<TId, TItem>) => void;

interface ModificationOptions {
    isDirty?: boolean;
    reset?: boolean;
}

export class ItemsMap<TId, TItem> implements IBaseMap<TId, TItem> {
    private _itemsMap: Map<TId, TItem>;

    constructor(
        itemsMap: Map<TId, TItem>,
        private getId: (item: TItem) => TId,
    ) {
        this._itemsMap = new Map(itemsMap);
    }

    get(id: TId) {
        return this._itemsMap.has(id) ? this._itemsMap.get(id) : undefined;
    }

    has(id: TId) {
        return this._itemsMap.has(id);
    }

    set(id: TId, item?: TItem): ItemsMap<TId, TItem> {
        const itemsMap = new Map(this._itemsMap);

        itemsMap.set(id, item);
        return new ItemsMap(itemsMap, this.getId);
    }

    forEach(action: (item: TItem, id: TId) => void) {
        const keys = new Set(this._itemsMap.keys());
        keys.forEach((id) => {
            action(this.get(id), id);
        });
    }

    setItems(items: TItem[], options?: ModificationOptions) {
        let itemsLink = new Map(this._itemsMap);

        let updated = false;
        if (options?.reset) {
            itemsLink = new Map();
            updated = true;
        }

        items.forEach((item) => {
            const isExistingItem = itemsLink.has(this.getId(item));

            if (!isExistingItem || (isExistingItem && item !== itemsLink.get(this.getId(item)))) {
                itemsLink.set(this.getId(item), item);
                updated = true;
            }
        });

        if (updated) {
            return new ItemsMap(itemsLink, this.getId);
        }

        return this;
    }

    get size() {
        return this._itemsMap.size;
    }

    [Symbol.iterator]() {
        return this._itemsMap[Symbol.iterator]();
    }

    public static fromObject<TId extends symbol | string | number, TItem>(
        obj: Record<TId, TItem>,
        getId: (item: TItem) => TId,
    ) {
        const itemsMap = new Map();
        for (const [, value] of Object.entries<TItem>(obj)) {
            itemsMap.set(getId(value), value);
        }

        return new ItemsMap<TId, TItem>(itemsMap, getId);
    }
}