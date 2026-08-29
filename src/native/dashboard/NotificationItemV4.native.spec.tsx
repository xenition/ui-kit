import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { stateMix } from '../../primitives/internal/v4-state';
import { TextV4 } from '../primitives/TextV4';
import { NotificationItemV4 } from './NotificationItemV4';

const theme = compileTheme(SEED_LIGHT);

/** The one-line and two-line floors, composed the way the row module composes them. */
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;
/** The 44 leading slot — `2xl - xs`, the nav line's `minTap`. */
const LEADING = theme.spacing['2xl'] - theme.spacing.xs;
const BELL = resolveIconGlyph('bell');

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** The `Pressable` whose `style` is still a function of the press state. */
function pressableNode(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll(
    (n) => typeof n.props?.style === 'function' && n.props?.onPress !== undefined
  )[0];
}

/** The row's own resolved box, pressed or at rest. */
function rowStyle(root: ReactTestInstance, pressed = false): Record<string, unknown> {
  const fn = pressableNode(root);
  if (fn !== undefined) {
    return flat((fn.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
  }
  const node = root.findAll(
    (n) => n.props?.accessibilityLabel !== undefined && n.props?.style !== undefined
  )[0];
  return flat(node?.props?.style);
}

/** Every host view in the tree, as flattened styles. */
function viewStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

/** The 44 leading square, if the row drew one. */
function leadingSlot(root: ReactTestInstance): Record<string, unknown> | undefined {
  return viewStyles(root).find((s) => s.width === LEADING && s.height === LEADING);
}

/**
 * Every glyph and label in the tree, hidden ones included.
 *
 * A badge and a status dot are both decorative, so they carry
 * `importantForAccessibility="no-hide-descendants"` and the library's own
 * queries skip them — which is correct behaviour and useless for asserting
 * that they were drawn.
 */
function renderedText(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => n.type === 'Text' && typeof n.props?.children === 'string')
    .map((n) => n.props.children as string);
}

/** Every `TextV4` in the tree, by the props it was asked for. */
function toneProps(root: ReactTestInstance): { size?: string; tone?: string }[] {
  return root.findAll((n) => n.type === TextV4).map((n) => n.props as { size?: string; tone?: string });
}

/** Every rendered run of text, with its resolved style. */
function textStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => n.type === 'Text' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

function styleOfText(root: ReactTestInstance, content: string): Record<string, unknown> {
  const node = root.findAll(
    (n) => n.type === 'Text' && n.props?.children === content
  )[0];
  expect(node).toBeDefined();
  return flat(node?.props?.style);
}

describe('NotificationItemV4 (native) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const seen: string[] = [];
    const { getByText } = renderThemed(
      <NotificationItemV4
        title="Invoice paid"
        body="Acme Inc · $420.00"
        time="5m ago"
        unread
        onPress={() => seen.push('tap')}
      />,
      SEED_LIGHT
    );
    expect(getByText('Invoice paid')).toBeTruthy();
    expect(getByText('Acme Inc · $420.00')).toBeTruthy();
    expect(getByText('5m ago')).toBeTruthy();
    fireEvent.press(getByText('Invoice paid'));
    expect(seen).toEqual(['tap']);
  });

  it('merges the caller’s `style` over the row box, last', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" style={{ marginTop: 12 }} />,
      SEED_LIGHT
    );
    expect(rowStyle(root).marginTop).toBe(12);
  });

  it('is a plain view until it is given something to do', () => {
    const still = renderThemed(<NotificationItemV4 title="Static" />, SEED_LIGHT);
    expect(pressableNode(still.UNSAFE_root)).toBeUndefined();
    const tappable = renderThemed(
      <NotificationItemV4 title="Tap" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(pressableNode(tappable.UNSAFE_root)).toBeDefined();
  });

  it('names itself for a reader, and says "unread" when it is', () => {
    const read = renderThemed(<NotificationItemV4 title="Invoice paid" />, SEED_LIGHT);
    expect(read.getByLabelText('Invoice paid')).toBeTruthy();
    const unread = renderThemed(<NotificationItemV4 title="Invoice paid" unread />, SEED_LIGHT);
    expect(unread.getByLabelText('Invoice paid, unread')).toBeTruthy();
  });
});

describe('NotificationItemV4 (native) — the row metric is the family’s (§4.3)', () => {
  it('composes 56 / 72 from the scale rather than typing 56 or 48', () => {
    const one = renderThemed(<NotificationItemV4 title="A" />, SEED_LIGHT);
    const box = rowStyle(one.UNSAFE_root);
    expect(box.minHeight).toBe(ONE_LINE);
    expect(box.minHeight).not.toBe(48);
    expect(box.paddingHorizontal).toBe(theme.spacing.md);
    expect(box.paddingVertical).toBe(theme.spacing.sm);
    expect(box.gap).toBe(theme.spacing.md);

    const two = renderThemed(<NotificationItemV4 title="A" body="b" />, SEED_LIGHT);
    expect(rowStyle(two.UNSAFE_root).minHeight).toBe(TWO_LINE);
  });

  it('paints no card of its own — no radius, no surface, no shadow', () => {
    const { UNSAFE_root: root } = renderThemed(<NotificationItemV4 title="A" />, SEED_LIGHT);
    const box = rowStyle(root);
    expect(box.borderRadius).toBeUndefined();
    expect(box.backgroundColor).toBe('transparent');
    expect(box.shadowOpacity).toBeUndefined();
    expect(box.elevation).toBeUndefined();
  });

  it('gives the text column the module’s `xs` gap, not a `gap: 2`', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" body="b" />,
      SEED_LIGHT
    );
    const column = viewStyles(root).find((s) => s.flex === 1 && s.gap !== undefined);
    expect(column?.gap).toBe(theme.spacing.xs);
    expect(column?.gap).not.toBe(2);
  });
});

describe('NotificationItemV4 (native) — the badge replaces the dot (§4.3 / §4.7)', () => {
  it('fills a 44 leading slot with a tinted circular badge, never an 8×8 dot', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Invoice paid" />,
      SEED_LIGHT
    );
    expect(leadingSlot(root)).toBeDefined();
    expect(LEADING).toBe(44);
    // The default category glyph, drawn in a badge — not a bare mark.
    expect(renderedText(root)).toContain(BELL);
    const badge = viewStyles(root).find(
      (s) =>
        typeof s.width === 'number' &&
        s.width === s.height &&
        s.borderRadius === (s.width as number) / 2 &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    expect(badge).toBeDefined();
    expect(badge?.width).toBeGreaterThanOrEqual(LEADING);
    // The base's three literals are gone with it.
    viewStyles(root).forEach((s) => {
      expect(s.marginTop).not.toBe(6);
      expect(s.width === 8 && s.height === 8).toBe(false);
    });
  });

  it('takes a category `icon` and a §4.7 tone', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Payment" icon="card" iconTone="success" />,
      SEED_LIGHT
    );
    expect(renderedText(root)).toContain(resolveIconGlyph('card'));
  });

  it('lets `leading` carry a person, and `leading={null}` empty the slot', () => {
    const custom = renderThemed(
      <NotificationItemV4 title="Ada" leading={<RNText>own</RNText>} />,
      SEED_LIGHT
    );
    expect(custom.getByText('own')).toBeTruthy();
    expect(renderedText(custom.UNSAFE_root)).not.toContain(BELL);

    const bare = renderThemed(<NotificationItemV4 title="Ada" leading={null} />, SEED_LIGHT);
    expect(leadingSlot(bare.UNSAFE_root)).toBeUndefined();
    expect(renderedText(bare.UNSAFE_root)).not.toContain(BELL);
  });
});

describe('NotificationItemV4 (native) — the unread / selected ground (§4.3)', () => {
  it('paints the compiler’s `selected` token, never a hand-mixed primary', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" unread />,
      SEED_LIGHT
    );
    // The compiler's own slot, which ships with `onSelected` beside it — not a
    // tint this component mixed and never measured. (The base's hand-rolled
    // `primary` at 12% over `surface` happens to land on the same value for
    // this seed, which is the point: the compiler already owned this colour,
    // and owning it here meant owning it WITHOUT the guaranteed ink.)
    expect(rowStyle(root).backgroundColor).toBe(theme.light.selected);
    expect(theme.light.onSelected).toBeDefined();
  });

  it('is transparent when read — the container owns the card', () => {
    const { UNSAFE_root: root } = renderThemed(<NotificationItemV4 title="A" />, SEED_LIGHT);
    expect(rowStyle(root).backgroundColor).toBe('transparent');
  });

  it('takes the same one token for `selected`, rather than a second tint', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" selected />,
      SEED_LIGHT
    );
    expect(rowStyle(root).backgroundColor).toBe(theme.light.selected);
  });

  it('says unread three ways: bold title, the ground, and a trailing state dot', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Invoice paid" time="5m" unread />,
      SEED_LIGHT
    );
    expect(styleOfText(root, 'Invoice paid').fontWeight).toBe('700');
    const dot = root.findAll((n) => n.props?.testID === 'xen-v4-status-fill')[0];
    expect(dot).toBeDefined();
    expect(flat(dot?.props?.style).backgroundColor).toBe(theme.light.primaryText);
    // Not pulsing: a list of unread rows blinking in unison is noise.
    expect(root.findAll((n) => n.props?.testID === 'xen-v4-status-echo')).toHaveLength(0);
  });

  it('leaves a read row semibold and dotless', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Invoice paid" time="5m" />,
      SEED_LIGHT
    );
    expect(styleOfText(root, 'Invoice paid').fontWeight).toBe('600');
    expect(root.findAll((n) => n.props?.testID === 'xen-v4-status-fill')).toHaveLength(0);
  });
});

describe('NotificationItemV4 (native) — typography and the timestamp (§4.3)', () => {
  it('sets title `base`/`onSurface`, body `sm`/`mutedText`, stamp `xs`/`mutedText`', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Invoice paid" body="Acme Inc" time="5m ago" />,
      SEED_LIGHT
    );
    expect(styleOfText(root, 'Invoice paid').fontSize).toBe(theme.typography.scale.base);
    expect(styleOfText(root, 'Invoice paid').color).toBe(theme.light.onSurface);
    expect(styleOfText(root, 'Acme Inc').fontSize).toBe(theme.typography.scale.sm);
    expect(styleOfText(root, 'Acme Inc').color).toBe(theme.light.mutedText);
    expect(styleOfText(root, '5m ago').fontSize).toBe(theme.typography.scale.xs);
    expect(styleOfText(root, '5m ago').color).toBe(theme.light.mutedText);
  });

  it('asks for `mutedText`, never the `muted` FILL — the bug the base shipped', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="Invoice paid" body="Acme Inc" time="5m ago" leading={null} />,
      SEED_LIGHT
    );
    const tones = toneProps(root);
    expect(tones).toHaveLength(3);
    expect(tones.map((t) => t.tone)).toEqual(['onSurface', 'mutedText', 'mutedText']);
    // Asserted on the PROP rather than the resolved hex on purpose: a seed
    // whose `muted` already clears the text bar compiles the two slots to the
    // same value, and the base's bug was asking for the wrong one.
    tones.forEach((t) => expect(t.tone).not.toBe('muted'));
    // Every run still resolves to a real colour.
    textStyles(root).forEach((s) => expect(typeof s.color).toBe('string'));
  });

  it('top-aligns the stamp on a two-line row and centres it on a one-line row', () => {
    const two = renderThemed(
      <NotificationItemV4 title="A" body="b" time="5m" />,
      SEED_LIGHT
    );
    const trailingTwo = viewStyles(two.UNSAFE_root).find(
      (s) => s.flexShrink === 0 && s.flexDirection === 'row'
    );
    expect(trailingTwo?.alignSelf).toBe('flex-start');

    const one = renderThemed(<NotificationItemV4 title="A" time="5m" />, SEED_LIGHT);
    const trailingOne = viewStyles(one.UNSAFE_root).find(
      (s) => s.flexShrink === 0 && s.flexDirection === 'row'
    );
    expect(trailingOne?.alignSelf).toBeUndefined();
  });
});

describe('NotificationItemV4 (native) — press is the state layer (§4.3)', () => {
  it('tints the container with the opaque card pair and never dims the content', () => {
    const both = compileTheme(SEED_BOTH);
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" leading={null} onPress={() => undefined} />,
      SEED_BOTH
    );
    const pressed = rowStyle(root, true);
    expect(pressed.backgroundColor).toBe(
      stateMix(both.light.card, both.light.onCard, 'pressed', both.state)
    );
    // `opacity: pressed ? 0.7 : 1` is deleted, not translated — dimming the
    // content is what M3 spends 0.38 on to mean DISABLED.
    expect(pressed.opacity).toBeUndefined();
    expect(rowStyle(root, false).opacity).toBeUndefined();
  });

  it('presses an unread row over its own `selected` pair, not over the card', () => {
    const { UNSAFE_root: root } = renderThemed(
      <NotificationItemV4 title="A" unread onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(rowStyle(root, true).backgroundColor).toBe(
      stateMix(theme.light.selected, theme.light.onSelected, 'pressed', theme.state)
    );
  });
});

describe('NotificationItemV4 (native) — empty states (§4.5)', () => {
  it('renders nothing when there is no title, no body and no time', () => {
    expect(renderThemed(<NotificationItemV4 title="   " />, SEED_LIGHT).toJSON()).toBeNull();
    expect(
      renderThemed(<NotificationItemV4 title="" body="" time="" />, SEED_LIGHT).toJSON()
    ).toBeNull();
  });

  it('still renders a blank-titled row that has a body or a stamp', () => {
    const withBody = renderThemed(
      <NotificationItemV4 title="" body="Acme Inc" />,
      SEED_LIGHT
    );
    expect(withBody.toJSON()).not.toBeNull();
    expect(withBody.getByText('Acme Inc')).toBeTruthy();
    expect(
      renderThemed(<NotificationItemV4 title="" time="5m" />, SEED_LIGHT).toJSON()
    ).not.toBeNull();
  });

  it('survives a title alone: one badge, one line, no trailing column', () => {
    const { UNSAFE_root: root } = renderThemed(<NotificationItemV4 title="A" />, SEED_LIGHT);
    expect(
      viewStyles(root).find((s) => s.flexShrink === 0 && s.flexDirection === 'row')
    ).toBeUndefined();
  });
});

describe('NotificationItemV4 (native) — token purity', () => {
  it('paints nothing that is not a compiled token', () => {
    ([SEED_LIGHT, SEED_BOTH] as const).forEach((seed) => {
      // `leading={null}`: a soft badge's ground is a `mixToken` of two tokens
      // and its ink is `ensureContrast`-walked — derivations OF tokens rather
      // than tokens, already covered by `IconV4`'s own spec.
      const { UNSAFE_root: root } = renderThemed(
        <NotificationItemV4 title="A" body="b" time="5m" unread leading={null} />,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
