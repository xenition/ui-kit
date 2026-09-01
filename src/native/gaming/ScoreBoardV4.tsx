import * as React from 'react';
import { Image, View } from 'react-native';
import { useXenitionTheme, type XenitionNativeTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { placeholderGround, spokenLine } from './internal/arcade-v4';
import type { ScoreEntry } from './types';
import type { ScoreBoardProps } from './ScoreBoard';

export interface ScoreBoardV4Props extends ScoreBoardProps {
  /** What a score is counted in. Default `'points'`. */
  scoreUnit?: string;
}

/** A crest, or the entry's initials. Never the `border` token as a fill. */
function Crest({
  entry,
  size,
  theme,
}: {
  entry: ScoreEntry;
  size: number;
  theme: XenitionNativeTheme;
}): React.ReactElement {
  if (entry.avatarUrl) {
    return (
      <Image
        source={{ uri: entry.avatarUrl }}
        accessibilityIgnoresInvertColors
        style={{
          width: size,
          height: size,
          borderRadius: theme.tokens.radius.sm,
          backgroundColor: placeholderGround(theme),
        }}
      />
    );
  }
  return <AvatarV4 name={entry.name} size={size >= theme.tokens.spacing['2xl'] ? 'lg' : 'sm'} />;
}

/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Five changes
 *
 * 1. **A standings table is a list.** The rows were flex `View`s in a card
 *    with no list context at all, so a reader was never told how many
 *    competitors there were or where in the order it had landed. The ranked
 *    board is an `accessibilityRole="list"` whose rows are its items.
 * 2. **A score carries its unit.** "Rank 1, Nova, 4200" leaves the reader to
 *    guess what 4200 counts; `scoreUnit` says, and the same prop exists on the
 *    web twin, where the row's whole accessible name is currently thrown away
 *    (an `aria-label` on a role-less `<div>` is discarded by ARIA).
 * 3. **The figures are tabular.** A column of proportional numerals in a
 *    ranked list wanders left and right as it descends, which is the one thing
 *    a scoreboard's alignment is for.
 * 4. **The leader's rank and the winning side use `primaryText`,** the
 *    contrast-corrected ink, rather than the `primary` *fill* drawn as text —
 *    measured as low as 1.32:1 on a pale seed. The lead is still carried by
 *    weight and by the word "leading" as well as by colour.
 * 5. **A crest with no image loads on the module's placeholder ground**, not
 *    on `border` — the hairline token used as a fill — and the empty board is
 *    the V4 empty state.
 */
export function ScoreBoardV4({
  entries,
  variant = 'ranked',
  title,
  emptyLabel = 'No scores yet',
  scoreUnit = 'points',
  style,
}: ScoreBoardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (entries.length === 0) {
    return (
      <EmptyStateV4
        icon={<IconV4 glyph="🏁" size="2xl" color="mutedText" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const cardStyle = {
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  } as const;

  const header = title ? (
    <TextV4 accessibilityRole="header" size="base" weight="bold" tone="onCard">
      {title}
    </TextV4>
  ) : null;

  if (variant === 'versus') {
    const home = entries[0];
    const away = entries[1];
    const homeWins = home != null && away != null && home.score > away.score;
    const awayWins = home != null && away != null && away.score > home.score;
    return (
      <View style={[cardStyle, { gap: tokens.spacing.md }, style]}>
        {header}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <VersusSide entry={home} winner={homeWins} scoreUnit={scoreUnit} />
          <TextV4 size="sm" weight="bold" tone="mutedText">
            VS
          </TextV4>
          <VersusSide entry={away} winner={awayWins} scoreUnit={scoreUnit} />
        </View>
      </View>
    );
  }

  const ranked = [...entries].sort((a, b) => b.score - a.score);
  const rank = tokens.spacing.lg;
  const crest = tokens.spacing.lg + tokens.spacing.xs;

  return (
    <View style={[cardStyle, { gap: tokens.spacing.xs }, style]}>
      {header}
      <View accessibilityRole="list" style={{ gap: tokens.spacing.xs }}>
        {ranked.map((entry, i) => {
          const leader = i === 0;
          return (
            <View
              key={entry.id}
              accessible
              accessibilityLabel={spokenLine([
                `Rank ${i + 1}`,
                entry.name,
                `${entry.score} ${scoreUnit}`,
                entry.detail,
              ])}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
              }}
            >
              <TextV4
                size="sm"
                weight="bold"
                numeric="tabular"
                tone={leader ? 'primaryText' : 'mutedText'}
                style={{ width: rank }}
              >
                {String(i + 1)}
              </TextV4>
              <Crest entry={entry} size={crest} theme={theme} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <TextV4
                  size="sm"
                  weight={leader ? 'bold' : 'medium'}
                  tone="onCard"
                  numberOfLines={1}
                >
                  {entry.name}
                </TextV4>
                {entry.detail ? (
                  <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                    {entry.detail}
                  </TextV4>
                ) : null}
              </View>
              <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
                {String(entry.score)}
              </TextV4>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function VersusSide({
  entry,
  winner,
  scoreUnit,
}: {
  entry?: ScoreEntry;
  winner: boolean;
  scoreUnit: string;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const score = entry?.score ?? 0;
  const name = entry?.name ?? 'TBD';
  const crest = tokens.spacing['2xl'];

  return (
    <View
      accessible
      accessibilityLabel={spokenLine([
        name,
        `${score} ${scoreUnit}`,
        winner ? 'leading' : null,
      ])}
      style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}
    >
      {entry ? <Crest entry={entry} size={crest} theme={theme} /> : <AvatarV4 name="?" size="lg" />}
      <TextV4
        size="sm"
        weight={winner ? 'bold' : 'medium'}
        tone="onCard"
        numberOfLines={1}
        align="center"
      >
        {name}
      </TextV4>
      <TextV4
        size="2xl"
        weight="bold"
        numeric="tabular"
        tone={winner ? 'primaryText' : 'mutedText'}
      >
        {String(score)}
      </TextV4>
    </View>
  );
}
