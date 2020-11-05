const func = (acc, el) => {
  const res = el.replace(':', '=');
  return `${acc + res}&`;
};

const makeFilterQueryString = (filter) => {
  const res = filter.reduce(func, '');
  return res.substr(0, res.length - 1);
};

export default makeFilterQueryString;
