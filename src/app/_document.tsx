import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Convert any unstructured or structured text to JSON."
          />
          <meta
            property="og:description"
            content="Convert any unstructured or structured text to JSON."
          />
          <meta property="og:title" content="anyToJSON" />
          <meta
            name="twitter:description"
            content="Convert any unstructured or structured text to JSON."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
