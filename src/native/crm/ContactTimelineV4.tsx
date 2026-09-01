import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { ACTIVITY_META_V4, metaLine, skeletonFill, spokenLine } from './internal/crm-v4';
import type { ContactTimelineProps, TimelineItem } from './ContactTimeline';

export interface ContactTimelineV4Props extends ContactTimelineProps {
  /** Next-step sentence under `emptyLabel`. */
  emptyDescription?: string;
}

/**
 * **V4 contact timeline** — same props as {@link ContactTimeline} plus
 * `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys its list.** On web
 *    the item set `role="listitem"` and then spread the interactive props,
 *    whose `role: 'button'` won the JSX merge — so the moment `onItemClick`
 *    arrived the list had zero list items and readers announced an empty list.
 *    The button now lives **inside** the list item on both twins.
 * 2. **Native has list semantics at all.** It exposed none, so the same
 *    timeline was a list on one platform and a pile of text on the other.
 * 3. **The last node clears 44.** Its bottom padding drops to `0`, which left
 *    a 28px target on the one entry a user most often taps — the newest.
 * 4. **The node chip is one object on both twins**, on the `selected` /
 *    `onSelected` pair, and an activity **kind** is identity rather than
 *    `success` (`ACTIVITY_META_V4`).
 * 5. **No literals.** The `14` radius and the `2` connector width come off
 *    `tokens.radius` and the spacing scale; the skeleton takes the shared
 *    opaque placeholder rather than `colors.border`.
 * 6. **One spoken name per entry** (rule A) and a real press layer (rule B).
 */
export function ContactTimelineV4({
  items,
  onItemPress,
  loading = false,
  emptyLabel = 'No activity yet',
  emptyDescription,
  style,
}: ContactTimelineV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // 28 — the node marker. The row around it, not the marker, is the target.
  const node = tokens.spacing.lg + tokens.spacing.xs;
  const rail = tokens.spacing.xs / 2;

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading timeline" style={[{ gap: tokens.spacing.md }, style]}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            <View
              style={{
                width: node,
                height: node,
                borderRadius: tokens.radius.full,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View style={{ flex: 1, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }}>
              <View
                style={{
                  height: tokens.spacing.sm + tokens.spacing.xs,
                  width: '60%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View
                style={{
                  height: tokens.spacing.sm,
                  width: '35%',
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, style]}
      >
        <TextV4 size="sm" weight="semibold" tone="onSurface" align="center">
          {emptyLabel}
        </TextV4>
        {emptyDescription ? (
          <TextV4 size="xs" tone="mutedText" align="center">
            {emptyDescription}
          </TextV4>
        ) : null}
      </View>
    );
  }

  const entry = (item: TimelineItem, isLast: boolean, pressed: boolean): React.ReactElement => {
    const meta = ACTIVITY_META_V4[item.kind];
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          // The last entry keeps its target even though its connector is gone.
          minHeight: isLast ? minTap(tokens.spacing) : undefined,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
        }}
      >
        <View style={{ alignItems: 'center', width: node }}>
          <View
            style={{
              width: node,
              height: node,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.selected,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TextV4 size="xs" style={{ color: colors.onSelected }}>
              {meta.glyph}
            </TextV4>
          </View>
          {isLast ? null : (
            <View
              // The rail is decoration; the entry beside it carries the name.
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                flex: 1,
                width: rail,
                backgroundColor: colors.border,
                marginVertical: rail,
              }}
            />
          )}
        </View>

        <View
          style={{
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs / 2,
            paddingBottom: isLast ? 0 : tokens.spacing.md,
          }}
        >
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {item.title}
          </TextV4>
          {item.detail ? (
            <TextV4 size="xs" tone="mutedText">
              {item.detail}
            </TextV4>
          ) : null}
          {metaLine([item.actor, item.timestamp]) ? (
            <TextV4 size="xs" weight="medium" tone="mutedText">
              {metaLine([item.actor, item.timestamp])}
            </TextV4>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View accessibilityRole="list" style={style}>
      {items.map((item, index) => {
        const meta = ACTIVITY_META_V4[item.kind];
        const isLast = index === items.length - 1;
        const name = spokenLine([
          meta.label,
          item.title,
          item.detail,
          item.actor,
          item.timestamp,
        ]);
        // The list item is the outer node; the button lives inside it, so
        // supplying `onItemPress` can never empty the list.
        return (
          <View key={item.id}>
            {onItemPress ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={name}
                onPress={() => onItemPress(item)}
                style={{ borderRadius: tokens.radius.md }}
              >
                {({ pressed }) => entry(item, isLast, pressed)}
              </Pressable>
            ) : (
              <View accessible accessibilityLabel={name}>
                {entry(item, isLast, false)}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
