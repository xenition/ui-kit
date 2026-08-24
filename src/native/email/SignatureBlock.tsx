import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';

export interface SignatureContactLine {
  id: string;
  /** Glyph for the line (e.g. '✉️', '📞', '🌐'). */
  glyph?: string;
  /** The value text (email, phone, url). */
  value: string;
}

export interface SignatureBlockProps {
  /** Signer name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Company / organisation. */
  company?: string;
  /** Avatar / logo image URI. */
  avatarUri?: string;
  /** Contact lines (email, phone, website…). */
  contacts?: SignatureContactLine[];
  /** Optional freeform tagline under the contacts. */
  tagline?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule anchors it. All colors from
 * theme tokens. No literal colors.
 */
export function SignatureBlock({
  name,
  title,
  company,
  avatarUri,
  contacts,
  tagline,
  style,
}: SignatureBlockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeContacts = contacts ?? [];
  const roleLine = [title, company].filter(Boolean).join(' · ');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingLeft: tokens.spacing.md,
          borderLeftWidth: 3,
          borderLeftColor: colors.primary,
        },
        style,
      ]}
    >
      {avatarUri || name ? <Avatar size="lg" src={avatarUri} name={name} shape="rounded" /> : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {roleLine ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{roleLine}</Text>
        ) : null}
        {safeContacts.length > 0 ? (
          <View style={{ gap: 2, marginTop: tokens.spacing.xs }}>
            {safeContacts.map((c) => (
              <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                {c.glyph ? <Icon glyph={c.glyph} size="xs" color="muted" /> : null}
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>{c.value}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {tagline ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
            {tagline}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
