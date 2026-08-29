import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import type { RenderResult } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed, tokenHexSet } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { TINT, TONE_SLOTS } from '../../primitives/internal/feedback-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { useToast } from './Toast';
import type { ToastOptions, ToastTone } from './Toast';
import { ToastProviderV4 } from './ToastProviderV4';

const TONES: ToastTone[] = ['info', 'success', 'warn', 'danger'];

/**
 * A consumer that reaches the toast API the way a real app does — through
 * `useToast()` imported from `Toast.tsx`, NOT through anything this component
 * exports. If `ToastProviderV4` had declared a second context, every one of
 * these tests would throw at this line.
 */
function Trigger({ options, label = 'fire' }: { options: ToastOptions; label?: string }) {
  const { toast } = useToast();
  return (
    <Text accessibilityRole="button" accessibilityLabel={label} onPress={() => toast(options)}>
      {label}
    </Text>
  );
}

function renderProvider(
  ui: React.ReactNode,
  seed = SEED_LIGHT,
  scheme?: 'light' | 'dark'
): RenderResult {
  return renderThemed(<ToastProviderV4>{ui}</ToastProviderV4>, seed, scheme);
}

/*
 * Every spec below destructures `UNSAFE_root` rather than RNTL's `root`. RNTL's
 * `root` is scoped to the first child of what was rendered, and the toast
 * viewport is a *sibling* of the provider's children — so it is invisible from
 * there.
 */

/** Flatten a node's `style` (array, nested arrays, or object) into one record. */
function flat(node: ReactTestInstance): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') Object.assign(merged, style as Record<string, unknown>);
  };
  walk(node.props?.style);
  return merged;
}

/** Every toast card currently on screen (the nodes carrying a live region). */
function cards(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll(
    (n) =>
      typeof n.type === 'string' &&
      (n.props?.accessibilityRole === 'summary' || n.props?.accessibilityRole === 'alert')
  );
}

/** The absolutely-positioned viewport, if one is rendered at all. */
function overlays(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && flat(n).position === 'absolute');
}

/** The dismiss control of the first toast. */
function closeButton(root: ReactTestInstance): ReactTestInstance {
  const found = root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === 'Dismiss'
  );
  if (found.length === 0) throw new Error('no dismiss control rendered');
  return found[0] as ReactTestInstance;
}

function press(root: ReactTestInstance, label: string): void {
  const target = root.findAll(
    (n) => n.props?.accessibilityLabel === label && n.props?.onPress
  )[0];
  if (target === undefined) throw new Error(`nothing pressable labelled "${label}"`);
  act(() => {
    fireEvent.press(target);
  });
}

describe('ToastProviderV4 (native) — the shared context', () => {
  it('serves `useToast()` from `Toast.tsx` — one context, not two', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    expect(cards(root)).toHaveLength(0);
    press(root, 'fire');
    expect(cards(root)).toHaveLength(1);
  });

  it('reuses the base provider component object itself', () => {
    // Recovering `ToastContext.Provider` rather than creating a new context is
    // what makes the test above pass; assert the mechanism directly so a future
    // refactor that quietly adds `React.createContext` fails here first.
    const file = fs.readFileSync(path.join(__dirname, 'ToastProviderV4.tsx'), 'utf8');
    expect(file).not.toMatch(/createContext\(/);
    expect(file).toMatch(/probe\.type/);
  });

  it('hands back an id `dismiss()` can close', () => {
    function IdTrigger() {
      const { toast, dismiss } = useToast();
      const idRef = React.useRef<number | null>(null);
      return (
        <>
          <Text
            accessibilityRole="button"
            accessibilityLabel="fire"
            onPress={() => {
              idRef.current = toast({ title: 'Bye' });
            }}
          >
            fire
          </Text>
          <Text
            accessibilityRole="button"
            accessibilityLabel="close"
            onPress={() => idRef.current !== null && dismiss(idRef.current)}
          >
            close
          </Text>
        </>
      );
    }
    const { UNSAFE_root: root } = renderProvider(<IdTrigger />);
    press(root, 'fire');
    expect(cards(root)).toHaveLength(1);
    press(root, 'close');
    expect(cards(root)).toHaveLength(0);
  });
});

describe('ToastProviderV4 (native) — showing, dismissing, tones', () => {
  it('renders the title and the description', () => {
    const { UNSAFE_root: root, getByText } = renderProvider(
      <Trigger options={{ title: 'Saved', description: 'Your changes are live.' }} />
    );
    press(root, 'fire');
    expect(getByText('Saved')).toBeTruthy();
    expect(getByText('Your changes are live.')).toBeTruthy();
  });

  it('dismisses on the ✕', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    press(root, 'Dismiss');
    expect(cards(root)).toHaveLength(0);
  });

  it('paints every tone as an OPAQUE tint over `surface`, with the tone on the rule', () => {
    const theme = compileTheme(SEED_LIGHT);
    TONES.forEach((tone) => {
      const { UNSAFE_root: root, unmount } = renderProvider(<Trigger options={{ title: tone, tone }} />);
      press(root, 'fire');
      const style = flat(cards(root)[0] as ReactTestInstance);
      const slot = TONE_SLOTS[tone].fill;
      // Not `rgba(...)`: a translucent wash is a different colour on a card, on
      // a sheet and on the page, and the labels promise AA on only one.
      expect(style.backgroundColor).toBe(
        mixToken(theme.light.surface, theme.light[slot] as string, TINT)
      );
      expect(style.borderLeftColor).toBe(theme.light[slot]);
      expect(style.borderColor).toBe(theme.light.border);
      unmount();
    });
  });

  it('keeps the live region, and lets `danger` interrupt', () => {
    (['info', 'success', 'warn'] as const).forEach((tone) => {
      const { UNSAFE_root: root, unmount } = renderProvider(<Trigger options={{ title: tone, tone }} />);
      press(root, 'fire');
      const el = cards(root)[0] as ReactTestInstance;
      expect(el.props.accessibilityRole).toBe('summary');
      expect(el.props.accessibilityLiveRegion).toBe('polite');
      unmount();
    });
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Failed', tone: 'danger' }} />);
    press(root, 'fire');
    expect((cards(root)[0] as ReactTestInstance).props.accessibilityRole).toBe('alert');
    expect((cards(root)[0] as ReactTestInstance).props.accessibilityLiveRegion).toBe('assertive');
  });

  it('stacks several toasts and dismisses them one at a time', () => {
    const { UNSAFE_root: root } = renderProvider(
      <>
        <Trigger options={{ title: 'One' }} label="a" />
        <Trigger options={{ title: 'Two' }} label="b" />
      </>
    );
    press(root, 'a');
    press(root, 'b');
    expect(cards(root)).toHaveLength(2);
    press(root, 'Dismiss');
    expect(cards(root)).toHaveLength(1);
  });
});

describe('ToastProviderV4 (native) — the empty state', () => {
  it('renders no overlay at all when nothing is showing', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    expect(overlays(root)).toHaveLength(0);
    press(root, 'fire');
    expect(overlays(root).length).toBeGreaterThan(0);
    press(root, 'Dismiss');
    // Back to nothing: no absolutely-positioned node left over the app for a
    // touch or an accessibility sweep to walk into.
    expect(overlays(root)).toHaveLength(0);
  });

  it('still renders its children with no toasts', () => {
    const { getByText } = renderProvider(<Text>app</Text>);
    expect(getByText('app')).toBeTruthy();
  });
});

describe('ToastProviderV4 (native) — auto-dismiss', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('closes itself after the 4000ms default', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    act(() => {
      jest.advanceTimersByTime(3999);
    });
    expect(cards(root)).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(cards(root)).toHaveLength(0);
  });

  it('honours a custom duration', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved', duration: 1000 }} />);
    press(root, 'fire');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(cards(root)).toHaveLength(0);
  });

  it('stays put at `duration: 0`', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Sticky', duration: 0 }} />);
    press(root, 'fire');
    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    expect(cards(root)).toHaveLength(1);
  });

  it('clears pending timers on unmount', () => {
    const view = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(view.UNSAFE_root, 'fire');
    view.unmount();
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    act(() => {
      jest.advanceTimersByTime(10_000);
    });
    // The base's dwell timer would fire `setItems` on a dead tree.
    const leaked = spy.mock.calls
      .map((args) => String(args[0]))
      .filter((message) => /unmounted|state update/i.test(message));
    expect(leaked).toEqual([]);
    spy.mockRestore();
  });
});

describe('ToastProviderV4 (native) — the dismiss control', () => {
  it('clears the 44 touch floor in both axes', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const close = closeButton(root);
    const style = flat(close);
    // The base wrapped a bare glyph in `hitSlop={8}` — which grows the touch
    // area but not the control, and still did not reach 44 in either axis.
    expect(style.minWidth).toBe(44);
    expect(style.minHeight).toBe(44);
    expect(close.props.accessibilityRole).toBe('button');
    expect(close.props.accessibilityLabel).toBe('Dismiss');
  });

  it('takes the shared M3 state layer on press, rather than dimming the glyph', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    expect(flat(closeButton(root)).backgroundColor).toBeUndefined();
    act(() => {
      fireEvent(closeButton(root), 'pressIn');
    });
    const pressed = flat(closeButton(root)).backgroundColor as string;
    // `onSurface` at M3's pressed opacity, as a ground-independent rgba layer —
    // the card under it wears a tone tint the button does not own.
    expect(pressed).toMatch(/^rgba\(/);
    expect(pressed).toContain(String(theme.state.pressed));
    // Never an opacity change: dimming CONTENT is M3's `disabled` signal.
    expect(flat(closeButton(root)).opacity).toBeUndefined();
  });
});

describe('ToastProviderV4 (native) — depth and motion', () => {
  it('takes `elevation.sheet` off the compiled theme', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const style = flat(cards(root)[0] as ReactTestInstance);
    expect(style.shadowColor).toBe(theme.lightElevation.sheet.color);
    expect(style.shadowRadius).toBe(theme.lightElevation.sheet.radius);
    expect(style.shadowOpacity).toBe(theme.lightElevation.sheet.opacity);
    expect(style.elevation).toBe(theme.lightElevation.sheet.android);
  });

  it('goes flat under a `depth: "flat"` seed with no branch at the call site', () => {
    const flatSeed = { ...SEED_LIGHT, depth: 'flat' as const };
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />, flatSeed);
    press(root, 'fire');
    expect(flat(cards(root)[0] as ReactTestInstance).shadowOpacity).toBe(0);
  });

  it('animates its arrival, and drops the travel under Reduce Motion', () => {
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const style = flat(cards(root)[0] as ReactTestInstance);
    // Motion-on: an opacity ramp plus a translate, both driven by one value.
    expect(style.opacity).toBeDefined();
    expect(Array.isArray(style.transform)).toBe(true);
    expect((style.transform as unknown[]).length).toBe(1);
  });

  it('drops the travel entirely when the OS asks for reduced motion', async () => {
    const { AccessibilityInfo } = require('react-native');
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    // Let the async `isReduceMotionEnabled()` read settle.
    await act(async () => {
      await Promise.resolve();
    });
    expect((flat(cards(root)[0] as ReactTestInstance).transform as unknown[]).length).toBe(0);
  });
});

describe('ToastProviderV4 (native) — token purity', () => {
  it('colours text with `mutedText`, never with the `muted` FILL', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root, getByText } = renderProvider(
      <Trigger options={{ title: 'Saved', description: 'Body' }} />
    );
    press(root, 'fire');
    expect(flat(getByText('Body')).color).toBe(theme.light.mutedText);
    // The glyph is decorative (`aria-hidden`'s native equivalent), so RNTL
    // hides it from queries unless asked.
    const glyph = getByText('✕', { includeHiddenElements: true });
    expect(flat(glyph).color).toBe(theme.light.mutedText);

    // `mutedText` is `muted` corrected against `surface` to AA, and on the
    // reference seeds the correction happens to be a no-op — the two slots hold
    // the same hex. So the value cannot prove which SLOT was read; the source
    // can, and the CONTRACT is the whole point: `muted` is a fill and carries
    // no contrast promise (`theme/types.ts`), `mutedText` carries one.
    const file = fs.readFileSync(path.join(__dirname, 'ToastProviderV4.tsx'), 'utf8');
    expect(file).toMatch(/tone="mutedText"/);
    expect(file).toMatch(/color="mutedText"/);
    expect(file).not.toMatch(/tone="muted"/);
    expect(file).not.toMatch(/color="muted"/);

    // The promise `mutedText` carries and `muted` does not.
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('sizes and spaces from the scale — no literal geometry but the named 44', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { spacing, radius } = theme;
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const style = flat(cards(root)[0] as ReactTestInstance);
    expect(style.padding).toBe(spacing.md);
    expect(style.gap).toBe(spacing.sm);
    expect(style.borderRadius).toBe(radius.md);
    // The rule is a spacing step, not the base's literal 4.
    expect(style.borderLeftWidth).toBe(spacing.xs);
    // 1 is the hairline §10.1 allows as a bare number.
    expect(style.borderWidth).toBe(1);
    // The base hard-coded `maxWidth: 420`; this re-scales with the seed and
    // matches what the web twin composes with `calc(var(--xen-space-2xl)*8)`.
    expect(style.maxWidth).toBe(spacing['2xl'] * 8);
  });

  it('offsets the viewport from the scale plus the device inset', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const style = flat(overlays(root)[0] as ReactTestInstance);
    // 24 is the mocked notch inset from `spec-support`.
    expect(style.top).toBe(theme.spacing.xl + 24);
    expect(style.paddingHorizontal).toBe(theme.spacing.md);
    expect(style.gap).toBe(theme.spacing.sm);
  });

  it('paints no colour that is not a token or a composited tone tint', () => {
    const allowed = tokenHexSet(SEED_DARK);
    const theme = compileTheme(SEED_DARK);
    TONES.forEach((tone) => {
      allowed.add(
        mixToken(theme.dark.surface, theme.dark[TONE_SLOTS[tone].fill] as string, TINT).toLowerCase()
      );
    });
    const { UNSAFE_root: root } = renderProvider(
      <Trigger options={{ title: 'Saved', description: 'Body', tone: 'danger' }} />,
      SEED_DARK,
      'dark'
    );
    press(root, 'fire');
    const hexes: string[] = [];
    root.findAll(() => true).forEach((node: ReactTestInstance) => {
      const style = flat(node);
      Object.values(style).forEach((value) => {
        if (typeof value === 'string') {
          (value.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).forEach((m) => hexes.push(m.toLowerCase()));
        }
      });
    });
    expect(hexes.length).toBeGreaterThan(0);
    hexes.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('ToastProviderV4 (native) — the surface-token decision', () => {
  it('stays on `surface`, because `popover` breaks the compiler’s AA promise', () => {
    // The justification in the component's doc comment, as an assertion: this
    // is why a floating panel does NOT take the floating-panel token here.
    const dark = compileTheme({ ...SEED_LIGHT, mode: 'both' }).dark;
    expect(contrastRatio(dark.mutedText, dark.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(dark.mutedText, dark.popover)).toBeLessThan(4.5);
    expect(contrastRatio(dark.dangerText, dark.popover)).toBeLessThan(4.5);
  });

  it('never paints the `popover` slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    press(root, 'fire');
    const style = flat(cards(root)[0] as ReactTestInstance);
    expect(style.backgroundColor).not.toBe(theme.light.popover);
  });
});
