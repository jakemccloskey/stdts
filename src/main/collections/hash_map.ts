import {Option, Some, None} from '../option';

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

function* drainIterator<K, V>(hashMap: HashMapImpl<K, V>): IterableIterator<[K, V]> {
    const entries: Array<[K, V]> = Array.from(hashMap);

    hashMap.clear();

    for (const entry of entries) {
        yield entry;
    }
}

class HashMapImpl<K, V> implements HashMap<K, V> {
    private inner: Map<K, V> = new Map<K, V>();

    constructor(iterable?: Array<[K, V]> | Iterable<[K, V]>) {
        if (iterable !== undefined) {
            this.inner = new Map<K, V>(iterable);
        }
    }

    public keys(): IterableIterator<K> {
        return this.inner.keys();
    }

    public values(): IterableIterator<V> {
        return this.inner.values();
    }

    public len(): number {
        return this.inner.size;
    }

    public isEmpty(): boolean {
        return this.len() === 0;
    }

    public drain(): IterableIterator<[K, V]> {
        return drainIterator<K, V>(this);
    }

    public clear() {
        this.inner.clear();
    }

    public get(key: K): Option<V> {
        if (!this.inner.has(key)) {
            return None<V>();
        }

        return Some(this.inner.get(key) as V);
    }

    public containsKey(key: K): boolean {
        return this.inner.has(key);
    }

    public insert(key: K, value: V): Option<V> {
        let result: Option<V> = None<V>();

        if (this.containsKey(key)) {
            result = Some(this.get(key).unwrap());
        }

        this.inner.set(key, value);
        return result;
    }

    public remove(key: K): Option<V> {
        const result = this.get(key);
        this.inner.delete(key);

        return result;
    }

    public [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.inner.entries();
    }

}

export function HashMap<K, V>(): HashMap<K, V>;
export function HashMap<K, V>(iterable: Array<[K, V]>): HashMap<K, V>;
export function HashMap<K, V>(iterable: Iterable<[K, V]>): HashMap<K, V>;
export function HashMap<K, V>(iterable?: Array<[K, V]> | Iterable<[K, V]>): HashMap<K, V> {
    return new HashMapImpl<K, V>(iterable);
}
