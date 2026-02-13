import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

export const useBoxFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    url: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
};