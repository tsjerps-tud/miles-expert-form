'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ScoreSheet from './score_sheet';
import { OrderSheet } from './order_sheet';
import { FinishingSheet } from './finishing_sheet';
import { config, OrderingConfig, ScoringConfig } from '../../form_config';
import { setAt } from '../../util/array';


type PageWrapperProps = {}
export default function PageWrapper({}: PageWrapperProps) {
    // Get expert ID from search params
    const searchParams = useSearchParams();
    const expertId = Number(searchParams.get('expertId'));
    const startState = Number(searchParams.get('state'));

    // Define values
    const [values, setValues] = useState(config.map(sheet => {
        switch (sheet.type) {
            case 'scoring':
                return (sheet as ScoringConfig).urls[expertId].map(_ => (
                    Array.from({ length: sheet.questions.length }, _ => -1)
                ));
            case 'ordering':
                return (sheet as OrderingConfig).urls[expertId].map(_ => -1);
            case 'finishing':
                return [];
        }
    }));

    // Define sheet number
    const [sheetNumber, setSheetNumber] = useState<number>(startState);
    const advance = () => setSheetNumber(sheetNumber + 1);

    const currentSheet = config[sheetNumber];

    return <>
        {currentSheet.type == 'scoring' && <ScoreSheet
            key={sheetNumber}
            sheet={currentSheet}
            participantId={expertId}
            values={values[sheetNumber] as number[][]}
            setValuesAction={(newValues: number[][]) => setValues(setAt(values, sheetNumber, newValues))}
            advanceAction={advance} />}

        {currentSheet.type == 'ordering' &&
            <OrderSheet
                key={sheetNumber}
                sheet={currentSheet}
                participantId={expertId}
                values={values[sheetNumber] as number[]}
                setValuesAction={(newValues: number[]) => setValues(setAt(values, sheetNumber, newValues))}
                advanceAction={advance} />}

        {currentSheet.type == 'finishing' &&
            <FinishingSheet
                key={sheetNumber}
                config={config}
                values={values} />}
    </>;
}