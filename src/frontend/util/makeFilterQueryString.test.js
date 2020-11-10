const makeFilterQueryString = (filter) => {
  let res = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [el, value] of Object.entries(filter)) {
    res += value.reduce((acc, e) => `${acc}${el}=${e}&`, '');
  }
  return res.substr(0, res.length - 1);
};

describe('do', () => {
  const testData = [
    { value: { is: ['open', 'close'] }, answer: 'is=open&is=close' },
    { value: { is: ['', 'close'] }, answer: 'is=&is=close' },
    { value: { is: ['close'], author: ['github', 'pkiop'], milestone: ['가나다', '마바사'] }, answer: 'is=close&author=github&author=pkiop&milestone=가나다&milestone=마바사' },
    { value: { author: ['github'], labels: ['frontend,backend'] }, answer: 'author=github&labels=frontend,backend' },
  ];
  for (const a of testData) {
    test('test', () => {
      expect(a.answer).toBe(makeFilterQueryString(a.value));
    });
  }
});
// export default makeFilterQureyString;
