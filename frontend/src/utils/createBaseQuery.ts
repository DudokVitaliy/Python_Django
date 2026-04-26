import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {APP_ENV} from "../env/index.ts";

export const createBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.SERVER_URL}/api/${endpoint}/`,
    });
}