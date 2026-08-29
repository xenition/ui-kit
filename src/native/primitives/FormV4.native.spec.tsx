import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { FieldV4 } from './FieldV4';
import type { FormProps } from './Form';
import { FormV4, useForm } from './FormV4';
import { InputV4 } from './InputV4';

function mount(props: Partial<FormProps> = {}) {
  return renderThemed(
    <FormV4 testID="form" {...props}>
      <FieldV4 label="Email">
        <InputV4 />
      </FieldV4>
    </FormV4>,
    SEED_LIGHT
  );
}

function styles(root: ReactTestInstance): Array<Record<string, unknown>> {
  return root.findAll(() => true).map((n) => flatStyle(n.props?.style));
}

describe('FormV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: FormProps = {
      children: <Text>a field</Text>,
      testID: 'form',
    };
    const asV4: React.ComponentProps<typeof FormV4> = same;
    expect(asV4).toBe(same);
  });

  it('re-exports useForm, so a mobile app needs no second import', () => {
    expect(typeof useForm).toBe('function');
  });

  it('spaces its questions at `lg`, the token both twins now share', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByTestId } = mount();
    expect(flatStyle(getByTestId('form').props.style).gap).toBe(theme.spacing.lg);
    // The web wrote `gap-4` — a fixed 16px — against `spacing.md` here. They
    // agreed by coincidence, in the one component whose job is spacing.
    expect(flatStyle(getByTestId('form').props.style).gap).not.toBe(theme.spacing.md);
  });

  it('separates fields by a different ORDER of magnitude than a field’s own parts', () => {
    // FieldV4's internal rhythm is `xs`. If the gap between fields is close to
    // it, a three-part field and the next question read as one five-part thing.
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = mount();
    expect(styles(UNSAFE_root).some((s) => s.gap === theme.spacing.xs)).toBe(true);
    expect(theme.spacing.lg / theme.spacing.xs).toBeGreaterThanOrEqual(6);
  });

  it('is not a container: no ground, no border, no radius', () => {
    // §11 — a form is a sequence of questions, and `Card` is what to reach for
    // when the sequence genuinely needs a boundary.
    const { getByTestId } = mount();
    const style = flatStyle(getByTestId('form').props.style);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
    expect(style.shadowOpacity).toBeUndefined();
  });

  it('merges a caller’s style rather than replacing its own', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByTestId } = mount({ style: { paddingBottom: 99 } });
    const style = flatStyle(getByTestId('form').props.style);
    expect(style.paddingBottom).toBe(99);
    expect(style.gap).toBe(theme.spacing.lg);
  });

  it('survives its empty state: a form with no fields', () => {
    const { toJSON } = renderThemed(<FormV4 />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
  });
});
