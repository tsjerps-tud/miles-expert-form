import { reorder, setAt } from '../../util/array';
import React, { useState } from 'react';
import { MultiLine } from '../../util/multiline';
import { PageButton } from '../../util/page_button';


const description = "These recordings were part of three separate sessions. Estimate which recording was part of which session."
const orderQuestion = "Which recording was recorded first?"

const recordingCount = 2


type OrderSheetProps = {
    urls: string[][],

    values: number[],
    setValuesAction: (newValues: number[]) => void,

    advanceAction: () => void,
}
export function OrderSheet({ urls, values, setValuesAction, advanceAction }: OrderSheetProps) {
    // Define constants
    const pageCount = urls.length;

    // Define navigation
    const [page, setPage] = useState<number>(0)
    const gotoNextPage = () => setPage(Math.min(page + 1, pageCount))

    // Get all shown data
    const shownUrls = urls[page]
    const shownValue = values[page]
    const setShownValue = (newValue: number) =>
        setValuesAction(setAt(values, page, newValue))
    const filledIn = shownValue != -1

    return (
        <>
            <div className="bg-green-200 p-10 rounded-3xl">
                <div className="p-4">
                    <p>{orderQuestion}</p>
                </div>

                <div className="p-5 grid grid-cols-2 bg-green-300 rounded-xl gap-4 items-center">
                    {Array.from({ length: recordingCount }, (_, i) => (
                        <video key={shownUrls[i]} controls>
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
                advanceAction={advanceAction}/>
        </>
    )
}


type OrderButtonProps = {
    buttonValue: number,
    value: number
    onClick: () => void,
}

export function OrderButton({ buttonValue, value, onClick }: OrderButtonProps) {
    const picked = buttonValue == value

    const bg = picked ? "bg-blue-500" : "bg-white"
    const text = value == -1 ? "..." : picked ? "this one" : ""
    const textClassName = picked ? "text-white" : "text-black"

    return (
        <div className={`col-span-1 ${bg} h-[3rem] rounded-md border-2 border-gray-400 border-solid p-4 cursor-pointer flex items-center justify-center`}
             onClick={event => {
                 event.preventDefault()
                 onClick()
                 // setShownOrder(i == 0 ? 1 : 4)
             }}
        >
            <p className={textClassName}>{text}</p>
        </div>
    )
}