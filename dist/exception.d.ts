import { Option } from './option';
export declare abstract class Exception {
    abstract description(): string;
    cause(): Option<Exception>;
    walk(fn: (e: Exception) => void): void;
}
