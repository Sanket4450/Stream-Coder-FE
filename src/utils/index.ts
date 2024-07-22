export const getItem = (key: string) => localStorage.getItem(key)

export const setItem = (key: string, value: string) => localStorage.setItem(key, value)

export const removeItem = (key: string) => localStorage.removeItem(key)

export const generateRandom8DigitID = () => {
  return Math.floor(10000000 + Math.random() * 90000000)
}
