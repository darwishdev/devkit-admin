export declare const RouteQueryAppend: (key: string, value: any) => void;
/**
 * Remove specified parameters from the current URL's query string and update the browser's history.
 *
  */
export declare const RouteQueryRemove: (paramName: string) => URLSearchParams;
export declare const RouteQueryFind: (queryKey: string) => string | null;
