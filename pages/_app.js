function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      a {
        text-decoration: none;
        opacity: 0.7;
        color: #7591f6;
        transition: opacity 0.3s;
      }
      a:hover {
        opacity: 1;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  console.log("Roda em todas as páginas");

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
