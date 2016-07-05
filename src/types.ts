import Empty from './empty';

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}

export function isSymbol(value: any): value is symbol {
    return typeof value === 'symbol';
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isArray(value: any): value is Array<any> {
    return Array.isArray(value);
}

export function isObject(value: any): value is Empty {
    return !isNull(value) && typeof value === 'object';
}
