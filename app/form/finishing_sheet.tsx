import { MultiLine } from '../../util/multiline';
import React from 'react';
import { Config } from '../../form_config';


const description = 'That was it!\nCopy the following results and send them to me!';


type FinishingSheetProps = {
    config?: Config,

    values: (number[] | number[][])[],
}

export function FinishingSheet({ config, values }: FinishingSheetProps) {
    const output = JSON.stringify(values)

    return (
        <section className="bg-gray-100 p-10 mt-10">
            {/*Title*/}
            <h2 className="mb-2">3. Finishing up</h2>
            <MultiLine className="mb-5">{description}</MultiLine>

            <input value={output} readOnly
                   className="bg-white w-full h-fit rounded-md border-2 border-gray-400 border-solid p-1 px-5 break-words" />
        </section>
    );
}