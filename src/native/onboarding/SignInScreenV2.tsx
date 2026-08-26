import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthStickyFooter } from '../primitives/AuthCard';
import { useSignInParts, type SignInScreenProps } from './SignInScreen';

/** Drop-in for {@link SignInScreen} — identical props, different design. */
export type SignInScreenV2Props = SignInScreenProps;

/**
 * Sign-in / register — **V2, editorial** (§11).
 *
 * The base line stacks brand, headline and form down one column. V2 turns the
 * top of the screen into a full-bleed tinted panel that runs to the very edge
 * and carries the brand tile and headline, then lets the form sheet **rise
 * over it** — `radius.lg` on its top corners, `surface` fill, pulled up so it
 * overlaps the panel. The overlap is the whole idea: it reads as a card handed
 * to you rather than a form printed on a page, and it gives the headline
 * somewhere to sit that is not the same plane as the inputs.
 *
 * Same parts as the base line, same props, same 56px controls, same sticky
 * CTA (§5) — only the arrangement differs.
 */
export function SignInScreenV2(props: SignInScreenV2Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const parts = useSignInParts(props);

  /*
    §3's tinted ground. `ramps` are compiled in light orientation, so a dark
    scheme takes the mirrored step — the same swap WelcomeScreen makes — or the
    panel would glare white behind a dark headline.
  */
  const panelGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  // The sheet's overlap, in the same rhythm as everything else on the screen.
  const overlap = tokens.spacing.lg;

  return (
    <View style={[{ flex: 1, backgroundColor: panelGround }, props.style]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      >
        {/* Full-bleed hero: no side padding of its own beyond the copy inset,
            so the tint reaches the top and both edges. */}
        <View
          style={{
            backgroundColor: panelGround,
            paddingHorizontal: tokens.spacing.xl,
            paddingTop: tokens.spacing['2xl'],
            paddingBottom: tokens.spacing.xl + overlap,
            gap: tokens.spacing.lg,
          }}
        >
          {parts.brand}
          {parts.heading}
        </View>

        {/* The sheet, risen over the panel. */}
        <View
          style={{
            flexGrow: 1,
            marginTop: -overlap,
            padding: tokens.spacing.xl,
            gap: tokens.spacing.lg,
            backgroundColor: colors.surface,
            borderTopLeftRadius: tokens.radius.lg,
            borderTopRightRadius: tokens.radius.lg,
          }}
        >
          {parts.alert}
          {parts.fields}
          {parts.providers}
          {parts.switchFooter}
        </View>
      </ScrollView>

      <AuthStickyFooter>{parts.cta}</AuthStickyFooter>
    </View>
  );
}
