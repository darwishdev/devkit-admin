import { Table } from 'dexie';
export type DBCacheEntry<TValue = unknown> = {
    key: string;
    value: TValue;
    expirationTime: number;
};
export declare class CacheHelper<TValue> {
    private readonly table;
    constructor(table: Table<DBCacheEntry<TValue>>);
    cleanupExpiredEntries(): Promise<void>;
    private isCacheValid;
    find(key: string): Promise<TValue | undefined>;
    create(key: string, value: TValue, expirationMs: number): Promise<void>;
    bulkDelete(keys: string[]): Promise<void>;
}
