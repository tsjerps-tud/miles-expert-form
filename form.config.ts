export type OrderingConfig = {
    type: 'ordering',
    id ?: string,
    text: string,

    urls: { [id: string]: string[][] }
}

export type ScoringConfig = {
    type: 'scoring',
    id ?: string,
    text: string,

    questions: string[],
    likertCount: number,
    urls: { [id: string]: string[] }
}

export type FinishingConfig = {
    type: 'finishing',
    id ?: string,
    text: string,
}

export type InfoConfig = {
    type: 'info',
    id ?: string,
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
        text: '#How does this form work?\n' +
            'In this form, you will be shown recordings and will be asked to rate them along 4 categories:\n' +
            '![](images/score_sheet.png)' +
            'These four categories are the same as the ones you\'ve been grading your own performances with.\n' +
            'Good luck!',
    },

    {
        type: 'scoring',
        id: 'scoring_1',
        text: '_How would you rate the following recording?_',
        questions: scoreQuestions,
        likertCount: 5,
        urls: {
            0: [
                "ex2_par2_per3",
                "ex2_par1_per2",
                "ex2_par1_per0",
                "ex2_par2_per0",
            ],
            1: [
                "ex2_par2_per3",
                "ex2_par0_per2",
                "ex2_par0_per0",
                "ex2_par2_per0",
            ],
            2: [
                "ex2_par1_per3",
                "ex2_par0_per2",
                "ex2_par0_per0",
                "ex2_par1_per0",
            ]
        }
    },

    {
        type: 'info',
        text: '#You\'re halfway there!\n' +
            'Now\'s a good time to take a break if you want to.\n' +
            'A quick palette cleanser, if you need it:\n' +
            '<iframe width="100%" style="aspect-ratio: 16 / 9; margin-top: 2.5rem; border-radius: 20px;" src="https://www.youtube.com/embed/1_6RQKoCTVY" allowfullscreen></iframe>',
    },

    {
        type: 'scoring',
        id: 'scoring_2',
        text: '_How would you rate the following recording?_',
        questions: scoreQuestions,
        likertCount: 5,
        urls: {
            0: [
                "ex2_par1_per1",
                "ex2_par2_per1",
                "ex2_par2_per2",
                "ex2_par1_per3",
            ],
            1: [
                "ex2_par0_per1",
                "ex2_par2_per1",
                "ex2_par2_per2",
                "ex2_par0_per3",
            ],
            2: [
                "ex2_par0_per1",
                "ex2_par1_per1",
                "ex2_par1_per2",
                "ex2_par0_per3",
            ]
        }
    },

    {
        type: 'finishing',
        text: '#That\'s it!\n' +
            'That was it!\nThank you so much for filling in the form. The only thing left is to copy the following results and send them to me!',
    },
];
