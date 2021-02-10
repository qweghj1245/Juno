import Footer from "@components/Footer";
import theme from "@styles/theme";
import { ThemeProvider } from "styled-components";
import "./reset.css";

export default function App(props: any) {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
