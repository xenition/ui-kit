import * as React from 'react';
export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Small kicker line above the title. */
    eyebrow?: React.ReactNode;
    /** Section title. */
    title: React.ReactNode;
    /** Supporting paragraph under the title. */
    lede?: React.ReactNode;
    align?: 'left' | 'center';
    /** Heading level for the title element. */
    as?: 'h1' | 'h2' | 'h3';
}
/** Eyebrow + title + lede — the standard section opener. */
export declare const SectionHeading: React.ForwardRefExoticComponent<SectionHeadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionHeading.d.ts.map