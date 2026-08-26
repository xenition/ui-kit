import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useSignInParts, type SignInScreenProps } from './SignInScreen';

/** Drop-in for {@link SignInScreen} — identical props, different design. */
export type SignInScreenV3Props = SignInScreenProps;

/**
 * Sign-in / register — **V3, compact** (§11).
 *
 * No hero panel and no `3xl` display headline. The brand tile moves onto the
 * **same row** as an `xl` headline, so the identity and the ask occupy one
 * band instead of three, and the rows below tighten to `sm`/`md` rhythm. This
 * is the line for a bottom sheet, a modal, or a second-visit screen where the
 * user already knows what app they are in and wants the field, not the pitch.
 *
 * One deliberate difference from §5: the CTA sits **in flow** at the end of
 * the form rather than in a sticky footer. A sheet is sized to its content —
 * there is no scroll for the action to hide under, and pinning it would draw a
 * hairline across the bottom of a card that already has an edge. Everything
 * else about the button is unchanged: full width, 56 tall, `radius.full`,
 * trailing `→`.
 *
 * Same parts, same props, same 56px controls as the base line.
 */
export function SignInScreenV3(props: SignInScreenV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const parts = useSignInParts(props, { headingSize: 'xl' });

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, props.style]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        {/* Identity and ask on one band — the compact line's whole idea. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          {parts.brand}
          <View style={{ flex: 1 }}>{parts.heading}</View>
        </View>

        {parts.alert}
        {parts.fields}
        {parts.cta}
        {parts.providers}
        {parts.switchFooter}
      </ScrollView>
    </View>
  );
}
