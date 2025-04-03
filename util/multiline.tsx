import React from 'react';

type MultiLineProps = {
    children: React.ReactNode;
    className?: string;
}
export function MultiLine({ children, className = "" }: MultiLineProps) {
    return (
        <div className={className} style={{ whiteSpace: "pre-line" }}>
            {children}
        </div>
    );
}
