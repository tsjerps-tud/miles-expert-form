'use client';

import PageWrapper from './form_wrapper';
import { Suspense } from 'react';

export default function Page() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
                <PageWrapper />
            </Suspense>
        </div>
    );
}