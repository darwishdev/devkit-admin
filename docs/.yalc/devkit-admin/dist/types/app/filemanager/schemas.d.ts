import { BucketCreateUpdateRequest } from '../../pkg/types/api_types';
import { AppFormSections } from '../../pkg/types/types';
export declare const bucketInput: {
    $formkit: string;
    useButtons: boolean;
    options: string;
    responseOptionsKey: string;
    optionValue: string;
    optionLabel: string;
    validation: string;
    prefixIcon: string;
    showClear: boolean;
    outerClass: string;
    name: string;
    placeholder: string;
};
export declare const bucketsForm: AppFormSections<BucketCreateUpdateRequest>;
