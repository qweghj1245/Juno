import { camelCase } from "camel-case";

export const convertToCamelCase = (data: any) => {
  let obj: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      obj[camelCase(key)] = value.map((item) => convertToCamelCase(item));
    } else if (typeof value === "object") {
      obj[camelCase(key)] = convertToCamelCase(value);
    } else {
      obj[camelCase(key)] = value;
    }
  }

  return obj;
};

export const convertToCamelCaseForArray = (data: any[]) => {
  return data.map((item) => convertToCamelCase(item));
};
