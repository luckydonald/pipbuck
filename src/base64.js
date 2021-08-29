export default {
  encode: data => btoa(data),
  decode: string => atob(string),
};
