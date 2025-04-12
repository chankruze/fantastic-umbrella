import {
  always,
  equals,
  ifElse,
  isEmpty,
  isNil,
  pipe,
  propOr,
  reject,
  split,
  when,
} from "ramda";

const formatValue = when(equals("N/A"), always("Not available"));

const isValidFallback = value =>
  !isNil(value) && !equals(value, "N/A") && !isEmpty(value);

export const getPropWithFallback = (propName, fallback, obj) =>
  ifElse(
    value => equals(value, "N/A"),
    () => (isValidFallback(fallback) ? fallback : formatValue(fallback)),
    formatValue
  )(propOr(fallback, propName, obj));

export const processGenres = pipe(split(", "), reject(equals("N/A")));

export const getMovieDetails = movie => [
  {
    label: "Director",
    value: getPropWithFallback("director", "Unknown", movie),
  },
  {
    label: "Actors",
    value: getPropWithFallback("actors", "No actors listed", movie),
  },
  {
    label: "Box Office",
    value: getPropWithFallback("boxOffice", "Not disclosed", movie),
  },
  { label: "Year", value: getPropWithFallback("year", "Unknown", movie) },
  { label: "Runtime", value: getPropWithFallback("runtime", "N/A", movie) },
  {
    label: "Language",
    value: getPropWithFallback("language", "Unknown", movie),
  },
  { label: "Rated", value: getPropWithFallback("rated", "Unrated", movie) },
];
