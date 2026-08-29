import * as React from 'react';
import { Text, View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { expectedScrim, expectedSheetShadow, flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { stateMix } from '../../primitives/internal/v4-state';
import type { ThemeSeed } from '../../theme/types';
import { Button } from './Button';
import type { ContextMenuAction, ContextMenuProps } from './ContextMenu';
import { ContextMenuV4 } from './ContextMenuV4';

const GLASS_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'glass' };
const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };

const ACTIONS: ContextMenuAction[] = [
  { label: 'Edit' },
  { label: 'Duplicate', disabled: true },
  { label: 'Delete', danger: true },
];

function mount(props: Partial<ContextMenuProps> = {}, seed: ThemeSeed = SEED_LIGHT) {
  return renderThemed(
    <ContextMenuV4 actions={ACTIONS} {...props}>
      {props.children ?? <Button>Row</Button>}
    </ContextMenuV4>,
    seed
  );
}

function panelOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityRole === 'menu')[0];
}

function itemOf(root: ReactTestInstance, label: string): ReactTestInstance | undefined {
  // By label, and only the nodes carrying the function `style` — RN renders a
  // Pressable as a composite plus a host View, and only the former resolves
  // the pressed state.
  return root.findAll(
    (n) => n.props?.accessibilityLabel === label && typeof n.props?.style === 'function'
  )[0];
}

function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

describe('ContextMenuV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: ContextMenuProps = {
      actions: ACTIONS,
      children: <Button>Row</Button>,
      accessibilityLabel: 'Row actions',
    };
    const asV4: React.ComponentProps<typeof ContextMenuV4> = same;
    expect(asV4).toBe(same);
  });

  it('opens from a long press ON THE CHILD, even when the child is pressable', () => {
    // The bug this exists to fix: the base wraps `children` in its own
    // Pressable, and on native the deepest Pressable wins the responder — so a
    // kit <Button> child swallowed the long press and the menu never opened.
    const { getByText, queryByText, UNSAFE_root } = mount();
    expect(panelOf(UNSAFE_root)).toBeUndefined();
    fireEvent(getByText('Row'), 'longPress');
    expect(queryByText('Edit')).not.toBeNull();
  });

  it('does not open from a DISABLED child — the child is the target', () => {
    const { getByText, queryByText } = mount({ children: <Button disabled>Row</Button> });
    fireEvent(getByText('Row'), 'longPress');
    expect(queryByText('Edit')).toBeNull();
  });

  it('still runs whatever the child already did on long press', () => {
    const onLongPress = jest.fn();
    const { getByText, queryByText } = mount({
      children: <Button onLongPress={onLongPress}>Row</Button>,
    });
    fireEvent(getByText('Row'), 'longPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(queryByText('Edit')).not.toBeNull();
  });

  it('keeps the wrapper for a child that cannot take the gesture', () => {
    const { getByText, queryByText } = mount({
      children: (
        <View>
          <Text>Row</Text>
        </View>
      ),
    });
    // A plain View is a valid element and takes `onLongPress` via the wrapper
    // it becomes; either way the menu must open.
    fireEvent(getByText('Row').parent!, 'longPress');
    expect(queryByText('Edit')).not.toBeNull();
  });

  it('fires onSelect and dismisses; a disabled action does neither', () => {
    const onSelect = jest.fn();
    const onDisabled = jest.fn();
    const { getByText, queryByText } = mount({
      actions: [
        { label: 'Edit', onSelect },
        { label: 'Duplicate', onSelect: onDisabled, disabled: true },
      ],
    });
    fireEvent(getByText('Row'), 'longPress');
    fireEvent.press(getByText('Duplicate'));
    expect(onDisabled).not.toHaveBeenCalled();

    fireEvent.press(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(queryByText('Edit')).toBeNull();
  });

  it('scrims from the shadow colour, never from onSurface', () => {
    const { getByText, UNSAFE_root } = mount();
    fireEvent(getByText('Row'), 'longPress');
    const scrim = UNSAFE_root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .find((s) => s.position === 'absolute' && typeof s.backgroundColor === 'string');
    expect(scrim?.backgroundColor).toBe(expectedScrim(SEED_LIGHT));
    expect(scrim?.backgroundColor).not.toBe(compileTheme(SEED_LIGHT).light.onSurface);
  });

  it('floats on elevation.sheet, and flattens with no branch on a flat seed', () => {
    const lifted = mount();
    fireEvent(lifted.getByText('Row'), 'longPress');
    expect(flatStyle(panelOf(lifted.UNSAFE_root)!.props.style).shadowOpacity).toBe(
      expectedSheetShadow(SEED_LIGHT).shadowOpacity
    );

    const flat = mount({}, FLAT_SEED);
    fireEvent(flat.getByText('Row'), 'longPress');
    expect(flatStyle(panelOf(flat.UNSAFE_root)!.props.style).shadowOpacity).toBe(0);
  });

  it('turns translucent only when the seed asks for glass', () => {
    const glass = mount({}, GLASS_SEED);
    fireEvent(glass.getByText('Row'), 'longPress');
    expect(flatStyle(panelOf(glass.UNSAFE_root)!.props.style).borderWidth).toBe(1);
  });

  it('makes the destructive row the only coloured one, in its TEXT slot', () => {
    const colors = compileTheme(SEED_LIGHT).light;
    const { getByText } = mount();
    fireEvent(getByText('Row'), 'longPress');
    // `dangerText`, not `danger`: the plain slot is a FILL colour and carries
    // no promise as text.
    expect(getByText('Delete').props.style.color).toBe(colors.dangerText);
    expect(getByText('Edit').props.style.color).toBe(colors.onSurface);
  });

  it('presses with the M3 state layer, and dims a disabled row at M3’s 0.38', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText, UNSAFE_root } = mount();
    fireEvent(getByText('Row'), 'longPress');

    const first = itemOf(UNSAFE_root, 'Edit');
    expect(styleAt(first, false).backgroundColor).toBe('transparent');
    expect(styleAt(first, true).backgroundColor).toBe(
      stateMix(theme.light.surface, theme.light.onSurface, 'pressed', theme.state)
    );
    // Not `colors.border`: a hairline colour used as a surface is what the
    // base did.
    expect(styleAt(first, true).backgroundColor).not.toBe(theme.light.border);

    expect(styleAt(itemOf(UNSAFE_root, 'Duplicate'), false).opacity).toBe(
      theme.state.disabledContent
    );
    expect(styleAt(first, false).opacity).toBe(1);
  });

  it('gives every row a real tap target', () => {
    const spacing = compileTheme(SEED_LIGHT).spacing;
    const { getByText, UNSAFE_root } = mount();
    fireEvent(getByText('Row'), 'longPress');
    for (const label of ['Edit', 'Duplicate', 'Delete']) {
      expect(styleAt(itemOf(UNSAFE_root, label), false).minHeight).toBe(
        spacing['2xl'] - spacing.xs
      );
    }
  });

  it('survives its empty state: no actions at all', () => {
    const { getByText, UNSAFE_root } = mount({ actions: [] });
    fireEvent(getByText('Row'), 'longPress');
    expect(panelOf(UNSAFE_root)).toBeDefined();
    expect(itemOf(UNSAFE_root, 'Edit')).toBeUndefined();
  });
});
