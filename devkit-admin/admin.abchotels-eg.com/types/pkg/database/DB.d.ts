import { default as Dexie } from 'dexie';
import { DBDropdownOptions } from './DbTypes';
import { CacheHelper } from './CacheHelper';
export declare class DevkitAdminDB extends Dexie {
    dropdownHelper: CacheHelper<DBDropdownOptions>;
    private dropdown;
    constructor();
}
export default DevkitAdminDB;
