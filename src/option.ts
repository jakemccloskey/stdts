import Empty from './empty';
import {Result, Ok, Err} from './result';

interface OptionBase<T> extends Empty {
    isSome(): this is Some<T>;
    isNone(): this is None<T>;
    unwrap(msg?: string): T;
    unwrapOr(def: T): T;
    unwrapOrElse(f: () => T): T;
    map<U>(f: (v: T) => U): Option<U>;
    mapOr<U>(def: U, f: (v: T) => U): U;
    mapOrElse<U>(def: () => U, f: (v: T) => U): U;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(err: () => E): Result<T, E>;
    and<U>(optb: Option<U>): Option<U>;
    andThen<U>(f: (v: T) => Option<U>): Option<U>;
    or(optb: Option<T>): Option<T>;
    orElse(f: () => Option<T>): Option<T>;
    [Symbol.iterator](): IterableIterator<T>;
}

interface None<T> extends OptionBase<T> {
    readonly kind: 'none';
}

function* noneIterator<T>(): IterableIterator<T> {}

class NoneImpl<T> extends Empty implements None<T>  {
    public readonly kind: 'none' = 'none';

    public isSome(): this is Some<T> {
        return false;
    }

    public isNone(): this is None<T> {
        return true;
    }

    public unwrap(msg?: string): T {
        throw new Error(msg ? msg + ':' : '');
    }

    public unwrapOr(def: T): T {
        return def;
    }

    public unwrapOrElse(f: () => T): T {
        return f();
    }

    public map<U>(f: (v: T) => U): Option<U> {
        return None<U>();
    }

    public mapOr<U>(def: U, f: (v: T) => U): U {
        return def
    }

    public mapOrElse<U>(def: () => U, f: (v: T) => U): U {
        return def()
    }

    public okOr<E>(err: E): Result<T, E> {
        return Err<T, E>(err);
    }

    public okOrElse<E>(err: () => E): Result<T, E> {
        return Err<T, E>(err());
    }

    public and<U>(optb: Option<U>): Option<U> {
        return None<U>();
    }

    public andThen<U>(f: (v: T) => Option<U>): Option<U> {
        return None<U>();
    }

    public or(optb: Option<T>): Option<T> {
        return optb;
    }

    public orElse(f: () => Option<T>): Option<T> {
        return f();
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return noneIterator<T>();
    }
}

export function None<T>(): None<T> {
    return new NoneImpl<T>();
}

interface Some<T> extends OptionBase<T> {
    readonly kind: 'some';
    readonly value: T;
}

function* someIterator<T>(v: T): IterableIterator<T> {
    yield v;
}

class SomeImpl<T> extends Empty implements Some<T> {
    public readonly kind: 'some' = 'some';
    public readonly value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }

    public isSome(): this is Some<T> {
        return true;
    }

    public isNone(): this is None<T> {
        return false;
    }

    public unwrap(): T {
        return this.value;
    }

    public unwrapOr(def: T): T {
        return this.value;
    }

    public unwrapOrElse(f: () => T): T {
        return this.value;
    }

    public map<U>(f: (v: T) => U): Option<U> {
        return Some(f(this.value));
    }

    public mapOr<U>(def: U, f: (v: T) => U): U {
        return f(this.value);
    }

    public mapOrElse<U>(def: () => U, f: (v: T) => U): U {
        return f(this.value);
    }

    public okOr<E>(err: E): Result<T, E> {
        return Ok<T, E>(this.value);
    }

    public okOrElse<E>(err: () => E): Result<T, E> {
        return Ok<T, E>(this.value);
    }

    public and<U>(optb: Option<U>): Option<U> {
        return optb;
    }

    public andThen<U>(f: (v: T) => Option<U>): Option<U> {
        return f(this.value);
    }

    public or(optb: Option<T>): Option<T> {
        return this;
    }

    public orElse(f: () => Option<T>): Option<T> {
        return this;
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return someIterator<T>(this.value);
    }
}

export function Some<T>(value: T): Some<T> {
    return new SomeImpl<T>(value);
}

export type Option<T> = Some<T> | None<T>;
