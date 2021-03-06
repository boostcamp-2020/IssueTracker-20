import { initialAuth } from '@Components/ProvideAuth/ProvideAuth';
import { getCookie, deleteCookie } from './cookie';
import useFetch from './useFetch';

const fetchProfile = () => {
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
        return {
          id: id || initialAuth.id,
          username: username || initialAuth.username,
          profilePictureURL: profilePictureURL || initialAuth.profilePictureURL,
          session: Boolean(id),
        };
      },
    );
};

export default fetchProfile;
