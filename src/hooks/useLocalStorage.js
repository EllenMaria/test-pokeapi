export const useLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  const initialValue =
    storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  let currentValue = initialValue;

  const listeners = [];

  const setState = (newValue) => {
    if (newValue !== currentValue) {
      currentValue = newValue;
      localStorage.setItem(key, JSON.stringify(newValue));
      listeners.forEach((listener) => listener(newValue));
    }
  };

  const getState = () => currentValue;

  return [getState, setState];
};
