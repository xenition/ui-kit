import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import type { TimelineItemData, TimelineProps, TimelineTone } from './Timeline';

export type { TimelineProps as TimelineV4Props, TimelineItemData, TimelineTone };

/**
 * Tone → dot colour.
 *
 * Two corrections against the base map. `warn` pointed at `accent`, so a
 * warning on native was painted in the brand's second hue while its web twin
 * used `warn` — the same prop, two different meanings, which is the parity
 * break this kit forbids. `neutral` pointed at `border`, a hairline colour
 * that all but disappears as a 8pt disc; `muted` is the token that means
 * "present but quiet" and is contrast-checked for it.
 */
const DOT: Record<TimelineTone, keyof SemanticColors> = {
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
  neutral: 'muted',
};

/**
 * **V4 timeline** — same props as {@link Timeline}, a different design line.
 *
 * A timeline is scanned by **when**, then read for **what**. The base puts the
 * time last, in the same muted `xs` as the description, so the one field the
 * eye is hunting for is the least findable thing in the item and sits below
 * the text it is supposed to stamp.
 *
 * Four changes:
 *
 * 1. **The time leads.** It moves above the title, muted and in tabular
 *    figures, so the times form a straight column the eye runs down — the
 *    landmark §33 asks for. Tabular figures matter more here than anywhere:
 *    `09:05` and `11:42` only line up if the digits are the same width.
 * 2. **The title outranks the description.** `base` at weight 600 against
 *    `xs` muted. The base set both at `sm` and separated them by colour alone
 *    (§10 — hierarchy through size and weight, not just contrast).
 * 3. **The rail is continuous.** The base hung the connector inside the item's
 *    bottom padding, so the line stopped short and every item was fenced off
 *    by a gap in its own thread. Moving the padding to the content column lets
 *    the rail run dot-to-dot, which is what makes a timeline read as one
 *    sequence instead of a stack of blocks.
 * 4. **The dot is a token.** `width: 10, height: 10` and `marginTop: 4` were
 *    literals; they come off the spacing scale now, so a seed that changes the
 *    scale changes the timeline with it.
 *
 * **No depth, no container.** An activity feed is the classic place to wrap
 * each entry in a card, and §11 asks what that container would be for: the
 * rail already groups the items and the gaps already separate them. A card per
 * entry would be §8's "cards inside cards inside cards" with a dot beside it.
 */
export function TimelineV4({ items, style }: TimelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dotSize = tokens.spacing.sm;

  return (
    <View style={[{ flexDirection: 'column' }, style]}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            {/* The rail runs the full height of the row, bottom padding
                included, so the thread is unbroken between dots. */}
            <View style={{ alignItems: 'center', width: dotSize }}>
              <View
                style={{
                  marginTop: tokens.spacing.xs,
                  width: dotSize,
                  height: dotSize,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors[DOT[it.tone ?? 'primary']],
                }}
              />
              {!last ? (
                <View style={{ width: 1, flex: 1, backgroundColor: colors.border }} />
              ) : null}
            </View>
            <View
              style={{
                flex: 1,
                minWidth: 0,
                gap: 2,
                paddingBottom: last ? 0 : tokens.spacing.lg,
              }}
            >
              {it.time != null ? (
                typeof it.time === 'string' ? (
                  <Text
                    style={{
                      color: colors.mutedText,
                      fontFamily: tokens.typography.fontBody,
                      fontSize: tokens.typography.scale.xs,
                      fontVariant: ['tabular-nums'],
                    }}
                  >
                    {it.time}
                  </Text>
                ) : (
                  it.time
                )
              ) : null}
              {typeof it.title === 'string' ? (
                <Text
                  style={{
                    color: colors.onSurface,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                  }}
                >
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              {it.description != null ? (
                typeof it.description === 'string' ? (
                  <Text
                    style={{
                      color: colors.mutedText,
                      fontFamily: tokens.typography.fontBody,
                      fontSize: tokens.typography.scale.xs,
                    }}
                  >
                    {it.description}
                  </Text>
                ) : (
                  it.description
                )
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
