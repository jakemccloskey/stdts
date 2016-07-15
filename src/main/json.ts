import Empty from './empty';
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

export interface JsonValueBase extends Empty {}

export interface JsonNull extends JsonValueBase {
    readonly kind: 'null';
    readonly value: null;
}

class JsonNullImpl extends Empty implements JsonNull {
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

class JsonStringImpl extends Empty implements JsonString {
    public readonly kind: 'string' = 'string';
    public readonly value: string;

    constructor(value: string) {
        super();
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

class JsonNumberImpl extends Empty implements JsonNumber {
    public readonly kind: 'number' = 'number';
    public readonly value: number;

    constructor(value: number) {
        super();
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

class JsonBooleanImpl extends Empty implements JsonBoolean {
    public readonly kind: 'boolean' = 'boolean';
    public readonly value: boolean;

    constructor(value: boolean) {
        super();
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

class JsonObjectImpl extends Empty implements JsonObject {
    public readonly kind: 'object' = 'object';
    public readonly value: HashMap<string, JsonValue>;

    constructor(value: HashMap<string, JsonValue>) {
        super();
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

class JsonArrayImpl extends Empty implements JsonArray {
    public readonly kind: 'array' = 'array';
    public readonly value: HashMap<number, JsonValue>;

    constructor(value: HashMap<number, JsonValue>) {
        super();
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

                if (Array.isArray(value)) {
                    return JsonArray(value.entries());
                }

                if (isObject(value)) {
                    return JsonObject(...objectEntries(value));
                }

                return value;
            }));
        } catch (err) {
            return None<JsonValue>();
        }
    }

    export function stringify(json: JsonValue, spacing?: number): string {
        function helper(val: JsonValue) {
            if (val.kind === 'array') {
                const result: Array<any> = [];

                for (const [i, child] of val.value) {
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


// export interface JsonObject extends HashMap<string, JsonValue> {}
// export interface JsonArray extends HashMap<number, JsonValue> {}

// const jsonObjectBrand = Symbol();
// const jsonArrayBrand = Symbol();

// export function JsonObject(entries: Array<[string, JsonValue]>): JsonObject {
//     const result = new OptionMap(entries) as any;
//     result[jsonObjectBrand] = true;

//     return result;
// }

// export function JsonArray(entries: Array<[number, JsonValue]>): JsonObject {
//     const result = new OptionMap(entries) as any;
//     result[jsonArrayBrand] = true;

//     return result;
// }

// export function jsonParse(json: string): Option<JsonValue> {
//     try {
//         return Some(JSON.parse(json, (key, value) => {
//             if (Array.isArray(value)) {
//                 const result = new OptionMap(value.entries()) as any;
//                 result[jsonArrayBrand] = true;

//                 return result as JsonArray;
//             }

//             if (typeof value === 'object' && value !== null) {
//                 const result = new OptionMap(objectEntries<JsonValue>(value)) as any;
//                 result[jsonObjectBrand] = true;

//                 return result as JsonObject;
//             }

//             return value;
//         }));
//     } catch (err) {
//         return None<JsonValue>();
//     }
// }

// function toPojo(json: JsonValue): any {
//     if (isJsonArray(json)) {
//         const result: Array<any> = [];

//         for (const value of json.values()) {
//             result.push(toPojo(value));
//         }

//         return result;
//     }

//     if (isJsonObject(json)) {
//         const result: any = {};

//         for (const [key, value] of json.entries()) {
//             result[key] = toPojo(value);
//         }

//         return result;
//     }

//     return json;
// }

// export function jsonStringify(json: JsonValue, spacing?: number): string {
//     return JSON.stringify(toPojo(json), null, spacing);
// }

// export function isJsonObject(value: any): value is JsonObject {
//     return value && value[jsonObjectBrand];
// }

// export function isJsonArray(value: any): value is JsonArray {
//     return value && value[jsonArrayBrand];
// }
