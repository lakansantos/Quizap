import qs from "querystring";

export const queryParse = (string: string) => {
  return qs.parse(string);
};

export const queryStringify = (obj: ParsedUrlQueryInput) => {
  return qs.stringify(obj);
};
