"use strict";
const empty_1 = require('./empty');
const option_1 = require('./option');
const hash_map_1 = require('./collections/hash_map');
const types_1 = require('./types');
function* objectEntries(obj) {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
class JsonNullImpl extends empty_1.default {
    constructor(...args) {
        super(...args);
        this.kind = 'null';
        this.value = null;
    }
}
function JsonNull() {
    return new JsonNullImpl();
}
exports.JsonNull = JsonNull;
class JsonStringImpl extends empty_1.default {
    constructor(value) {
        super();
        this.kind = 'string';
        this.value = value;
    }
}
function JsonString(value) {
    return new JsonStringImpl(value);
}
exports.JsonString = JsonString;
class JsonNumberImpl extends empty_1.default {
    constructor(value) {
        super();
        this.kind = 'number';
        this.value = value;
    }
}
function JsonNumber(value) {
    return new JsonNumberImpl(value);
}
exports.JsonNumber = JsonNumber;
class JsonBooleanImpl extends empty_1.default {
    constructor(value) {
        super();
        this.kind = 'boolean';
        this.value = value;
    }
}
function JsonBoolean(value) {
    return new JsonBooleanImpl(value);
}
exports.JsonBoolean = JsonBoolean;
class JsonObjectImpl extends empty_1.default {
    constructor(value) {
        super();
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
class JsonArrayImpl extends empty_1.default {
    constructor(value) {
        super();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFrQixTQUFTLENBQUMsQ0FBQTtBQUM1Qix5QkFBaUMsVUFBVSxDQUFDLENBQUE7QUFDNUMsMkJBQXNCLHdCQUF3QixDQUFDLENBQUE7QUFDL0Msd0JBQXVFLFNBQVMsQ0FBQyxDQUFBO0FBTWpGLHdCQUF3QixHQUFnQjtJQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7QUFDTCxDQUFDO0FBU0QsMkJBQTJCLGVBQUs7SUFBaEM7UUFBMkIsZUFBSztRQUNaLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsVUFBSyxHQUFTLElBQUksQ0FBQztJQUN2QyxDQUFDO0FBQUQsQ0FBQztBQUVEO0lBQ0ksTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZlLGdCQUFRLFdBRXZCLENBQUE7QUFPRCw2QkFBNkIsZUFBSztJQUk5QixZQUFZLEtBQWE7UUFDckIsT0FBTyxDQUFDO1FBSkksU0FBSSxHQUFhLFFBQVEsQ0FBQztRQUt0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0FBQ0wsQ0FBQztBQUVELG9CQUEyQixLQUFhO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRmUsa0JBQVUsYUFFekIsQ0FBQTtBQU9ELDZCQUE2QixlQUFLO0lBSTlCLFlBQVksS0FBYTtRQUNyQixPQUFPLENBQUM7UUFKSSxTQUFJLEdBQWEsUUFBUSxDQUFDO1FBS3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxD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REFBdUQ7QUFDdkQsMkNBQTJDO0FBQzNDLFlBQVk7QUFFWix5QkFBeUI7QUFDekIsUUFBUTtBQUVSLG1CQUFtQjtBQUNuQixJQUFJO0FBRUosNkVBQTZFO0FBQzdFLDBEQUEwRDtBQUMxRCxJQUFJO0FBRUosa0VBQWtFO0FBQ2xFLDhDQUE4QztBQUM5QyxJQUFJO0FBRUosZ0VBQWdFO0FBQ2hFLDZDQUE2QztBQUM3QyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtcHR5IGZyb20gJy4vZW1wdHknO1xuaW1wb3J0IHtPcHRpb24sIFNvbWUsIE5vbmV9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7SGFzaE1hcH0gZnJvbSAnLi9jb2xsZWN0aW9ucy9oYXNoX21hcCc7XG5pbXBvcnQge2lzU3RyaW5nLCBpc051bGwsIGlzTnVtYmVyLCBpc0Jvb2xlYW4sIGlzQXJyYXksIGlzT2JqZWN0fSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIElucHV0T2JqZWN0IHtcbiAgICBbcHJvcDogc3RyaW5nXTogSnNvblZhbHVlO1xufVxuXG5mdW5jdGlvbiogb2JqZWN0RW50cmllcyhvYmo6IElucHV0T2JqZWN0KTogSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBKc29uVmFsdWVdPiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgICB5aWVsZCBba2V5LCBvYmpba2V5XV07XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25WYWx1ZUJhc2UgZXh0ZW5kcyBFbXB0eSB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25OdWxsIGV4dGVuZHMgSnNvblZhbHVlQmFzZSB7XG4gICAgcmVhZG9ubHkga2luZDogJ251bGwnO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBudWxsO1xufVxuXG5jbGFzcyBKc29uTnVsbEltcGwgZXh0ZW5kcyBFbXB0eSBpbXBsZW1lbnRzIEpzb25OdWxsIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ251bGwnID0gJ251bGwnO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogbnVsbCA9IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uTnVsbCgpOiBKc29uTnVsbCB7XG4gICAgcmV0dXJuIG5ldyBKc29uTnVsbEltcGwoKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uU3RyaW5nIGV4dGVuZHMgSnNvblZhbHVlQmFzZSB7XG4gICAgcmVhZG9ubHkga2luZDogJ3N0cmluZyc7XG4gICAgcmVhZG9ubHkgdmFsdWU6IHN0cmluZztcbn1cblxuY2xhc3MgSnNvblN0cmluZ0ltcGwgZXh0ZW5kcyBFbXB0eSBpbXBsZW1lbnRzIEpzb25TdHJpbmcge1xuICAgIHB1YmxpYyByZWFkb25seSBraW5kOiAnc3RyaW5nJyA9ICdzdHJpbmcnO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gSnNvblN0cmluZyh2YWx1ZTogc3RyaW5nKTogSnNvblN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBKc29uU3RyaW5nSW1wbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbk51bWJlciBleHRlbmRzIEpzb25WYWx1ZUJhc2Uge1xuICAgIHJlYWRvbmx5IGtpbmQ6ICdudW1iZXInO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXI7XG59XG5cbmNsYXNzIEpzb25OdW1iZXJJbXBsIGV4dGVuZHMgRW1wdHkgaW1wbGVtZW50cyBKc29uTnVtYmVyIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ251bWJlcicgPSAnbnVtYmVyJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEpzb25OdW1iZXIodmFsdWU6IG51bWJlcik6IEpzb25OdW1iZXIge1xuICAgIHJldHVybiBuZXcgSnNvbk51bWJlckltcGwodmFsdWUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25Cb29sZWFuIGV4dGVuZHMgSnNvblZhbHVlQmFzZSB7XG4gICAgcmVhZG9ubHkga2luZDogJ2Jvb2xlYW4nO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBib29sZWFuO1xufVxuXG5jbGFzcyBKc29uQm9vbGVhbkltcGwgZXh0ZW5kcyBFbXB0eSBpbXBsZW1lbnRzIEpzb25Cb29sZWFuIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ2Jvb2xlYW4nID0gJ2Jvb2xlYW4nO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBKc29uQm9vbGVhbih2YWx1ZTogYm9vbGVhbik6IEpzb25Cb29sZWFuIHtcbiAgICByZXR1cm4gbmV3IEpzb25Cb29sZWFuSW1wbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbk9iamVjdCBleHRlbmRzIEpzb25WYWx1ZUJhc2Uge1xuICAgIHJlYWRvbmx5IGtpbmQ6ICdvYmplY3QnO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBIYXNoTWFwPHN0cmluZywgSnNvblZhbHVlPjtcbn1cblxuY2xhc3MgSnNvbk9iamVjdEltcGwgZXh0ZW5kcyBFbXB0eSBpbXBsZW1lbnRzIEpzb25PYmplY3Qge1xuICAgIHB1YmxpYyByZWFkb25seSBraW5kOiAnb2JqZWN0JyA9ICdvYmplY3QnO1xuICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogSGFzaE1hcDxzdHJpbmcsIEpzb25WYWx1ZT47XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogSGFzaE1hcDxzdHJpbmcsIEpzb25WYWx1ZT4pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEpzb25PYmplY3QoLi4uYXJnczogQXJyYXk8W3N0cmluZywgSnNvblZhbHVlXT4pOiBKc29uT2JqZWN0IHtcbiAgICBjb25zdCBoYXNoTWFwID0gSGFzaE1hcDxzdHJpbmcsIEpzb25WYWx1ZT4oKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGFyZ3MpIHtcbiAgICAgICAgaGFzaE1hcC5pbnNlcnQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBKc29uT2JqZWN0SW1wbChoYXNoTWFwKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uQXJyYXkgZXh0ZW5kcyBKc29uVmFsdWVCYXNlIHtcbiAgICByZWFkb25seSBraW5kOiAnYXJyYXknO1xuICAgIHJlYWRvbmx5IHZhbHVlOiBIYXNoTWFwPG51bWJlciwgSnNvblZhbHVlPjtcbn1cblxuY2xhc3MgSnNvbkFycmF5SW1wbCBleHRlbmRzIEVtcHR5IGltcGxlbWVudHMgSnNvbkFycmF5IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkga2luZDogJ2FycmF5JyA9ICdhcnJheSc7XG4gICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBIYXNoTWFwPG51bWJlciwgSnNvblZhbHVlPjtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBIYXNoTWFwPG51bWJlciwgSnNvblZhbHVlPikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gSnNvbkFycmF5KC4uLmFyZ3M6IEFycmF5PEpzb25WYWx1ZT4pOiBKc29uQXJyYXkge1xuICAgIGNvbnN0IGhhc2hNYXAgPSBIYXNoTWFwPG51bWJlciwgSnNvblZhbHVlPigpO1xuXG4gICAgZm9yIChjb25zdCBbaSwgdmFsdWVdIG9mIGFyZ3MuZW50cmllcygpKSB7XG4gICAgICAgIGhhc2hNYXAuaW5zZXJ0KGksIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEpzb25BcnJheUltcGwoaGFzaE1hcCk7XG59XG5cbmV4cG9ydCB0eXBlIEpzb25WYWx1ZSA9IEpzb25OdWxsIHwgSnNvblN0cmluZyB8IEpzb25OdW1iZXIgfCBKc29uQm9vbGVhbiB8IEpzb25PYmplY3QgfCBKc29uQXJyYXk7XG5cbmV4cG9ydCBuYW1lc3BhY2UgSnNvblZhbHVlIHtcbiAgICBleHBvcnQgZnVuY3Rpb24gcGFyc2UoanNvbjogc3RyaW5nKTogT3B0aW9uPEpzb25WYWx1ZT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIFNvbWUoSlNPTi5wYXJzZShqc29uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc051bGwodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKc29uTnVsbCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25TdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpzb25OdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKc29uQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKc29uQXJyYXkodmFsdWUuZW50cmllcygpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKc29uT2JqZWN0KC4uLm9iamVjdEVudHJpZXModmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIE5vbmU8SnNvblZhbHVlPigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShqc29uOiBKc29uVmFsdWUsIHNwYWNpbmc/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBmdW5jdGlvbiBoZWxwZXIodmFsOiBKc29uVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWwua2luZCA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbaSwgY2hpbGRdIG9mIHZhbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChoZWxwZXIoY2hpbGQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsLmtpbmQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgY2hpbGRdIG9mIHZhbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGhlbHBlcihjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbC52YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaGVscGVyKGpzb24pLCBudWxsLCBzcGFjaW5nKTtcbiAgICB9XG59XG5cblxuLy8gZXhwb3J0IGludGVyZmFjZSBKc29uT2JqZWN0IGV4dGVuZHMgSGFzaE1hcDxzdHJpbmcsIEpzb25WYWx1ZT4ge31cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSnNvbkFycmF5IGV4dGVuZHMgSGFzaE1hcDxudW1iZXIsIEpzb25WYWx1ZT4ge31cblxuLy8gY29uc3QganNvbk9iamVjdEJyYW5kID0gU3ltYm9sKCk7XG4vLyBjb25zdCBqc29uQXJyYXlCcmFuZCA9IFN5bWJvbCgpO1xuXG4vLyBleHBvcnQgZnVuY3Rpb24gSnNvbk9iamVjdChlbnRyaWVzOiBBcnJheTxbc3RyaW5nLCBKc29uVmFsdWVdPik6IEpzb25PYmplY3Qge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBPcHRpb25NYXAoZW50cmllcykgYXMgYW55O1xuLy8gICAgIHJlc3VsdFtqc29uT2JqZWN0QnJhbmRdID0gdHJ1ZTtcblxuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBKc29uQXJyYXkoZW50cmllczogQXJyYXk8W251bWJlciwgSnNvblZhbHVlXT4pOiBKc29uT2JqZWN0IHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBuZXcgT3B0aW9uTWFwKGVudHJpZXMpIGFzIGFueTtcbi8vICAgICByZXN1bHRbanNvbkFycmF5QnJhbmRdID0gdHJ1ZTtcblxuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBqc29uUGFyc2UoanNvbjogc3RyaW5nKTogT3B0aW9uPEpzb25WYWx1ZT4ge1xuLy8gICAgIHRyeSB7XG4vLyAgICAgICAgIHJldHVybiBTb21lKEpTT04ucGFyc2UoanNvbiwgKGtleSwgdmFsdWUpID0+IHtcbi8vICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBPcHRpb25NYXAodmFsdWUuZW50cmllcygpKSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgcmVzdWx0W2pzb25BcnJheUJyYW5kXSA9IHRydWU7XG5cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGFzIEpzb25BcnJheTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgT3B0aW9uTWFwKG9iamVjdEVudHJpZXM8SnNvblZhbHVlPih2YWx1ZSkpIGFzIGFueTtcbi8vICAgICAgICAgICAgICAgICByZXN1bHRbanNvbk9iamVjdEJyYW5kXSA9IHRydWU7XG5cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGFzIEpzb25PYmplY3Q7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbi8vICAgICAgICAgfSkpO1xuLy8gICAgIH0gY2F0Y2ggKGVycikge1xuLy8gICAgICAgICByZXR1cm4gTm9uZTxKc29uVmFsdWU+KCk7XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBmdW5jdGlvbiB0b1Bvam8oanNvbjogSnNvblZhbHVlKTogYW55IHtcbi8vICAgICBpZiAoaXNKc29uQXJyYXkoanNvbikpIHtcbi8vICAgICAgICAgY29uc3QgcmVzdWx0OiBBcnJheTxhbnk+ID0gW107XG5cbi8vICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBqc29uLnZhbHVlcygpKSB7XG4vLyAgICAgICAgICAgICByZXN1bHQucHVzaCh0b1Bvam8odmFsdWUpKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHJldHVybiByZXN1bHQ7XG4vLyAgICAgfVxuXG4vLyAgICAgaWYgKGlzSnNvbk9iamVjdChqc29uKSkge1xuLy8gICAgICAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4vLyAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGpzb24uZW50cmllcygpKSB7XG4vLyAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRvUG9qbyh2YWx1ZSk7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiBqc29uO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24ganNvblN0cmluZ2lmeShqc29uOiBKc29uVmFsdWUsIHNwYWNpbmc/OiBudW1iZXIpOiBzdHJpbmcge1xuLy8gICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0b1Bvam8oanNvbiksIG51bGwsIHNwYWNpbmcpO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gaXNKc29uT2JqZWN0KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBKc29uT2JqZWN0IHtcbi8vICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWVbanNvbk9iamVjdEJyYW5kXTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGlzSnNvbkFycmF5KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBKc29uQXJyYXkge1xuLy8gICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZVtqc29uQXJyYXlCcmFuZF07XG4vLyB9XG4iXX0=