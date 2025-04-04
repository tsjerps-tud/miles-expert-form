'use client'

import { useState } from 'react';
import FormSheet from './form_sheet';
import { useSearchParams } from 'next/navigation';


// Create URLs
const pupilCount = 5;
const sessionCount = 3;
const performanceCount = 3;

const urls = Array.from({ length: pupilCount }, (_, pupil) => (
    Array.from({ length: sessionCount }, (_, session) => (
        Array.from({ length: performanceCount }, (_, performance) => (
            `p${pupil + 1}s${session + 1}p${performance + 1}`
        ))
    )).flat()
)).flat()


// Create config setup
const performanceConfig = [
    ["s1p1", "s2p2", "s3p3"],
    ["s1p2", "s2p3", "s3p1"],
    ["s1p3", "s2p1", "s3p2"]
]

const expertConfig = [
    [[5,1],[1,2],[2,3],[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3]],
    [[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3]],
    [[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3],[3,1],[4,2],[5,3]]
]

const questionsCount = 4;

type PageWrapperProps = {

}
export default function PageWrapper({  }: PageWrapperProps) {
    const [reports, setReports] = useState<{ [url: string]: number[] }>(
        Object.fromEntries(urls.map(url =>
            [url, Array.from({ length: questionsCount }, _ => -1)]
        ))
    );

    // const [order, setOrder] = useState<{ [sheetNum: number]: number[] }>(
    //     Object.fromEntries(Array.from({ length: sheetCount }, (_, i) => (
    //         [i, Array.from({ length: recordingsPerSheet }, _ => -1)]
    //     )))
    // );

    // Get expert ID from search paramas
    const searchParams = useSearchParams()
    const expertId = Number(searchParams.get('expertId'))

    // Get urls from config
    const sheetUrls = expertConfig[expertId].map(([pupil, song]) => {
        const performances = performanceConfig[song - 1];

        return performances.map(performance => "p" + pupil.toString() + performance)
    }).flat()

    const sheetSetReports = (url: string, newReports: number[]) => {
        setReports({ ...reports, [url]: newReports });
    }

    // const sheetSetOrder = (sheetNum: number, newOrder: number[]) => {
    //     setOrder({ ...order, [sheetNum]: newOrder })
    // }

    return (
        <FormSheet sheetUrls={sheetUrls}
                   reports={reports}
                   setReportsAction={sheetSetReports}/>
    )
}