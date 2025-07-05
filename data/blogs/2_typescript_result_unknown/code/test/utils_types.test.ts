import { expect, test } from 'vitest';
import { Err, Ok, Result } from '../src/result';
import { UnknownObject, UtilsTypes } from '../src/utils_types';

class SomeDto {
    name: string;
    age: number;
    flag: boolean;
    children: SomeChildDto[];

    constructor(obj: SomeDto) {
        this.name = obj.name;
        this.age = obj.age;
        this.flag = obj.flag;
        this.children = obj.children;
    }
}

class SomeChildDto {
    x: number;
    flag: boolean;

    constructor(obj: SomeChildDto) {
        this.x = obj.x;
        this.flag = obj.flag;
    }
}

test('isString', () => {
    expect(UtilsTypes.isString('test')).toBe(true);
    expect(UtilsTypes.isString('')).toBe(true);
    expect(UtilsTypes.isString(null)).toBe(false);
    expect(UtilsTypes.isString(undefined)).toBe(false);
    expect(UtilsTypes.isString(5)).toBe(false);
    expect(UtilsTypes.isString(0)).toBe(false);
    expect(UtilsTypes.isString(true)).toBe(false);
    expect(UtilsTypes.isString(false)).toBe(false);
    expect(UtilsTypes.isString({})).toBe(false);
    expect(UtilsTypes.isString([])).toBe(false);
    expect(UtilsTypes.isString(Symbol())).toBe(false);
})

test('isNumber', () => {
    expect(UtilsTypes.isNumber('test')).toBe(false);
    expect(UtilsTypes.isNumber('')).toBe(false);
    expect(UtilsTypes.isNumber(null)).toBe(false);
    expect(UtilsTypes.isNumber(undefined)).toBe(false);
    expect(UtilsTypes.isNumber(5)).toBe(true);
    expect(UtilsTypes.isNumber(0)).toBe(true);
    expect(UtilsTypes.isNumber(true)).toBe(false);
    expect(UtilsTypes.isNumber(false)).toBe(false);
    expect(UtilsTypes.isNumber({})).toBe(false);
    expect(UtilsTypes.isNumber([])).toBe(false);
    expect(UtilsTypes.isNumber(Symbol())).toBe(false);
})

test('isBoolean', () => {
    expect(UtilsTypes.isBoolean('test')).toBe(false);
    expect(UtilsTypes.isBoolean('')).toBe(false);
    expect(UtilsTypes.isBoolean(null)).toBe(false);
    expect(UtilsTypes.isBoolean(undefined)).toBe(false);
    expect(UtilsTypes.isBoolean(5)).toBe(false);
    expect(UtilsTypes.isBoolean(0)).toBe(false);
    expect(UtilsTypes.isBoolean(true)).toBe(true);
    expect(UtilsTypes.isBoolean(false)).toBe(true);
    expect(UtilsTypes.isBoolean({})).toBe(false);
    expect(UtilsTypes.isBoolean([])).toBe(false);
    expect(UtilsTypes.isBoolean(Symbol())).toBe(false);
})

test('isArray', () => {
    expect(UtilsTypes.isArray('test')).toBe(false);
    expect(UtilsTypes.isArray('')).toBe(false);
    expect(UtilsTypes.isArray(null)).toBe(false);
    expect(UtilsTypes.isArray(undefined)).toBe(false);
    expect(UtilsTypes.isArray(5)).toBe(false);
    expect(UtilsTypes.isArray(0)).toBe(false);
    expect(UtilsTypes.isArray(true)).toBe(false);
    expect(UtilsTypes.isArray(false)).toBe(false);
    expect(UtilsTypes.isArray({})).toBe(false);
    expect(UtilsTypes.isArray([])).toBe(true);
    expect(UtilsTypes.isArray(Symbol())).toBe(false);
})

test('isArray', () => {
    expect(UtilsTypes.isUnknownObject('test')).toBe(false);
    expect(UtilsTypes.isUnknownObject('')).toBe(false);
    expect(UtilsTypes.isUnknownObject(null)).toBe(false);
    expect(UtilsTypes.isUnknownObject(undefined)).toBe(false);
    expect(UtilsTypes.isUnknownObject(5)).toBe(false);
    expect(UtilsTypes.isUnknownObject(0)).toBe(false);
    expect(UtilsTypes.isUnknownObject(true)).toBe(false);
    expect(UtilsTypes.isUnknownObject(false)).toBe(false);
    expect(UtilsTypes.isUnknownObject({})).toBe(true);
    expect(UtilsTypes.isUnknownObject([])).toBe(false);
    expect(UtilsTypes.isUnknownObject(Symbol())).toBe(false);
})


test('isUnknownArrayTypeArray', () => {
    const unkArray0: unknown[] = ['adf', 'some', 'diff'];
    expect(UtilsTypes.isUnknownArrayTypeArray(unkArray0, UtilsTypes.isString)).toBe(true);
    expect(UtilsTypes.isUnknownArrayTypeArray(unkArray0, UtilsTypes.isNumber)).toBe(false);
    const unkArray1: unknown[] = [5, 'some', false];
    expect(UtilsTypes.isUnknownArrayTypeArray(unkArray1, UtilsTypes.isString)).toBe(false);
    expect(UtilsTypes.isUnknownArrayTypeArray(unkArray1, UtilsTypes.isNumber)).toBe(false);
})

test('isUnknownObjectRecord', () => {
    const unk0: UnknownObject = { a: 'asdf', 5: 6, 'diff': true };
    expect(UtilsTypes.isUnknownObjectRecord(unk0, UtilsTypes.isString, UtilsTypes.isString)).toBe(false);
    expect(UtilsTypes.isUnknownObjectRecord(unk0, UtilsTypes.isNumber, UtilsTypes.isString)).toBe(false);
    const unk1: UnknownObject = { a: 'asdf', b: 6, 'diff': true };
    expect(UtilsTypes.isUnknownObjectRecord(unk1, UtilsTypes.isString, UtilsTypes.isString)).toBe(false);
    expect(UtilsTypes.isUnknownObjectRecord(unk1, UtilsTypes.isString, UtilsTypes.isNumber)).toBe(false);
    const unk2: UnknownObject = { a: 'asdf', b: 'bValue', 'diff': 'diffVal' };
    expect(UtilsTypes.isUnknownObjectRecord(unk2, UtilsTypes.isString, UtilsTypes.isString)).toBe(true);
    expect(UtilsTypes.isUnknownObjectRecord(unk2, UtilsTypes.isString, UtilsTypes.isNumber)).toBe(false);
})


test('unknownToString', () => {
    const res0: Result<string, Error> = UtilsTypes.unknownToString('abcd');
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe('abcd');
    expect(UtilsTypes.unknownToString(null).isOk()).toBe(false);
    expect(UtilsTypes.unknownToString(undefined).isOk()).toBe(false);
    expect(UtilsTypes.unknownToString(5).isOk()).toBe(false);
})

test('unknownToStringNullable', () => {
    const res0: Result<string | null, Error> = UtilsTypes.unknownToStringNullable('abcd');
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe('abcd');
    const res1 = UtilsTypes.unknownToStringNullable(null);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownToStringNullable(undefined);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownToStringNullable(5).isOk()).toBe(false);
})

test('unknownToNumber', () => {
    const res0: Result<number, Error> = UtilsTypes.unknownToNumber(4);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe(4);
    expect(UtilsTypes.unknownToNumber(null).isOk()).toBe(false);
    expect(UtilsTypes.unknownToNumber(undefined).isOk()).toBe(false);
    expect(UtilsTypes.unknownToNumber('test').isOk()).toBe(false);
})

test('unknownToNumberNullable', () => {
    const res0: Result<number | null, Error> = UtilsTypes.unknownToNumberNullable(4);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe(4);
    const res1 = UtilsTypes.unknownToNumberNullable(null);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownToNumberNullable(undefined);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownToNumberNullable('test').isOk()).toBe(false);
})

test('unknownToBoolean', () => {
    const res0: Result<boolean, Error> = UtilsTypes.unknownToBoolean(true);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe(true);
    expect(UtilsTypes.unknownToBoolean(null).isOk()).toBe(false);
    expect(UtilsTypes.unknownToBoolean(undefined).isOk()).toBe(false);
    expect(UtilsTypes.unknownToBoolean('test').isOk()).toBe(false);
})

test('unknownToBooleanNullable', () => {
    const res0: Result<boolean | null, Error> = UtilsTypes.unknownToBooleanNullable(false);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toBe(false);
    const res1 = UtilsTypes.unknownToBooleanNullable(null);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownToBooleanNullable(undefined);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownToBooleanNullable('test').isOk()).toBe(false);
})

test('unknownToArray', () => {
    const res0: Result<unknown[], Error> = UtilsTypes.unknownToArray(['a']);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual(['a']);
    expect(UtilsTypes.unknownToArray(null).isOk()).toBe(false);
    expect(UtilsTypes.unknownToArray(undefined).isOk()).toBe(false);
    expect(UtilsTypes.unknownToArray('test').isOk()).toBe(false);
})

test('unknownToArrayNullable', () => {
    const res0: Result<unknown[] | null, Error> = UtilsTypes.unknownToArrayNullable([5, 6]);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual([5, 6]);
    const res1 = UtilsTypes.unknownToArrayNullable(null);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownToArrayNullable(undefined);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownToArrayNullable('test').isOk()).toBe(false);
})

test('unknownToObject', () => {
    const res0: Result<UnknownObject, Error> = UtilsTypes.unknownToObject({ a: 'a', b: 5 });
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual({ a: 'a', b: 5 });
    expect(UtilsTypes.unknownToObject(null).isOk()).toBe(false);
    expect(UtilsTypes.unknownToObject(undefined).isOk()).toBe(false);
    expect(UtilsTypes.unknownToObject('test').isOk()).toBe(false);
})

test('unknownToArrayNullable', () => {
    const res0: Result<UnknownObject | null, Error> = UtilsTypes.unknownToObjectNullable({ a: 'a', b: true, c: null });
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual({ a: 'a', b: true, c: null });
    const res1 = UtilsTypes.unknownToObjectNullable(null);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownToObjectNullable(undefined);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownToObjectNullable('test').isOk()).toBe(false);
})

test('unknownArrayToArrayType', () => {
    const res0: Result<string[], Error> = UtilsTypes.unknownArrayToArrayType(['a'], UtilsTypes.isString);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual(['a']);
    expect(UtilsTypes.unknownArrayToArrayType([null], UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayType([undefined], UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayType(['a'], UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayType([5], UtilsTypes.isString).isOk()).toBe(false);
})

test('unknownArrayToArrayTypeNullable', () => {
    const res0: Result<string[] | null, Error> = UtilsTypes.unknownArrayToArrayTypeNullable(['a'], UtilsTypes.isString);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual(['a']);
    const res1 = UtilsTypes.unknownArrayToArrayTypeNullable(null, UtilsTypes.isString);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2 = UtilsTypes.unknownArrayToArrayTypeNullable(undefined, UtilsTypes.isString);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownArrayToArrayTypeNullable([null], UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayTypeNullable([undefined], UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayTypeNullable(['a'], UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownArrayToArrayTypeNullable([5], UtilsTypes.isString).isOk()).toBe(false);
})


test('unknownObjectToRecord', () => {
    const res0: Result<Record<string, string>, Error> = UtilsTypes.unknownObjectToRecord({ a: 'aValue' }, UtilsTypes.isString, UtilsTypes.isString);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual({ a: 'aValue' });
    expect(UtilsTypes.unknownObjectToRecord({ a: null }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecord({ a: undefined }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecord({ 5: 'a' }, UtilsTypes.isNumber, UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecord({ 4: 5 }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
})

test('unknownObjectToRecordNullable', () => {
    const res0: Result<Record<string, string> | null, Error> = UtilsTypes.unknownObjectToRecordNullable({ a: 'aValue' }, UtilsTypes.isString, UtilsTypes.isString);
    expect(res0.isOk()).toBe(true);
    expect(res0.unwrap()).toStrictEqual({ a: 'aValue' });
    const res1: Result<Record<string, string> | null, Error> = UtilsTypes.unknownObjectToRecordNullable(null, UtilsTypes.isString, UtilsTypes.isString);
    expect(res1.isOk()).toBe(true);
    expect(res1.unwrap()).toBe(null);
    const res2: Result<Record<string, string> | null, Error> = UtilsTypes.unknownObjectToRecordNullable(undefined, UtilsTypes.isString, UtilsTypes.isString);
    expect(res2.isOk()).toBe(true);
    expect(res2.unwrap()).toBe(null);
    expect(UtilsTypes.unknownObjectToRecordNullable({ a: null }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecordNullable({ a: undefined }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecordNullable({ 5: 'a' }, UtilsTypes.isNumber, UtilsTypes.isNumber).isOk()).toBe(false);
    expect(UtilsTypes.unknownObjectToRecordNullable({ 4: 5 }, UtilsTypes.isString, UtilsTypes.isString).isOk()).toBe(false);
})
