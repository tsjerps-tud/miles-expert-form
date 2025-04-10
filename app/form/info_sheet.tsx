import React from 'react';
import { MultiLine } from '../../util/multiline';
import { InfoConfig } from '../../form_config';
import { PageButton } from '../../util/page_button';


type InfoSheetProps = {
    sheet: InfoConfig,

    advanceAction: () => void,
}
export default function InfoSheet({ sheet, advanceAction }: InfoSheetProps) {
    return (
        <>
            {/*Info sheet*/}
            <div className="bg-amber-100 rounded-3xl shadow-xl p-10">
                {/*Title*/}
                <h1 className="mb-3">{sheet.title}</h1>
                <MultiLine>{sheet.description}</MultiLine>

                {/*Spacer*/}
                <div className="h-5" />
            </div>

            {/*Page button*/}
            <PageButton
                enableAdvance={true}
                color="amber-200"
                page={undefined}
                pageCount={undefined}
                gotoNextPageAction={undefined}
                advanceAction={advanceAction} />
        </>
    )
}
