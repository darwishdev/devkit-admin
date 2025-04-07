<script lang="ts" setup generic="
    TApi extends Record<string, Function>,
    TDisabledDatesReq extends StringUnkownRecord,
    TDisabledDatesResp extends StringUnkownRecord
  ">
  // SECTION: Imports
  import { resolveApiEndpoint, StringUnkownRecord } from "devkit-apiclient";
  import { computed, h, inject, ref } from "vue";
  import { DatePickerProps, Skeleton } from "primevue";
  import DatePicker from "primevue/datepicker";
  import { InputDatepickerProps } from "./DatepickerTypes";
  import { DateToNumber, NumberToDate } from "@/devkit_admin";
  import { useFormKitContext } from "@formkit/vue";
  import { useQuery } from "@tanstack/vue-query";
  import { InputEmits } from "../types";

  // SECTION: Constants
  const ERROR_MESSAGES = {
    INVALID_TYPE_NUMBER:
      "The binded value from formkit is not a number while convertToNumber is set true",
    UNABLE_TO_GET_DISABLED_DATES:
      "can't get the disabled dates from the response",
    INVALID_DISABLED_DATES_RESPONSE:
      "disabled dates return Unsupported type.. Suupported types are date[] | number[]",
    INVALID_TYPE_DATE:
      "The binded value from formkit is not a date while convertToNumber is set false",
    RANGE_REQUIRES_ARRAY: "The value must be an array if selectionMode is range",
    SINGLE_REQUIRES_NON_ARRAY:
      "The value cannot be an array if selectionMode is not range",
  };

  // SECTION: Injections & Props & Emits
  const apiClient = inject<TApi>("apiClient");
  const emit = defineEmits<InputEmits>();
  const { context } =
    defineProps<
      InputDatepickerProps<TApi, TDisabledDatesReq, TDisabledDatesResp>
    >();

  // SECTION: Props Context Destructuring
  const {
    node,
    disabledDates,
    disabledDatesRequestPropertyName = "recordId",
    dsiabledDatesRequestMapper,
    disabledDatesResponsePropertyName = "dates",
    dsiabledDatesResponseMapper,
    convertToNumber,
    disabledDatesDependsOn,
    selectionMode,
  } = context;

  // SECTION: FormKit Context & Reactive Data
  const dependsOnFormValue = useFormKitContext(disabledDatesDependsOn);
  const parentValue = computed(
    () => dependsOnFormValue.value?.value ?? undefined,
  );
  const primeProps: DatePickerProps = { ...context };
  const formValue = ref<Date | Date[] | Array<Date | null> | undefined | null>();

  // SECTION: Watchers
  // watch(parentValue, () => {
  // 	onValueChange(undefined)
  // })

  // SECTION: Functions - Value Handling and Type Casting
  const checkForSelectionErrors = (value: unknown) => {
    if (selectionMode === "range" && !Array.isArray(value)) {
      throw new Error(ERROR_MESSAGES.RANGE_REQUIRES_ARRAY);
    }
    if (selectionMode !== "range" && Array.isArray(value)) {
      throw new Error(ERROR_MESSAGES.SINGLE_REQUIRES_NON_ARRAY);
    }
  };

  const handeDateToNumberCasting = (value: unknown) => {
    checkForSelectionErrors(value);

    if (Array.isArray(value) && value.length == 0) {
      return [];
    }
    if (Array.isArray(value)) {
      if (value.every((item) => item instanceof Date)) {
        return value.map((numberItem) => DateToNumber(numberItem));
      }
      throw new Error(ERROR_MESSAGES.INVALID_TYPE_DATE);
    }
    if (value instanceof Date) {
      return DateToNumber(value);
    }
    throw new Error(ERROR_MESSAGES.INVALID_TYPE_DATE);
  };

  const handeNumberToDateCasting = () => {
    const { value } = node;
    checkForSelectionErrors(value);

    if (Array.isArray(value) && value.length == 0) {
      return [];
    }
    if (Array.isArray(value)) {
      if (value.every((item) => typeof item == "number")) {
        return value.map((numberItem) => NumberToDate(numberItem));
      }
      throw new Error(ERROR_MESSAGES.INVALID_TYPE_DATE);
    }
    if (typeof value == "number") {
      return NumberToDate(value);
    }
    throw new Error(ERROR_MESSAGES.INVALID_TYPE_DATE);
  };

  const handleDisabledDatesResponse = (response: unknown[]): Date[] => {
    if (response.length == 0) {
      return [];
    }
    if (response.every((item) => item instanceof Date)) {
      return response;
    }
    if (response.every((item) => typeof item == "number")) {
      return response.map((item) => NumberToDate(item));
    }
    console.error(ERROR_MESSAGES.INVALID_DISABLED_DATES_RESPONSE);
    return [];
  };

  // SECTION: Functions - Event Handlers
  const onValueChange = (value: Date) => {
    if (formValue.value !== value) {
      formValue.value = value;
      console.log("formvalue is", formValue);
      if (convertToNumber) {
        const mappedValue = handeDateToNumberCasting(value);
        emit("valueChange", mappedValue);
      }
      emit("valueChange", value);
    }
  };

  // SECTION: Vue Query - Disabled Dates Fetching
  const queryFn = () => {
    return new Promise<Date[]>((resolve) => {
      if (!disabledDates) return resolve([]);
      let request: StringUnkownRecord = {};
      if (parentValue.value) {
        if (dsiabledDatesRequestMapper) {
          request = dsiabledDatesRequestMapper(parentValue.value);
        } else {
          request[disabledDatesRequestPropertyName] = parentValue.value;
        }
      }
      resolveApiEndpoint<TApi, TDisabledDatesReq, TDisabledDatesResp>(
        disabledDates,
        apiClient,
        request as TDisabledDatesReq,
      ).then((response: TDisabledDatesResp) => {
        if (Array.isArray(response)) {
          return resolve(handleDisabledDatesResponse(response));
        }
        if (dsiabledDatesResponseMapper) {
          const mappedResponse = dsiabledDatesResponseMapper(response);
          if (Array.isArray(mappedResponse)) {
            return resolve(handleDisabledDatesResponse(mappedResponse));
          }
        }

        if (disabledDatesResponsePropertyName in response) {
          const responseArray = response[disabledDatesResponsePropertyName];
          if (Array.isArray(responseArray)) {
            return resolve(handleDisabledDatesResponse(responseArray));
          }
        }
        console.error(ERROR_MESSAGES.UNABLE_TO_GET_DISABLED_DATES);
        resolve([]);
      });
    });
  };

  const disabledDatesQueryResult = useQuery({
    queryKey: [`${node.name}-disabled-dates`, parentValue.value],
    queryFn,
    enabled: true,
    refetchOnWindowFocus: false,
  });

  // SECTION: Initialization
  const init = () =>
    new Promise<void>((resolve, reject) => {
      try {
        const { value } = node;
        if (value === null || value === undefined) {
          formValue.value = null;
          return resolve();
        }
        if (convertToNumber) {
          try {
            formValue.value = handeNumberToDateCasting();
            return resolve();
          } catch (error) {
            return reject(error);
          }
        }

        // Handle Date or Date[] values directly
        if (value instanceof Date) {
          formValue.value = new Date(value); // Create a copy
          return resolve();
        }

        if (Array.isArray(value) && value.every((item) => item instanceof Date)) {
          formValue.value = value.map((date) => new Date(date)); // Create copies
          return resolve();
        }

        // If we reach here, the value type is not supported
        return reject(new Error(`Unsupported value type: ${typeof value}`));
      } catch (error) {
        console.error("Error in init function:", error);
        return reject(error);
      }
    });
  await init();

  // SECTION: Rendering Function
  const renderInputDatepicker = () => {
    return h(
      DatePicker,
      {
        ...primeProps,
        modelValue: formValue.value,
        disabledDates: disabledDatesQueryResult.data.value,
        "onUpdate:modelValue": onValueChange,
      },
      {
        date:
          disabledDatesQueryResult.isLoading.value ||
            disabledDatesQueryResult.isFetching.value
            ? () =>
              h(Skeleton, {
                shape: "circle",
                size: "1.5rem",
              })
            : undefined,
      },
    );
  };
</script>

<template>
  <component :is="renderInputDatepicker" />
</template>
