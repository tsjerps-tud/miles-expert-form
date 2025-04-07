import '../styles/globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <title>Evaluation Form Experts</title>
            </head>
            <body>
                <div className="flex flex-col w-full max-w-5xl mx-auto my-15 grow">
                    <main className="grow">{children}</main>
                </div>
            </body>
        </html>
    );
}
