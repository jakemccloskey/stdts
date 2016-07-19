import { Option } from '../option';
export interface HashMap<K, V> {
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    len(): number;
    isEmpty(): boolean;
    drain(): IterableIterator<[K, V]>;
    clear(): void;
    get(key: K): Option<V>;
    containsKey(key: K): boolean;
    insert(key: K, val: V): Option<V>;
    remove(key: K): Option<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
}
export declare function HashMap<K, V>(iterator?: IterableIterator<[K, V]>): HashMap<K, V>;
