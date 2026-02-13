import {
  parseAsString,
  useQueryStates,
} from "nuqs";

export const useCubeFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    name: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
};