import { expect, test } from 'vitest';
import { Err, Ok, Result } from '../src/result';
import { UnknownObject, UtilsTypes } from '../src/utils_types';


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
