import { isDevMode } from '@angular/core';


const API_URL = isDevMode() ? "http://localhost:5000/api" : "/api";

export const MEMBERS_URL = API_URL + "/members";