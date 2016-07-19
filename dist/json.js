"use strict";
const option_1 = require('./option');
const hash_map_1 = require('./collections/hash_map');
const types_1 = require('./types');
function* objectEntries(obj) {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
class JsonNullImpl {
    constructor() {
        this.kind = 'null';
        this.value = null;
    }
}
function JsonNull() {
    return new JsonNullImpl();
}
exports.JsonNull = JsonNull;
class JsonStringImpl {
    constructor(value) {
        this.kind = 'string';
        this.value = value;
    }
}
function JsonString(value) {
    return new JsonStringImpl(value);
}
exports.JsonString = JsonString;
class JsonNumberImpl {
    constructor(value) {
        this.kind = 'number';
        this.value = value;
    }
}
function JsonNumber(value) {
    return new JsonNumberImpl(value);
}
exports.JsonNumber = JsonNumber;
class JsonBooleanImpl {
    constructor(value) {
        this.kind = 'boolean';
        this.value = value;
    }
}
function JsonBoolean(value) {
    return new JsonBooleanImpl(value);
}
exports.JsonBoolean = JsonBoolean;
class JsonObjectImpl {
    constructor(value) {
        this.kind = 'object';
        this.value = value;
    }
}
function JsonObject(...args) {
    const hashMap = hash_map_1.HashMap();
    for (const [key, value] of args) {
        hashMap.insert(key, value);
    }
    return new JsonObjectImpl(hashMap);
}
exports.JsonObject = JsonObject;
class JsonArrayImpl {
    constructor(value) {
        this.kind = 'array';
        this.value = value;
    }
}
function JsonArray(...args) {
    const hashMap = hash_map_1.HashMap();
    for (const [i, value] of args.entries()) {
        hashMap.insert(i, value);
    }
    return new JsonArrayImpl(hashMap);
}
exports.JsonArray = JsonArray;
var JsonValue;
(function (JsonValue) {
    function parse(json) {
        try {
            return option_1.Some(JSON.parse(json, (key, value) => {
                if (types_1.isNull(value)) {
                    return JsonNull();
                }
                if (types_1.isString(value)) {
                    return JsonString(value);
                }
                if (types_1.isNumber(value)) {
                    return JsonNumber(value);
                }
                if (types_1.isBoolean(value)) {
                    return JsonBoolean(value);
                }
                if (Array.isArray(value)) {
                    return JsonArray(value.entries());
                }
                if (types_1.isObject(value)) {
                    return JsonObject(...objectEntries(value));
                }
                return value;
            }));
        }
        catch (err) {
            return option_1.None();
        }
    }
    JsonValue.parse = parse;
    function stringify(json, spacing) {
        function helper(val) {
            if (val.kind === 'array') {
                const result = [];
                for (const [i, child] of val.value) {
                    result.push(helper(child));
                }
                return result;
            }
            if (val.kind === 'object') {
                const result = {};
                for (const [key, child] of val.value) {
                    result[key] = helper(child);
                }
                return result;
            }
            return val.value;
        }
        ;
        return JSON.stringify(helper(json), null, spacing);
    }
    JsonValue.stringify = stringify;
})(JsonValue = exports.JsonValue || (exports.JsonValue = {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUFpQyxVQUFVLENBQUMsQ0FBQTtBQUM1QywyQkFBc0Isd0JBQXdCLENBQUMsQ0FBQTtBQUMvQyx3QkFBdUUsU0FBUyxDQUFDLENBQUE7QUFNakYsd0JBQXdCLEdBQWdCO0lBQ3BDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztBQUNMLENBQUM7QUFTRDtJQUFBO1FBQ29CLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsVUFBSyxHQUFTLElBQUksQ0FBQztJQUN2QyxDQUFDO0FBQUQsQ0FBQztBQUVEO0lBQ0ksTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZlLGdCQUFRLFdBRXZCLENBQUE7QUFPRDtJQUlJLFlBQVksS0FBYTtRQUhULFNBQUksR0FBYSxRQUFRLENBQUM7UUFJdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUNMLENBQUM7QUFFRCxvQkFBMkIsS0FBYTtJQUNwQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUZlLGtCQUFVLGFBRXpCLENBQUE7QUFPRDtJQUlJLFlBQVksS0FBYTtRQUhULFNBQUksR0FBYSxRQUFRLENBQUM7UUFJdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUNMLENBQUM7QUFFRCxvQkFBMkIsS0FBYTtJQUNwQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUZlLGtCQUFV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b250ZW50IjpbImltcG9ydCB7T3B0aW9uLCBTb21lLCBOb25lfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQge0hhc2hNYXB9IGZyb20gJy4vY29sbGVjdGlvbnMvaGFzaF9tYXAnO1xuaW1wb3J0IHtpc1N0cmluZywgaXNOdWxsLCBpc051bWJlciwgaXNCb29sZWFuLCBpc0FycmF5LCBpc09iamVjdH0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBJbnB1dE9iamVjdCB7XG4gICAgW3Byb3A6IHN0cmluZ106IEpzb25WYWx1ZTtcbn1cblxuZnVuY3Rpb24qIG9iamVjdEVudHJpZXMob2JqOiBJbnB1dE9iamVjdCk6IEl0ZXJhYmxlSXRlcmF0b3I8W3N0cmluZywgSnNvblZhbHVlXT4ge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgICAgeWllbGQgW2tleSwgb2JqW2tleV1dO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uVmFsdWVCYXNlIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbk51bGwgZXh0ZW5kcyBKc29uVmFsdWVCYXNlIHtcbiAgICByZWFkb25seSBraW5kOiAnbnVsbCc7XG4gICAgcmVhZG9ubHkgdmFsdWU6IG51bGw7XG59XG5cbmNsYXNzIEpzb25OdWxsSW1wbCBpbXBsZW1lbnRzIEpzb25OdWxsIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ251bGwnID0gJ251bGwnO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogbnVsbCA9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uTnVsbCgpOiBKc29uTnVsbCB7XG4gICAgcmV0dXJuIG5ldyBKc29uTnVsbEltcGwoKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uU3RyaW5nIGV4dGVuZHMgSnNvblZhbHVlQmFzZSB7XG4gICAgcmVhZG9ubHkga2luZDogJ3N0cmluZyc7XG4gICAgcmVhZG9ubHkgdmFsdWU6IHN0cmluZztcbn1cblxuY2xhc3MgSnNvblN0cmluZ0ltcGwgaW1wbGVtZW50cyBKc29uU3RyaW5nIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ3N0cmluZycgPSAnc3RyaW5nJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEpzb25TdHJpbmcodmFsdWU6IHN0cmluZyk6IEpzb25TdHJpbmcge1xuICAgIHJldHVybiBuZXcgSnNvblN0cmluZ0ltcGwodmFsdWUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25OdW1iZXIgZXh0ZW5kcyBKc29uVmFsdWVCYXNlIHtcbiAgICByZWFkb25seSBraW5kOiAnbnVtYmVyJztcbiAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyO1xufVxuXG5jbGFzcyBKc29uTnVtYmVySW1wbCBpbXBsZW1lbnRzIEpzb25OdW1iZXIge1xuICAgIHB1YmxpYyByZWFkb25seSBraW5kOiAnbnVtYmVyJyA9ICdudW1iZXInO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gSnNvbk51bWJlcih2YWx1ZTogbnVtYmVyKTogSnNvbk51bWJlciB7XG4gICAgcmV0dXJuIG5ldyBKc29uTnVtYmVySW1wbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbkJvb2xlYW4gZXh0ZW5kcyBKc29uVmFsdWVCYXNlIHtcbiAgICByZWFkb25seSBraW5kOiAnYm9vbGVhbic7XG4gICAgcmVhZG9ubHkgdmFsdWU6IGJvb2xlYW47XG59XG5cbmNsYXNzIEpzb25Cb29sZWFuSW1wbCBpbXBsZW1lbnRzIEpzb25Cb29sZWFuIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ2Jvb2xlYW4nID0gJ2Jvb2xlYW4nO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uQm9vbGVhbih2YWx1ZTogYm9vbGVhbik6IEpzb25Cb29sZWFuIHtcbiAgICByZXR1cm4gbmV3IEpzb25Cb29sZWFuSW1wbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbk9iamVjdCBleHRlbmRzIEpzb25WYWx1ZUJhc2Uge1xuICAgIHJlYWRvbmx5IGtpbmQ6ICdvYmplY3QnO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBIYXNoTWFwPHN0cmluZywgSnNvblZhbHVlPjtcbn1cblxuY2xhc3MgSnNvbk9iamVjdEltcGwgaW1wbGVtZW50cyBKc29uT2JqZWN0IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ29iamVjdCcgPSAnb2JqZWN0JztcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IEhhc2hNYXA8c3RyaW5nLCBKc29uVmFsdWU+O1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IEhhc2hNYXA8c3RyaW5nLCBKc29uVmFsdWU+KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uT2JqZWN0KC4uLmFyZ3M6IEFycmF5PFtzdHJpbmcsIEpzb25WYWx1ZV0+KTogSnNvbk9iamVjdCB7XG4gICAgY29uc3QgaGFzaE1hcCA9IEhhc2hNYXA8c3RyaW5nLCBKc29uVmFsdWU+KCk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBhcmdzKSB7XG4gICAgICAgIGhhc2hNYXAuaW5zZXJ0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSnNvbk9iamVjdEltcGwoaGFzaE1hcCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbkFycmF5IGV4dGVuZHMgSnNvblZhbHVlQmFzZSB7XG4gICAgcmVhZG9ubHkga2luZDogJ2FycmF5JztcbiAgICByZWFkb25seSB2YWx1ZTogSGFzaE1hcDxudW1iZXIsIEpzb25WYWx1ZT47XG59XG5cbmNsYXNzIEpzb25BcnJheUltcGwgaW1wbGVtZW50cyBKc29uQXJyYXkge1xuICAgIHB1YmxpYyByZWFkb25seSBraW5kOiAnYXJyYXknID0gJ2FycmF5JztcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IEhhc2hNYXA8bnVtYmVyLCBKc29uVmFsdWU+O1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IEhhc2hNYXA8bnVtYmVyLCBKc29uVmFsdWU+KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uQXJyYXkoLi4uYXJnczogQXJyYXk8SnNvblZhbHVlPik6IEpzb25BcnJheSB7XG4gICAgY29uc3QgaGFzaE1hcCA9IEhhc2hNYXA8bnVtYmVyLCBKc29uVmFsdWU+KCk7XG5cbiAgICBmb3IgKGNvbnN0IFtpLCB2YWx1ZV0gb2YgYXJncy5lbnRyaWVzKCkpIHtcbiAgICAgICAgaGFzaE1hcC5pbnNlcnQoaSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSnNvbkFycmF5SW1wbChoYXNoTWFwKTtcbn1cblxuZXhwb3J0IHR5cGUgSnNvblZhbHVlID0gSnNvbk51bGwgfCBKc29uU3RyaW5nIHwgSnNvbk51bWJlciB8IEpzb25Cb29sZWFuIHwgSnNvbk9iamVjdCB8IEpzb25BcnJheTtcblxuZXhwb3J0IG5hbWVzcGFjZSBKc29uVmFsdWUge1xuICAgIGV4cG9ydCBmdW5jdGlvbiBwYXJzZShqc29uOiBzdHJpbmcpOiBPcHRpb248SnNvblZhbHVlPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gU29tZShKU09OLnBhcnNlKGpzb24sIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTnVsbCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25OdWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSnNvblN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSnNvbk51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25Cb29sZWFuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25BcnJheSh2YWx1ZS5lbnRyaWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25PYmplY3QoLi4ub2JqZWN0RW50cmllcyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gTm9uZTxKc29uVmFsdWU+KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb246IEpzb25WYWx1ZSwgc3BhY2luZz86IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGZ1bmN0aW9uIGhlbHBlcih2YWw6IEpzb25WYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbC5raW5kID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBBcnJheTxhbnk+ID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtpLCBjaGlsZF0gb2YgdmFsLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGhlbHBlcihjaGlsZCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWwua2luZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCBjaGlsZF0gb2YgdmFsLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gaGVscGVyKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsLnZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShoZWxwZXIoanNvbiksIG51bGwsIHNwYWNpbmcpO1xuICAgIH1cbn1cblxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIEpzb25PYmplY3QgZXh0ZW5kcyBIYXNoTWFwPHN0cmluZywgSnNvblZhbHVlPiB7fVxuLy8gZXhwb3J0IGludGVyZmFjZSBKc29uQXJyYXkgZXh0ZW5kcyBIYXNoTWFwPG51bWJlciwgSnNvblZhbHVlPiB7fVxuXG4vLyBjb25zdCBqc29uT2JqZWN0QnJhbmQgPSBTeW1ib2woKTtcbi8vIGNvbnN0IGpzb25BcnJheUJyYW5kID0gU3ltYm9sKCk7XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBKc29uT2JqZWN0KGVudHJpZXM6IEFycmF5PFtzdHJpbmcsIEpzb25WYWx1ZV0+KTogSnNvbk9iamVjdCB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE9wdGlvbk1hcChlbnRyaWVzKSBhcyBhbnk7XG4vLyAgICAgcmVzdWx0W2pzb25PYmplY3RCcmFuZF0gPSB0cnVlO1xuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIEpzb25BcnJheShlbnRyaWVzOiBBcnJheTxbbnVtYmVyLCBKc29uVmFsdWVdPik6IEpzb25PYmplY3Qge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBPcHRpb25NYXAoZW50cmllcykgYXMgYW55O1xuLy8gICAgIHJlc3VsdFtqc29uQXJyYXlCcmFuZF0gPSB0cnVlO1xuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGpzb25QYXJzZShqc29uOiBzdHJpbmcpOiBPcHRpb248SnNvblZhbHVlPiB7XG4vLyAgICAgdHJ5IHtcbi8vICAgICAgICAgcmV0dXJuIFNvbWUoSlNPTi5wYXJzZShqc29uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE9wdGlvbk1hcCh2YWx1ZS5lbnRyaWVzKCkpIGFzIGFueTtcbi8vICAgICAgICAgICAgICAgICByZXN1bHRbanNvbkFycmF5QnJhbmRdID0gdHJ1ZTtcblxuLy8gICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgYXMgSnNvbkFycmF5O1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBPcHRpb25NYXAob2JqZWN0RW50cmllczxKc29uVmFsdWU+KHZhbHVlKSkgYXMgYW55O1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdFtqc29uT2JqZWN0QnJhbmRdID0gdHJ1ZTtcblxuLy8gICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgYXMgSnNvbk9iamVjdDtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuLy8gICAgICAgICB9KSk7XG4vLyAgICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgIHJldHVybiBOb25lPEpzb25WYWx1ZT4oKTtcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHRvUG9qbyhqc29uOiBKc29uVmFsdWUpOiBhbnkge1xuLy8gICAgIGlmIChpc0pzb25BcnJheShqc29uKSkge1xuLy8gICAgICAgICBjb25zdCByZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcblxuLy8gICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGpzb24udmFsdWVzKCkpIHtcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRvUG9qbyh2YWx1ZSkpO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbi8vICAgICB9XG5cbi8vICAgICBpZiAoaXNKc29uT2JqZWN0KGpzb24pKSB7XG4vLyAgICAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG5cbi8vICAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YganNvbi5lbnRyaWVzKCkpIHtcbi8vICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdG9Qb2pvKHZhbHVlKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHJldHVybiByZXN1bHQ7XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIGpzb247XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBqc29uU3RyaW5naWZ5KGpzb246IEpzb25WYWx1ZSwgc3BhY2luZz86IG51bWJlcik6IHN0cmluZyB7XG4vLyAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRvUG9qbyhqc29uKSwgbnVsbCwgc3BhY2luZyk7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBpc0pzb25PYmplY3QodmFsdWU6IGFueSk6IHZhbHVlIGlzIEpzb25PYmplY3Qge1xuLy8gICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZVtqc29uT2JqZWN0QnJhbmRdO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gaXNKc29uQXJyYXkodmFsdWU6IGFueSk6IHZhbHVlIGlzIEpzb25BcnJheSB7XG4vLyAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlW2pzb25BcnJheUJyYW5kXTtcbi8vIH1cbiJdfQ==