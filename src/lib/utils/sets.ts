export const setToggle = <T>(set: Set<T>, item: T) => {
  if (set.has(item)) {
    set.delete(item);
  } else {
    set.add(item);
  }
};

export const removeDuplicates = <T>(array: T[]) => [...new Set(array)];
