import { RichText } from '../../util/rich_text';
import React from 'react';
import { FinishingConfig } from '../../form_config';


type FinishingSheetProps = {
    sheet: FinishingConfig,

    values: (number[] | number[][])[],
}

export function FinishingSheet({ sheet, values }: FinishingSheetProps) {
    const output = JSON.stringify(values);

    return (
        <>
            {/*Info sheet*/}
            <div className="bg-amber-100 rounded-3xl shadow-xl p-10">
                {/*Text*/}
                <RichText>{sheet.text}</RichText>

                <textarea value={output} rows={5}
                       className="bg-white w-full rounded-md border-2 border-gray-400 border-solid p-1 px-5 break-words" />
            </div>
        </>
    );
}