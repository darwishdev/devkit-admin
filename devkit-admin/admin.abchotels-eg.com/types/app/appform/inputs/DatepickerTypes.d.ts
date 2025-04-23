import { ApiEndpoint } from 'devkit-apiclient';
import { DatePickerProps } from 'primevue';
import { FormKitInputContext } from '../types';
export type DatepickerContext<TApi extends Record<string, Function>, TDisabledDatesReq extends Record<string, unknown> = {}, TDisabledDatesResp extends Record<string, unknown> = {}> = FormKitInputContext<Date | Date[] | number | number[] | Array<Date | null> | undefined | null> & DatePickerProps & {
    disabledDates?: ApiEndpoint<TApi, TDisabledDatesReq, TDisabledDatesResp>;
    disabledDatesDependsOn?: string;
    convertToNumber?: boolean;
    disabledDatesRequestPropertyName?: string;
    disabledDatesResponsePropertyName?: string;
    dsiabledDatesRequestMapper: (req: unknown) => TDisabledDatesReq;
    dsiabledDatesResponseMapper: (resp: unknown) => TDisabledDatesResp;
};
export type InputDatepickerProps<TApi extends Record<string, Function>, TReq extends Record<string, unknown> = {}, TResp extends Record<string, unknown> = {}> = {
    context: DatepickerContext<TApi, TReq, TResp>;
};
