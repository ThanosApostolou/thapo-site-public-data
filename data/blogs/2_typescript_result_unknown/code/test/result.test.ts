import { expect, test } from 'vitest';
import { Err, Ok, Result } from '../src/result';

class SomeDto {
    x: number;
    flag: boolean;

    constructor(obj: SomeDto) {
        this.x = obj.x;
        this.flag = obj.flag;
    }
}

test('Result.Ok', () => {
    const someOk0 = Ok.new<number, string>(12);
    expect(someOk0.data).toBe(12)


    const someOk1 = Ok.new<boolean, string>(false);
    expect(someOk1.data).toBe(false)


    const someOk2Data = new SomeDto({ x: 1, flag: true });
    const someOk2 = Ok.new<SomeDto, string>(someOk2Data);
    expect(someOk2.data).toBe(someOk2Data)
})


test('Result.Err', () => {
    const someErr0 = Err.new<number, string>('some error');
    expect(someErr0.error).toBe('some error')


    const someErr1 = Err.new<boolean, number>(23);
    expect(someErr1.error).toBe(23)
})


test('Result', () => {
    const someOkData = new SomeDto({ x: 1, flag: true });
    const someOk = Ok.new<SomeDto, string>(someOkData);

    const newOkData = new SomeDto({ x: 1, flag: false });
    const result = someOk.map(d => newOkData)
    expect(result.isOk()).toBe(true)
    expect(result instanceof Ok).toBe(true)
    expect(result instanceof Err).toBe(false)
    if (result instanceof Err) {
        throw new Error("unexpected error")
    }
    expect(result.data).toBe(newOkData)
})


test('Result example getEven', () => {
    const getEven = (x: number): Result<number, string> => {
        if (x % 2 == 0) {
            return Ok.new(x);
        } else {
            return Err.new(`number x=${x} is not event`);
        }
    }

    // odd example
    console.log('odd example')
    let evenRes = getEven(1);
    //// using instanceof
    if (evenRes instanceof Ok) {
        // data is available here
        const data = evenRes.data;
        console.log(`odd instanceof data=${data}`);
    } else {
        // error is available here
        const error = evenRes.error;
        console.log(`odd instanceof error=${error}`);
    }
    //// using type predicates methods
    if (evenRes.isOk()) {
        // data is available here
        const data = evenRes.data;
        console.log(`odd type predicate data=${data}`);
    } else {
        // error is available here
        const error = evenRes.error;
        console.log(`odd type predicate error=${error}`);
    }
    //// using unwrap
    try {
        const data = evenRes.unwrap();
        console.log(`odd unwrap data=${data}`);
    } catch (e: unknown) {
        // error is available but we have lost the error type
        console.log(`odd unwrap error=${e}`);
    }
    expect(evenRes.isOk()).toBe(false)
    expect(evenRes.isErr()).toBe(true)
    expect(evenRes instanceof Ok).toBe(false)
    expect(evenRes instanceof Err).toBe(true)

    // even example
    console.log('even example')
    evenRes = getEven(2);
    //// using instanceof
    if (evenRes instanceof Ok) {
        // data is available here
        const data = evenRes.data;
        console.log(`even instanceof data=${data}`);
    } else {
        // error is available here
        const error = evenRes.error;
        console.log(`even instanceof error=${error}`);
    }
    //// using type predicates methods
    if (evenRes.isOk()) {
        // data is available here
        const data = evenRes.data;
        console.log(`even type predicate data=${data}`);
    } else {
        // error is available here
        const error = evenRes.error;
        console.log(`even type predicate error=${error}`);
    }
    //// using unwrap
    try {
        const data = evenRes.unwrap();
        console.log(`even unwrap data=${data}`);
    } catch (e: unknown) {
        // error is available but we have lost the error type
        console.log(`even unwrap error=${e}`);
    }
    expect(evenRes.isOk()).toBe(true)
    expect(evenRes.isErr()).toBe(false)
    expect(evenRes instanceof Ok).toBe(true)
    expect(evenRes instanceof Err).toBe(false)
})
