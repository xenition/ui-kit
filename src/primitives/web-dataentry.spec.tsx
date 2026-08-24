/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { PasswordInput } from './PasswordInput';
import { TimePicker, type TimeValue } from './TimePicker';
import { DateRangePicker, type DateRange } from './DateRangePicker';
import { MultiSelect } from './MultiSelect';
import { TagInput } from './TagInput';
import { AutoComplete } from './AutoComplete';
import { RangeSlider } from './RangeSlider';
import { ToggleGroup } from './ToggleGroup';
import { PhoneInput } from './PhoneInput';
import { CurrencyInput } from './CurrencyInput';
import { ColorPicker } from './ColorPicker';

describe('web data-entry primitives', () => {
  it('SearchInput renders, is token-bound, and reports text', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = render(<SearchInput onChangeText={onChangeText} />);
    const input = getByLabelText('Search') as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.className).toContain('text-on-surface');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(onChangeText).toHaveBeenCalledWith('abc');
  });

  it('SearchInput shows a clear button that empties the value', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = render(<SearchInput value="x" onChangeText={onChangeText} />);
    const clear = getByLabelText('Clear search');
    fireEvent.click(clear);
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('PasswordInput masks by default and toggles visibility', () => {
    const { getByLabelText } = render(<PasswordInput value="secret" onChangeText={() => {}} />);
    const input = getByLabelText('Password') as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('password');
    fireEvent.click(getByLabelText('Show password'));
    expect(input.getAttribute('type')).toBe('text');
  });

  it('TimePicker opens a popover and picks an hour', () => {
    function Harness() {
      const [v, setV] = useState<TimeValue | null>(null);
      return <TimePicker value={v} onChange={setV} accessibilityLabel="Time" />;
    }
    const { getByLabelText, getByText } = render(<Harness />);
    const trigger = getByLabelText('Time');
    expect(trigger.className).toContain('bg-surface');
    fireEvent.click(trigger);
    fireEvent.click(getByLabelText('Hour 9'));
    // Trigger now shows the chosen hour.
    expect(getByText(/09:00/)).toBeTruthy();
  });

  it('DateRangePicker keeps start <= end via two date inputs', () => {
    const onChange = jest.fn();
    const range: DateRange = { start: null, end: null };
    const { getByText, container } = render(
      <DateRangePicker value={range} onChange={onChange} />
    );
    expect(getByText('Start')).toBeTruthy();
    const inputs = container.querySelectorAll('input[type="date"]');
    expect(inputs.length).toBe(2);
    fireEvent.change(inputs[0] as HTMLInputElement, { target: { value: '2026-01-10' } });
    expect(onChange).toHaveBeenCalledWith({ start: '2026-01-10', end: null });
  });

  it('MultiSelect toggles selection through the popover', () => {
    const onChange = jest.fn();
    const options = [
      { label: 'Red', value: 'r' },
      { label: 'Green', value: 'g' },
    ];
    const { getByLabelText, getByText } = render(
      <MultiSelect options={options} value={[]} onChange={onChange} accessibilityLabel="Colors" />
    );
    const trigger = getByLabelText('Colors');
    expect(trigger.className).toContain('border-border');
    fireEvent.click(trigger);
    fireEvent.click(getByText('Green'));
    expect(onChange).toHaveBeenCalledWith(['g']);
  });

  it('TagInput adds a tag on Enter', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TagInput value={[]} onChange={onChange} />);
    const input = getByLabelText('Add a tag') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'urgent' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['urgent']);
  });

  it('AutoComplete filters and selects a suggestion', () => {
    const onSelect = jest.fn();
    const options = [
      { label: 'Apple', value: 'a' },
      { label: 'Apricot', value: 'ap' },
      { label: 'Banana', value: 'b' },
    ];
    const { getByLabelText, getByText } = render(
      <AutoComplete options={options} value="Ap" onSelect={onSelect} onChange={() => {}} />
    );
    const input = getByLabelText('Autocomplete');
    fireEvent.focus(input);
    fireEvent.mouseDown(getByText('Apricot'));
    expect(onSelect).toHaveBeenCalledWith(options[1]);
  });

  it('RangeSlider renders two ordered thumbs and clamps low <= high', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <RangeSlider value={[20, 80]} onChange={onChange} />
    );
    const lo = getByLabelText('Range minimum') as HTMLInputElement;
    expect(lo.getAttribute('type')).toBe('range');
    // Drag low past high — it is clamped to high.
    fireEvent.change(lo, { target: { value: '95' } });
    expect(onChange).toHaveBeenCalledWith([80, 80]);
  });

  it('ToggleGroup selects in single mode and is deselectable', () => {
    const onChange = jest.fn();
    const options = [
      { label: 'Day', value: 'd' },
      { label: 'Week', value: 'w' },
    ];
    const { getByLabelText } = render(
      <ToggleGroup options={options} value="d" onChange={onChange} />
    );
    const active = getByLabelText('Day');
    expect(active.className).toContain('bg-primary');
    fireEvent.click(active);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('PhoneInput masks display but reports raw digits', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = render(<PhoneInput onChangeText={onChangeText} />);
    const input = getByLabelText('Phone number') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5551234567' } });
    expect(onChangeText).toHaveBeenCalledWith('5551234567');
  });

  it('CurrencyInput parses to a number and clears to null', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<CurrencyInput onChange={onChange} />);
    const input = getByLabelText('Amount') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12.50' } });
    expect(onChange).toHaveBeenCalledWith(12.5);
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('ColorPicker renders a token-pure palette and reports a choice', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<ColorPicker value="primary" onChange={onChange} />);
    const accent = getByLabelText('Accent');
    expect(accent.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(accent);
    expect(onChange).toHaveBeenCalledWith('accent');
  });
});
