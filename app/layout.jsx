import '../styles/globals.css';

export const metadata = {
    title: {
        template: '%s | Netlify',
        default: 'Evaluation Form Experts'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <title>Evaluation Form Experts</title>
            </head>
            <body>
                <div className="flex flex-col min-h-screen px-6 sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto my-10 grow">
                        <main className="grow ">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
