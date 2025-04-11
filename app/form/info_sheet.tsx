import React from 'react';
import { RichText } from '../../util/rich_text';
import { InfoConfig } from '../../form.config';
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
                {/*Text*/}
                <RichText>{sheet.text}</RichText>
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
