'use client'

import { useSearchParams } from 'next/navigation'
import YouTube from 'react-youtube';
import Link from 'next/link';
import React, { useState } from 'react';

const questions = [
    "The algorithm could respond well to the pupil.",
    "The pupil could respond well to the algorithm.",
    "The pupil got inspiration from the algorithm.",
    "The pupil enjoyed playing this song with the algorithm.",
]

const orderQuestion = "How would you order the three recordings?"

const likertCount = 5;
const recordingCount = 3;


function setAt<T>(arr: T[], index: number, newValue: T) {
    return arr.map((v, i) => i == index ? newValue : v)
}

function reorder(arr: number[], index: number) {
    for (let i = 0; i < arr.length; i++)
        if (!arr.includes(i))
            return setAt(arr, index, i);

    return setAt(Array.from({ length: arr.length }, _ => -1), index, 0);
}

export default function Test() {
    const searchParams = useSearchParams()
    const expertId = searchParams.get('expertId')

    const [reports, setReports] = useState<number[][]>(
        Array.from({ length: recordingCount }, _ => (
            Array.from({ length: questions.length }, _ => -1)
        ))
    )

    const [shownVideo, setShownVideo] = useState(0)

    const [order, setOrder] = useState<number[]>(Array.from({ length: 3 }, _ => -1))

    const urls = [
        "sgP5jeBccfI",
        "sgP5jeBccfI",
        "sgP5jeBccfI"
    ]

    return (
        <section>
            <div className="h-10 mt-10 mb-5 text-center"><h2>Statements per recording</h2></div>

            <div className="grid grid-cols-3 justify-items-center">
                {urls.map((_, i) => (
                    <div key={i} className={`p-3 ${shownVideo == i ? 'bg-blue-300' : ''}`}>
                        <Link href="#" onClick={event => {
                            event.preventDefault();
                            setShownVideo(i);
                        }}>{`Recording ${i + 1}`}</Link>
                    </div>
                ))}
            </div>

            {Array.from({ length: recordingCount }, (_, i) => (
                <RecordingSheet key={i} show={shownVideo == i} url={urls[i]} reports={reports[i]}
                                setReports={(newReports) => setReports(setAt(reports, i, newReports))}/>
            ))}

            {/*Title*/}
            <div className="h-10 mt-10 mb-5 text-center"><h2>Ordering</h2></div>

            <div className="grid grid-cols-5 gap-4 bg-green-200 p-10">
                <div className="col-span-2 p-4" />

                <div className="col-span-3 p-2 grid grid-cols-3 items-center bg-green-300">
                    {Array.from({ length: recordingCount }, (_, i) => (
                        <p key={i} className="text-center">{`recording ${i + 1}`}</p>
                    ))}
                </div>

                <div className="col-span-2 p-4">
                    <p>{orderQuestion}</p>
                </div>

                {Array.from({ length: 3 }, (_, i) => (
                    <div key={i}
                         className="col-span-1 bg-white rounded-md border-2 border-gray-400 border-solid p-4 cursor-pointer flex items-center justify-center"
                         onClick={event => {
                             event.preventDefault()
                             setOrder(reorder(order, i))
                         }}
                    >
                        <p>{["...", "first", "second", "third"][order[i] + 1]}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

type RecordingSheetProps = {
    url: string,
    reports: number[],
    setReports: (newReports: number[]) => void,
    show: boolean,
};

function RecordingSheet({ url, reports, setReports, show }: RecordingSheetProps) {
    return (
        <div className={`grid grid-cols-2 gap-4 bg-blue-200 p-10 ${show ? "" : "hidden"}`}>
            {/*Videos*/}
            <div className="col-span-full flex justify-center">
                <div className="w-[60%]">
                    <YouTube videoId={url} iframeClassName="w-full aspect-video" />
                </div>
            </div>

            <div className="col-span-1 p-4"></div>

            <div className="col-span-1 p-2 grid bg-blue-300"
                 style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                <p className="text-center">Very bad</p>

                {Array.from({ length: likertCount - 2 }, (_, i) => (
                    <p className="text-center" key={i}>.</p>
                ))}

                <p className="text-center">Very good</p>
            </div>

            {questions.map((question, questionIndex) => (
                <div className="col-span-full grid grid-cols-2" key={questionIndex}>
                    <div className="col-span-1 p-2">
                        <p>{question}</p>
                    </div>

                    <div className="col-span-1 p-2 grid grid-cols-5 items-center"
                        style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                        {Array.from({ length: likertCount }, (_, likertIndex) => (
                            <input className="h-[2rem] cursor-pointer" key={likertIndex} type="checkbox"
                                checked={reports[questionIndex] == likertIndex}
                                onChange={_ => {
                                    setReports(setAt(reports, questionIndex, likertIndex))
                            }}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}