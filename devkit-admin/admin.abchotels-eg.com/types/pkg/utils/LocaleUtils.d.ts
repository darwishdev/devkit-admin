export type LocaleValues = {
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
};
export type I18nInstnce = {
    locale: {
        value: string;
    };
};
export type ToggleLocaleParams = {
    i18n: I18nInstnce;
    cacheHelper: {
        setLocale: (language: string) => Promise<void>;
    };
};
export declare const getTargetValues: (currentLocale: string) => LocaleValues;
export declare const toggleLocale: ({ i18n, cacheHelper }: ToggleLocaleParams) => Promise<void>;
