const categories =
  "business entertainment general health science sports technology";

const categoriesOptions = categories.split(" ").map(category => ({
  value: category,
  label: `${category.charAt(0).toUpperCase()}${category.slice(1)}`,
}));

// export const FILTER_DEFAULTS = {
//   year: "",
//   type: { movie: true, series: true },
// };

export { categoriesOptions };
