'use client'

import React, { useState } from 'react';
import { MultiLine } from '../../util/multiline';
import { setAt } from '../../util/array';


const likertCount = 5;

const description = "Listen to the three recordings one after another, and rank the statements for each."
const questions = [
    "The algorithm could respond well to the pupil.",
    "The pupil could respond well to the algorithm.",
    "The pupil got inspiration from the algorithm.",
    "The pupil enjoyed playing this song with the algorithm.",
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
        <section className="bg-gray-100 p-10 mt-10">
            {/*Title*/}
            <h2 className="mb-2">1. Statements per recording</h2>
            <MultiLine className="mb-5">{description}</MultiLine>

            {/*Recording sheet*/}
            <div className="grid grid-cols-2 gap-4 bg-blue-200 p-10">
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
                                       checked={shownValue[questionIndex] == likertIndex}
                                       onChange={_ => {
                                           setShownValue(setAt(shownValue, questionIndex, likertIndex))
                                       }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/*Pagination*/}
            <div className="flex gap-4 justify-center">
                <div className="p-3 bg-blue-300">
                    {'Page ' + (page + 1) + '/' + pageCount}
                </div>

                {filledIn && <div className="p-3 bg-blue-300 no-underline cursor-pointer" onClick={event => {
                    event.preventDefault();

                    if (page == pageCount - 1) advanceAction(); else gotoNextPage();
                }}>{page == pageCount - 1 ? 'Next section >' : '>'}
                </div>}
            </div>
        </section>
    )
}
