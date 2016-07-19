import { Option } from './option';
import { HashMap } from './collections/hash_map';
export interface JsonValueBase {
}
export interface JsonNull extends JsonValueBase {
    readonly kind: 'null';
    readonly value: null;
}
export declare function JsonNull(): JsonNull;
export interface JsonString extends JsonValueBase {
    readonly kind: 'string';
    readonly value: string;
}
export declare function JsonString(value: string): JsonString;
export interface JsonNumber extends JsonValueBase {
    readonly kind: 'number';
    readonly value: number;
}
export declare function JsonNumber(value: number): JsonNumber;
export interface JsonBoolean extends JsonValueBase {
    readonly kind: 'boolean';
    readonly value: boolean;
}
export declare function JsonBoolean(value: boolean): JsonBoolean;
export interface JsonObject extends JsonValueBase {
    readonly kind: 'object';
    readonly value: HashMap<string, JsonValue>;
}
export declare function JsonObject(...args: Array<[string, JsonValue]>): JsonObject;
export interface JsonArray extends JsonValueBase {
    readonly kind: 'array';
    readonly value: HashMap<number, JsonValue>;
}
export declare function JsonArray(...args: Array<JsonValue>): JsonArray;
export declare type JsonValue = JsonNull | JsonString | JsonNumber | JsonBoolean | JsonObject | JsonArray;
export declare namespace JsonValue {
    function parse(json: string): Option<JsonValue>;
    function stringify(json: JsonValue, spacing?: number): string;
}
