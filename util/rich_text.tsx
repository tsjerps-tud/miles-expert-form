import React from 'react';
import Markdown from 'markdown-to-jsx';


type RichTextProps = {
    children: string;
    className?: string;
}
export function RichText( { children, className = "" }: RichTextProps ) {
    return <Markdown className={className} style={{ whiteSpace: "pre-line" }}>{children}</Markdown>
}
