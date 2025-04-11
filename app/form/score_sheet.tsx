import React, { useState } from 'react';
import { setAt } from '../../util/array';
import { PageButton } from '../../util/page_button';
import { ScoringConfig } from '../../form_config';
import { RichText } from '../../util/rich_text';


type ScoreSheetProps = {
    sheet: ScoringConfig,
    participantId: number,

    values: number[][],
    setValuesAction: (newValues: number[][]) => void,

    advanceAction: () => void,
}
export default function ScoreSheet({ sheet, participantId, values, setValuesAction, advanceAction }: ScoreSheetProps) {
    // Define constants
    const likertCount = sheet.likertCount;
    const urls = sheet.urls[participantId];
    const pageCount = urls.length;

    // Define navigation
    const [page, setPage] = useState(0);
    const gotoNextPage = () => setPage(Math.min(page + 1, pageCount));

    // Get all shown data
    const shownUrl = urls[page];
    const shownValue = values[page];
    const setShownValue = (newScores: number[]) =>
        setValuesAction(setAt(values, page, newScores));
    const filledIn = shownValue.every(it => it != -1);

    return (
        <>
            {/*Scoring sheet*/}
            <div className="grid grid-cols-2 gap-2 bg-blue-200 rounded-3xl shadow-xl p-10 text-center">
                {/*Text*/}
                <RichText className="col-span-full">{sheet.text}</RichText>

                {/*Video*/}
                <div className="col-span-full my-3 flex justify-center">
                    <div className="w-[70%] p-5 bg-blue-300 rounded-2xl">
                        <video key={shownUrl} controls className="size-full aspect-video">
                            <source src={'recordings/' + shownUrl + '.mp4'} type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/*Spacer*/}
                <div className="col-span-1 p-4"></div>

                {/*Title row*/}
                <div className="col-span-1 grid mr-3"
                     style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                    <p className="text-center">Very poorly</p>

                    {Array.from({ length: likertCount - 2 }, (_, i) => (
                        <p className="text-center" key={i}>.</p>
                    ))}

                    <p className="text-center">Very much</p>
                </div>

                {/*Questions*/}
                {sheet.questions.map((question, questionIndex) => (
                    <div className={`col-span-full grid grid-cols-2 gap-x-4 bg-blue-100 rounded-xl p-3 items-center`}
                         key={questionIndex}>
                        {/*Question container*/}
                        <div className="col-span-1 ml-4">{question}</div>

                        {/*Input container*/}
                        <div className="col-span-1 grid grid-cols-5 items-center"
                             style={{ gridTemplateColumns: `repeat(${likertCount}, minmax(0, 1fr))` }}>
                            {Array.from({ length: likertCount }, (_, likertIndex) => (
                                <input className="h-[2rem] cursor-pointer" key={likertIndex} type="checkbox"
                                       checked={shownValue[questionIndex] == likertIndex}
                                       onChange={_ => {
                                           setShownValue(setAt(shownValue, questionIndex, likertIndex));
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
                advanceAction={advanceAction} />
        </>
    );
}
