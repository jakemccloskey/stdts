import { Result } from './result';
export interface OptionBase<T> {
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
export interface None<T> extends OptionBase<T> {
    readonly kind: 'none';
}
export declare function None<T>(): None<T>;
export interface Some<T> extends OptionBase<T> {
    readonly kind: 'some';
    readonly value: T;
}
export declare function Some<T>(value: T): Some<T>;
export declare type Option<T> = Some<T> | None<T>;
