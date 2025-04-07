import { setAt } from '../../util/array';
import React, { useState } from 'react';
import { PageButton } from '../../util/page_button';
import { OrderingConfig } from '../../form_config';


type OrderSheetProps = {
    sheet: OrderingConfig,
    participantId: number,

    values: number[],
    setValuesAction: (newValues: number[]) => void,

    advanceAction: () => void,
}

export function OrderSheet({ sheet, participantId, values, setValuesAction, advanceAction }: OrderSheetProps) {
    // Define constants
    const urls = sheet.urls[participantId];
    const pageCount = urls.length;
    const recordingCount = 2;

    // Define navigation
    const [page, setPage] = useState<number>(0);
    const gotoNextPage = () => setPage(Math.min(page + 1, pageCount));

    // Get all shown data
    const shownUrls = urls[page];
    const shownValue = values[page];
    const setShownValue = (newValue: number) =>
        setValuesAction(setAt(values, page, newValue));
    const filledIn = shownValue != -1;

    return (
        <>
            <div className="bg-green-200 p-10 rounded-3xl shadow-xl">
                <div className="text-center italic">{sheet.title}</div>

                <div className="p-5 my-7 grid grid-cols-2 bg-green-300 rounded-xl gap-4 items-center">
                    {Array.from({ length: recordingCount }, (_, i) => (
                        <video key={shownUrls[i]} controls className="size-full aspect-video">
                            <source src={'recordings/' + shownUrls[i] + '.mp4'} type="video/mp4" />
                        </video>
                    ))}
                </div>

                <div className="p-5 grid grid-cols-2 gap-4 items-center">
                    {Array.from({ length: recordingCount }, (_, i) => (
                        <div key={i}>
                            {/*TODO: shuffling of order*/}
                            <OrderButton buttonValue={i}
                                         value={shownValue}
                                         onClick={() => setShownValue(i)} />
                        </div>
                    ))}
                </div>
            </div>

            {/*Page button*/}
            <PageButton
                enableAdvance={filledIn}
                color="green-300"
                page={page}
                pageCount={pageCount}
                gotoNextPageAction={gotoNextPage}
                advanceAction={advanceAction} />
        </>
    );
}


type OrderButtonProps = {
    buttonValue: number,
    value: number
    onClick: () => void,
}

export function OrderButton({ buttonValue, value, onClick }: OrderButtonProps) {
    const picked = buttonValue == value;

    const bg = picked ? 'bg-blue-500' : 'bg-white';
    const text = value == -1 ? '...' : picked ? 'this one' : '';
    const textClassName = picked ? 'text-white' : 'text-black';

    return (
        <div
            className={`col-span-1 ${bg} h-[3rem] rounded-md border-2 border-gray-400 border-solid p-4 cursor-pointer flex items-center justify-center`}
            onClick={event => {
                event.preventDefault();
                onClick();
            }}
        >
            <p className={textClassName}>{text}</p>
        </div>
    );
}