import { is, map, pipe, replace, toLower } from "ramda";

const toCamelCase = str =>
  pipe(
    replace(/[-_](.)/g, (_, char) => char.toUpperCase()), // Convert snake_case & kebab-case
    replace(/^(.)/, toLower) // Ensure first letter is lowercase
  )(str);

const mapKeys = (fn, obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [fn(k), v]));

const convertKeysToCamelCase = obj => {
  if (is(Array, obj)) {
    return map(convertKeysToCamelCase, obj);
  } else if (is(Object, obj)) {
    return mapKeys(toCamelCase, obj);
  }

  return obj;
};

export default convertKeysToCamelCase;
