import * as React from 'react';
import { Text, AccessibilityInfo, ActivityIndicator } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  SEED_BOTH,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { XenitionUIProvider } from './XenitionUIProvider';
import { useXenitionTheme } from '../theme';
import { Button } from './Button';
import { Card } from './Card';
import { Stack } from './Stack';
import { Input } from './Input';
import { Eyebrow } from './Eyebrow';
import { StatusDot } from './StatusDot';
import { Rating } from './Rating';
import { StatusMessage } from './StatusMessage';
import { GlassPanel } from './GlassPanel';
import { GradientText } from './GradientText';
import { EmptyState } from '../commerce/EmptyState';

describe('XenitionUIProvider (native)', () => {
  it('compiles a seed and exposes resolved tokens via useXenitionTheme', () => {
    function Probe(): React.ReactElement {
      const { colors, scheme } = useXenitionTheme();
      return <Text>{`${scheme}:${colors.primary}`}</Text>;
    }
    const { getByText } = renderThemed(<Probe />, SEED_LIGHT);
    expect(getByText(/^light:#[0-9a-f]{6}$/i)).toBeTruthy();
  });

  it('follows the requested color scheme for a both-mode seed', () => {
    function Probe(): React.ReactElement {
      const { colors } = useXenitionTheme();
      return <Text>{colors.surface}</Text>;
    }
    const light = renderThemed(<Probe />, SEED_BOTH, 'light').getByText(/#/).props.children;
    const dark = renderThemed(<Probe />, SEED_BOTH, 'dark').getByText(/#/).props.children;
    expect(light).not.toBe(dark);
  });

  it('throws when useXenitionTheme is used outside a provider', () => {
    function Bad(): React.ReactElement {
      useXenitionTheme();
      return <Text>x</Text>;
    }
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() =>
      // Bare render without the provider.
      renderThemedNoProvider(<Bad />)
    ).toThrow(/XenitionNativeThemeProvider/);
    spy.mockRestore();
  });

  it('XenitionUIProvider wraps the native theme provider', () => {
    function Probe(): React.ReactElement {
      const { colors } = useXenitionTheme();
      return <Text>{colors.onPrimary}</Text>;
    }
    const { getByText } = renderWith(
      <XenitionUIProvider theme={SEED_DARK}>
        <Probe />
      </XenitionUIProvider>
    );
    expect(getByText(/#[0-9a-f]{6}/i)).toBeTruthy();
  });
});

describe('Button (native)', () => {
  it('fires onPress and renders its label', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(<Button onPress={onPress}>Buy</Button>, SEED_LIGHT);
    fireEvent.press(getByText('Buy'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <Button onPress={onPress} disabled>
        Buy
      </Button>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Buy'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('blocks presses and shows a spinner while loading', () => {
    const onPress = jest.fn();
    const { getByText, UNSAFE_getByType } = renderThemed(
      <Button onPress={onPress} loading>
        Save
      </Button>,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
    // ActivityIndicator present.
    expect(
      UNSAFE_getByType(require('react-native').ActivityIndicator)
    ).toBeTruthy();
  });

  it('renders each variant token-purely under both seeds', () => {
    (['primary', 'secondary', 'ghost'] as const).forEach((variant) => {
      [SEED_LIGHT, SEED_DARK].forEach((seed) => {
        const { root } = renderThemed(
          <Button variant={variant} size="lg">
            Go
          </Button>,
          seed
        );
        const allowed = tokenHexSet(seed);
        renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
      });
    });
  });
});

describe('Card / Stack / Input (native)', () => {
  it('Card renders a token surface', () => {
    const { getByText } = renderThemed(
      <Card>
        <Text>inside</Text>
      </Card>,
      SEED_LIGHT
    );
    expect(getByText('inside')).toBeTruthy();
  });

  it('Stack applies direction, gap, align, and additive justify', () => {
    const { getByTestId } = renderThemed(
      <Stack testID="stk" direction="row" gap="lg" align="center" justify="between">
        <Text>a</Text>
      </Stack>,
      SEED_LIGHT
    );
    const style = flatten(getByTestId('stk').props.style);
    expect(style.flexDirection).toBe('row');
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('space-between');
    expect(typeof style.gap).toBe('number');
  });

  it('Input reflects the invalid state on its border token and renders a label', () => {
    const { getByText, getByDisplayValue } = renderThemed(
      <Input label="Email" value="x" invalid onChangeText={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Email')).toBeTruthy();
    const style = flatten(getByDisplayValue('x').props.style);
    const danger = require('../../theme/compile')
      .compileTheme(SEED_DARK)
      .dark.danger.toLowerCase();
    expect(String(style.borderColor).toLowerCase()).toBe(danger);
  });
});

describe('Eyebrow / GradientText / GlassPanel (native)', () => {
  it('Eyebrow renders uppercase tracked text on a semantic tone', () => {
    const { getByText } = renderThemed(<Eyebrow tone="primary">Now in beta</Eyebrow>, SEED_LIGHT);
    const style = flatten(getByText('Now in beta').props.style);
    expect(style.textTransform).toBe('uppercase');
    expect(style.letterSpacing).toBeGreaterThan(0);
  });

  it('GradientText renders a solid token-colored fallback', () => {
    const { getByText } = renderThemed(<GradientText ramp="accent">faster</GradientText>, SEED_LIGHT);
    const style = flatten(getByText('faster').props.style);
    const tokens = require('../../theme/outputs').toNativeTokens(
      require('../../theme/compile').compileTheme(SEED_LIGHT)
    );
    expect(String(style.color).toLowerCase()).toBe(tokens.ramps.accent[500].toLowerCase());
  });

  it('GlassPanel derives a translucent rgba from the surface token (no raw hex)', () => {
    const { getByTestId } = renderThemed(
      <GlassPanel testID="glass" intensity="strong">
        <Text>x</Text>
      </GlassPanel>,
      SEED_DARK
    );
    const style = flatten(getByTestId('glass').props.style);
    expect(String(style.backgroundColor)).toMatch(/^rgba\(/);
  });
});

describe('StatusDot (native)', () => {
  it('renders the pulse echo when motion is allowed', () => {
    const { queryByTestId } = renderThemed(<StatusDot label="Live" />, SEED_LIGHT);
    expect(queryByTestId('xen-status-echo')).not.toBeNull();
  });

  it('drops the echo under reduced motion', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { queryByTestId } = renderThemed(<StatusDot label="Live" />, SEED_LIGHT);
    await waitFor(() => expect(queryByTestId('xen-status-echo')).toBeNull());
  });

  it('drops the echo when pulse is disabled', () => {
    const { queryByTestId } = renderThemed(<StatusDot pulse={false} />, SEED_LIGHT);
    expect(queryByTestId('xen-status-echo')).toBeNull();
  });
});

describe('EmptyState (native)', () => {
  it('renders title, description, and action', () => {
    const { getByText } = renderThemed(
      <EmptyState
        title="Your cart is empty"
        description="Browse the catalog to get started."
        action={<Text>Browse</Text>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Your cart is empty')).toBeTruthy();
    expect(getByText('Browse the catalog to get started.')).toBeTruthy();
    expect(getByText('Browse')).toBeTruthy();
  });
});

describe('Rating (native)', () => {
  it('renders max glyphs filled to the rounded value and is one image', () => {
    const { getByLabelText } = renderThemed(<Rating value={3.6} />, SEED_LIGHT);
    const row = getByLabelText('3.6 out of 5 stars');
    expect(row.props.accessibilityRole).toBe('image');
    const stars = row.findAllByType(Text).filter((t) => t.props.children === '★');
    expect(stars).toHaveLength(5);
    const accent = tokenHexSet(SEED_LIGHT); // sanity: colors resolve to tokens (checked below)
    expect(accent.size).toBeGreaterThan(0);
    const filled = stars.filter((s) => flatten(s.props.style).color !== flatten(stars[4]!.props.style).color);
    // 3.6 → 4 filled, 1 empty; the 5th (index 4) is the empty reference.
    expect(filled).toHaveLength(4);
  });

  it('clamps fill within max and honors a custom label', () => {
    const { getByLabelText } = renderThemed(
      <Rating value={12} max={10} label="Top rated" />,
      SEED_LIGHT
    );
    const row = getByLabelText('Top rated');
    const stars = row.findAllByType(Text).filter((t) => t.props.children === '★');
    expect(stars).toHaveLength(10);
    const colors = new Set(stars.map((s) => flatten(s.props.style).color));
    // all filled → a single (accent) color.
    expect(colors.size).toBe(1);
  });

  it('renders a trailing numeric value only with showValue', () => {
    const withValue = renderThemed(<Rating value={4.2} showValue />, SEED_LIGHT);
    expect(withValue.queryByText('4.2')).toBeTruthy();
    const without = renderThemed(<Rating value={4.2} />, SEED_LIGHT);
    expect(without.queryByText('4.2')).toBeNull();
  });
});

describe('StatusMessage (native)', () => {
  it('loading: an ActivityIndicator + polite live region + optional message', () => {
    const { root, queryByText } = renderThemed(
      <StatusMessage state="loading" message="Fetching…" />,
      SEED_LIGHT
    );
    expect(root.findAllByType(ActivityIndicator)).toHaveLength(1);
    expect(queryByText('Fetching…')).toBeTruthy();
    const live = root.findAll(
      (n) => n.props?.accessibilityLiveRegion === 'polite'
    );
    expect(live.length).toBeGreaterThan(0);
  });

  it('loading: message is optional (spinner alone)', () => {
    const { root } = renderThemed(<StatusMessage state="loading" />, SEED_LIGHT);
    expect(root.findAllByType(ActivityIndicator)).toHaveLength(1);
  });

  it('empty: a muted message and no spinner', () => {
    const { root, getByText } = renderThemed(
      <StatusMessage state="empty" message="No results" />,
      SEED_LIGHT
    );
    expect(getByText('No results')).toBeTruthy();
    expect(root.findAllByType(ActivityIndicator)).toHaveLength(0);
  });

  it('error: an alert-role danger message', () => {
    const { root, getByText } = renderThemed(<StatusMessage state="error" message="Boom" />, SEED_LIGHT);
    expect(getByText('Boom')).toBeTruthy();
    const alerts = root.findAll((n) => n.props?.accessibilityRole === 'alert');
    expect(alerts.length).toBeGreaterThan(0);
  });

  it('falls back to default copy for empty and error', () => {
    expect(renderThemed(<StatusMessage state="empty" />, SEED_LIGHT).getByText('Nothing here yet.')).toBeTruthy();
    expect(renderThemed(<StatusMessage state="error" />, SEED_LIGHT).getByText('Something went wrong.')).toBeTruthy();
  });

  it('every rendered hex traces to a compiled token (all states, both seeds)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      (['loading', 'empty', 'error'] as const).forEach((state) => {
        const { root } = renderThemed(<StatusMessage state={state} message="msg" />, seed);
        const allowed = tokenHexSet(seed);
        renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
      });
    });
  });
});

describe('token purity (native, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <Card>
          <Stack gap="md">
            <Eyebrow>Kicker</Eyebrow>
            <Input label="Email" value="a" onChangeText={() => undefined} />
            <StatusDot pulse={false} label="Live" />
            <Rating value={3} showValue />
            <GlassPanel>
              <Text>x</Text>
            </GlassPanel>
            <Button>Go</Button>
          </Stack>
        </Card>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

// --- local render helpers (kept out of the shared module) ---
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

function renderWith(ui: React.ReactElement) {
  return render(ui);
}
function renderThemedNoProvider(ui: React.ReactElement) {
  return render(ui);
}
function flatten(style: unknown): Record<string, unknown> {
  return (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;
}
