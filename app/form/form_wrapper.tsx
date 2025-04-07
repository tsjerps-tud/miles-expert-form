'use client'

import { useState } from 'react';
import ScoreSheet from './score_sheet';
import { useSearchParams } from 'next/navigation';
import { OrderSheet } from './order_sheet';
import { FinishingSheet } from './finishing_sheet';

import { OrderingConfig, ScoringConfig, config } from '../../form_config';
import { setAt } from '../../util/array';

const questionCount = 4;

type PageWrapperProps = {

}
export default function PageWrapper({  }: PageWrapperProps) {
    // Get expert ID from search paramas
    const searchParams = useSearchParams()
    const expertId = Number(searchParams.get('expertId'))
    const startState = Number(searchParams.get('state'))

    // Define values
    const [values, setValues] = useState(config.map(sheet => {
        switch (sheet.type) {
            case "scoring":
                return (sheet as ScoringConfig).urls[expertId].map(_ => (
                    Array.from({ length: questionCount }, _ => -1)
                ))
            case "ordering":
                return (sheet as OrderingConfig).urls[expertId].map(_ => -1)
            case "finishing":
                return [];
        }
    }))

    // Define sheet number
    const [sheetNumber, setSheetNumber] = useState<number>(startState)
    const advance = () => setSheetNumber(sheetNumber + 1)

    const currentSheet = config[sheetNumber]

    return <>
        {currentSheet.type == "scoring" && <ScoreSheet
            key={sheetNumber}
            urls={(currentSheet as ScoringConfig).urls[expertId]}
            values={values[sheetNumber] as number[][]}
            setValuesAction={(newValues: number[][]) => setValues(setAt(values, sheetNumber, newValues))}
            advanceAction={advance}/>}

        {currentSheet.type == "ordering" &&
            <OrderSheet
                key={sheetNumber}
                urls={(currentSheet as OrderingConfig).urls[expertId]}
                values={values[sheetNumber] as number[]}
                setValuesAction={(newValues: number[]) => setValues(setAt(values, sheetNumber, newValues))}
                advance={advance}/>}

        {currentSheet.type == "finishing" &&
            <FinishingSheet
                key={sheetNumber}
                config={config}
                values={values}/>}
    </>
}