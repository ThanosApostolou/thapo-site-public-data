# Result Type

In order to create a Result type in TypeScript we need to define 2 separate classes, one for the `Ok` type and one for the `Err` type. Then we define the union type `Result` that can be either an Ok or Err type.

## Types Definitions
We define the Ok class as below:
```typescript
export class Ok<O, E> {
    private readonly _data: O;

    private constructor(data: O) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    isOk(): this is Ok<O, E> {
        return true;
    }

    isErr<E>(): this is Err<O, E> {
        return false;
    }

    unwrap(): O {
        return this._data;
    }

    /**
     * Maps a Result<O, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched
     */
    map<U>(mapFunction: (data: O) => U): Result<U, E> {
        return new Ok(mapFunction(this._data));
    }

    /**
     * Maps a Result<O, E> to Result<O, I> by applying a function to a contained Err value, leaving an Ok value untouched.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapErr<I>(_mapFunction: (error: E) => I): Result<O, I> {
        return new Ok(this._data);
    }

    /**
     * Creates a new Ok<O, E> with ok data
     */
    static new<O, E>(data: O): Ok<O, E> {
        return new Ok(data);
    }
}
```

We define the Err class as below:
```typescript
export class Err<O, E> {
    private readonly _error: E;

    private constructor(error: E) {
        this._error = error;
    }

    get error() {
        return this._error;
    }

    isOk<O>(): this is Ok<O, E> {
        return false;
    }

    isErr(): this is Err<O, E> {
        return true;
    }

    unwrap(): O {
        throw this._error;
    }

    /**
     * Maps a Result<O, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    map<U>(_mapFunction: (data: O) => U): Result<U, E> {
        return new Err(this._error);
    }

    /**
     * Maps a Result<O, E> to Result<O, I> by applying a function to a contained Err value, leaving an Ok value untouched.
     */
    mapErr<I>(mapFunction: (error: E) => I): Result<O, I> {
        return new Err(mapFunction(this._error));
    }

    /**
     * Creates a new Err
     */
    static new<O, E>(error: E): Err<O, E> {
        return new Err(error);
    }
}
```

Finally the define the Result type as below:
```typescript
export type Result<O, E> = Ok<O, E> | Err<O, E>;
```



## Examples

### Example 1: getEven
Let's see an example written with vitest where a function `getEven()` accepts a number and returns either the number itself if it is event or a string error if the number is not even.

```typescript
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
```

The console output of this test will be:
```
odd example
odd instanceof error=number x=1 is not event
odd type predicate error=number x=1 is not event
odd unwrap error=number x=1 is not event
even example
even instanceof data=2
even type predicate data=2
even unwrap data=2
```

## Comments

Using methods with same signature in both Ok and Err types allows us to be able to call these methods directly on a Result type without knowing yet if it contains an Ok or an Err type.

Using [TypeScript type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) in methods `isOK()` and `isErr()` allows to check whether the type is an Ok or an Err and use the data or the error respectively. Alternatively, someone can use the [JavaScript instanceof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)  to check if a result type is an Ok or an Err

We can see that the usage of `isOk`/`isErr` methods or `instanceof` operator are equivalent. Using `unwrap` and `try/catch` is not recommended in most cases, but it can be convenient in some cases when we don't care about the error type and errors are only expected on systemic failures (e.g. some backend server being offline).
