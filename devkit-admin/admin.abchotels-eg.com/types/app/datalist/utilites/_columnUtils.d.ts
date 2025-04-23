import { StringUnkownRecord } from 'devkit-apiclient';
import { DatalistColumnsBase } from '../types';
export declare const _constructColumns: <TRecord extends StringUnkownRecord>(record: TRecord, execludedKeys?: (keyof TRecord)[]) => DatalistColumnsBase<TRecord>;
