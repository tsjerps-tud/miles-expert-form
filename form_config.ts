export type OrderingConfig = {
    type: 'ordering',
    text: string,

    urls: { [id: string]: string[][] }
}

export type ScoringConfig = {
    type: 'scoring',
    text: string,

    questions: string[],
    likertCount: number,
    urls: { [id: string]: string[] }
}

export type FinishingConfig = {
    type: 'finishing',
    text: string,
}

export type InfoConfig = {
    type: 'info',
    text: string,
}

export type SheetConfig = OrderingConfig | ScoringConfig | FinishingConfig | InfoConfig;

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
        type: 'info',
        text: '#First up: ordering\n' +
            'In this exercise, you will be shown two videos.\n' +
            'These two videos have the same player, algorithm and song. The only difference is that of them was recorded at the start of the research, and one of them was recorded at the end.\n' +
            'Your job is to select the recording which was recorded first. Good luck!',
    },

    {
        type: 'ordering',
        text: '_Which recording was recorded first?_',
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
        type: 'info',
        text: '#Next: scoring\n' +
            'In the rest of this form, you will be shown recordings and will be asked to rate them along 4 categories. Good luck!',
    },

    {
        type: 'scoring',
        text: '_How would you rate the following recording?_',
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
        type: 'info',
        text: '#You\'re halfway there!\n' +
            'Now\'s a good time to take a break if you want to.',
    },

    {
        type: 'scoring',
        text: '_How would you rate the following recording?_',
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
        type: 'info',
        text: '#One more sheet to go!\n' +
            'Fifteen more recordings to go, you can do this!',
    },

    {
        type: 'scoring',
        text: '_How would you rate the following recording?_',
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
        text: '#That\'s it!\n' +
            'That was it!\nThank you so much for filling in the form. The only thing left is to copy the following results and send them to me!',
    },
];
