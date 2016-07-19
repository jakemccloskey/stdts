import { Option } from './option';
export interface ResultBase<T, E> {
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
export declare function Err<T, E>(value: E): Err<T, E>;
export interface Ok<T, E> extends ResultBase<T, E> {
    readonly kind: 'ok';
    readonly value: T;
}
export declare function Ok<T, E>(value: T): Ok<T, E>;
export declare type Result<T, E> = Ok<T, E> | Err<T, E>;
