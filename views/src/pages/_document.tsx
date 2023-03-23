import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
                <meta name='theme-color' content='#121212' />
                <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
                <meta name='description' content='Lenstack' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                <link href='https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap' rel='stylesheet' />
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
