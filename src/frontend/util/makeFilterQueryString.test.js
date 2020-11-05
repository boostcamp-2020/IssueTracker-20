const func = (acc, el) => {
  const res = el.replace(':', '=');
  return `${acc + res}&`;
};

const makeFilterQueryString = (filter) => {
  const res = filter.reduce(func, '');
  return res.substr(0, res.length - 1);
};

describe('do', () => {
  const testData = [
    { value: ['is:open', 'is:close'], answer: 'is=open&is=close' },
    { value: ['is:', 'is:close'], answer: 'is=&is=close' },
    { value: ['author:github', 'labels:frontend,backend'], answer: 'author=github&labels=frontend,backend' },
  ];
  for (const a of testData) {
    test('test', () => {
      expect(a.answer).toBe(makeFilterQueryString(a.value));
    });
  }
});
// export default makeFilterQureyString;
