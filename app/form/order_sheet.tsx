import { reorder, setAt } from '../../util/array';
import React, { useState } from 'react';
import { MultiLine } from '../../util/multiline';


const description = "These recordings were part of three separate sessions. Estimate which recording was part of which session."
const orderQuestion = "Which recording was recorded first?"

const recordingCount = 2
const pageCount = 15


type OrderSheetProps = {
    urls: string[][],

    orders: { [page: number]: number},
    setOrderAction: (page: number, newOrder: number) => void,

    advance: () => void,
}
export function OrderSheet({ urls, orders, setOrderAction, advance }: OrderSheetProps) {
    // Define navigation
    const [page, setPage] = useState<number>(0)
    const gotoNextPage = () => setPage(Math.min(page + 1, pageCount))

    // Get all shown data
    const shownUrls = urls[page]
    const shownOrder = orders[page]
    const setShownOrder = (newOrder: number) =>
        setOrderAction(page, newOrder)
    const filledIn = shownOrder != -1

    return (
        <section className="bg-gray-100 p-10 mt-10">
            {/*Title*/}
            <h2 className="mb-2">2. Ordering of recordings</h2>
            <MultiLine className="mb-5">{description}</MultiLine>

            <div className="bg-green-200 p-10">
                <div className="p-4">
                    <p>{orderQuestion}</p>
                </div>

                <div className="p-5 grid grid-cols-2 bg-green-300 gap-4 items-center">
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
                                         value={shownOrder}
                                         onClick={() => setShownOrder(i)} />
                        </div>
                    ))}
                </div>
            </div>

            {/*Pagination*/}
            <div className="flex gap-4 justify-center">
                <div className="p-3 bg-green-300">
                    {'Page ' + (page + 1) + '/' + pageCount}
                </div>

                {filledIn && <div className="p-3 bg-green-300 no-underline cursor-pointer" onClick={event => {
                    event.preventDefault();

                    if (page == pageCount - 1) advance(); else gotoNextPage();
                }}>{page == pageCount - 1 ? 'Go to 3. Finishing >' : '>'}
                </div>}
            </div>
        </section>
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