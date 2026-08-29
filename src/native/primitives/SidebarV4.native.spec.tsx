import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { MIN_CONTRAST, compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { SELECT_MIX } from '../../primitives/internal/v4-data';
import type { ThemeSeed } from '../../theme/types';
import type { SidebarGroup, SidebarProps } from './Sidebar';
import { SidebarV4 } from './SidebarV4';

const GROUPS: SidebarGroup[] = [
  { label: 'Workspace', items: [{ label: 'Overview', active: true }, { label: 'Reports' }] },
];

function mount(props: Partial<SidebarProps> = {}, seed: ThemeSeed = SEED_LIGHT, scheme?: 'light' | 'dark') {
  return renderThemed(<SidebarV4 groups={GROUPS} {...props} />, seed, scheme);
}

function rowOf(root: ReactTestInstance, label: string): ReactTestInstance | undefined {
  return root.findAll(
    (n) => n.props?.accessibilityLabel === label && typeof n.props?.style === 'function'
  )[0];
}

function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

describe('SidebarV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: SidebarProps = {
      brand: 'Xenition',
      groups: GROUPS,
      footer: <Text>Sign out</Text>,
    };
    const asV4: React.ComponentProps<typeof SidebarV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders the brand, headings, rows and footer', () => {
    const { getByText } = mount({ brand: 'Xenition', footer: <Text>Sign out</Text> });
    expect(getByText('Xenition')).toBeTruthy();
    expect(getByText('Workspace')).toBeTruthy();
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Sign out')).toBeTruthy();
  });

  it('accepts a flat items list as well as groups', () => {
    const { getByText, queryByText } = mount({ groups: undefined, items: [{ label: 'Inbox' }] });
    expect(getByText('Inbox')).toBeTruthy();
    expect(queryByText('Workspace')).toBeNull();
  });

  it('tints the current row instead of repainting it in solid brand', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root, getByText } = mount();
    const active = styleAt(rowOf(UNSAFE_root, 'Overview'), false);
    // The base fills solid `primary`, which takes the icon, the label and the
    // group structure with it (§35.6 — colour as hierarchy, not noise).
    expect(active.backgroundColor).not.toBe(theme.light.primary);
    expect(active.backgroundColor).toBe(
      mixToken(theme.light.surface, theme.light.primary, SELECT_MIX)
    );
    // The brand TEXT slot, which is contrast-corrected; `primary` is a fill.
    expect(getByText('Overview').props.style.color).toBe(theme.light.primaryText);
    expect(getByText('Overview').props.style.fontWeight).toBe('600');

    const idle = styleAt(rowOf(UNSAFE_root, 'Reports'), false);
    expect(idle.backgroundColor).toBe('transparent');
    expect(getByText('Reports').props.style.color).toBe(theme.light.onSurface);
  });

  it('derives the tint from the SCHEME-RESOLVED slots, so it inverts correctly', () => {
    const theme = compileTheme(SEED_DARK);
    const { UNSAFE_root } = mount({}, SEED_DARK, 'dark');
    expect(styleAt(rowOf(UNSAFE_root, 'Overview'), false).backgroundColor).toBe(
      mixToken(theme.dark.surface, theme.dark.primary, SELECT_MIX)
    );
    // Never a ramp step: `ramps.primary[50]` carries the light orientation in
    // both schemes, so it is the palest step on a dark page too.
    expect(styleAt(rowOf(UNSAFE_root, 'Overview'), false).backgroundColor).not.toBe(
      theme.ramps.primary[50]
    );
  });

  it('marks the current row for the accessibility layer, not only the pixels', () => {
    const { UNSAFE_root } = mount();
    expect(rowOf(UNSAFE_root, 'Overview')!.props.accessibilityState.selected).toBe(true);
    expect(rowOf(UNSAFE_root, 'Reports')!.props.accessibilityState.selected).toBe(false);
  });

  it('is NOT a layer: a persistent rail casts no shadow', () => {
    // §11 — the rail is attached to the page edge and separated by a hairline.
    // The drawer that slides it in over the page is AppShellV4's layer.
    const { UNSAFE_root } = mount();
    for (const style of UNSAFE_root.findAll(() => true).map((n) => flatStyle(n.props?.style))) {
      expect(style.shadowOpacity).toBeUndefined();
      expect(style.elevation).toBeUndefined();
    }
  });

  it('headings use the AA-promising muted slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount();
    expect(getByText('Workspace').props.style.color).toBe(theme.light.mutedText);
    // The promise, asserted rather than assumed: at seeds where `muted`
    // already clears AA the two slots compile identical, and the difference
    // only shows on the seeds where it does not.
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(
      MIN_CONTRAST
    );
  });

  it('gives every row a real tap target', () => {
    const spacing = compileTheme(SEED_LIGHT).spacing;
    const { UNSAFE_root } = mount();
    for (const label of ['Overview', 'Reports']) {
      expect(styleAt(rowOf(UNSAFE_root, label), false).minHeight).toBe(
        spacing['2xl'] - spacing.xs
      );
    }
  });

  it('presses with the M3 state layer over whichever ground the row has', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    const idlePressed = styleAt(rowOf(UNSAFE_root, 'Reports'), true).backgroundColor;
    expect(idlePressed).not.toBe('transparent');
    expect(idlePressed).not.toBe(theme.light.border);
    // The active row deepens from ITS ground, not from the page's.
    const activePressed = styleAt(rowOf(UNSAFE_root, 'Overview'), true).backgroundColor;
    expect(activePressed).not.toBe(idlePressed);
  });

  it('fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = mount({ groups: [{ items: [{ label: 'Overview', onSelect }] }] });
    fireEvent.press(getByText('Overview'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('survives its empty state: no brand, no groups, no footer', () => {
    const { toJSON } = renderThemed(<SidebarV4 />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
  });

  it('paints only colours that exist in — or are mixed from — the compiled theme', () => {
    const { UNSAFE_root } = mount();
    const theme = compileTheme(SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    allowed.add(mixToken(theme.light.surface, theme.light.primary, SELECT_MIX).toLowerCase());
    for (const hex of renderedStyleHexes(UNSAFE_root)) {
      expect(allowed.has(hex) || allowed.has(hex.slice(0, 7))).toBe(true);
    }
  });
});
