import { isDevMode } from '@angular/core';


const API_URL = isDevMode() ? "http://localhost:5000/api" : "/api";

export const MEMBERS_URL = API_URL + "/members";
export const LINEUPS_URL = API_URL + "/members/lineups";
export const MEMBERS_BY_LU_URL = API_URL + "/members/lineups/";

export const NEWS_BY_TITLE_URL = API_URL + "/news/";
export const NEWS_BY_ID_URL = API_URL + "/news/";
export const NEWS_COUNT_URL = API_URL + "/news/count";

export const ADMIN_URL_BY_NAME = API_URL + '/admin/';
export const ADMIN_LOGIN_URL = API_URL + '/admin/login';

export const ADMIN_ADD_MEMBER = API_URL + '/admin/add/member';
export const ADMIN_ADD_SOCIAL = API_URL + '/admin/add/social';
export const ADMIN_ADD_NEWS = API_URL + '/admin/add/news';
export const ADMIN_ADD_LINEUP = API_URL + '/admin/add/lineup';
export const ADMIN_ADD_ADMIN = API_URL + '/admin/add/admin';

export const ADMIN_DELETE_MEMBER = API_URL + '/admin/delete/member';
export const ADMIN_DELETE_SOCIAL = API_URL + '/admin/delete/social';
export const ADMIN_DELETE_NEWS = API_URL + '/admin/delete/news';
export const ADMIN_DELETE_LINEUP = API_URL + '/admin/delete/lineup';
export const ADMIN_DELETE_ADMIN = API_URL + '/admin/delete/admin';

export const ADMIN_UPDATE_MEMBER = API_URL + '/admin/update/member';
export const ADMIN_UPDATE_SOCIAL = API_URL + '/admin/update/social';
export const ADMIN_UPDATE_NEWS = API_URL + '/admin/update/news';
export const ADMIN_UPDATE_LINEUP = API_URL + '/admin/update/lineup';
export const ADMIN_UPDATE_ADMIN = API_URL + '/admin/update/admin';

export const SOCIALS_URL = API_URL + "/socials";