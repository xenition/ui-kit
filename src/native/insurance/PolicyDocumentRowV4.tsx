import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { DECORATIVE, DOCUMENT_KIND_V4, chipGround, metaLine, spokenLine } from './internal/tone-v4';
import type { PolicyDocumentRowProps } from './PolicyDocumentRow';

export interface PolicyDocumentRowV4Props extends PolicyDocumentRowProps {
  /**
   * File size in **bytes**, for {@link PolicyDocumentRowV4Props.formatSize}.
   *
   * The base's `size` is a string the caller has already formatted, which means
   * every screen in an app formats it slightly differently — and because
   * `XV4Props extends XProps` forbids narrowing `size` to a number,
   * `formatSize` had nothing to format without this. Pass the number and the
   * row formats it once. `sizeBytes` wins when both are given; `size` alone
   * still renders exactly today's output.
   */
  sizeBytes?: number;
  /**
   * Render {@link PolicyDocumentRowV4Props.sizeBytes}. Default `'1.2 MB'`.
   */
  formatSize?: (bytes: number) => string;
}

/** Binary-prefixed units, largest first — what a file manager shows. */
const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

/** Default `formatSize`: one decimal above a kilobyte, none below. */
function defaultFormatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${unit === 0 ? Math.round(value) : value.toFixed(1)} ${UNITS[unit] ?? 'B'}`;
}

/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable.** This is the module's clearest instance of the
 *    sibling rule and it fails differently on each platform. On native the
 *    whole row — glyph, title, meta line *and the Download `Button`* — was the
 *    subtree of one `Pressable`, and a `Pressable` is `accessible` by default,
 *    so VoiceOver flattened it into a single leaf named "Auto policy
 *    declarations document". The Download button was **not reachable by any
 *    gesture**: not a focus stop, not swipeable to, not activatable. (On the
 *    web twin the same nesting had teeth instead: the row's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the row *opened the document* instead of downloading it.)
 *    The fix is structural, not a guard: the row container is a plain `View`,
 *    the activation wraps only the glyph-and-text region and carries the row's
 *    spoken name, and the Download button sits beside it.
 * 2. **Two rows no longer offer two buttons called "Download".** The button's
 *    spoken name now carries the document it belongs to, so a list of six
 *    documents is six distinct actions rather than six identical ones.
 * 3. **The kind is a word, not a mangled enum.** The meta line was built from
 *    `kind.replace('-', ' ')`, so the reader was shown `"id card"` — the raw
 *    identifier, lower-cased and untranslatable. It comes from the module's
 *    tone table now, like every other label.
 * 4. **The size can be a number.** `size` was a pre-formatted string, so
 *    `'1.2 MB'`, `'1,2 Mo'` and `'1200 KB'` all appeared in one product.
 * 5. **Press is a state layer and the row joins the shared row family** — the
 *    same height, the same 44 leading slot and the same pressed ground as
 *    `ClaimRowV4` and `BeneficiaryRowV4`, instead of `opacity: 0.7` and a
 *    hand-set 40px disc. The Download button clears 44 too; at `size="sm"` on
 *    a bare `Button` it did not.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function PolicyDocumentRowV4({
  title,
  kind = 'policy',
  size,
  sizeBytes,
  date,
  downloadLabel = 'Download',
  formatSize = defaultFormatSize,
  onPress,
  onDownload,
  style,
}: PolicyDocumentRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!title) return null;

  const meta = DOCUMENT_KIND_V4[kind] ?? DOCUMENT_KIND_V4.policy;
  // The number wins: a caller who supplies both has moved to the formatted
  // path and the leftover string is the old spelling. `size` alone is
  // untouched, so nothing that works today changes.
  const sizeText =
    typeof sizeBytes === 'number' && Number.isFinite(sizeBytes)
      ? formatSize(sizeBytes)
      : size != null && size !== ''
        ? size
        : undefined;

  const caption = metaLine([meta.label, sizeText, date]);
  const spoken = spokenLine([title, meta.label, sizeText, date]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme),
        {
          flex: 1,
          paddingHorizontal: 0,
          borderRadius: tokens.radius.md,
          backgroundColor: rowGround(theme, { pressed }),
        },
      ]}
    >
      <View
        {...DECORATIVE}
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.md, backgroundColor: chipGround(theme) },
        ]}
      >
        <TextV4 size="lg" tone="onCard">
          {meta.glyph}
        </TextV4>
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {title}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spoken}
          onPress={onPress}
          style={{ flex: 1, borderRadius: tokens.radius.md }}
        >
          {({ pressed }) => identity(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
          {identity(false)}
        </View>
      )}

      {/* A sibling of the activation, never a descendant — see change 1. */}
      {onDownload ? (
        <ButtonV4
          variant="soft"
          size="sm"
          onPress={onDownload}
          accessibilityLabel={`${downloadLabel}, ${title}`}
          style={{ minHeight: minTap(tokens.spacing) }}
        >
          {downloadLabel}
        </ButtonV4>
      ) : null}
    </View>
  );
}
