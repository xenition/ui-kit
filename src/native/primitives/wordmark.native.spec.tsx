import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { Wordmark } from './Wordmark';

describe('Wordmark (native)', () => {
  it('renders the brand name under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByText } = renderThemed(<Wordmark name="Northwind" />, seed);
      expect(getByText('Northwind')).toBeTruthy();
    });
  });

  it('renders a custom mark node when provided', () => {
    const { getByText } = renderThemed(
      <Wordmark name="Acme" mark={<Text>◆</Text>} />,
      SEED_LIGHT
    );
    expect(getByText('◆')).toBeTruthy();
    expect(getByText('Acme')).toBeTruthy();
  });

  it('is pressable and fires onPress when set', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <Wordmark name="Tap" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
