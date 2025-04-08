import React from 'react';


type PageButtonProps = {
    enableAdvance: boolean,
    color: string,

    page: number | undefined,
    pageCount: number | undefined,

    gotoNextPageAction: () => void | undefined,
    advanceAction: () => void,
}
export function PageButton({ enableAdvance, color, page, pageCount, gotoNextPageAction, advanceAction }: PageButtonProps) {
    return (
        <div
            className={`absolute right-0 bottom-0 m-10 p-10 bg-${color} rounded-full shadow-xl ${enableAdvance ? "cursor-pointer" : ""}`}
            onClick={event => {
                if (!enableAdvance) return;

                event.preventDefault();

                if (page == pageCount - 1) advanceAction(); else gotoNextPageAction();
            }}
        >
            <div className="flex gap-4 justify-center">
                {page == undefined || <h2 className="p-3">
                    {'Page ' + (page + 1) + '/' + pageCount}
                </h2>}

                {enableAdvance &&
                    <h2
                        className="p-3">{page == pageCount - 1 ? '>>>' : '>'}
                    </h2>}
            </div>
        </div>
    )
}
