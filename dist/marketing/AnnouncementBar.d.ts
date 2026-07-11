import * as React from 'react';
export type AnnouncementTone = 'primary' | 'accent' | 'neutral';
export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Banner message. */
    message: React.ReactNode;
    /** Optional trailing call-to-action (a link or button). */
    action?: React.ReactNode;
    /** Color treatment. */
    tone?: AnnouncementTone;
    /** Hide the dismiss control. */
    dismissible?: boolean;
    /** Accessible label for the close button. */
    closeLabel?: string;
    /** Called after the bar is dismissed. */
    onDismiss?: () => void;
}
/** Dismissible top banner with a message, optional action, and tone variants (session state only). */
export declare const AnnouncementBar: React.ForwardRefExoticComponent<AnnouncementBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AnnouncementBar.d.ts.map