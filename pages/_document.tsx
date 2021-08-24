import Document, {Html, Head, Main, NextScript} from "next/document";

const getCsp = (): [csp: string, nonce: string] => {
  const nonce = "abc12345";

  const isDev = process.env.NODE_ENV === "development";

  const scriptSrc = [
    `'self'`,
    `'unsafe-inline'`,
    "https:", // reserve unsafe-eval only for dev
    ...(isDev ? [`'unsafe-eval'`] : [`'nonce-${nonce}'`, `'strict-dynamic'`]),
  ];

  const csp = [
    `base-uri 'none';`,
    `child-src 'none';`,
    `connect-src 'self';`,
    `default-src 'self';`,
    `font-src 'self';`,
    `form-action 'self';`,
    `frame-src 'self';`,
    `img-src 'self' data:;`,
    `manifest-src 'self';`,
    `media-src 'self';`,
    `object-src 'none';`,
    `prefetch-src 'self';`,
    `script-src ${scriptSrc.join(" ")};`,
    `style-src 'self' 'unsafe-inline' https:;`,
    `upgrade-insecure-requests;`,
    `worker-src 'self';`,
  ].join(" ");

  return [csp, nonce];
};

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    const [csp, nonce] = getCsp();

    return (
      <Html>
        <Head nonce={nonce}>
          <meta property="csp-nonce" content={nonce} />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <meta name="referrer" content="strict-origin" />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
