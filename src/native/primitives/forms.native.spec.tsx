import * as React from 'react';
import { Text, TextInput } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { RadioGroup } from './RadioGroup';
import { Slider } from './Slider';
import { NumberInput } from './NumberInput';
import { PinInput } from './PinInput';
import { Form, useForm } from './Form';

describe('RadioGroup (native)', () => {
  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ];

  it('renders each option and reports the chosen value', () => {
    const onValueChange = jest.fn();
    const { getByText } = renderThemed(
      <RadioGroup options={options} value="1" onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    expect(getByText('One')).toBeTruthy();
    fireEvent.press(getByText('Two'));
    expect(onValueChange).toHaveBeenCalledWith('2');
  });

  it('does not fire for a disabled option', () => {
    const onValueChange = jest.fn();
    const { getByText } = renderThemed(
      <RadioGroup
        options={[{ label: 'Off', value: 'x', disabled: true }]}
        value="1"
        onValueChange={onValueChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Off'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe('Slider (native)', () => {
  it('exposes an adjustable role reflecting min/max/value', () => {
    const { root } = renderThemed(
      <Slider value={30} min={0} max={100} onValueChange={() => undefined} />,
      SEED_LIGHT
    );
    // The slider is a plain View carrying accessibilityRole="adjustable" (not an
    // implicit a11y element), so locate it by role the same way the passing
    // primitives spec does rather than via getByRole.
    const slider = root.findAll((n) => n.props?.accessibilityRole === 'adjustable')[0];
    expect(slider).toBeTruthy();
    expect(slider!.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 30 });
  });

  it('renders only token colors under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<Slider value={50} onValueChange={() => undefined} />, seed);
      const allowed = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('NumberInput (native)', () => {
  it('steps up by `step`, clamped to max', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <NumberInput value={4} step={2} max={10} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase'));
    expect(onValueChange).toHaveBeenCalledWith(6);
  });

  it('does not step below min', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <NumberInput value={0} min={0} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Decrease'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  /*
    `onChange` is the kit-canonical name for "the value changed" and every
    component that spelled it differently now answers to it too — here that also
    closes a twin gap, because the web `NumberInput` never called it anything
    else. Both names on one component fire once, through the original.
  */
  it('accepts the canonical onChange, and prefers onValueChange when given both', () => {
    const onChange = jest.fn();
    const alias = renderThemed(<NumberInput value={1} onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(alias.getByLabelText('Increase'));
    expect(onChange).toHaveBeenCalledWith(2);

    const onValueChange = jest.fn();
    onChange.mockClear();
    const both = renderThemed(
      <NumberInput value={1} onValueChange={onValueChange} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(both.getByLabelText('Increase'));
    expect(onValueChange).toHaveBeenCalledWith(2);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('PinInput (native)', () => {
  it('renders `length` boxes and reports typed characters', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <PinInput length={4} value="" onChange={onChange} />,
      SEED_LIGHT
    );
    const boxes = UNSAFE_getAllByType(TextInput);
    expect(boxes).toHaveLength(4);
    fireEvent.changeText(boxes[0]!, '7');
    expect(onChange).toHaveBeenCalledWith('7');
  });
});

describe('Form (native)', () => {
  it('renders children in a themed container', () => {
    const { getByText } = renderThemed(
      <Form>
        <Text>row</Text>
      </Form>,
      SEED_LIGHT
    );
    expect(getByText('row')).toBeTruthy();
  });

  it('re-exports the headless useForm helper', () => {
    function Harness(): React.ReactElement {
      const form = useForm({ initialValues: { name: '' }, onSubmit: () => undefined });
      return <Text>{`submitting:${form.submitting}`}</Text>;
    }
    const { getByText } = renderThemed(<Harness />, SEED_LIGHT);
    expect(getByText('submitting:false')).toBeTruthy();
  });
});
