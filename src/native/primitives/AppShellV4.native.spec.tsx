import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { expectedScrim, expectedSheetShadow, flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { ICON_GLYPHS } from '../../primitives/icon-names';
import type { ThemeSeed } from '../../theme/types';
import type { AppShellProps } from './AppShell';
import { AppShellV4 } from './AppShellV4';
import { SidebarV4 } from './SidebarV4';

const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };

function mount(props: Partial<AppShellProps> = {}, seed: ThemeSeed = SEED_LIGHT) {
  return renderThemed(
    <AppShellV4
      sidebar={<SidebarV4 items={[{ label: 'Overview', active: true }]} />}
      header="Dashboard"
      {...props}
    >
      <Text>page body</Text>
    </AppShellV4>,
    seed
  );
}

function toggleOf(root: ReactTestInstance, label = 'Toggle navigation'): ReactTestInstance {
  return root.findAll(
    (n) => n.props?.accessibilityLabel === label && typeof n.props?.style === 'function'
  )[0]!;
}

function drawerOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityViewIsModal === true)[0];
}

function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

describe('AppShellV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: AppShellProps = {
      sidebar: <Text>rail</Text>,
      header: 'Dashboard',
      children: <Text>page body</Text>,
      menuLabel: 'Menu',
      sidebarWidth: 300,
    };
    const asV4: React.ComponentProps<typeof AppShellV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders the bar, the title and the content', () => {
    const { getByText } = mount();
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('page body')).toBeTruthy();
  });

  it('opens the drawer from the menu button', () => {
    const { UNSAFE_root, queryByText } = mount();
    expect(queryByText('Overview')).toBeNull();
    fireEvent.press(toggleOf(UNSAFE_root));
    expect(queryByText('Overview')).not.toBeNull();
    fireEvent.press(UNSAFE_root.findAll((n) => n.props?.accessibilityLabel === 'Close navigation')[0]!);
    expect(queryByText('Overview')).toBeNull();
  });

  it('gives depth to the ONE container that is genuinely a layer', () => {
    const { UNSAFE_root } = mount();
    // Not the bar: a shadow there is honest only once content is under it.
    const bar = UNSAFE_root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .find((s) => s.borderBottomWidth === 1);
    expect(bar?.shadowOpacity).toBeUndefined();

    fireEvent.press(toggleOf(UNSAFE_root));
    const panel = flatStyle(drawerOf(UNSAFE_root)!.props.style);
    expect(panel.shadowOpacity).toBe(expectedSheetShadow(SEED_LIGHT).shadowOpacity);
  });

  it('is flat with no branch when the seed says flat', () => {
    const { UNSAFE_root } = mount({}, FLAT_SEED);
    fireEvent.press(toggleOf(UNSAFE_root));
    expect(flatStyle(drawerOf(UNSAFE_root)!.props.style).shadowOpacity).toBe(0);
  });

  it('scrims from the shadow colour, never from onSurface', () => {
    const { UNSAFE_root } = mount();
    fireEvent.press(toggleOf(UNSAFE_root));
    const scrim = UNSAFE_root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .find((s) => s.position === 'absolute' && typeof s.backgroundColor === 'string');
    expect(scrim?.backgroundColor).toBe(expectedScrim(SEED_LIGHT));
    expect(scrim?.backgroundColor).not.toBe(compileTheme(SEED_LIGHT).light.onSurface);
  });

  it('does not open the drawer with the modal’s bottom-up slide', () => {
    // `animationType="slide"` on RN means UP FROM THE BOTTOM. A left-anchored
    // rail arriving from underneath the screen says something false about where
    // it lives (§36.5), so V4 drives the horizontal travel itself.
    const { UNSAFE_root } = mount();
    const modal = UNSAFE_root.findAll((n) => n.props?.transparent === true)[0]!;
    expect(modal.props.animationType).toBe('none');
    fireEvent.press(toggleOf(UNSAFE_root));
    const panel = flatStyle(drawerOf(UNSAFE_root)!.props.style);
    expect(Array.isArray(panel.transform)).toBe(true);
    expect(Object.keys((panel.transform as Array<Record<string, unknown>>)[0]!)).toEqual([
      'translateX',
    ]);
  });

  it('makes the menu button a real tap target with the shared feedback', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    const toggle = toggleOf(UNSAFE_root);
    const idle = styleAt(toggle, false);
    expect(idle.minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    expect(idle.minWidth).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    expect(idle.backgroundColor).toBe('transparent');
    expect(styleAt(toggle, true).backgroundColor).not.toBe('transparent');
    expect(styleAt(toggle, true).backgroundColor).not.toBe(theme.light.border);
  });

  it('draws the hamburger through the kit’s own icon set', () => {
    // Not a raw `≡` in a Text: one idea, one symbol, kit-wide.
    const { getByText } = mount();
    // The glyph is decorative, so it is hidden from the accessibility tree —
    // which is correct: the button beside it already carries the label.
    expect(getByText(ICON_GLYPHS.menu, { includeHiddenElements: true })).toBeTruthy();
  });

  it('honours menuLabel and sidebarWidth', () => {
    const { UNSAFE_root } = mount({ menuLabel: 'Menu', sidebarWidth: 320 });
    fireEvent.press(toggleOf(UNSAFE_root, 'Menu'));
    expect(flatStyle(drawerOf(UNSAFE_root)!.props.style).width).toBe(320);
  });

  it('survives its empty state: no header at all', () => {
    const { toJSON, UNSAFE_root } = mount({ header: undefined });
    expect(toJSON()).toBeTruthy();
    // The toggle still exists — on a phone the drawer is the only way into
    // navigation, so it must not disappear with the title.
    expect(toggleOf(UNSAFE_root)).toBeDefined();
  });
});
