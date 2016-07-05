import Empty from './empty';
import {Option, Some, None} from './option';

interface ResultBase<T, E> extends Empty {
    unwrapErr(msg?: string): E;
    unwrap(msg?: string): T;
    isOk(): this is Ok<T, E>;
    isErr(): this is Err<T, E>;
    ok(): Option<T>;
    err(): Option<E>;
    map<U>(f: (v: T) => U): Result<U, E>;
    mapErr<F>(f: (e: E) => F): Result<T, F>;
    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(f: (v: T) => Result<U, E>): Result<U, E>;
    or<F>(res: Result<T, F>): Result<T, F>;
    orElse<F>(f: (err: E) => Result<T, F>): Result<T, F>;
    unwrapOr(optb: T): T;
    unwrapOrElse(f: (err: E) => T): T;
    [Symbol.iterator](): IterableIterator<T>;
}

export interface Err<T, E> extends ResultBase<T, E> {
    readonly kind: 'err';
    readonly value: E;
}

function* errIterator<T>(): IterableIterator<T> {}

class ErrImpl<T, E> extends Empty implements Err<T, E> {
    public readonly kind: 'err' = 'err';
    public readonly value: E;

    constructor(value: E) {
        super();
        this.value = value;
    }

    public unwrapErr(msg?: string): E {
        return this.value;
    }

    public unwrap(msg?: string): T {
        throw new Error(msg ? msg + ':' : '');
    }

    public isOk(): this is Ok<T, E> {
        return false;
    }

    public isErr(): this is Err<T, E> {
        return true;
    }

    public ok(): Option<T> {
        return None<T>();
    }

    public err(): Option<E> {
        return Some<E>(this.value);
    }

    public map<U>(f: (v: T) => U): Result<U, E> {
        return Err<U, E>(this.value);
    }

    public mapErr<F>(f: (e: E) => F): Result<T, F> {
        return Err<T, F>(f(this.value));
    }

    public and<U>(res: Result<U, E>): Result<U, E> {
        return Err<U, E>(this.value);
    }

    public andThen<U>(f: (v: T) => Result<U, E>): Result<U, E> {
        return Err<U, E>(this.value);
    }

    public or<F>(res: Result<T, F>): Result<T, F> {
        return res;
    }

    public orElse<F>(f: (err: E) => Result<T, F>): Result<T, F> {
        return f(this.value);
    }

    public unwrapOr(optb: T): T {
        return optb;
    }

    public unwrapOrElse(f: (err: E) => T): T {
        return f(this.value);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return errIterator<T>()
    }
}

export function Err<T, E>(value: E): Err<T, E> {
    return new ErrImpl<T, E>(value);
}

export interface Ok<T, E> extends ResultBase<T, E> {
    readonly kind: 'ok';
    readonly value: T;
}

function* okIterator<T>(v: T): IterableIterator<T> {
    yield v;
}

class OkImpl<T, E> extends Empty implements Ok<T, E> {
    public readonly kind: 'ok' = 'ok';
    public readonly value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }

    public unwrapErr(msg?: string): E {
        throw new Error(msg ? msg + ':' : '');
    }

    public unwrap(msg?: string): T {
        return this.value;
    }

    public isOk(): this is Ok<T, E> {
        return true;
    }

    public isErr(): this is Err<T, E> {
        return false;
    }

    public ok(): Option<T> {
        return Some<T>(this.value);
    }

    public err(): Option<E> {
        return None<E>();
    }

    public map<U>(f: (v: T) => U): Result<U, E> {
        return Ok<U, E>(f(this.value));
    }

    public mapErr<F>(f: (e: E) => F): Result<T, F> {
        return Ok<T, F>(this.value);
    }

    public and<U>(res: Result<U, E>): Result<U, E> {
        return res;
    }

    public andThen<U>(f: (v: T) => Result<U, E>): Result<U, E> {
        return f(this.value);
    }

    public or<F>(res: Result<T, F>): Result<T, F> {
        return Ok<T, F>(this.value);
    }

    public orElse<F>(f: (err: E) => Result<T, F>): Result<T, F> {
        return Ok<T, F>(this.value);
    }

    public unwrapOr(optb: T): T {
        return this.value;
    }

    public unwrapOrElse(f: (err: E) => T): T {
        return this.value;
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return okIterator<T>(this.value);
    }
}

export function Ok<T, E>(value: T): Ok<T, E> {
    return new OkImpl<T, E>(value);
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;
