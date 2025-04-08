'use client';

import React from 'react';
import { MultiLine } from '../util/multiline';
import Link from 'next/link';

export default function Page() {
    const [participantId, setParticipantId] = React.useState<number>(0);

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section className="bg-amber-100 p-10 rounded-3xl shadow-xl">
                {/*Title*/}
                <h1 className="mb-3">Evaluation Form Experts</h1>
                <MultiLine>{'TODO: description\n(also a small description per section)'}</MultiLine>

                {/*Spacer*/}
                <div className="h-5" />

                <div className="grid grid-cols-2 gap-4">
                    <MultiLine>{'What is your \'participant ID\'?\n(the questions will be shuffled based on this ID)'}</MultiLine>

                    {/*Input field*/}
                    <input value={participantId.toString()}
                           className="bg-white rounded-md border-2 border-gray-400 border-solid p-1 px-5"
                           onChange={event => {
                               const newParticipantId = Number(event.target.value);

                               if (!isNaN(newParticipantId))
                                   setParticipantId(newParticipantId);
                           }} />
                </div>

                {/*Spacer*/}
                <div className="h-5" />

                <Link
                    className="w-fit bg-blue-500 rounded-md p-4 cursor-pointer flex items-center justify-center no-underline"
                    href={{ pathname: '/form', query: { id: participantId, state: 0 } }}>
                    <p className="text-white mx-5">Go to form</p>
                </Link>
            </section>
        </div>
    );
}