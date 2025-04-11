'use client';

import React from 'react';
import { RichText } from '../util/rich_text';
import Link from 'next/link';


export default function Page() {
    const [participantId, setParticipantId] = React.useState<number>(0);

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section className="bg-amber-100 p-10 rounded-3xl shadow-xl">
                {/*Text*/}
                <RichText className="mb-5">
                    {'#Evaluation Form Experts\n' +
                        'TODO: description\n' +
                        '(also a small description per section)\n' +
                        '(also: if you\'ve started already, your progress will be saved)'}
                </RichText>

                <div className="grid grid-cols-2 gap-4">
                    <RichText>{'What is your \'participant ID\'?\n(the questions will be shuffled based on this ID)'}</RichText>

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
                    href={{ pathname: '/form', query: { id: participantId } }}>
                    <p className="text-white mx-5">Start form</p>
                </Link>
            </section>
        </div>
    );
}