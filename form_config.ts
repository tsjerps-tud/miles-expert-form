export type OrderingConfig = {
    type: 'ordering',
    title: string,

    urls: { [id: string]: string[][] }
}

export type ScoringConfig = {
    type: 'scoring',
    title: string,

    questions: string[],
    likertCount: number,
    urls: { [id: string]: string[] }
}

export type FinishingConfig = {
    type: 'finishing',
    title: string,
}

export type TextConfig = {
    type: 'text',
    title: string,
    description: string,
}

export type SheetConfig = OrderingConfig | ScoringConfig | FinishingConfig | TextConfig;

export type Config = SheetConfig[];

// --


const scoreQuestions = [
    'Algorithm responds well to pupil',
    'Pupil responds well to algorithm',
    'Pupil got inspired by algorithm',
    'Pupil enjoyed playing with algorithm'
];

export const config: Config = [
    {
        type: 'ordering',
        title: 'Which recording was recorded first?',
        urls: {
            0: [
                ['p3s1p1', 'p3s4p1'],
                ['p4s4p2', 'p4s1p2'],
                ['p5s1p3', 'p5s4p3'],
                ['p1s4p1', 'p1s1p1'],
                ['p2s1p2', 'p2s4p2'],
                ['p3s1p3', 'p3s4p3'],
                ['p4s1p1', 'p4s4p1'],
                ['p5s4p2', 'p5s1p2'],
                ['p1s4p3', 'p1s1p3'],
                ['p2s1p1', 'p2s4p1'],
                ['p3s4p2', 'p3s1p2'],
                ['p4s4p3', 'p4s1p3'],
                ['p5s4p1', 'p5s1p1'],
                ['p1s4p2', 'p1s1p2'],
                ['p2s4p3', 'p2s1p3']
            ],
            1: [
                ['p1s4p1', 'p1s1p1'],
                ['p2s1p2', 'p2s4p2'],
                ['p3s4p3', 'p3s1p3'],
                ['p4s4p1', 'p4s1p1'],
                ['p5s4p2', 'p5s1p2'],
                ['p1s1p3', 'p1s4p3'],
                ['p2s4p1', 'p2s1p1'],
                ['p3s1p2', 'p3s4p2'],
                ['p4s1p3', 'p4s4p3'],
                ['p5s1p1', 'p5s4p1'],
                ['p1s4p2', 'p1s1p2'],
                ['p2s1p3', 'p2s4p3'],
                ['p3s1p1', 'p3s4p1'],
                ['p4s4p2', 'p4s1p2'],
                ['p5s4p3', 'p5s1p3']
            ],
            2: [
                ['p5s1p1', 'p5s4p1'],
                ['p1s4p2', 'p1s1p2'],
                ['p2s4p3', 'p2s1p3'],
                ['p3s1p1', 'p3s4p1'],
                ['p4s1p2', 'p4s4p2'],
                ['p5s4p3', 'p5s1p3'],
                ['p1s1p1', 'p1s4p1'],
                ['p2s1p2', 'p2s4p2'],
                ['p3s4p3', 'p3s1p3'],
                ['p4s4p1', 'p4s1p1'],
                ['p5s4p2', 'p5s1p2'],
                ['p1s4p3', 'p1s1p3'],
                ['p2s4p1', 'p2s1p1'],
                ['p3s4p2', 'p3s1p2'],
                ['p4s1p3', 'p4s4p3']
            ]
        }
    },

    {
        type: 'scoring',
        title: 'How would you rate the following recording?',
        questions: scoreQuestions,
        likertCount: 5,
        urls: {
            0: [
                'p5s3p1',
                'p5s1p1',
                'p5s2p1',
                'p1s2p2',
                'p1s3p2',
                'p1s1p2',
                'p2s3p3',
                'p2s1p3',
                'p2s2p3',
                'p3s1p1',
                'p3s2p1',
                'p3s3p1',
                'p4s2p2',
                'p4s3p2',
                'p4s1p2'
            ],
            1: [
                'p3s1p1',
                'p3s2p1',
                'p3s3p1',
                'p4s2p2',
                'p4s3p2',
                'p4s1p2',
                'p5s3p3',
                'p5s1p3',
                'p5s2p3',
                'p1s2p1',
                'p1s3p1',
                'p1s1p1',
                'p2s3p2',
                'p2s1p2',
                'p2s2p2'
            ],
            2: [
                'p1s2p1',
                'p1s3p1',
                'p1s1p1',
                'p2s3p2',
                'p2s1p2',
                'p2s2p2',
                'p3s1p3',
                'p3s2p3',
                'p3s3p3',
                'p4s2p1',
                'p4s3p1',
                'p4s1p1',
                'p5s3p2',
                'p5s1p2',
                'p5s2p2'
            ]
        }
    },

    {
        type: 'scoring',
        title: 'How would you rate the following recording?',
        questions: scoreQuestions,
        likertCount: 5,
        urls: {
            0: [
                'p5s3p3',
                'p5s1p3',
                'p5s2p3',
                'p1s2p1',
                'p1s3p1',
                'p1s1p1',
                'p2s3p2',
                'p2s1p2',
                'p2s2p2',
                'p3s1p3',
                'p3s2p3',
                'p3s3p3',
                'p4s2p1',
                'p4s3p1',
                'p4s1p1'
            ],
            1: [
                'p3s1p3',
                'p3s2p3',
                'p3s3p3',
                'p4s2p1',
                'p4s3p1',
                'p4s1p1',
                'p5s3p2',
                'p5s1p2',
                'p5s2p2',
                'p1s2p3',
                'p1s3p3',
                'p1s1p3',
                'p2s3p1',
                'p2s1p1',
                'p2s2p1'
            ],
            2: [
                'p1s2p3',
                'p1s3p3',
                'p1s1p3',
                'p2s3p1',
                'p2s1p1',
                'p2s2p1',
                'p3s1p2',
                'p3s2p2',
                'p3s3p2',
                'p4s2p3',
                'p4s3p3',
                'p4s1p3',
                'p5s3p1',
                'p5s1p1',
                'p5s2p1'
            ]
        }
    },

    {
        type: 'scoring',
        title: 'How would you rate the following recording?',
        questions: scoreQuestions,
        likertCount: 5,
        urls: {
            0: [
                'p5s3p2',
                'p5s1p2',
                'p5s2p2',
                'p1s2p3',
                'p1s3p3',
                'p1s1p3',
                'p2s3p1',
                'p2s1p1',
                'p2s2p1',
                'p3s1p2',
                'p3s2p2',
                'p3s3p2',
                'p4s2p3',
                'p4s3p3',
                'p4s1p3'
            ],
            1: [
                'p3s1p2',
                'p3s2p2',
                'p3s3p2',
                'p4s2p3',
                'p4s3p3',
                'p4s1p3',
                'p5s3p1',
                'p5s1p1',
                'p5s2p1',
                'p1s2p2',
                'p1s3p2',
                'p1s1p2',
                'p2s3p3',
                'p2s1p3',
                'p2s2p3'
            ],
            2: [
                'p1s2p2',
                'p1s3p2',
                'p1s1p2',
                'p2s3p3',
                'p2s1p3',
                'p2s2p3',
                'p3s1p1',
                'p3s2p1',
                'p3s3p1',
                'p4s2p2',
                'p4s3p2',
                'p4s1p2',
                'p5s3p3',
                'p5s1p3',
                'p5s2p3'
            ]
        }
    },

    {
        type: 'finishing',
        title: 'That\'s it!'
    }
];
