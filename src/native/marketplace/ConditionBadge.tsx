import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { Badge, type BadgeTone } from '../primitives';
import type { Condition } from './internal';

export type ConditionBadgeSize = 'sm' | 'md';
export type ConditionBadgeVariant = 'solid' | 'soft' | 'outline';

export interface ConditionBadgeProps {
  /** Item condition grade. */
  condition: Condition;
  /** Visual weight — mirrors the shared `Badge` variants. Default `soft`. */
  variant?: ConditionBadgeVariant;
  /** Size scale. Default `md`. */
  size?: ConditionBadgeSize;
  /** Override the visible label (defaults to a humanized condition). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const CONDITION_TONE: Record<Condition, BadgeTone> = {
  new: 'success',
  'like-new': 'primary',
  used: 'neutral',
  refurb: 'accent',
};

const CONDITION_LABEL: Record<Condition, string> = {
  new: 'New',
  'like-new': 'Like New',
  used: 'Used',
  refurb: 'Refurbished',
};

/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge`
 * that maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
export function ConditionBadge({
  condition,
  variant = 'soft',
  size = 'md',
  label,
  style,
}: ConditionBadgeProps): React.ReactElement {
  const tone = CONDITION_TONE[condition] ?? 'neutral';
  const text = label ?? CONDITION_LABEL[condition] ?? String(condition);
  return (
    <Badge tone={tone} variant={variant} size={size} style={style}>
      {text}
    </Badge>
  );
}
