import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

/** Delivery state of an outgoing message. */
export type ReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface ReadReceiptProps {
  /** Current delivery state (default `sent`). */
  status?: ReceiptStatus;
  /** Glyph size in px (default from the `xs` type scale). */
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const GLYPH: Record<ReceiptStatus, string> = {
  sending: '🕓',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  failed: '⚠︎',
};

const LABEL: Record<ReceiptStatus, string> = {
  sending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  read: 'Read',
  failed: 'Failed to send',
};

/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label. No literal colors.
 */
export function ReadReceipt({
  status = 'sent',
  size,
  style,
}: ReadReceiptProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fontSize = size ?? tokens.typography.scale.xs;
  const color =
    status === 'read' ? colors.primaryText : status === 'failed' ? colors.dangerText : colors.muted;
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={LABEL[status]}
      style={style}
    >
      <Text allowFontScaling={false} style={{ fontSize, lineHeight: fontSize * 1.2, color }}>
        {GLYPH[status]}
      </Text>
    </View>
  );
}
