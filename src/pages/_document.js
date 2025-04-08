import React from 'react'
import PropTypes from 'prop-types'
import { Html, Head, NextScript } from 'next/document'

export default function Document(props) {
  const { locale } = props.__NEXT_DATA__

  return (
    <Html lang={locale || 'en'}>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body>
      <NextScript />
      </body>
    </Html>
  )
}

Document.propTypes = {
  __NEXT_DATA__: PropTypes.shape({
    locale: PropTypes.string,
  }),
}
