interface IWithId {
  id: string;
}

interface IWithName {
  name: string;
}

export const removeRepeatedItemsById = (arr1: IWithId[], arr2: IWithId[]) => {
  if (!arr1 || arr1.length === 0) {
    return [];
  }
  if (!arr2 || arr2.length === 0) {
    return arr1;
  }
  return arr1.filter(({ id: id1 = '' }) => !arr2.find(({ id: id2 = '' }) => id1 === id2));
};

export const getByName = (name: string, arr: IWithName[]) => {
  return (
    arr.find(({ name: nameFromArray }) => name.toLowerCase() === nameFromArray.toLowerCase()) ||
    null
  );
};
