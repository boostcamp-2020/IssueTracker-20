const request = (url, option) => {
  let status = 403;
  return fetch(url, option)
    .then(
      (res) => {
        status = res.status;
        return res.json();
      },
      (err) => ({ message: `${err}` }),
    )
    .then((json) => ({ status, ...json }));
};

const options = (method, data) => ({
  method,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `bearer ${localStorage.getItem('accessToken')}`,
  },
  body: JSON.stringify(data),
});

export default (url, method, data) => request(url, options(method, data));
