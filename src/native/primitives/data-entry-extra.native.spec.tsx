import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { Combobox } from './Combobox';
import { DatePicker } from './DatePicker';
import { Upload, type UploadFile } from './Upload';

const HIDDEN = { includeHiddenElements: true } as const;

describe('Combobox (native)', () => {
  const OPTIONS = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  it('opens, filters by the search box, and reports the chosen value', () => {
    const onValueChange = jest.fn();
    const { getByText, getByLabelText, queryByText } = renderThemed(
      <Combobox options={OPTIONS} placeholder="Pick a fruit" onValueChange={onValueChange} />,
      SEED_LIGHT
    );

    // Closed: only the trigger placeholder is on screen.
    expect(getByText('Pick a fruit')).toBeTruthy();
    expect(queryByText('Banana', HIDDEN)).toBeNull();

    // Open the option sheet.
    fireEvent.press(getByText('Pick a fruit'));
    expect(getByText('Apple', HIDDEN)).toBeTruthy();
    expect(getByText('Banana', HIDDEN)).toBeTruthy();

    // Type a filter → only the match survives.
    fireEvent.changeText(getByLabelText('Filter options', HIDDEN), 'ban');
    expect(queryByText('Apple', HIDDEN)).toBeNull();
    expect(getByText('Banana', HIDDEN)).toBeTruthy();

    // Select the match.
    fireEvent.press(getByText('Banana', HIDDEN));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('shows the selected label on the trigger and renders invalid token-purely', () => {
    const { getByText } = renderThemed(
      <Combobox options={OPTIONS} value="cherry" invalid onValueChange={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Cherry')).toBeTruthy();
  });
});

describe('DatePicker (native)', () => {
  it('opens a month grid and fires onChange with the picked ISO day', () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DatePicker value="2026-07-15" onChange={onChange} locale="en-US" placeholder="Pick a date" />,
      SEED_LIGHT
    );

    // Trigger shows the formatted selected date.
    fireEvent.press(getByText(/July 15, 2026/));

    // Pick another day in the visible month.
    fireEvent.press(getByLabelText(/^\w+, July 10, 2026$/, HIDDEN));
    expect(onChange).toHaveBeenCalledWith('2026-07-10');
  });

  it('shows the placeholder when no value is set', () => {
    const { getByText } = renderThemed(
      <DatePicker onChange={() => undefined} placeholder="Choose a day" />,
      SEED_LIGHT
    );
    expect(getByText('Choose a day')).toBeTruthy();
  });
});

describe('Upload (native)', () => {
  it('presses the dropzone → the injected picker runs and its files reach onFiles', async () => {
    const picked: UploadFile[] = [{ uri: 'file://a.png', name: 'a.png', type: 'image/png' }];
    const pickFiles = jest.fn(async () => picked);
    const onFiles = jest.fn();

    const { getByText } = renderThemed(
      <Upload
        label="Tap to choose a file"
        accept="image/*"
        pickFiles={pickFiles}
        onFiles={onFiles}
      />,
      SEED_LIGHT
    );

    fireEvent.press(getByText('Tap to choose a file'));

    await waitFor(() => expect(pickFiles).toHaveBeenCalledTimes(1));
    expect(pickFiles).toHaveBeenCalledWith({ accept: 'image/*', multiple: false });
    await waitFor(() => expect(onFiles).toHaveBeenCalledWith(picked));
  });

  it('does not fire the picker when disabled', () => {
    const pickFiles = jest.fn(async () => []);
    const { getByText } = renderThemed(
      <Upload label="Tap to choose a file" disabled pickFiles={pickFiles} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Tap to choose a file'));
    expect(pickFiles).not.toHaveBeenCalled();
  });
});
