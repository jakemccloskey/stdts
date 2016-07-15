import {Option, Some, None} from '../main/option'
import {Result, Ok, Err} from '../main/result';
import {JsonValue, JsonNull, JsonString, JsonNumber, JsonBoolean, JsonObject, JsonArray} from '../main/json';
import {Exception} from '../main/exception';
import * as test from 'tape';

// const je = JsonValue.parse('');
// assert.deepStrictEqual(je, None(), `JsonValue.parse('')`);

// let jv = JsonValue.parse('null');
// assert.deepStrictEqual(jv, Some(JsonNull()), `JsonValue.parse('null')`);

// jv = JsonValue.parse('"test"');
// assert.deepStrictEqual(jv, Some(JsonString('test')), `JsonValue.parse('"test"')`);

// jv = JsonValue.parse('123');
// assert.deepStrictEqual(jv, Some(JsonNumber(123)), `JsonValue.parse('123')`);

// jv = JsonValue.parse('true');
// assert.deepStrictEqual(jv, Some(JsonBoolean(true)), `JsonValue.parse('true')`);

// jv = JsonValue.parse('[true, 123, "test", null, []]');
// assert.deepStrictEqual(jv, Some(JsonArray(JsonBoolean(true), JsonNumber(123), JsonString('test'), JsonNull(), JsonArray())), `JsonValue.parse('[true, 123, "test", , []]')`);

// jv = JsonValue.parse('{"test1": true, "test2": 123, "test3": "test", "test4": null, "test5": [true, 123, "test", null, []]}');
// assert.deepStrictEqual(jv, Some(JsonObject(
//     ['test1', JsonBoolean(true)],
//     ['test2', JsonNumber(123)],
//     ['test3', JsonString('test')],
//     ['test4', JsonNull()],
//     ['test5', JsonArray(
//         JsonBoolean(true),
//         JsonNumber(123),
//         JsonString('test'),
//         JsonNull(),
//         JsonArray()
//     )]
// )), `JsonValue.parse('{"test1": true, "test2": 123, "test3": "test", "test4": null, "test5": [true, 123, "test", , []]}`);

// let js = JsonValue.stringify(JsonNull());
// assert.deepStrictEqual(js, 'null', `JsonValue.stringify(JsonNull())`);

// js = JsonValue.stringify(JsonString('test'));
// assert.deepStrictEqual(js, '"test"', `JsonValue.stringify(JsonString('test'))`);

// js = JsonValue.stringify(JsonNumber(123));
// assert.deepStrictEqual(js, '123', `sonValue.stringify(JsonNumber(123))`);

// js = JsonValue.stringify(JsonBoolean(true));
// assert.deepStrictEqual(js, 'true', `JsonValue.stringify(JsonBoolean(true))`);

// js = JsonValue.stringify(JsonArray(JsonBoolean(true), JsonNumber(123), JsonString('test'), JsonNull(), JsonArray()));
// assert.deepStrictEqual(js, '[true,123,"test",null,[]]', `JsonValue.stringify(JsonArray(JsonBoolean(true), JsonNumber(123), JsonString('test'), JsonNull(), JsonArray()))`);

// js = JsonValue.stringify(JsonObject(
//     ['test1', JsonBoolean(true)],
//     ['test2', JsonNumber(123)],
//     ['test3', JsonString('test')],
//     ['test4', JsonNull()],
//     ['test5', JsonArray(
//         JsonBoolean(true),
//         JsonNumber(123),
//         JsonString('test'),
//         JsonNull(),
//         JsonArray()
//     )]
// ));
// assert.deepStrictEqual(js, '{"test1":true,"test2":123,"test3":"test","test4":null,"test5":[true,123,"test",null,[]]}', `JsonValue.stringify(JsonObject(
//     ['test1', JsonBoolean(true)],
//     ['test2', JsonNumber(123)],
//     ['test3', JsonString('test')],
//     ['test4', JsonNull()],
//     ['test5', JsonArray(
//         JsonBoolean(true),
//         JsonNumber(123),
//         JsonString('test'),
//         JsonNull(),
//         JsonArray()
//     )]
// ))`);

// // Result
// const r = Ok<number, string>(123);
// const e = Err<number, string>('error');

// assert.throws(() => r.unwrapErr(), 'Ok.unwrapErr');
// assert.deepStrictEqual(e.unwrapErr(), 'error', 'Err.unwrapErr');

// assert.deepStrictEqual(r.unwrap(), 123, 'Ok.unwrap');
// assert.throws(() => e.unwrap(), 'Err.unwrap');

// assert.deepStrictEqual(r.isOk(), true, 'Ok.isOk');
// assert.deepStrictEqual(e.isOk(), false, 'Err.isOk');

// assert.deepStrictEqual(r.isErr(), false, 'Ok.isErr');
// assert.deepStrictEqual(e.isErr(), true, 'Err.isErr');

// assert.deepStrictEqual(r.ok(), Some(123), 'Ok.ok');
// assert.deepStrictEqual(e.ok(), None(), 'Err.ok');

// assert.deepStrictEqual(r.err(), None(), 'Ok.err');
// assert.deepStrictEqual(e.err(), Some('error'), 'Err.err');

// assert.deepStrictEqual(r.map<string>((v: number) => String(v)), Ok('123'), 'Ok.map');
// assert.deepStrictEqual(e.map<string>((v: number) => String(v)), Err('error'), 'Err.map');

// assert.deepStrictEqual(r.mapErr<number>((v: string) => 0), Ok(123), 'Ok.mapErr');
// assert.deepStrictEqual(e.mapErr<number>((v: string) => 0), Err(0), 'Err.mapErr');

// assert.deepStrictEqual(r.and<number>(Ok<number, string>(456)), Ok(456), 'Ok.and');
// assert.deepStrictEqual(e.and<number>(Ok<number, string>(456)), Err('error'), 'Err.and');

// assert.deepStrictEqual(r.andThen((v: number) => Ok<number, string>(v * 2)), Ok(246), 'Ok.andThen');
// assert.deepStrictEqual(e.andThen((v: number) => Ok<number, string>(v * 2)), Err('error'), 'Err.andThen');

// assert.deepStrictEqual(r.or<number>(Ok<number, number>(456)), Ok(123), 'Ok.or');
// assert.deepStrictEqual(e.or<number>(Ok<number, number>(456)), Ok(456), 'Err.or');

// assert.deepStrictEqual(r.orElse<number>((err) => Ok<number, number>(456)), Ok(123), 'Ok.orElse');
// assert.deepStrictEqual(e.orElse<number>((err) => Ok<number, number>(456)), Ok(456), 'Err.orElse');

// assert.deepStrictEqual(r.unwrapOr(456), 123, 'Ok.unwrapOr');
// assert.deepStrictEqual(e.unwrapOr(456), 456, 'Err.unwrapOr');

// assert.deepStrictEqual(r.unwrapOrElse((err) => 456), 123, 'Ok.unwrapOrElse');
// assert.deepStrictEqual(e.unwrapOrElse((err) => 456), 456, 'Err.unwrapOrElse');


// // Option
// const s = Some(123);
// const n = None();

// assert.deepStrictEqual(s.isSome(), true, 'Some.isSome');
// assert.deepStrictEqual(n.isSome(), false, 'None.isSome');

// assert.deepStrictEqual(s.isNone(), false, 'Some.isNone');
// assert.deepStrictEqual(n.isNone(), true, 'None.isNone');

// assert.deepStrictEqual(s.unwrap(), 123, 'Some.unwrap');
// assert.throws(() => n.unwrap() , 'None.unwrap');

// assert.deepStrictEqual(s.unwrapOr(456), 123, 'Some.unwrapOr');
// assert.deepStrictEqual(n.unwrapOr(456), 456, 'None.unwrapOr');

// assert.deepStrictEqual(s.unwrapOrElse(() => 456), 123, 'Some.unwrapOrElse');
// assert.deepStrictEqual(n.unwrapOrElse(() => 456), 456, 'None.unwrapOrElse');

// assert.deepStrictEqual(s.map((v) => 456), Some(456), 'Some.map');
// assert.deepStrictEqual(n.map((v) => 456), None(), 'None.map');

// assert.deepStrictEqual(s.mapOr(456, (v) => 789), 789, 'Some.mapOr');
// assert.deepStrictEqual(n.mapOr(456, (v) => 789), 456, 'None.mapOr');

// assert.deepStrictEqual(s.mapOrElse(() => 456, (v) => 789), 789, 'Some.mapOrElse');
// assert.deepStrictEqual(n.mapOrElse(() => 456, (v) => 789), 456, 'None.mapOrElse');

// assert.deepStrictEqual(s.mapOrElse(() => 456, (v) => 789), 789, 'Some.mapOrElse');
// assert.deepStrictEqual(n.mapOrElse(() => 456, (v) => 789), 456, 'None.mapOrElse');

// assert.deepStrictEqual(s.okOr('error'), Ok(123), 'Some.okOr');
// assert.deepStrictEqual(n.okOr('error'), Err('error'), 'None.okOr');

// assert.deepStrictEqual(s.okOrElse(() => 'error'), Ok(123), 'Some.okOrElse');
// assert.deepStrictEqual(n.okOrElse(() => 'error'), Err('error'), 'None.okOrElse');

// assert.deepStrictEqual(s.and(Some(456)), Some(456), 'Some.and');
// assert.deepStrictEqual(n.and(Some(456)), None(), 'None.and');

// assert.deepStrictEqual(s.andThen(() => Some(456)), Some(456), 'Some.and');
// assert.deepStrictEqual(n.andThen((v) => Some(456)), None(), 'None.and');

// assert.deepStrictEqual(s.or(Some(456)), Some(123), 'Some.or');
// assert.deepStrictEqual(n.or(Some(456)), Some(456), 'None.or');

// assert.deepStrictEqual(s.orElse(() => Some(456)), Some(123), 'Some.orElse');
// assert.deepStrictEqual(n.orElse(() => Some(456)), Some(456), 'None.orElse');
