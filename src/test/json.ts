import * as test from 'tape';
import {Some, None} from '../main/option';
import {JsonValue, JsonNull, JsonString, JsonNumber, JsonBoolean, JsonObject, JsonArray} from '../main/json';

test('JsonValue.parse', (assert) => {
    const je = JsonValue.parse('');
    assert.deepEquals(je, None(), `JsonValue.parse('')`);

    let jv = JsonValue.parse('null');
    assert.deepEquals(jv, Some(JsonNull()), `JsonValue.parse('null')`);

    jv = JsonValue.parse('"test"');
    assert.deepEquals(jv, Some(JsonString('test')), `JsonValue.parse('"test"')`);

    jv = JsonValue.parse('123');
    assert.deepEquals(jv, Some(JsonNumber(123)), `JsonValue.parse('123')`);

    jv = JsonValue.parse('true');
    assert.deepEquals(jv, Some(JsonBoolean(true)), `JsonValue.parse('true')`);

    jv = JsonValue.parse('[true, 123, "test", null, []]');
    assert.deepEquals(jv, Some(JsonArray(
        JsonBoolean(true),
        JsonNumber(123),
        JsonString('test'),
        JsonNull(),
        JsonArray()
    )), `JsonValue.parse('[true, 123, "test", , []]')`);

    jv = JsonValue.parse('[{"test1": "test1", "test2": "test2"}]');
    assert.deepEquals(
        jv,
        Some(JsonArray(
            JsonObject(
                ['test1', JsonString('test1')],
                ['test2', JsonString('test2')]
            )
        )),
        `JsonValue.parse('[{"test1": "test1", "test2": "test2"}]')`
    );

    jv = JsonValue.parse('{"stuff":[{"test1": "test1", "test2": "test2"},{"test1": "test1", "test2": "test2"}]}');
    assert.deepEquals(
        jv,
        Some(JsonObject(
            ['test', JsonArray(
                JsonObject(
                    ['test1', JsonString('test1')],
                    ['test2', JsonString('test2')]
                ),
                JsonObject(
                    ['test1', JsonString('test1')],
                    ['test2', JsonString('test2')]
                )
            )]
        )),
        `JsonValue.parse('{"stuff":[{"test1": "test1", "test2": "test2"},{"test1": "test1", "test2": "test2"}]}')`
    );

    jv = JsonValue.parse('{"test1": true, "test2": 123, "test3": "test", "test4": null, "test5": [true, 123, "test", null, []]}');
    assert.deepEquals(jv, Some(JsonObject(
        ['test1', JsonBoolean(true)],
        ['test2', JsonNumber(123)],
        ['test3', JsonString('test')],
        ['test4', JsonNull()],
        ['test5', JsonArray(
            JsonBoolean(true),
            JsonNumber(123),
            JsonString('test'),
            JsonNull(),
            JsonArray()
        )]
    )), `JsonValue.parse('{"test1": true, "test2": 123, "test3": "test", "test4": null, "test5": [true, 123, "test", , []]}`);

    let js = JsonValue.stringify(JsonNull());
    assert.deepEquals(js, 'null', `JsonValue.stringify(JsonNull())`);

    js = JsonValue.stringify(JsonString('test'));
    assert.deepEquals(js, '"test"', `JsonValue.stringify(JsonString('test'))`);

    js = JsonValue.stringify(JsonNumber(123));
    assert.deepEquals(js, '123', `sonValue.stringify(JsonNumber(123))`);

    js = JsonValue.stringify(JsonBoolean(true));
    assert.deepEquals(js, 'true', `JsonValue.stringify(JsonBoolean(true))`);

    js = JsonValue.stringify(JsonArray(JsonBoolean(true), JsonNumber(123), JsonString('test'), JsonNull(), JsonArray()));
    assert.deepEquals(
        js,
        '[true,123,"test",null,[]]',
        `JsonValue.stringify(JsonArray(JsonBoolean(true), JsonNumber(123), JsonString('test'), JsonNull(), JsonArray()))`
    );

    js = JsonValue.stringify(JsonArray(
        JsonObject(
            ['test1', JsonString('test1')],
            ['test2', JsonString('test2')]
        )
    ));
    assert.deepEquals(
        js,
        '[{"test1":"test1","test2":"test2"}]',
        `JsonValue.stringify(JsonArray(
            JsonObject(
                ['test1', JsonString('test1')],
                ['test2', JsonString('test2')]
            )
        ))`
    );

    js = JsonValue.stringify(JsonObject(
        ['test1', JsonBoolean(true)],
        ['test2', JsonNumber(123)],
        ['test3', JsonString('test')],
        ['test4', JsonNull()],
        ['test5', JsonArray(
            JsonBoolean(true),
            JsonNumber(123),
            JsonString('test'),
            JsonNull(),
            JsonArray()
        )]
    ));
    assert.deepEquals(
        js,
        '{"test1":true,"test2":123,"test3":"test","test4":null,"test5":[true,123,"test",null,[]]}',
        `JsonValue.stringify(JsonObject(
            ['test1', JsonBoolean(true)],
            ['test2', JsonNumber(123)],
            ['test3', JsonString('test')],
            ['test4', JsonNull()],
            ['test5', JsonArray(
                JsonBoolean(true),
                JsonNumber(123),
                JsonString('test'),
                JsonNull(),
                JsonArray()
            )]
        ))`
    );

    assert.end();
});
