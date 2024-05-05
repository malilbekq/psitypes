const randomIntFromRange = (min, max) => {
  const minNorm = Math.ceil(min);
  const maxNorm = Math.floor(max);
  return Math.floor(Math.random() * (maxNorm - minNorm + 1) + minNorm);

};

export { randomIntFromRange };