/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import { Slider } from './Slider';
import { NumberInput } from './NumberInput';
import { PinInput } from './PinInput';
import { Form } from './Form';
import { useForm } from './useForm';

describe('RadioGroup', () => {
  it('reports the selected value', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <RadioGroup
        value="a"
        onChange={onChange}
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    fireEvent.click(getByLabelText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('NumberInput', () => {
  it('steps and clamps', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<NumberInput value={5} max={5} onChange={onChange} />);
    fireEvent.click(getByLabelText('Decrease'));
    expect(onChange).toHaveBeenCalledWith(4);
    // Increase is disabled at max.
    expect((getByLabelText('Increase') as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('Slider', () => {
  it('emits numeric value', () => {
    const onChange = jest.fn();
    const { container } = render(<Slider value={20} onChange={onChange} />);
    const input = container.querySelector('input[type="range"]')!;
    fireEvent.change(input, { target: { value: '55' } });
    expect(onChange).toHaveBeenCalledWith(55);
  });
});

describe('PinInput', () => {
  it('writes chars into the value', () => {
    const onChange = jest.fn();
    const { container } = render(<PinInput length={4} value="" onChange={onChange} />);
    const first = container.querySelectorAll('input')[0]!;
    fireEvent.change(first, { target: { value: '7' } });
    expect(onChange).toHaveBeenCalledWith('7');
  });
});

describe('useForm + Form', () => {
  it('validates then submits', async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        validate: (v) => (v.email ? {} : { email: 'required' }),
        onSubmit,
      })
    );
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.email).toBe('required');

    act(() => result.current.setValue('email', 'a@b.c'));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c' });
  });

  it('Form renders a form element', () => {
    const { container } = render(<Form><input /></Form>);
    expect(container.querySelector('form')).toBeTruthy();
  });
});
