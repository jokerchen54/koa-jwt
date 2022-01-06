import http from '@/http';

// 搜索poi
export const requestPOI = <T>(params?: any) => http.get<T>(`${MYCONF.BASE_URL}/search/v1/keywords`, { params });

// 逆地理编码
export const requestRecode = <T>(params?: any) => http.get<T>(`${MYCONF.BASE_URL}/reverse/v1/regeo`, { params });

// 地理编码
export const requestCode = <T>(params?: any) => http.get<T>(`${MYCONF.BASE_URL}/coder/geocoding2`, { params });
