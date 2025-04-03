'use client'

import { Suspense, useState } from 'react';
import FormSheet from './form_sheet';


const urls = [
    "sgP5jeBccfI",
    "sgP5jeBccfI",
    "sgP5jeBccfI"
]

const questionsCount = 4;

const sheetCount = 15;
const recordingsPerSheet = 3;


type PageWrapperProps = {

}
export default function PageWrapper({  }: PageWrapperProps) {
    const [reports, setReports] = useState<{ [url: string]: number[] }>(
        Object.fromEntries(urls.map(url =>
            [url, Array.from({ length: questionsCount }, _ => -1)]
        ))
    );

    const [order, setOrder] = useState<{ [sheetNum: number]: number[] }>(
        Object.fromEntries(Array.from({ length: sheetCount }, (_, i) => (
            [i, Array.from({ length: recordingsPerSheet }, _ => -1)]
        )))
    );

    // TODO: meer URLS, uitkiezen
    const sheetUrls: string[] = urls;
    const sheetNum: number = 0;

    const sheetSetReports = (url: string, newReports: number[]) => {
        setReports({ ...reports, [url]: newReports });
    }

    const sheetSetOrder = (sheetNum: number, newOrder: number[]) => {
        setOrder({ ...order, [sheetNum]: newOrder })
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <FormSheet sheetUrls={sheetUrls}
                       sheetNum={sheetNum}
                       reports={reports}
                       setReportsAction={sheetSetReports}
                       order={order}
                       setOrderAction={sheetSetOrder} />
        </Suspense>
    )
}