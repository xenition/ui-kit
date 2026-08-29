import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { stateMix } from '../../primitives/internal/v4-state';
import type { ToggleGroupOption, ToggleGroupProps } from './ToggleGroup';
import { ToggleGroupV4 } from './ToggleGroupV4';

const OPTIONS: ToggleGroupOption[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month', disabled: true },
];

function mount(props: Partial<ToggleGroupProps> = {}) {
  return renderThemed(
    <ToggleGroupV4
      options={OPTIONS}
      value="day"
      accessibilityLabel="Range"
      onChange={() => {}}
      {...props}
    />,
    SEED_LIGHT
  );
}

function cellOf(root: ReactTestInstance, label: string): ReactTestInstance | undefined {
  return root.findAll(
    (n) => n.props?.accessibilityLabel === label && typeof n.props?.style === 'function'
  )[0];
}

function styleAt(node: ReactTestInstance | undefined, pressed: boolean): Record<string, unknown> {
  const style = node?.props?.style;
  return flatStyle(typeof style === 'function' ? style({ pressed }) : style);
}

function groupOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityLabel === 'Range' && n.props?.style != null)[0];
}

describe('ToggleGroupV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: ToggleGroupProps = {
      options: OPTIONS,
      value: 'day',
      onChange: () => {},
      multiple: false,
      disabled: false,
      accessibilityLabel: 'Range',
    };
    const asV4: React.ComponentProps<typeof ToggleGroupV4> = same;
    expect(asV4).toBe(same);
  });

  it('stands at the shared V4 control height and radius', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    const style = flatStyle(groupOf(UNSAFE_root)!.props.style);
    // The single biggest quality signal a form can send is that every control
    // in it agrees. `2xl` / `radius.md` is what InputV4 shipped.
    expect(style.minHeight).toBe(theme.spacing['2xl']);
    expect(style.borderRadius).toBe(theme.radius.md);
    expect(style.alignItems).toBe('stretch');
  });

  it('divides with a full-bleed hairline, not a border on each cell', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    const seams = UNSAFE_root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .filter((s) => s.width === 1 && s.backgroundColor === theme.light.border);
    expect(seams.length).toBeGreaterThanOrEqual(2);
    for (const label of ['Day', 'Week', 'Month']) {
      expect(styleAt(cellOf(UNSAFE_root, label), false).borderLeftWidth).toBeUndefined();
    }
  });

  it('colours only the selected cell, in the compiler’s paired ink', () => {
    const colors = compileTheme(SEED_LIGHT).light;
    const { UNSAFE_root, getByText } = mount();
    expect(styleAt(cellOf(UNSAFE_root, 'Day'), false).backgroundColor).toBe(colors.primary);
    expect(getByText('Day').props.style.color).toBe(colors.onPrimary);
    expect(styleAt(cellOf(UNSAFE_root, 'Week'), false).backgroundColor).toBe(colors.surface);
    expect(getByText('Week').props.style.color).toBe(colors.onSurface);
  });

  it('presses each cell over ITS OWN ground, selected included', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    // The base pressed with a fill of `colors.border` — a hairline colour used
    // as a surface — and skipped the selected cell entirely.
    expect(styleAt(cellOf(UNSAFE_root, 'Week'), true).backgroundColor).toBe(
      stateMix(theme.light.surface, theme.light.onSurface, 'pressed', theme.state)
    );
    expect(styleAt(cellOf(UNSAFE_root, 'Day'), true).backgroundColor).toBe(
      stateMix(theme.light.primary, theme.light.onPrimary, 'pressed', theme.state)
    );
    expect(styleAt(cellOf(UNSAFE_root, 'Week'), true).backgroundColor).not.toBe(theme.light.border);
  });

  it('announces exclusivity only when the choices ARE exclusive', () => {
    const single = mount();
    expect(groupOf(single.UNSAFE_root)!.props.accessibilityRole).toBe('radiogroup');
    const many = mount({ multiple: true, value: [] });
    // The base claimed `radiogroup` in both modes, so a multi-select group told
    // a screen reader its choices were mutually exclusive.
    expect(groupOf(many.UNSAFE_root)!.props.accessibilityRole).toBeUndefined();
    expect(cellOf(many.UNSAFE_root, 'Day')!.props.accessibilityRole).toBe('checkbox');
  });

  it('toggles in single mode, and deselects on a second press', () => {
    const onChange = jest.fn();
    const { getByText } = mount({ onChange });
    fireEvent.press(getByText('Week'));
    expect(onChange).toHaveBeenLastCalledWith('week');
    fireEvent.press(getByText('Day'));
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  it('accumulates in multiple mode', () => {
    const onChange = jest.fn();
    const { getByText } = mount({ multiple: true, value: ['day'], onChange });
    fireEvent.press(getByText('Week'));
    expect(onChange).toHaveBeenLastCalledWith(['day', 'week']);
    fireEvent.press(getByText('Day'));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('blocks a disabled option and dims it at M3’s 0.38', () => {
    const theme = compileTheme(SEED_LIGHT);
    const onChange = jest.fn();
    const { UNSAFE_root, getByText } = mount({ onChange });
    fireEvent.press(getByText('Month'));
    expect(onChange).not.toHaveBeenCalled();
    expect(styleAt(cellOf(UNSAFE_root, 'Month'), false).opacity).toBe(
      theme.state.disabledContent
    );
    // The base dimmed the whole group to 0.5, taking its own edge with it.
    expect(flatStyle(groupOf(UNSAFE_root)!.props.style).opacity).toBeUndefined();
  });

  it('survives its empty state: no options at all', () => {
    const { toJSON } = renderThemed(
      <ToggleGroupV4 options={[]} onChange={() => {}} accessibilityLabel="Range" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeTruthy();
  });
});
