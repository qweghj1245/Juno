import Footer from "@components/Footer";
import { wrapper } from "@redux/store";
import theme from "@styles/theme";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";
import "./reset.css";

const Application = (props: any) => {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(Application);
