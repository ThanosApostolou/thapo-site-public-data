import { expect, test } from 'vitest';
import { Ok } from './result';

test('Result.Ok', () => {
    const someOk = Ok.new<number, string>(12);
    expect(someOk.data).toBe(12)
})
