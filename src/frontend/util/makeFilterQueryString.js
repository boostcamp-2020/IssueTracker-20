const makeFilterQueryString = (filter) => {
  let res = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [el, value] of Object.entries(filter)) {
    res += `${el}=${value}&`;
  }
  return res.substr(0, res.length - 1);
};

export default makeFilterQueryString;
