import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed, tokenHexSet, renderedStyleHexes } from '../spec-support/render-native';
import { expectedScrim, expectedSheetShadow, flatStyle } from '../spec-support/surface-v4';
import type { ThemeSeed } from '../../theme/types';
import { compileTheme } from '../../theme/compile';
import type { DrawerProps } from './Drawer';
import { DrawerV4 } from './DrawerV4';

const GLASS_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'glass' };
const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };

function openDrawer(seed: ThemeSeed = SEED_LIGHT, props: Partial<DrawerProps> = {}) {
  return renderThemed(
    <DrawerV4 open onClose={() => {}} title="Filters" {...props}>
      <Text>drawer body</Text>
    </DrawerV4>,
    seed
  );
}

/** The panel: the one node marked as the modal's accessibility root. */
function panelOf(root: ReactTestInstance): ReactTestInstance {
  return root.findAll((n) => n.props?.accessibilityViewIsModal === true)[0]!;
}

/** The scrim: the absolutely-filled node carrying a background colour. */
function scrimStyleOf(root: ReactTestInstance): Record<string, unknown> {
  const node = root
    .findAll(() => true)
    .map((n) => flatStyle(n.props?.style))
    .find((s) => s.position === 'absolute' && typeof s.backgroundColor === 'string');
  return node ?? {};
}

describe('DrawerV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: DrawerProps = {
      open: true,
      onClose: () => {},
      side: 'left',
      title: 'Filters',
    };
    const asV4: React.ComponentProps<typeof DrawerV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders its title and body when open', () => {
    const { getByText } = openDrawer();
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('drawer body')).toBeTruthy();
  });

  it('scrims from the shadow colour in BOTH schemes — never from onSurface', () => {
    for (const seed of [SEED_LIGHT, SEED_DARK]) {
      const scheme = seed.mode === 'dark' ? 'dark' : 'light';
      const { toJSON, UNSAFE_root } = renderThemed(
        <DrawerV4 open onClose={() => {}}>
          <Text>drawer body</Text>
        </DrawerV4>,
        seed,
        scheme
      );
      expect(toJSON()).toBeTruthy();
      const scrim = scrimStyleOf(UNSAFE_root);
      expect(scrim.backgroundColor).toBe(expectedScrim(seed, scheme));
      // The bug this component exists to not repeat: at the warm/dark seed,
      // `onSurface` compiles near-white, so a scrim built from it is a white
      // veil over a dark page.
      const compiled = compileTheme(seed);
      const onSurface = scheme === 'dark' ? compiled.dark.onSurface : compiled.light.onSurface;
      expect(String(scrim.backgroundColor)).not.toContain(onSurface.slice(1));
    }
  });

  it('floats on elevation.sheet — the same altitude as every other V4 overlay', () => {
    const { UNSAFE_root } = openDrawer();
    const style = flatStyle(panelOf(UNSAFE_root).props.style);
    const shadow = expectedSheetShadow(SEED_LIGHT);
    expect(style.shadowColor).toBe(shadow.shadowColor);
    expect(style.shadowOpacity).toBe(shadow.shadowOpacity);
    expect(style.elevation).toBe(shadow.elevation);
  });

  it('is flat with no branch when the seed says flat', () => {
    const { UNSAFE_root } = openDrawer(FLAT_SEED);
    const style = flatStyle(panelOf(UNSAFE_root).props.style);
    expect(style.shadowOpacity).toBe(0);
    expect(style.elevation).toBe(0);
  });

  it('turns translucent only when the seed asks for glass', () => {
    const solid = flatStyle(panelOf(openDrawer(SEED_LIGHT).UNSAFE_root).props.style);
    expect(solid.backgroundColor).toBe(compileTheme(SEED_LIGHT).light.surface);
    expect(solid.borderWidth).toBeUndefined();

    const glass = flatStyle(panelOf(openDrawer(GLASS_SEED).UNSAFE_root).props.style);
    expect(glass.backgroundColor).not.toBe(compileTheme(GLASS_SEED).light.surface);
    // The hairline exists only on glass, where the panel edge would otherwise
    // disappear into a busy ground.
    expect(glass.borderWidth).toBe(1);
  });

  it('measures its width off the spacing scale, not a literal 360', () => {
    const { UNSAFE_root } = openDrawer();
    const style = flatStyle(panelOf(UNSAFE_root).props.style);
    expect(style.maxWidth).toBe(compileTheme(SEED_LIGHT).spacing['2xl'] * 7);
  });

  it('anchors to the side it was given, on both axes', () => {
    const horizontal = flatStyle(
      panelOf(openDrawer(SEED_LIGHT, { side: 'left' }).UNSAFE_root).props.style
    );
    expect(horizontal.height).toBe('100%');

    const vertical = flatStyle(
      panelOf(openDrawer(SEED_LIGHT, { side: 'bottom' }).UNSAFE_root).props.style
    );
    expect(vertical.width).toBe('100%');
    expect(vertical.maxHeight).toBe('85%');
  });

  it('survives its empty state: no title, no children', () => {
    const { queryByText } = renderThemed(<DrawerV4 open onClose={() => {}} />, SEED_LIGHT);
    expect(queryByText('Filters')).toBeNull();
  });

  it('paints only colours that exist in the compiled theme', () => {
    const { UNSAFE_root } = openDrawer(GLASS_SEED);
    const allowed = tokenHexSet(GLASS_SEED);
    for (const hex of renderedStyleHexes(UNSAFE_root)) {
      // Scrim and glass are token colours carrying an alpha suffix.
      expect(allowed.has(hex) || allowed.has(hex.slice(0, 7))).toBe(true);
    }
  });
});
