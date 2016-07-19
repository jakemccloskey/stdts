import {Option, Some, None} from './option';

export abstract class Exception {
    public abstract description(): string;

    public cause(): Option<Exception> {
        return None<Exception>();
    }

    public walk(fn: (e: Exception) => void): void {
        let current: Option<Exception> = Some(this);

        while (current.isSome()) {
            const value: Exception  = current.value;
            fn(value);
            current = value.cause();
        }
    }
}
