'use client';

import React from 'react';
import { RichText } from '../util/rich_text';
import Link from 'next/link';


const text = '#Evaluation Form Experts\n' +
    'Welcome to the evaluation form for "MILES" (Mixed-Initiative musicaL-interactivE System)!\n' +
    'A while ago, you helped select 3 algorithms for use in an experiment. ' +
    'That experiment has finished, and now we have a bunch of musical recordings that use these algorithms. ' +
    'In this survey, you will listen to these recordings, and compare and grade them.\n' +
    '---\n' +
    'The survey is expected to take about 60 minutes. ' +
    'Your progress will be stored, so if you\'ve started filing in this form earlier, you will be taken to where you left off. ' +
    'Thanks again, and good luck!\n' +
    '---'


export default function Page() {
    const [participantId, setParticipantId] = React.useState<number>(0);

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section className="bg-amber-100 p-10 rounded-3xl shadow-xl">
                {/*Text*/}
                <RichText>{text}</RichText>

                <div className="grid grid-cols-2 gap-4">
                    <RichText>{'If all went well, I\'ve given you a \'participant ID\'.\nFill it in, and continue to the form!'}</RichText>

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
                    className="ml-auto w-fit bg-blue-500 rounded-md p-4 cursor-pointer flex items-center justify-center no-underline"
                    href={{ pathname: '/form', query: { id: participantId } }}>
                    <p className="text-white mx-5">Start form</p>
                </Link>
            </section>
        </div>
    );
}