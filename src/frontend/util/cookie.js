export default {
  getCookie: (name) => {
    const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  },
  deleteCookie: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
  },
};
