import * as React from 'react';
import { Text } from 'react-native';
import { act, waitFor } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed } from '../spec-support/render-native';
import { Marquee } from './Marquee';
import { AnimatedCounter } from './AnimatedCounter';

describe('Marquee (native)', () => {
  it('renders its children under both seeds (twice — content + loop copy)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getAllByText } = renderThemed(
        <Marquee>
          <Text>Loop</Text>
        </Marquee>,
        seed
      );
      // Rendered twice: the measured copy + the seamless-loop copy.
      expect(getAllByText('Loop').length).toBe(2);
    });
  });

  it('renders a single static row when speed is 0 (still just the two copies otherwise)', () => {
    const { getAllByText } = renderThemed(
      <Marquee speed={0}>
        <Text>Tick</Text>
      </Marquee>,
      SEED_LIGHT
    );
    // speed 0 keeps the animated layout but never starts the loop; both copies exist.
    expect(getAllByText('Tick').length).toBe(2);
  });
});

describe('AnimatedCounter (native)', () => {
  it('renders the formatted starting value immediately', () => {
    const { getByText } = renderThemed(<AnimatedCounter to={1000} from={0} />, SEED_LIGHT);
    expect(getByText('0')).toBeTruthy();
  });

  it('snaps to the final value when duration is 0', () => {
    const { getByText } = renderThemed(
      <AnimatedCounter to={1234} duration={0} />,
      SEED_LIGHT
    );
    expect(getByText('1,234')).toBeTruthy();
  });

  it('honors a custom format', () => {
    const { getByText } = renderThemed(
      <AnimatedCounter to={42} duration={0} format={(v) => `${Math.round(v)}%`} />,
      SEED_DARK
    );
    expect(getByText('42%')).toBeTruthy();
  });

  it('animates toward the target over time', async () => {
    const { getByText, queryByText } = renderThemed(
      <AnimatedCounter to={100} from={0} duration={50} />,
      SEED_LIGHT
    );
    // Starts at 0, ends at 100.
    expect(queryByText('0')).toBeTruthy();
    await act(async () => {
      await new Promise((r) => setTimeout(r, 120));
    });
    await waitFor(() => expect(getByText('100')).toBeTruthy());
  });
});
