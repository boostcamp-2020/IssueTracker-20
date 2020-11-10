const request = async (url, option) => {
  try {
    const result = await fetch(url, option);
    return result.json();
  } catch (error) {
    return { message: 'request fail' };
  }
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
