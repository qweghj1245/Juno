declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      grey100: string;
      grey500: string;
      grey900: string;
      white: string;
    };
  }
}

const theme = {
  color: {
    primary: "#2853C7",
    grey100: "#EDEDED",
    grey500: "#B5B5B5",
    grey900: "#333333",
    white: "#FFFFFF",
  },
};

export default theme;
