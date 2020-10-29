import cookie from './cookie';

export default {
  isAuthenticated: () => {
    const cookieAccessToken = cookie.getCookie('accessToken') || null;
    const localStorageAccessToken = window.localStorage.getItem('accessToken') || null;

    let accessToken = null;
    if (cookieAccessToken !== null) {
      cookie.deleteCookie('accessToken');
      accessToken = cookieAccessToken;
      window.localStorage.setItem('accessToken', accessToken);
    } else if (localStorageAccessToken !== null) {
      accessToken = localStorageAccessToken;
    } else {
      return false;
    }

    return fetch('/api/auth/profile', {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 403) return false;
        return true;
      })
      .catch(console.error);
  },
};
