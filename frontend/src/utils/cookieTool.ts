// import { isNotEmpty, trim } from './stringUtil';

const cookieTool = {
  isCookieEnabled() {
    // if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0 || !navigator.cookieEnabled) {
    if (!window.navigator.cookieEnabled) {
      return false;
    }
    return true;
  },

  addCookie(name:string, value:any, expireHours:number, domain = undefined) {
    cookieTool.addCookie_d(name, value, expireHours);
    if (!cookieTool.isCookieEnabled()) {
      if (localStorage) {
        localStorage.setItem(name, value);
      }
    }
  },

  addCookie_d(name:string, value:any, expireHours:number = 30, domain:any = undefined) {
    const exdate = new Date();
    exdate.setTime(exdate.getTime() + expireHours * 60 * 60 * 1000);
    if (domain && domain.length > 0) {
      document.cookie = `${name}=${value};expires=${exdate.toUTCString()};path=/;domain=${domain}`;
    } else {
      document.cookie = `${name}=${value};expires=${exdate.toUTCString()};path=/`;
    }
  },

  getCookie_d(name:string) {
    if (document.cookie) {
      const arrCookie = document.cookie.split(';');
      if (arrCookie && arrCookie.length > 0) {
        for (let i = 0; i < arrCookie.length; i += 1) {
        //   const c = trim(arrCookie[i]);
          const c = arrCookie[i];
          const arr = c.split('=');
          if (arr[0].trim() === name) {
            return (c.substring(c.indexOf('=') + 1).trim() || '');
          }
        }
      }
    }
    return '';
  },

  getCookie(name:string) {
    if (cookieTool.isCookieEnabled()) {
      return cookieTool.getCookie_d(name);
    } if (localStorage) {
      return localStorage.getItem(name) || '';
    }
    return '';
  },

  deleteCookie(name:string) {
    const exdate = new Date();
    exdate.setTime(exdate.getTime() - 10000);
    const cavl = '';
    document.cookie = `${name}=${cavl};expires=${exdate.toUTCString()};path=/`;
    if (!cookieTool.isCookieEnabled()) {
      if (localStorage) {
        localStorage.removeItem(name);
      }
    }
  },
};

export default cookieTool;
