import { initialAuth } from '@Components/ProvideAuth';
import { getCookie, deleteCookie } from './cookie';
import useFetch from './useFetch';

export default () => {
  const cookieAccessToken = getCookie('accessToken') || null;
  const localStorageAccessToken = window.localStorage.getItem('accessToken') || null;

  let accessToken = null;
  if (cookieAccessToken !== null) {
    deleteCookie('accessToken');
    accessToken = cookieAccessToken;
    window.localStorage.setItem('accessToken', accessToken);
  } else if (localStorageAccessToken !== null) {
    accessToken = localStorageAccessToken;
  } else {
    return Promise.resolve(initialAuth);
  }

  return useFetch('/api/auth/profile')
    .then(
      (json) => {
        const { id = null, username = null, profilePictureURL = null } = json;
        console.log(json.status);
        return {
          id: id || initialAuth.id,
          username: username || initialAuth.username,
          profilePictureURL: profilePictureURL || initialAuth.profilePictureURL,
          session: Boolean(id),
        };
      },
    );
};
