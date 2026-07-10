import * as React from 'react';
export type StackDirection = 'row' | 'column';
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: StackDirection;
    gap?: StackGap;
    /** Cross-axis alignment. */
    align?: 'start' | 'center' | 'end' | 'stretch';
    /** Main-axis distribution. */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}
/** Flex layout helper with token-bound gaps. */
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Stack.d.ts.map