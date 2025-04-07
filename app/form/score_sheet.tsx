'use client'

import React, { useState } from 'react';
import { MultiLine } from '../../util/multiline';
import { setAt } from '../../util/array';
import { PageButton } from '../../util/page_button';


const likertCount = 5;

const description = "Listen to the three recordings one after another, and rank the statements for each."
const questions = [
    "Algorithm responds well to pupil",
    "Pupil responds well to algorithm",
    "Pupil got inspired by algorithm",
    "Pupil enjoyed playing with algorithm",
]


type ScoreSheetProps = {
    urls: string[],

    values: number[][],
    setValuesAction: (newValues: number[][]) => void,

    advanceAction: () => void,
}
export default function ScoreSheet({ urls, values, setValuesAction, advanceAction }: ScoreSheetProps) {
    // Define constants
    const pageCount = urls.length;

    // Define navigation
    const [page, setPage] = useState(0)
    const gotoNextPage = () => setPage(Math.min(page + 1, pageCount))

    // Get all shown data
    const shownUrl = urls[page]
    const shownValue = values[page]
    const setShownValue = (newScores: number[]) =>
        setValuesAction(setAt(values, page, newScores))
    const filledIn = shownValue.every(it => it != -1)

    return (
        <>
            {/*Scoring sheet*/}
            <div className="grid grid-cols-2 gap-4 bg-blue-200 rounded-3xl p-10">
                {/*Video*/}
                <div className="col-span-full flex justify-center">
                    <div className="w-[60%]">
                        <video key={shownUrl} controls>
                            <source src={'recordings/' + shownUrl + '.mp4'} type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/*Spacer*/}
                <div className="col-span-1 p-4"></div>

                {/*Title row*/}
                <div className="col-span-1 p-2 grid bg-blue-300 rounded-xl"
                     style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                    <p className="text-center">Very poorly</p>

                    {Array.from({ length: likertCount - 2 }, (_, i) => (
                        <p className="text-center" key={i}>.</p>
                    ))}

                    <p className="text-center">Very much</p>
                </div>

                {/*Questions*/}
                {questions.map((question, questionIndex) => (
                    <div className={`col-span-full grid grid-cols-2 bg-blue-100 rounded-xl p-3 items-center`} key={questionIndex}>
                        {/*Question container*/}
                        <div className="col-span-1 ml-4">{question}</div>

                        {/*Input container*/}
                        <div className="col-span-1 grid grid-cols-5 items-center"
                             style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                            {Array.from({ length: likertCount }, (_, likertIndex) => (
                                <input className="h-[2rem] cursor-pointer" key={likertIndex} type="checkbox"
                                       checked={shownValue[questionIndex] == likertIndex}
                                       onChange={_ => {
                                           setShownValue(setAt(shownValue, questionIndex, likertIndex))
                                       }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/*Page button*/}
            <PageButton
                enableAdvance={filledIn}
                color="blue-300"
                page={page}
                pageCount={pageCount}
                gotoNextPageAction={gotoNextPage}
                advanceAction={advanceAction}/>
        </>
    )
}
