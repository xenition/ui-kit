import * as React from 'react';
import type { ApplicationRowProps } from './ApplicationRow';
/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV2Props = ApplicationRowProps;
/**
 * ApplicationRow — design V2. An elevated card that gives the application room:
 * a header of company avatar + job title + applied age, then the full
 * {@link StatusPipelineV2} funnel (big numbered steps with connectors) laid out
 * horizontally. Same props as {@link ApplicationRowProps} (drop-in). Token-pure,
 * mount enter + press spring via the shared motion hooks.
 */
export declare function ApplicationRowV2({ application, onPress, accessory, style, }: ApplicationRowV2Props): React.ReactElement;
//# sourceMappingURL=ApplicationRowV2.d.ts.map