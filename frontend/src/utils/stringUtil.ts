// @function trim(str: String): String
export function trim(str:string) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
export function splitWords(str:string) {
  return trim(str).split(/\s+/);
}

export function isEmpty(str:any) {
  if (typeof str === 'undefined' || str === undefined || str === null || str === '') {
    return true;
  }
  return false;
}

export function isNotEmpty(str:any) {
  return !isEmpty(str);
}
