import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ProcessStep {
    /** Step headline. */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    description?: React.ReactNode;
    /** Optional content rendered inside the numbered marker instead of the number. */
    icon?: React.ReactNode;
}
export interface ProcessStepsProps {
    /** Ordered "how it works" steps (mirrors the web `steps` array). */
    steps: ProcessStep[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Numbered "how it works" flow — the native mirror of the web `ProcessSteps`.
 * The web version is horizontal on desktop / vertical on mobile with connector
 * lines; native renders a **token-styled numbered vertical list** with a
 * connector segment between markers (phones are always narrow, so the
 * horizontal desktop layout is dropped). Token-only.
 */
export declare function ProcessSteps({ steps, style }: ProcessStepsProps): React.ReactElement;
//# sourceMappingURL=ProcessSteps.d.ts.map