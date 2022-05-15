export const camelToSnakeCase = (str, replaceTo = '-') => {
  return str.replace(/[A-Z]/g, letter => `${replaceTo}${letter.toLowerCase()}`)
};

export const isChange = (data1, data2) => {
  return JSON.stringify(data1) !== JSON.stringify(data2);
}