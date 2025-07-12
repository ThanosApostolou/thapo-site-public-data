# Unknown Handling

Now that we have created the `Result` type, we will use it in order to handle `unknown` objects in a type-safe manner.

## UtilsTypes
We create the `UtilsTypes` class which ensures that a TypeScript `unknown` value is of a specific primative TypeScript type (e.g. `string` or `number`). This utility class does not use any libraries and can be reused in multiple projects. The static methods of this utility function use [TypeScript type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) and the `Result` type we defined in the previous chapter.

`UtilsTypes`
```typescript
import { Err, Ok, type Result } from "./result";

export type UnknownObject = {
    [index: string | number | symbol]: unknown
}

export class UtilsTypes {
    static isString(value: unknown): value is string {
        return value != null && typeof value === 'string';
    }

    static isNumber(value: unknown): value is number {
        return value != null && typeof value === 'number';
    }

    static isBoolean(value: unknown): value is boolean {
        return value != null && typeof value === 'boolean';
    }

    static isArray(value: unknown): value is unknown[] {
        return value != null && typeof value === 'object' && Array.isArray(value);
    }

    static isUnknownObject(value: unknown): value is UnknownObject {
        return value != null && typeof value === 'object' && !Array.isArray(value);
    }

    /**
     * uses expensive for loop
     */
    static isUnknownArrayTypeArray<V>(arr: unknown[],
        valueF: (unk: unknown) => unk is V
    ): arr is V[] {
        for (const valueUnk of arr) {
            if (!valueF(valueUnk)) {
                return false;
            }
        }
        return true;
    }

    /**
     * uses expensive for loop
     */
    static isUnknownObjectRecord<K extends string | number | symbol, V>(obj: UnknownObject,
        keyF: (unk: unknown) => unk is K,
        valueF: (unk: unknown) => unk is V
    ): obj is Record<K, V> {
        for (const [keyUnk, valueUnk] of Object.entries(obj)) {
            if (!keyF(keyUnk)) {
                return false;
            }
            if (!valueF(valueUnk)) {
                return false;
            }
        }
        return true;
    }

    static unknownToString(value: unknown): Result<string, Error> {
        if (this.isString(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error(`Error unknownToString typeof value is ${typeof value}`))
        }
    }
    static unknownToStringNullable(value: unknown): Result<string | null, Error> {
        if (value == null) {
            return Ok.new(null);
        } else {
            return this.unknownToString(value);
        }
    }

    static unknownToNumber(value: unknown): Result<number, Error> {
        if (this.isNumber(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error(`Error unknownToNumber typeof value is ${typeof value}`))
        }
    }
    static unknownToNumberNullable(value: unknown): Result<number | null, Error> {
        if (value == null) {
            return Ok.new(null);
        } else {
            return this.unknownToNumber(value);
        }
    }

    static unknownToBoolean(value: unknown): Result<boolean, Error> {
        if (this.isBoolean(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error(`Error unknownToBoolean typeof value is ${typeof value}`))
        }
    }
    static unknownToBooleanNullable(value: unknown): Result<boolean | null, Error> {
        if (value == null) {
            return Ok.new(null);
        } else {
            return this.unknownToBoolean(value);
        }
    }

    static unknownToArray(value: unknown): Result<unknown[], Error> {
        if (this.isArray(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error(`Error unknownToArray typeof value is ${typeof value}`))
        }
    }
    static unknownToArrayNullable(value: unknown): Result<unknown[] | null, Error> {
        if (value == null) {
            return Ok.new(null);
        } else {
            return this.unknownToArray(value);
        }
    }

    static unknownToObject(value: unknown): Result<UnknownObject, Error> {
        if (this.isUnknownObject(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error(`Error unknownToObject typeof value is ${typeof value}`))
        }
    }
    static unknownToObjectNullable(value: unknown): Result<UnknownObject | null, Error> {
        if (value == null) {
            return Ok.new(null);
        } else {
            return this.unknownToObject(value);
        }
    }

    /**
     * uses expensive for loop
     */
    static unknownArrayToArrayType<V>(arr: unknown[],
        valueF: (unk: unknown) => unk is V
    ): Result<V[], Error> {
        if (this.isUnknownArrayTypeArray(arr, valueF)) {
            return Ok.new(arr);
        } else {
            return Err.new(new Error(`Error unknownArrayToArrayType typeof value is ${typeof arr}, valueF=${typeof valueF}`))
        }
    }

    /**
     * uses expensive for loop
     */
    static unknownArrayToArrayTypeNullable<V>(arr: unknown[] | null | undefined,
        valueF: (unk: unknown) => unk is V
    ): Result<V[] | null, Error> {
        if (arr == null) {
            return Ok.new(null);
        } else {
            return this.unknownArrayToArrayType(arr, valueF);
        }
    }

    /**
     * uses expensive for loop
     */
    static unknownObjectToRecord<K extends string | number | symbol, V>(obj: UnknownObject,
        keyF: (unk: unknown) => unk is K,
        valueF: (unk: unknown) => unk is V
    ): Result<Record<K, V>, Error> {
        if (this.isUnknownObjectRecord(obj, keyF, valueF)) {
            return Ok.new(obj);
        } else {
            return Err.new(new Error(`Error unknownObjectToRecord typeof value is ${typeof obj}, keyF=${typeof keyF}, valueF=${typeof valueF}`))
        }
    }

    /**
     * uses expensive for loop
     */
    static unknownObjectToRecordNullable<K extends string | number | symbol, V>(obj: UnknownObject | null | undefined,
        keyF: (unk: unknown) => unk is K,
        valueF: (unk: unknown) => unk is V
    ): Result<Record<K, V> | null, Error> {
        if (obj == null) {
            return Ok.new(null);
        } else {
            return this.unknownObjectToRecord(obj, keyF, valueF);
        }
    }
}
```

We can use `UtilsTypes` in order parse a unknown objects to a specific TypeScript type an catch the errors if our assumption about the type is wrong.

## Examples
Let's see some examples on how to transform `unknown` objects in specific types.

### Example 1: getGithubRateLimits using fetch

We create the generic function `fetchJson()` that fetches a json response and transforms it in a specific type. This function receives the parameter `url: string` and the optional `init: RequestInit` used by JavaScript [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). It also received a function `tryFromUnknown: (unk: unknown) => Result<D, Error>` that the caller passes, which will transform the unknown json object to the generic type `D`. If any error occurs this method will not throw any exceptions but instead it will return a `Result.Err<Error>`.

```typescript
async function fetchJson<D>(url: string, tryFromUnknown: (unk: unknown) => Result<D, Error>, init?: RequestInit,
): Promise<Result<D, Error>> {
    try {
        const response = await fetch(url, init);
        if (!response.ok) {
            return Err.new(new Error(`Response status: ${response.status}`));
        }
        const json = await response.json();
        return tryFromUnknown(json);
    } catch (e) {
        if (e instanceof DOMException || e instanceof TypeError || e instanceof Error) {
            return Err.new(e);
        } else {
            return Err.new(new Error('unexpected error'));
        }
    }
}
```

To test it we will use the GitHub [REST API endpoints for rate limits](https://docs.github.com/en/rest/rate-limit/rate-limit?apiVersion=2022-11-28) and we will try to partially parse the response in the class `GithubRateLimitResponse`.

```typescript
class GithubRateLimitResponse {
    resources: Resources;

    full_json: UnknownObject;

    constructor(obj: GithubRateLimitResponse) {
        this.resources = obj.resources;
        this.full_json = obj.full_json;
    }

    static tryFromUnknown(unk: unknown): Result<GithubRateLimitResponse, Error> {
        try {
            const unkObj = UtilsTypes.unknownToObject(unk).unwrap();
            const resources = Resources.tryFromUnknown(unkObj.resources).unwrap();

            return Ok.new(new GithubRateLimitResponse({
                resources,
                full_json: unkObj,
            }));
        } catch (e) {
            if (e instanceof Error) {
                return Err.new(e);
            } else {
                return Err.new(new Error(`unexpected error ${e}`));
            }
        }
    }
}

class Resources {
    core: RateLimit;

    constructor(obj: Resources) {
        this.core = obj.core;
    }

    static tryFromUnknown(unk: unknown): Result<Resources, Error> {
        try {
            const unkObj = UtilsTypes.unknownToObject(unk).unwrap();
            const core = RateLimit.tryFromUnknown(unkObj.core).unwrap();
            return Ok.new(new Resources({
                core
            }));
        } catch (e) {
            if (e instanceof Error) {
                return Err.new(e);
            } else {
                return Err.new(new Error(`unexpected error ${e}`));
            }
        }
    }
}

class RateLimit {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
    resource: string;

    constructor(obj: RateLimit) {
        this.limit = obj.limit;
        this.remaining = obj.remaining;
        this.reset = obj.reset;
        this.used = obj.used;
        this.resource = obj.resource;
    }

    static tryFromUnknown(unk: unknown): Result<RateLimit, Error> {
        try {
            const unkObj = UtilsTypes.unknownToObject(unk).unwrap();
            const limit = UtilsTypes.unknownToNumber(unkObj.limit).unwrap();
            const remaining = UtilsTypes.unknownToNumber(unkObj.remaining).unwrap();
            const reset = UtilsTypes.unknownToNumber(unkObj.reset).unwrap();
            const used = UtilsTypes.unknownToNumber(unkObj.used).unwrap();
            const resource = UtilsTypes.unknownToString(unkObj.resource).unwrap();
            return Ok.new(new RateLimit({
                limit,
                remaining,
                reset,
                used,
                resource,

            }));
        } catch (e) {
            if (e instanceof Error) {
                return Err.new(e);
            } else {
                return Err.new(new Error(`unexpected error ${e}`));
            }
        }
    }
}
```

We will also create a intentionally wrong class which has the "resources" field misspelled as `resourcess`

```typescript
class GithubRateLimitResponseWrong {
    resourcess: Resources;

    full_json: UnknownObject;

    constructor(obj: GithubRateLimitResponseWrong) {
        this.resourcess = obj.resourcess;
        this.full_json = obj.full_json;
    }

    static tryFromUnknown(unk: unknown): Result<GithubRateLimitResponseWrong, Error> {
        try {
            const unkObj = UtilsTypes.unknownToObject(unk).unwrap();
            const resourcess = Resources.tryFromUnknown(unkObj.resourcess).unwrap();

            return Ok.new(new GithubRateLimitResponseWrong({
                resourcess,
                full_json: unkObj,
            }));
        } catch (e) {
            if (e instanceof Error) {
                return Err.new(e);
            } else {
                return Err.new(new Error(`unexpected error ${e}`));
            }
        }
    }
}
```

We will now use the `fetchJson()` function we created in 3 ways:
1. with the correct class
2. with intentionally wrong url
3. with intentionally wrong class for parsing



```typescript
test('getGithubRateLimits', async () => {
    const githubHeaders: HeadersInit = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    };

    // correct
    const url0 = "https://api.github.com/rate_limit";
    const githubRepoResponseRes0: Result<GithubRateLimitResponse, Error> = await fetchJson(url0, GithubRateLimitResponse.tryFromUnknown, { headers: githubHeaders });
    console.log('githubRepoResponseRes0', githubRepoResponseRes0)
    expect(githubRepoResponseRes0.isOk()).toBe(true);
    if (githubRepoResponseRes0.isOk()) {
        expect(githubRepoResponseRes0.data.resources.core.resource).toBe('core');
    }

    // wrong url
    const url1 = "https://api.github.com/rate_limit_wrong";
    const githubRepoResponseRes1: Result<GithubRateLimitResponse, Error> = await fetchJson(url1, GithubRateLimitResponse.tryFromUnknown, { headers: githubHeaders });
    console.log('githubRepoResponseRes1', githubRepoResponseRes1)
    expect(githubRepoResponseRes1.isErr()).toBe(true);
    if (githubRepoResponseRes1.isErr()) {
        expect(githubRepoResponseRes1.error.message).toBe('Response status: 404');
    }

    // correct url but wrong json object parsing
    const githubRepoResponseRes2: Result<GithubRateLimitResponseWrong, Error> = await fetchJson(url0, GithubRateLimitResponseWrong.tryFromUnknown, { headers: githubHeaders });
    console.log('githubRepoResponseRes2', githubRepoResponseRes2)
    expect(githubRepoResponseRes2.isErr()).toBe(true);
    if (githubRepoResponseRes2.isErr()) {
        expect(githubRepoResponseRes2.error.message).toBe('Error unknownToObject typeof value is undefined');
    }
})
```

The result of this test execution is:

```
githubRepoResponseRes0 Ok {
  _data: GithubRateLimitResponse {
    resources: Resources { core: [RateLimit] },
    full_json: { resources: [Object], rate: [Object] }
  }
}

githubRepoResponseRes1 Err {
  _error: Error: Response status: 404
      at fetchJson (/home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:11:28)
      at processTicksAndRejections (node:internal/process/task_queues:105:5)
      at /home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:165:76
      at file:///home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
}

githubRepoResponseRes2 Err {
  _error: Error: Error unknownToObject typeof value is undefined
      at UtilsTypes.unknownToObject (/home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/src/utils_types.ts:124:28)
      at Resources.tryFromUnknown (/home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:62:39)
      at tryFromUnknown (/home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:132:42)
      at fetchJson (/home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:14:16)
      at processTicksAndRejections (node:internal/process/task_queues:105:5)
      at /home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/test/unknown.test.ts:173:81
      at file:///home/thanos/Documents/THANOS_PROJECTS/thapo-site-public-data/data/blogs/2_typescript_result_unknown/code/node_modules/@vitest/runner/dist/chunk-hooks.js:752:20
}
```

We see that no exceptions were thrown and we just logged the results.
