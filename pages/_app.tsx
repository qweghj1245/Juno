import Footer from "@components/Footer";
import { setRequestHeader } from "@redux/appConfigSlice";
import { fetchMemberInfo } from "@redux/memberSlice";
import { wrapper } from "@redux/store";
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

Application.getInitialProps = async ({ ctx }: any) => {
  if (ctx.req) {
    try {
      ctx.store.dispatch(setRequestHeader(ctx.req.headers));
      await ctx.store.dispatch(fetchMemberInfo());
    } catch (error) {
      console.log(456);
    }
  } else {
  }

  return { props: {} };
};

export default wrapper.withRedux(Application);
