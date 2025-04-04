import { MultiLine } from '../../util/multiline';
import React from 'react';


const description = "That was it!\nCopy the following results and send them to me!"


type FinishingSheetProps = {
    scores: { [url: string]: number[] },

    orders: { [page: number]: number },
}
export function FinishingSheet({ scores, orders }: FinishingSheetProps) {
    const output = "TODO: output generation"

    return (
        <section className="bg-gray-100 p-10 mt-10">
            {/*Title*/}
            <h2 className="mb-2">3. Finishing up</h2>
            <MultiLine className="mb-5">{description}</MultiLine>

            <input value={output} readOnly className="bg-white w-full h-fit rounded-md border-2 border-gray-400 border-solid p-1 px-5 break-words"/>
        </section>
    )
}