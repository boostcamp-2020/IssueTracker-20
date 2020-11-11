const hexColorRegex = /^(?:[0-9a-fA-F]{3}){1,2}$/;

export const getRandomColor = () => {
  const seed = Date.now() * Math.random();
  const result = seed.toString(16).replace('.', '').slice(0, 6);
  if (hexColorRegex.test(result)) return `#${result}`;
  return getRandomColor();
};

export const testHexColorString = (str) => str.startsWith('#') && hexColorRegex.test(str.slice(1));
