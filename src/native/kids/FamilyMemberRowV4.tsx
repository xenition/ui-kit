import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { IDENTITY_TONE, rowShellStyle, spokenLine, toneFill } from './internal/tone-v4';
import type { FamilyMemberRowProps, FamilyRole } from './FamilyMemberRow';

export interface FamilyMemberRowV4Props extends FamilyMemberRowProps {
  /** The word each role is printed and announced with. */
  roleLabels?: Partial<Record<FamilyRole, string>>;
  /** Announced and printed when the member is present. Default `'Online'`. */
  onlineLabel?: string;
  /** Announced and printed when the member is away. Default `'Offline'`. */
  offlineLabel?: string;
}

const ROLE_LABEL: Record<FamilyRole, string> = {
  parent: 'Parent',
  guardian: 'Guardian',
  child: 'Child',
  sibling: 'Sibling',
  grandparent: 'Grandparent',
  caregiver: 'Caregiver',
  other: 'Family',
};

/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **A family role is identity, so it stops borrowing status colours.** The
 *    base drew `caregiver → success` and `parent → primary`, which says a
 *    caregiver is a *good outcome* and a grandparent is a neutral one. Every
 *    role now wears the same neutral chip and is told apart by its word — the
 *    only channel that survives greyscale, colour blindness and a reader.
 * 2. **Presence is a real status and keeps its colour**, plus the dot is
 *    accompanied by the word it always should have been, and the dot itself is
 *    hidden from the reader so "Online" is said once rather than twice.
 * 3. **The row's summary is not silently dropped.** The non-pressable branch
 *    set `accessibilityLabel` on a bare `View` with no `accessible` — which
 *    Android ignores outright, so the row read as four loose fragments there
 *    and as one name on iOS. Every such `View` in this file is now explicitly
 *    `accessible`.
 * 4. **`card`/`onCard` and a state layer.** The row painted `surface`, the page
 *    colour, and drew press as `opacity: pressed ? 0.85 : 1` — an opacity
 *    inside M3's *disabled* band.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function FamilyMemberRowV4({
  name,
  role = 'other',
  photoUrl,
  relationLabel,
  online,
  roleLabels,
  onlineLabel = 'Online',
  offlineLabel = 'Offline',
  onPress,
  style,
}: FamilyMemberRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const roleWord = roleLabels?.[role] ?? ROLE_LABEL[role] ?? ROLE_LABEL.other;
  const presenceWord = online === undefined ? null : online ? onlineLabel : offlineLabel;
  const spoken = spokenLine([name, roleWord, relationLabel, presenceWord]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowShellStyle(theme),
        pressed ? { backgroundColor: pressOver(theme, colors.card, colors.onCard) } : null,
        style,
      ]}
    >
      <AvatarV4 src={photoUrl} name={name} size="md" />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {relationLabel ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {relationLabel}
          </TextV4>
        ) : null}
        {presenceWord ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {/* Decorative: the word beside it already says this. */}
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                width: tokens.spacing.sm,
                height: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                backgroundColor:
                  online === true ? toneFill(theme, 'success') : toneFill(theme, 'neutral'),
              }}
            />
            <TextV4 size="xs" tone="mutedText">
              {presenceWord}
            </TextV4>
          </View>
        ) : null}
      </View>
      {/* Identity, not status — see IDENTITY_TONE. */}
      <BadgeV4 tone={IDENTITY_TONE} variant="soft" size="sm">
        {roleWord}
      </BadgeV4>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={spoken} onPress={onPress}>
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
