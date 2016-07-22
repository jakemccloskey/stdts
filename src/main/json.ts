import {Option, Some, None} from './option';
import {HashMap} from './collections/hash_map';
import {isString, isNull, isNumber, isBoolean, isArray, isObject} from './types';

interface InputObject {
    [prop: string]: JsonValue;
}

function* objectEntries(obj: InputObject): IterableIterator<[string, JsonValue]> {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

export interface JsonValueBase { }

export interface JsonNull extends JsonValueBase {
    readonly kind: 'null';
    readonly value: null;
}

class JsonNullImpl implements JsonNull {
    public readonly kind: 'null' = 'null';
    public readonly value: null = null;
}

export function JsonNull(): JsonNull {
    return new JsonNullImpl();
}

export interface JsonString extends JsonValueBase {
    readonly kind: 'string';
    readonly value: string;
}

class JsonStringImpl implements JsonString {
    public readonly kind: 'string' = 'string';
    public readonly value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export function JsonString(value: string): JsonString {
    return new JsonStringImpl(value);
}

export interface JsonNumber extends JsonValueBase {
    readonly kind: 'number';
    readonly value: number;
}

class JsonNumberImpl implements JsonNumber {
    public readonly kind: 'number' = 'number';
    public readonly value: number;

    constructor(value: number) {
        this.value = value;
    }
}

export function JsonNumber(value: number): JsonNumber {
    return new JsonNumberImpl(value);
}

export interface JsonBoolean extends JsonValueBase {
    readonly kind: 'boolean';
    readonly value: boolean;
}

class JsonBooleanImpl implements JsonBoolean {
    public readonly kind: 'boolean' = 'boolean';
    public readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }
}

export function JsonBoolean(value: boolean): JsonBoolean {
    return new JsonBooleanImpl(value);
}

export interface JsonObject extends JsonValueBase {
    readonly kind: 'object';
    readonly value: HashMap<string, JsonValue>;
}

class JsonObjectImpl implements JsonObject {
    public readonly kind: 'object' = 'object';
    public readonly value: HashMap<string, JsonValue>;

    constructor(value: HashMap<string, JsonValue>) {
        this.value = value;
    }
}

export function JsonObject(...args: Array<[string, JsonValue]>): JsonObject {
    const hashMap = HashMap<string, JsonValue>();

    for (const [key, value] of args) {
        hashMap.insert(key, value);
    }

    return new JsonObjectImpl(hashMap);
}

export interface JsonArray extends JsonValueBase {
    readonly kind: 'array';
    readonly value: HashMap<number, JsonValue>;
}

class JsonArrayImpl implements JsonArray {
    public readonly kind: 'array' = 'array';
    public readonly value: HashMap<number, JsonValue>;

    constructor(value: HashMap<number, JsonValue>) {
        this.value = value;
    }
}

export function JsonArray(...args: Array<JsonValue>): JsonArray {
    const hashMap = HashMap<number, JsonValue>();

    for (const [i, value] of args.entries()) {
        hashMap.insert(i, value);
    }

    return new JsonArrayImpl(hashMap);
}

export type JsonValue = JsonNull | JsonString | JsonNumber | JsonBoolean | JsonObject | JsonArray;

export namespace JsonValue {
    export function parse(json: string): Option<JsonValue> {
        try {
            return Some(JSON.parse(json, (key, value) => {
                if (isNull(value)) {
                    return JsonNull();
                }

                if (isString(value)) {
                    return JsonString(value);
                }

                if (isNumber(value)) {
                    return JsonNumber(value);
                }

                if (isBoolean(value)) {
                    return JsonBoolean(value);
                }

                if (isArray(value)) {
                    return JsonArray(...value);
                }

                if (isObject(value)) {
                    return JsonObject(...objectEntries(value));
                }

                return None();
            }));
        } catch (err) {
            return None<JsonValue>();
        }
    }

    export function stringify(json: JsonValue, spacing?: number): string {
        function helper(val: JsonValue) {
            if (val.kind === 'array') {
                const result: Array<any> = [];

                for (const child of val.value.values()) {
                    result.push(helper(child));
                }

                return result;
            }

            if (val.kind === 'object') {
                const result: any = {};

                for (const [key, child] of val.value) {
                    result[key] = helper(child);
                }

                return result;
            }

            return val.value;
        };

        return JSON.stringify(helper(json), null, spacing);
    }
}
