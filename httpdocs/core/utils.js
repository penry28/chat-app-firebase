export const camelToSnakeCase = (str, replaceTo = '-') => {
  return str.replace(/[A-Z]/g, letter => `${replaceTo}${letter.toLowerCase()}`)
};
