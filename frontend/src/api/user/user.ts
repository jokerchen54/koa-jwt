import http from '@/http';
import { ITestParam } from './interface';

export const testCookie = <T>(params?:any) => http.get<T>(`${MYCONF.BASE_URL}/testCookie`, params);

export const testSession = <T>(params?:any) => http.get<T>(`${MYCONF.BASE_URL}/testSession`, params);

export const loginToken = <T>(params?:any) => http.post<T>(`${MYCONF.BASE_URL}/users/login-token`, params);

export const refreshToken = <T>(params?:any) => http.post<T>(`${MYCONF.BASE_URL}/users/re-token`, params);

export const requestUser = <T>(params?:any) => http.get<T>(`${MYCONF.BASE_URL}/users/getUser-token`, params);
