import { isDevMode } from '@angular/core';


const API_URL = isDevMode() ? "http://localhost:5000/api" : "/api";

export const MEMBERS_URL = API_URL + "/members";
export const LINEUPS_URL = API_URL + "/members/lineups";
export const MEMBERS_BY_LU_URL = API_URL + "/members/lineups/";

export const NEWS_BY_TITLE_URL = API_URL + "/news/";
export const NEWS_BY_ID_URL = API_URL + "/news/";
export const NEWS_COUNT_URL = API_URL + "/news/count";

export const SOCIALS_URL = API_URL + "/socials";