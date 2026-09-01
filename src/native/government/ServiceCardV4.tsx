import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
  type ToneV4,
} from './internal/civic-v4';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';

export interface ServiceCardV4Props extends ServiceCardProps {
  /** Override the eight category words (`'Licensing'`, `'Permits'`, …). */
  categoryLabels?: Partial<Record<ServiceCategory, string>>;
  /** Override the four channel words (`'Online'`, `'Unavailable'`, …). */
  channelLabels?: Partial<Record<ServiceChannel, string>>;
}

const CATEGORY_V4: Record<ServiceCategory, { label: string; glyph: string }> = {
  license: { label: 'Licensing', glyph: '🪪' },
  permit: { label: 'Permits', glyph: '📋' },
  tax: { label: 'Tax', glyph: '🧾' },
  records: { label: 'Records', glyph: '🗂️' },
  benefit: { label: 'Benefits', glyph: '🤝' },
  health: { label: 'Public health', glyph: '⚕️' },
  utility: { label: 'Utilities', glyph: '💧' },
  other: { label: 'Service', glyph: '🏛️' },
};

const CHANNEL_V4: Record<ServiceChannel, { label: string; glyph: string; tone: ToneV4 }> = {
  online: { label: 'Online', glyph: '🌐', tone: 'success' },
  'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
  phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
  unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};

/**
 * **V4 service tile** — same props as {@link ServiceCard} plus
 * `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **"Start" is a sibling of the card's activation, not a child of it.** The
 *    base wrapped the whole card — Start included — in one `Pressable` that is
 *    `accessible` by default and carries the card's own name, so VoiceOver
 *    flattened the tile to a single leaf and the button was not a focus stop at
 *    all. It could not be reached, let alone pressed. The card is a plain
 *    surface now; the activation wraps only the glyph-and-text region and
 *    carries the spoken name, and Start sits beside it with a name of its own.
 * 2. **"Unavailable" joins the name.** The tile announced
 *    `` `${title}, ${category}` `` and stopped, so a service that cannot be
 *    used today announced as an ordinary, startable one — with a live Start
 *    button under it.
 * 3. **The press is a state layer.** `opacity: pressed ? 0.85 : 1` fades the
 *    tile's own content, which is the signal M3 spends on *disabled*; the
 *    pressed tile now tints its container and leaves the content alone.
 * 4. **Start clears 44.** `size="sm"` renders about 34 on this platform, and
 *    neither `Button` primitive sets a floor. The category disc drops its
 *    duplicate label — the category is already written under the title —
 *    stops wearing `primary`, because a category is identity and not a state,
 *    and takes a tint composited opaquely rather than washed over whatever is
 *    behind it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function ServiceCardV4({
  category,
  title,
  description,
  channel,
  estimatedTime,
  actionLabel = 'Start',
  onStart,
  onPress,
  categoryLabels,
  channelLabels,
  style,
}: ServiceCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const cat = CATEGORY_V4[category] ?? CATEGORY_V4.other;
  const categoryWord = categoryLabels?.[category] ?? cat.label;
  const ch = channel ? (CHANNEL_V4[channel] ?? CHANNEL_V4.online) : undefined;
  const channelWord = channel && ch ? (channelLabels?.[channel] ?? ch.label) : undefined;
  const tap = minTap(tokens.spacing);
  const disc = tokens.spacing['2xl'];

  const name = spokenLine([title, categoryWord, channelWord, estimatedTime]);

  const head = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.surface, colors.onSurface) : 'transparent',
      }}
    >
      <View
        style={{
          width: disc,
          height: disc,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tintGround(theme, IDENTITY_TONE),
        }}
      >
        {/* Decorative: the category is written under the title. */}
        <IconV4 glyph={cat.glyph} size="xl" />
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="lg" weight="bold" tone="onSurface" numberOfLines={2}>
          {title}
        </TextV4>
        <TextV4 size="xs" tone="mutedText">
          {categoryWord}
        </TextV4>
      </View>
    </View>
  );

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={name}
            onPress={onPress}
            style={{ flex: 1, minWidth: 0 }}
          >
            {({ pressed }) => head(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={name} style={{ flex: 1, minWidth: 0 }}>
            {head(false)}
          </View>
        )}
        {ch != null && channelWord != null ? (
          <BadgeV4 tone={ch.tone} {...BADGE_V4}>
            {`${ch.glyph} ${channelWord}`}
          </BadgeV4>
        ) : null}
      </View>

      {description ? (
        <TextV4 size="sm" tone="onSurface" style={{ marginTop: tokens.spacing.sm }}>
          {description}
        </TextV4>
      ) : null}

      {estimatedTime || onStart != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          {estimatedTime ? (
            <TextV4 size="xs" tone="mutedText">
              {`⏱ ${estimatedTime}`}
            </TextV4>
          ) : (
            <View />
          )}
          {onStart != null ? (
            <ButtonV4 size="md" onPress={onStart} style={{ minHeight: tap }}>
              {actionLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}
