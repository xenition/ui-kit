import * as React from 'react';
export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 'me' aligns right with the primary fill; 'them' aligns left with a surface fill. */
    side?: 'me' | 'them';
    /** Optional author / timestamp shown above the bubble. */
    meta?: React.ReactNode;
}
/** A single themed chat message bubble — for chat, support threads, comments. */
export declare const ChatBubble: React.ForwardRefExoticComponent<ChatBubbleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChatBubble.d.ts.map