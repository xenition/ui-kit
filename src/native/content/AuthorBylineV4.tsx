import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine, spokenLine } from './internal/reading-v4';
import type { AuthorBylineProps } from './AuthorByline';

export interface AuthorBylineV4Props extends AuthorBylineProps {
  /** Build the credit from the author's name. Default ``(name) => `By ${name}` ``. */
  formatByline?: (name: string) => string;
}

/**
 * **V4 byline** — same props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline is one stop with a real role.** The web twin hung an
 *    `aria-label` on a roleless `<div>`, where it is ignored outright, so a
 *    credit line read as three loose fragments — name, then role, then date —
 *    while this twin read it as one. Both are now a single named `text`
 *    element, so the two platforms say the same sentence.
 * 2. **`'By '` is a prop.** It was the one word in the component nobody
 *    outside English could change.
 * 3. **The role and the meta line take `mutedText`.** They were set in
 *    `muted`, a fill slot the compiler makes no contrast promise about, at the
 *    smallest step in the component.
 *
 * **Renders nothing without an author name** (§4.5).
 */
export function AuthorBylineV4({
  author,
  date,
  readingTime,
  variant = 'full',
  formatByline = (name: string) => `By ${name}`,
  style,
}: AuthorBylineV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  if (!author?.name) return null;

  // The dot is for the eye; the spoken name gets commas, which a reader pauses
  // on instead of reading out as "middle dot".
  const meta = metaLine([date, readingTime]);

  if (variant === 'compact') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={spokenLine([formatByline(author.name), date, readingTime])}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <AvatarV4 src={author.avatarUrl} name={author.name} size="sm" />
        <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flexShrink: 1 }}>
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {author.name}
          </TextV4>
          {meta ? `  ·  ${meta}` : ''}
        </TextV4>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={spokenLine([formatByline(author.name), author.role, date, readingTime])}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}
    >
      <AvatarV4 src={author.avatarUrl} name={author.name} size="md" />
      <View style={{ flexShrink: 1, minWidth: 0 }}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {author.name}
        </TextV4>
        {author.role ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {author.role}
          </TextV4>
        ) : null}
        {meta ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {meta}
          </TextV4>
        ) : null}
      </View>
    </View>
  );
}
