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
import { SettingsRowV4 } from './SettingsRowV4';

const theme = compileTheme(SEED_LIGHT);
const CHEVRON = resolveIconGlyph('chevron-right');

/** The one-line and two-line floors, composed the way the row module composes them. */
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;
/** The 44 leading slot — `2xl - xs`, the nav line's `minTap`. */
const LEADING = theme.spacing['2xl'] - theme.spacing.xs;

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

describe('SettingsRowV4 (native) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const seen: string[] = [];
    const { getByText } = renderThemed(
      <SettingsRowV4
        label="Notifications"
        value="On"
        description="Push, email and SMS"
        onPress={() => seen.push('tap')}
      />,
      SEED_LIGHT
    );
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('On')).toBeTruthy();
    expect(getByText('Push, email and SMS')).toBeTruthy();
    fireEvent.press(getByText('Notifications'));
    expect(seen).toEqual(['tap']);
  });

  it('renders a custom trailing control in place of the chevron', () => {
    const { getByText, queryAllByText } = renderThemed(
      <SettingsRowV4
        label="Dark mode"
        rightSlot={<RNText>switch</RNText>}
        onPress={() => undefined}
      />,
      SEED_LIGHT
    );
    expect(getByText('switch')).toBeTruthy();
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);
  });

  it('is a plain view until it is given something to do', () => {
    const still = renderThemed(<SettingsRowV4 label="Version" value="1.2.0" />, SEED_LIGHT);
    expect(pressableNode(still.UNSAFE_root)).toBeUndefined();

    const tappable = renderThemed(
      <SettingsRowV4 label="Account" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(pressableNode(tappable.UNSAFE_root)).toBeDefined();
  });

  it('accepts a caller style override on top of the shared box', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Version" style={{ opacity: 0.5 }} />,
      SEED_LIGHT
    );
    expect(rowStyle(root).opacity).toBe(0.5);
    expect(rowStyle(root).paddingHorizontal).toBe(theme.spacing.md);
  });

  it('typesets the label, description and value, and never inks with a fill', () => {
    const { getByText } = renderThemed(
      <SettingsRowV4 label="Notifications" description="Push and email" value="On" />,
      SEED_LIGHT
    );
    const label = flat(getByText('Notifications').props.style);
    const description = flat(getByText('Push and email').props.style);
    const value = flat(getByText('On').props.style);
    // §5: `medium`, not the family's `semibold` — twenty semibold labels down a
    // settings screen is a wall, and there is no avatar carrying the weight.
    expect(label.fontSize).toBe(theme.typography.scale.base);
    expect(label.fontWeight).toBe('500');
    expect(label.color).toBe(theme.light.onSurface);
    [description, value].forEach((run) => {
      expect(run.fontSize).toBe(theme.typography.scale.sm);
      // `mutedText`, not `colors.muted` — the base row uses the *fill* as the
      // ink for all three of these runs, which is the bug §4.3 names.
      expect(run.color).toBe(theme.light.mutedText);
    });
    expect(getByText('Notifications').props.numberOfLines).toBe(1);
  });
});

describe('SettingsRowV4 (native) — the family metric', () => {
  it('takes the one-line floor with a label alone', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Version" value="1.2.0" />,
      SEED_LIGHT
    );
    expect(rowStyle(root).minHeight).toBe(ONE_LINE);
  });

  it('takes the two-line floor once it carries a description', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Notifications" description="Push and email" />,
      SEED_LIGHT
    );
    expect(rowStyle(root).minHeight).toBe(TWO_LINE);
  });

  it('treats an empty description as no description', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Version" description="" />,
      SEED_LIGHT
    );
    expect(rowStyle(root).minHeight).toBe(ONE_LINE);
  });

  it('agrees with the rest of the row family instead of inventing a gutter', () => {
    const { UNSAFE_root: root } = renderThemed(<SettingsRowV4 label="Version" />, SEED_LIGHT);
    const box = rowStyle(root);
    // The base row paid `spacing.lg` here — §5 calls that mismatch the reason a
    // settings list and a people list did not look related.
    expect(box.paddingHorizontal).toBe(theme.spacing.md);
    expect(box.paddingHorizontal).not.toBe(theme.spacing.lg);
    expect(box.gap).toBe(theme.spacing.md);
    // `minHeight: 48` is named in brief §1 as a violation to remove.
    expect(box.minHeight).not.toBe(48);
    // §4.3: the container owns the card. §4.6: a row carries no depth.
    expect(box.backgroundColor).toBe('transparent');
    expect(box.borderRadius).toBeUndefined();
    expect(box.shadowOpacity).toBeUndefined();
    expect(box.height).toBeUndefined();
  });

  it('lays the text and trailing columns out with the shared recipe', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Theme" value="System" description="Follows the system" />,
      SEED_LIGHT
    );
    const column = viewStyles(root).find((s) => s.flex === 1 && s.minWidth === 0);
    expect(column).toBeDefined();
    expect(column?.gap).toBe(theme.spacing.xs);
    const trailing = viewStyles(root).find(
      (s) => s.flexDirection === 'row' && s.flexShrink === 0 && s.gap === theme.spacing.sm
    );
    expect(trailing).toBeDefined();
  });
});

describe('SettingsRowV4 (native) — the leading slot', () => {
  it('has none by default, so nothing existing moves', () => {
    const { UNSAFE_root: root } = renderThemed(<SettingsRowV4 label="Version" />, SEED_LIGHT);
    expect(
      viewStyles(root).find((s) => s.width === LEADING && s.height === LEADING)
    ).toBeUndefined();
  });

  it('draws a settings group as a tinted circular badge, never a bare dot', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Alerts" icon="bell" iconTone="warn" />,
      SEED_LIGHT
    );
    const slot = viewStyles(root).find((s) => s.width === LEADING && s.height === LEADING);
    expect(slot).toBeDefined();
    expect(slot?.flexShrink).toBe(0);
    const badge = viewStyles(root).find(
      (s) =>
        typeof s.width === 'number' &&
        s.width === s.height &&
        s.borderRadius === (s.width as number) / 2 &&
        typeof s.backgroundColor === 'string' &&
        s.backgroundColor !== 'transparent'
    );
    expect(badge).toBeDefined();
    // The 8×8 dot the sibling rows draw could never be one.
    expect(badge?.width).toBeGreaterThanOrEqual(LEADING);
  });

  it('lets an explicit leading slot win over the badge', () => {
    const { getByText, UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Alerts" icon="bell" leading={<RNText>own</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('own')).toBeTruthy();
    expect(
      viewStyles(root).find(
        (s) =>
          typeof s.width === 'number' &&
          s.width === s.height &&
          s.borderRadius === (s.width as number) / 2 &&
          typeof s.backgroundColor === 'string'
      )
    ).toBeUndefined();
  });
});

describe('SettingsRowV4 (native) — the chevron means navigation', () => {
  it('draws no chevron on a row that does nothing', () => {
    const { queryAllByText } = renderThemed(
      <SettingsRowV4 label="Version" value="1.2.0" />,
      SEED_LIGHT
    );
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);
  });

  it('draws one on a row that navigates', () => {
    const { queryAllByText } = renderThemed(
      <SettingsRowV4 label="Account" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(1);
  });

  it('gives a toggling row its control instead of a chevron', () => {
    const { getByText, queryAllByText } = renderThemed(
      <SettingsRowV4
        label="Dark mode"
        rightSlot={<RNText>switch</RNText>}
        onPress={() => undefined}
      />,
      SEED_LIGHT
    );
    // §4.3: a chevron when the row navigates, a control when it toggles — never
    // both, or the row promises a screen it never pushes.
    expect(queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);
    expect(getByText('switch')).toBeTruthy();
  });

  it('lets a caller force the affordance either way', () => {
    const off = renderThemed(
      <SettingsRowV4 label="Account" onPress={() => undefined} chevron={false} />,
      SEED_LIGHT
    );
    expect(off.queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(0);

    const on = renderThemed(<SettingsRowV4 label="Account" chevron />, SEED_LIGHT);
    expect(on.queryAllByText(CHEVRON, { includeHiddenElements: true })).toHaveLength(1);
  });

  it('draws it as an icon on the type scale, not as the `›` the base row typed', () => {
    const { getByText } = renderThemed(
      <SettingsRowV4 label="Account" onPress={() => undefined} />,
      SEED_LIGHT
    );
    const mark = flat(getByText(CHEVRON, { includeHiddenElements: true }).props.style);
    // The base row set this at `typography.scale.lg` in `colors.muted`, from a
    // literal character typed into the source.
    expect(mark.fontSize).toBe(theme.typography.scale.base);
    // A UI mark takes the `muted` slot, not `mutedText`: it is judged at 3:1
    // rather than as a run of text, and it is the one slot the web twin's
    // closed `IconColor` union can spell too.
    expect(mark.color).toBe(theme.light.muted);
  });
});

describe('SettingsRowV4 (native) — press is the state layer', () => {
  it('tints the container instead of dimming the row', () => {
    const both = compileTheme(SEED_BOTH);
    const pressed = (scheme: 'light' | 'dark'): Record<string, unknown> => {
      const { UNSAFE_root: root } = renderThemed(
        <SettingsRowV4 label="Account" onPress={() => undefined} />,
        SEED_BOTH,
        scheme
      );
      return rowStyle(root, true);
    };
    expect(pressed('light').backgroundColor).toBe(
      stateMix(both.light.card, both.light.onCard, 'pressed', both.state)
    );
    expect(pressed('dark').backgroundColor).toBe(
      stateMix(both.dark.card, both.dark.onCard, 'pressed', both.state)
    );
    // `opacity: pressed ? 0.7 : 1` is deleted, not translated — dimming the
    // content is M3's *disabled* signal, so a pressed row looked dead.
    expect(pressed('light').opacity).toBeUndefined();
  });

  it('goes back to transparent at rest', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Account" onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(rowStyle(root, false).backgroundColor).toBe('transparent');
  });

  it('paints the selected ground from the one token that ships a contrast pair', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Account" selected />,
      SEED_LIGHT
    );
    expect(rowStyle(root).backgroundColor).toBe(theme.light.selected);
  });
});

describe('SettingsRowV4 (native) — token purity', () => {
  it('paints nothing that is not a compiled token', () => {
    ([SEED_LIGHT, SEED_BOTH] as const).forEach((seed) => {
      const { UNSAFE_root: root } = renderThemed(
        <SettingsRowV4
          label="Notifications"
          description="Push and email"
          value="On"
          onPress={() => undefined}
        />,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('composes every metric from the spacing scale rather than typing it', () => {
    const { UNSAFE_root: root } = renderThemed(
      <SettingsRowV4 label="Notifications" description="Push and email" />,
      SEED_LIGHT
    );
    const box = rowStyle(root);
    expect(box.minHeight).toBe(theme.spacing['2xl'] + theme.spacing.lg);
    expect(box.paddingVertical).toBe(theme.spacing.sm);
  });
});

describe('SettingsRowV4 (native) — the empty state', () => {
  it('renders nothing rather than a blank band when it has nothing to show', () => {
    const { toJSON } = renderThemed(<SettingsRowV4 label="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('treats whitespace and empty strings as empty', () => {
    const { toJSON } = renderThemed(
      <SettingsRowV4 label="  " description="" value="" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('still renders when only a trailing control has something to say', () => {
    const { getByText } = renderThemed(
      <SettingsRowV4 label="" rightSlot={<RNText>switch</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('switch')).toBeTruthy();
  });
});
