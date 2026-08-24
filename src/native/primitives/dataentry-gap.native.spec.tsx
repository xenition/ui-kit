import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
// Import each NEW component DIRECTLY from its file (not through the barrel), so
// this gap spec stands even before index.ts re-exports them.
import { SearchInput } from './SearchInput';
import { PasswordInput } from './PasswordInput';
import { TimePicker } from './TimePicker';
import { DateRangePicker } from './DateRangePicker';
import { MultiSelect } from './MultiSelect';
import { TagInput } from './TagInput';
import { AutoComplete } from './AutoComplete';
import { RangeSlider } from './RangeSlider';
import { ToggleGroup } from './ToggleGroup';
import { PhoneInput } from './PhoneInput';
import { CurrencyInput } from './CurrencyInput';
import { ColorPicker } from './ColorPicker';

const HIDDEN = { includeHiddenElements: true } as const;

describe('data-entry gap components (native) — mount + token purity', () => {
  it('mounts a representative set and paints only token colors under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <SearchInput value="hi" onChangeText={() => undefined} />
          <PasswordInput value="secret" onChangeText={() => undefined} label="Password" />
          <TagInput value={['a', 'b']} onChange={() => undefined} />
          <RangeSlider value={[20, 80]} onChange={() => undefined} />
          <ColorPicker onChange={() => undefined} />
        </>,
        seed
      );
      const hexes = renderedStyleHexes(root);
      // A token color IS applied…
      expect(hexes.length).toBeGreaterThan(0);
      // …and every rendered hex traces to a compiled theme token (no literals).
      const allowed = tokenHexSet(seed);
      hexes.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('SearchInput (native)', () => {
  it('clears via the ✕ affordance', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchInput value="foo" onChangeText={onChangeText} onClear={onClear} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

describe('PasswordInput (native)', () => {
  it('toggles masking via the show/hide control', () => {
    const { getByLabelText } = renderThemed(
      <PasswordInput value="pw" onChangeText={() => undefined} />,
      SEED_LIGHT
    );
    // Starts masked → the control offers "Show".
    const show = getByLabelText('Show password');
    expect(show).toBeTruthy();
    fireEvent.press(show);
    // After toggling it offers "Hide".
    expect(getByLabelText('Hide password')).toBeTruthy();
  });
});

describe('MultiSelect (native)', () => {
  const OPTIONS = [
    { label: 'Red', value: 'r' },
    { label: 'Green', value: 'g' },
    { label: 'Blue', value: 'b' },
  ];

  it('reports the full next selection when a row is toggled', () => {
    const onChange = jest.fn();
    const { getByText } = renderThemed(
      <MultiSelect options={OPTIONS} value={['r']} onChange={onChange} placeholder="Pick colors" />,
      SEED_LIGHT
    );
    // Open the sheet via the chip trigger (chip shows the selected label).
    fireEvent.press(getByText('Red'));
    fireEvent.press(getByText('Green', HIDDEN));
    expect(onChange).toHaveBeenCalledWith(['r', 'g']);
  });
});

describe('TagInput (native)', () => {
  it('adds a token on submit and removes one via its ✕', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <TagInput value={['alpha']} onChange={onChange} />,
      SEED_LIGHT
    );
    const field = getByLabelText('Add a tag');
    fireEvent.changeText(field, 'beta');
    fireEvent(field, 'submitEditing');
    expect(onChange).toHaveBeenCalledWith(['alpha', 'beta']);

    fireEvent.press(getByLabelText('Remove alpha'));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});

describe('AutoComplete (native)', () => {
  const OPTIONS = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' },
  ];

  it('shows filtered suggestions on focus and reports the picked option', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const { getByLabelText, getByText, queryByText } = renderThemed(
      <AutoComplete options={OPTIONS} value="ap" onChange={onChange} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    expect(getByText('Apple')).toBeTruthy();
    expect(queryByText('Banana')).toBeNull();
    fireEvent.press(getByText('Apricot'));
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
  });
});

describe('ToggleGroup (native)', () => {
  const OPTIONS = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];

  it('single mode reports a string; multiple mode reports an array', () => {
    const single = jest.fn();
    const one = renderThemed(
      <ToggleGroup options={OPTIONS} value="day" onChange={single} />,
      SEED_LIGHT
    );
    fireEvent.press(one.getByText('Week'));
    expect(single).toHaveBeenCalledWith('week');

    const multi = jest.fn();
    const many = renderThemed(
      <ToggleGroup options={OPTIONS} value={['day']} onChange={multi} multiple />,
      SEED_LIGHT
    );
    fireEvent.press(many.getByText('Month'));
    expect(multi).toHaveBeenCalledWith(['day', 'month']);
  });
});

describe('PhoneInput (native)', () => {
  it('reports raw digits and displays a progressive mask', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <PhoneInput value="555123" onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    const field = getByLabelText('Phone number');
    expect(field.props.value).toBe('(555) 123');
    fireEvent.changeText(field, '(555) 123-4567');
    expect(onChangeText).toHaveBeenCalledWith('5551234567');
  });
});

describe('CurrencyInput (native)', () => {
  it('parses typed text into a number', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <CurrencyInput value={null} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Amount'), '12.34');
    expect(onChange).toHaveBeenCalledWith(12.34);
  });
});

describe('ColorPicker (native)', () => {
  it('reports the chosen token hex', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <ColorPicker onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Primary'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(typeof onChange.mock.calls[0][0]).toBe('string');
  });
});

describe('TimePicker + DateRangePicker (native) — mount', () => {
  it('render their triggers with placeholders', () => {
    const { getByText } = renderThemed(
      <>
        <TimePicker onChange={() => undefined} placeholder="Pick time" />
        <DateRangePicker onChange={() => undefined} />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Pick time')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();
  });
});
