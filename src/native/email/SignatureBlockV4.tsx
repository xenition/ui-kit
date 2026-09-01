import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer } from '../primitives/internal/state-v4';
import type { SignatureBlockProps, SignatureContactLine } from './SignatureBlock';

export interface SignatureBlockV4Props extends SignatureBlockProps {
  /**
   * Act on a contact line — dial the number, open the mail client, follow the
   * link. Omitted, the lines stay read-only and are **drawn** read-only.
   */
  onContactPress?: (line: SignatureContactLine) => void;
}

/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A line that looks like a link is one.** The base painted every contact
 *    in `colors.primary` — the brand colour, the universal signal for "tap
 *    this" — with no `href`, no `onPress`, and nothing in the type that could
 *    ever have carried one. Every phone number and address in the kit was a
 *    dead link. With `onContactPress` the lines become real buttons that clear
 *    44; without it they are drawn as the plain text they are.
 * 2. **The brand colour is the `*Text` slot.** `primary` is a *fill*; as ink
 *    on `surface` it measured as low as 1.32:1 on a pale seed, which is what
 *    the contrast-corrected `primaryText` exists to replace.
 * 3. **The avatar is the same shape on both twins.** This one drew a rounded
 *    square and the web twin a circle. A signature is a person, so both are
 *    circles — the `Avatar` default, which is also what the web base already
 *    rendered.
 * 4. **Nothing renders without a name.** The block's whole anatomy hangs off
 *    it; with an empty `name` the base drew an accent rule, an empty avatar
 *    and a blank line.
 */
export function SignatureBlockV4({
  name,
  title,
  company,
  avatarUri,
  contacts,
  tagline,
  onContactPress,
  style,
}: SignatureBlockV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const safeContacts = contacts ?? [];
  // A visible caption, so this one keeps the middle dot.
  const roleLine = metaLine([title, company]);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingLeft: tokens.spacing.md,
          // The anchoring rule, off the spacing scale rather than the base's
          // literal 3. A painted rule is a graphic, not ink, so the fill slot
          // is the right one here.
          borderLeftWidth: tokens.spacing.xs,
          borderLeftColor: colors.primary,
        },
        style,
      ]}
    >
      <AvatarV4 size="lg" src={avatarUri} name={name} />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="bold" tone="onSurface">
          {name}
        </TextV4>
        {roleLine ? (
          <TextV4 size="sm" tone="mutedText">
            {roleLine}
          </TextV4>
        ) : null}
        {safeContacts.length > 0 ? (
          <View style={{ marginTop: tokens.spacing.xs }}>
            {safeContacts.map((c) =>
              onContactPress ? (
                <Pressable
                  key={c.id}
                  accessibilityRole="link"
                  accessibilityLabel={c.value}
                  onPress={() => onContactPress(c)}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: minTap(tokens.spacing),
                    paddingHorizontal: tokens.spacing.xs,
                    marginHorizontal: -tokens.spacing.xs,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                  })}
                >
                  {c.glyph ? <IconV4 glyph={c.glyph} size="xs" color="mutedText" /> : null}
                  <TextV4 size="sm" tone="primaryText" numberOfLines={1}>
                    {c.value}
                  </TextV4>
                </Pressable>
              ) : (
                <View
                  key={c.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                  }}
                >
                  {c.glyph ? <IconV4 glyph={c.glyph} size="xs" color="mutedText" /> : null}
                  {/* Inert, so it is not dressed as something to tap. */}
                  <TextV4 size="sm" tone="onSurface" numberOfLines={1}>
                    {c.value}
                  </TextV4>
                </View>
              )
            )}
          </View>
        ) : null}
        {tagline ? (
          <TextV4 size="xs" tone="mutedText" style={{ marginTop: tokens.spacing.xs }}>
            {tagline}
          </TextV4>
        ) : null}
      </View>
    </View>
  );
}
