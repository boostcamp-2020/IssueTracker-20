const textReduce = (text, limitLength) => {
  if (!text) {
    return null;
  }
  if (text.length <= limitLength) {
    return text;
  }
  return `${text.substr(0, limitLength)} ...`;
};

export default textReduce;
