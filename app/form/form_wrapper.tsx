'use client'

import { useState } from 'react';
import ScoreSheet from './score_sheet';
import { useSearchParams } from 'next/navigation';
import { OrderSheet } from './order_sheet';
import { FinishingSheet } from './finishing_sheet';


// Constants
const pupilCount = 5;
const sessionCount = 3;
const performanceCount = 3;


// SCORING CONFIG
const allUrls = Array.from({ length: pupilCount }, (_, pupil) => (
    Array.from({ length: sessionCount }, (_, session) => (
        Array.from({ length: performanceCount }, (_, performance) => (
            `p${pupil + 1}s${session + 1}p${performance + 1}`
        ))
    )).flat()
)).flat()

const performanceConfig = [
    ["s1p1", "s2p1", "s3p1"],
    ["s1p2", "s2p2", "s3p2"],
    ["s1p3", "s2p3", "s3p3"]
]
const scoreConfig = [
    [[5,1],[1,2],[2,3],[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3]],
    [[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3]],
    [[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3],[3,1],[4,2],[5,3]]
]

const questionCount = 4;


// ORDERING CONFIG
const orderConfig = [
    [[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3]],
    [[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3],[5,1],[1,2],[2,3],[3,1],[4,2],[5,3]],
    [[5,1],[1,2],[2,3],[3,1],[4,2],[5,3],[1,1],[2,2],[3,3],[4,1],[5,2],[1,3],[2,1],[3,2],[4,3]],
]


// Form state enum
enum FormState {
    Scoring,
    Ordering,
    Finishing,
}


type PageWrapperProps = {

}
export default function PageWrapper({  }: PageWrapperProps) {
    // Get expert ID from search paramas
    const searchParams = useSearchParams()
    const expertId = Number(searchParams.get('expertId'))

    const startState = Number(searchParams.get('state'))
    console.log(startState)

    // Define state
    const [formState, setFormState] = useState<FormState>(startState)

    const advance = () => setFormState(formState + 1)

    // Get all scores
    const [scores, setScores] = useState<{ [url: string]: number[] }>(
        Object.fromEntries(allUrls.map(url =>
            [url, Array.from({ length: questionCount }, _ => -1)]
        ))
    );
    const sheetSetScores = (url: string, newScores: number[]) => {
        setScores({ ...scores, [url]: newScores });
    }

    // Get URLs from config
    const scoreUrls = scoreConfig[expertId].map(([pupil, song]) => {
        const performances = performanceConfig[song - 1];

        const wrap = (index, offset) => (index + offset) % 3;

        const shuffledPerformances = [performances[wrap(0, pupil)], performances[wrap(1, pupil)], performances[wrap(2, pupil)]]

        return shuffledPerformances.map(performance => "p" + pupil.toString() + performance)
    }).flat()


    // Get all orders
    const [orders, setOrder] = useState<{ [page: number]: number }>(
        orderConfig.map(_ => -1)
    );
    const sheetSetOrder = (page: number, newOrder: number) => {
        setOrder({ ...orders, [page]: newOrder })
    }

    // Get URLs from config
    const orderUrls = orderConfig[expertId].map(([pupil, song]) => {
        return [`p${pupil}s1p${song}`, `p${pupil}s4p${song}`]
    });

    return (
        <>
            {formState == FormState.Scoring &&
                <ScoreSheet urls={scoreUrls}
                            scores={scores}
                            setScoresAction={sheetSetScores}
                            advance={advance}/>}

            {formState == FormState.Ordering &&
                <OrderSheet urls={orderUrls}
                            orders={orders}
                            setOrderAction={sheetSetOrder}
                            advance={advance}/>}

            {formState == FormState.Finishing &&
                <FinishingSheet scores={scores} orders={orders}/>
            }
        </>
    )
}