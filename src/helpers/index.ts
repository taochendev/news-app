export const countryName = {
  gb: "Great Britain",
  us: "the United States"
};

export const formatDate = (value: string) => {
  const date = new Date(value);
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
};
