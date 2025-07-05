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
