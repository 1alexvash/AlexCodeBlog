const filterNullElements = <T>(tag: T | null): tag is T => {
  return tag !== null;
};

export default filterNullElements;
