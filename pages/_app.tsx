import Footer from "@components/Footer";
import theme from "@styles/theme";
import { ThemeProvider } from "styled-components";
import "./reset.css";

const Application = (props: any) => {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
};

export default Application;
