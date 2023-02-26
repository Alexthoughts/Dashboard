export const setLocalStorage = function (array, storageName) {
  localStorage.setItem(storageName, JSON.stringify(array));
};

const resetLocalStorage = function (storageName) {
  localStorage.removeItem(storageName);
  return `${storageName} removed from local storage`;
};
