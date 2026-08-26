import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { expectedScrim, expectedSheetShadow, flatStyle } from '../spec-support/surface-v4';
import { MIN_CONTRAST, compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { stateMix } from '../../primitives/internal/v4-state';
import type { ThemeSeed } from '../../theme/types';
import { Button } from './Button';
import type { PopconfirmProps } from './Popconfirm';
import { PopconfirmV4 } from './PopconfirmV4';

const GLASS_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'glass' };
const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };

function mount(props: Partial<PopconfirmProps> = {}, seed: ThemeSeed = SEED_LIGHT) {
  return renderThemed(
    <PopconfirmV4
      // A real kit `<Button>`, not a bare `<Text>`. The bare element is exactly
      // what hid the original responder bug: on native the deepest Pressable
      // wins the touch, so a wrapped Button swallowed every tap.
      trigger={<Button>Delete</Button>}
      message="This cannot be undone."
      onConfirm={() => {}}
      {...props}
    />,
    seed
  );
}

function panelOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityRole === 'alert')[0];
}

function buttonOf(root: ReactTestInstance, label: string): ReactTestInstance | undefined {
  return root.findAll(
    (n) => n.props?.accessibilityRole === 'button' && n.props?.accessibilityLabel === label
  )[0];
}

/** RN resolves a function `style` at press time; call it the way RN would. */
function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

describe('PopconfirmV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: PopconfirmProps = {
      trigger: <Button>Delete</Button>,
      message: 'This cannot be undone.',
      onConfirm: () => {},
      onCancel: () => {},
      confirmLabel: 'Delete',
      cancelLabel: 'Keep',
    };
    const asV4: React.ComponentProps<typeof PopconfirmV4> = same;
    expect(asV4).toBe(same);
  });

  it('opens from a real kit Button trigger and confirms through it', () => {
    const onConfirm = jest.fn();
    const { getByText, queryByText, UNSAFE_root } = mount({ onConfirm });
    expect(panelOf(UNSAFE_root)).toBeUndefined();

    fireEvent.press(getByText('Delete'));
    expect(queryByText('This cannot be undone.')).not.toBeNull();

    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(queryByText('This cannot be undone.')).toBeNull();
  });

  it('does not open from a DISABLED trigger — the trigger is the button', () => {
    // The whole reason the trigger is cloned rather than wrapped: a wrapper
    // opens the dialog on a control the user was told was dead.
    const { getByText, queryByText } = mount({ trigger: <Button disabled>Delete</Button> });
    fireEvent.press(getByText('Delete'));
    expect(queryByText('This cannot be undone.')).toBeNull();
  });

  it('still runs whatever the trigger already did on press', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = mount({
      trigger: <Button onPress={onPress}>Delete</Button>,
    });
    fireEvent.press(getByText('Delete'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(queryByText('This cannot be undone.')).not.toBeNull();
  });

  it('falls back to a wrapper for a trigger that cannot take an onPress', () => {
    const { getByText, queryByText } = mount({ trigger: <Text>Delete</Text> });
    fireEvent.press(getByText('Delete'));
    expect(queryByText('This cannot be undone.')).not.toBeNull();
  });

  it('cancels through onCancel and closes', () => {
    const onCancel = jest.fn();
    const { getByText, queryByText } = mount({ onCancel });
    fireEvent.press(getByText('Delete'));
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(queryByText('This cannot be undone.')).toBeNull();
  });

  it('scrims from the shadow colour in BOTH schemes — never from onSurface', () => {
    for (const seed of [SEED_LIGHT, SEED_DARK]) {
      const scheme = seed.mode === 'dark' ? 'dark' : 'light';
      const { getByText, UNSAFE_root } = renderThemed(
        <PopconfirmV4 trigger={<Button>Delete</Button>} message="Gone." onConfirm={() => {}} />,
        seed,
        scheme
      );
      fireEvent.press(getByText('Delete'));
      const scrim = UNSAFE_root
        .findAll(() => true)
        .map((n) => flatStyle(n.props?.style))
        .find((s) => s.position === 'absolute' && typeof s.backgroundColor === 'string');
      expect(scrim?.backgroundColor).toBe(expectedScrim(seed, scheme));
    }
  });

  it('floats on elevation.sheet, and flattens with no branch on a flat seed', () => {
    const lifted = mount();
    fireEvent.press(lifted.getByText('Delete'));
    const style = flatStyle(panelOf(lifted.UNSAFE_root)!.props.style);
    expect(style.shadowOpacity).toBe(expectedSheetShadow(SEED_LIGHT).shadowOpacity);

    const flat = mount({}, FLAT_SEED);
    fireEvent.press(flat.getByText('Delete'));
    expect(flatStyle(panelOf(flat.UNSAFE_root)!.props.style).shadowOpacity).toBe(0);
  });

  it('turns translucent only when the seed asks for glass', () => {
    const glass = mount({}, GLASS_SEED);
    fireEvent.press(glass.getByText('Delete'));
    const style = flatStyle(panelOf(glass.UNSAFE_root)!.props.style);
    expect(style.borderWidth).toBe(1);
    expect(style.backgroundColor).not.toBe(compileTheme(GLASS_SEED).light.surface);
  });

  it('fills the destructive button in its PAIRED ink and leaves Cancel quiet', () => {
    const colors = compileTheme(SEED_LIGHT).light;
    const { getByText, UNSAFE_root } = mount();
    fireEvent.press(getByText('Delete'));

    const confirm = buttonOf(UNSAFE_root, 'Confirm');
    expect(styleAt(confirm, false).backgroundColor).toBe(colors.danger);
    // `onDanger`, not `onPrimary` — the base made a contrast promise against a
    // colour it was not painting on.
    expect(getByText('Confirm').props.style.color).toBe(colors.onDanger);
    // The point of the paired slot, asserted rather than assumed: the label
    // clears AA against the fill it is actually drawn on. At many seeds
    // `onPrimary` and `onDanger` are both white and the swap is invisible —
    // at a seed where they differ, it is the whole legibility of the warning.
    expect(contrastRatio(colors.onDanger, colors.danger)).toBeGreaterThanOrEqual(MIN_CONTRAST);

    const cancel = buttonOf(UNSAFE_root, 'Cancel');
    expect(styleAt(cancel, false).backgroundColor).toBe('transparent');
    // `mutedText`, which carries an AA promise; `muted` does not.
    expect(getByText('Cancel').props.style.color).toBe(colors.mutedText);
  });

  it('presses with the M3 state layer, not a hairline colour used as a surface', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText, UNSAFE_root } = mount();
    fireEvent.press(getByText('Delete'));

    const confirm = buttonOf(UNSAFE_root, 'Confirm');
    expect(styleAt(confirm, true).backgroundColor).toBe(
      stateMix(theme.light.danger, theme.light.onDanger, 'pressed', theme.state)
    );

    const cancel = buttonOf(UNSAFE_root, 'Cancel');
    expect(styleAt(cancel, true).backgroundColor).not.toBe(theme.light.border);
  });

  it('gives both choices a real tap target', () => {
    const spacing = compileTheme(SEED_LIGHT).spacing;
    const { getByText, UNSAFE_root } = mount();
    fireEvent.press(getByText('Delete'));
    for (const label of ['Cancel', 'Confirm']) {
      expect(styleAt(buttonOf(UNSAFE_root, label), false).minHeight).toBe(
        spacing['2xl'] - spacing.xs
      );
    }
  });

  it('measures the bubble off the spacing scale, not a literal 240', () => {
    const { getByText, UNSAFE_root } = mount();
    fireEvent.press(getByText('Delete'));
    expect(flatStyle(panelOf(UNSAFE_root)!.props.style).maxWidth).toBe(
      compileTheme(SEED_LIGHT).spacing['2xl'] * 6
    );
  });
});
