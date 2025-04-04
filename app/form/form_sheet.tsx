'use client'

import React, { useState } from 'react';
import { MultiLine } from '../../util/multiline';
import { reorder, setAt } from '../../util/array';


const recordingCount = 45;
const likertCount = 5;

const recordingSheetDescription = "Listen to the three recordings one after another, and rank the statements for each."
const questions = [
    "The algorithm could respond well to the pupil.",
    "The pupil could respond well to the algorithm.",
    "The pupil got inspiration from the algorithm.",
    "The pupil enjoyed playing this song with the algorithm.",
]

const orderingSheetDescription = "These recordings were part of three separate sessions. Estimate which recording was part of which session." +
    "\n Want to change your answer? Click on any button to restart the ordering."
const orderQuestion = "Which session did each recording occur in?"


type FormSheetProps = {
    sheetUrls: string[],

    reports: { [url: string]: number[] },
    setReportsAction: (url: string, newReports: number[]) => void,

    // order: { [sheetNum: number]: number[] },
    // setOrderAction: (sheetNum: number, newOrder: number[]) => void,
}

export default function FormSheet({ sheetUrls, reports, setReportsAction }: FormSheetProps) {
    const [shownRecording, setShownRecording] = useState(0)

    const gotoNextRecording = () => {
        setShownRecording(Math.min(shownRecording + 1, recordingCount))
    }

    const shownUrl = sheetUrls[shownRecording]

    const shownReports = reports[shownUrl]
    const setShownReports = (newReports: number[]) =>
        setReportsAction(shownUrl, newReports)

    const filledIn = shownReports.every(it => it != -1)

    return (
        <>
            <section className="bg-gray-100 p-10 mt-10">
                {/*Title*/}
                <h2 className="mb-2">Statements per recording</h2>
                <MultiLine className="mb-5">{recordingSheetDescription}</MultiLine>

                {/*Recording sheet*/}
                <FormRecordingSheet
                    url={shownUrl}
                    reports={shownReports}
                    setReports={setShownReports} />

                {/*Tabs*/}
                <div className="flex gap-4 justify-center">
                    <div className="p-3 bg-blue-300">
                        {'Recording ' + (shownRecording + 1) + '/' + recordingCount}
                    </div>

                    {filledIn && <div className="p-3 bg-blue-300 no-underline cursor-pointer" onClick={event => {
                        event.preventDefault();
                        gotoNextRecording();
                    }}>{shownRecording == recordingCount - 1 ? '.' : '>'}
                    </div>}
                </div>
            </section>

            {/*<section className="bg-gray-100 p-10">*/}
            {/*    /!*Title*!/*/}
            {/*    <h2 className="mb-2">Ordering</h2>*/}
            {/*    <MultiLine className="mb-5">{orderingSheetDescription}</MultiLine>*/}

            {/*    Ordering sheet*/}
            {/*    <FormOrderingSheet order={order[sheetNum]}*/}
            {/*                   setOrder={(newOrder) => setOrderAction(sheetNum, newOrder)} />*/}
            {/*</section>*/}
        </>
    )
}


type FormRecordingSheetProps = {
    url: string,

    reports: number[],
    setReports: (newReports: number[]) => void,
};

function FormRecordingSheet({ url, reports, setReports }: FormRecordingSheetProps) {
    return (
        <div className={`grid grid-cols-2 gap-4 bg-blue-200 p-10`}>
            {/*Videos*/}
            <div className="col-span-full flex justify-center">
                <div className="w-[60%]">
                    <video key={url} controls>
                        <source src={'recordings/' + url + '.mp4'} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/*Spacer*/}
            <div className="col-span-1 p-4"></div>

            {/*Title row*/}
            <div className="col-span-1 p-2 grid bg-blue-300"
                 style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                <p className="text-center">Very bad</p>

                {Array.from({ length: likertCount - 2 }, (_, i) => (
                    <p className="text-center" key={i}>.</p>
                ))}

                <p className="text-center">Very good</p>
            </div>

            {/*Questions*/}
            {questions.map((question, questionIndex) => (
                <div className="col-span-full grid grid-cols-2" key={questionIndex}>
                    {/*Question container*/}
                    <div className="col-span-1">
                        <p>{question}</p>
                    </div>

                    {/*Input container*/}
                    <div className="col-span-1 grid grid-cols-5 items-center"
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


type FormOrderingSheetProps = {
    order: number[],
    setOrder: (newOrder: number[]) => void,
};
function FormOrderingSheet({ order, setOrder }: FormOrderingSheetProps) {
    return (
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
                     className={`col-span-1 ${order[i] == -1 ? "bg-white" : "bg-blue-500"} rounded-md border-2 border-gray-400 border-solid p-4 cursor-pointer flex items-center justify-center`}
                     onClick={event => {
                         event.preventDefault()
                         setOrder(reorder(order, i))
                     }}
                >
                    <p className={order[i] == -1 ? "" : "text-white"}>{["...", "first", "second", "third"][order[i] + 1]}</p>
                </div>
            ))}
        </div>
    )
}