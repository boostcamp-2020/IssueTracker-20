const textReduce = (text, limitLength) => {
  if (text.length <= limitLength) {
    return text;
  }
  return `${text.substr(0, limitLength)} ...`;
};

export default textReduce;
