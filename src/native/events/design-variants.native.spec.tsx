import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import type { ThemeSeed } from '../../theme/types';
import { EventCardV2 } from './EventCardV2';
import { EventCardV3 } from './EventCardV3';
import { TicketStubV2 } from './TicketStubV2';
import { TicketStubV3 } from './TicketStubV3';
import { SpeakerCardV2 } from './SpeakerCardV2';
import { SpeakerCardV3 } from './SpeakerCardV3';
import { SessionCardV2 } from './SessionCardV2';
import { SessionCardV3 } from './SessionCardV3';

/**
 * Every alternate design (v2 / v3) is a drop-in for its base component: it
 * accepts the identical props (`<Name>V2Props = <Name>Props`) and, like the
 * originals, must stay token-pure — every hex in a rendered style must trace to
 * a compiled-theme token, under BOTH the light and dark seeds. Each block
 * mounts the variant, asserts token purity on both seeds, and exercises one
 * interaction where the props expose one.
 */
const SEEDS: { name: string; seed: ThemeSeed }[] = [
  { name: 'light', seed: SEED_LIGHT },
  { name: 'dark', seed: SEED_DARK },
];

const assertTokenPure = (seed: ThemeSeed, root: Parameters<typeof renderedStyleHexes>[0]): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

const speakerProps = {
  name: 'Grace Hopper',
  role: 'Rear Admiral',
  company: 'US Navy',
  rating: 5,
  bio: 'Compiler pioneer.',
  tags: ['Systems', 'History', 'Compilers'],
};

const sessionProps = {
  title: 'Scaling the Edge',
  time: '14:00 – 14:45',
  room: 'Hall B',
  track: 'Platform',
  abstract: 'How we shipped globally.',
  speakers: [{ name: 'Grace Hopper' }, { name: 'Alan Turing' }],
  capacity: 100,
  seatsTaken: 40,
};

describe.each(SEEDS)('events design variants — $name seed', ({ seed }) => {
  it('EventCardV2: mounts, fires onPress, token-pure', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <EventCardV2 title="Synthwave Night" date="Sat, Aug 24" time="7:00 PM" location="The Warehouse" category="Music" attendeeCount={128} onPress={onPress} />,
      seed
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    fireEvent.press(getByLabelText('Synthwave Night'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(seed, root);
  });

  it('EventCardV3: mounts, fires onPress, token-pure', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <EventCardV3 title="Synthwave Night" date="Sat, Aug 24" time="7:00 PM" location="The Warehouse" category="Music" attendeeCount={128} onPress={onPress} />,
      seed
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    fireEvent.press(getByLabelText('Synthwave Night'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(seed, root);
  });

  it('TicketStubV2: renders name + code, token-pure', () => {
    const { getByText, root } = renderThemed(
      <TicketStubV2 eventTitle="Synthwave Night" holderName="Ada Lovelace" dateLabel="Aug 24 · 7:00 PM" tier="VIP" code="XEN-4821-AA" fields={[{ label: 'Section', value: 'A' }, { label: 'Seat', value: '14' }]} />,
      seed
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    expect(getByText('XEN-4821-AA')).toBeTruthy();
    assertTokenPure(seed, root);
  });

  it('TicketStubV3: renders name + code, token-pure', () => {
    const { getByText, root } = renderThemed(
      <TicketStubV3 eventTitle="Synthwave Night" holderName="Ada Lovelace" dateLabel="Aug 24 · 7:00 PM" tier="VIP" code="XEN-4821-AA" fields={[{ label: 'Section', value: 'A' }, { label: 'Seat', value: '14' }]} />,
      seed
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    expect(getByText('XEN-4821-AA')).toBeTruthy();
    assertTokenPure(seed, root);
  });

  it('SpeakerCardV2: mounts, fires onPress, token-pure', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <SpeakerCardV2 {...speakerProps} onPress={onPress} />,
      seed
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    fireEvent.press(getByLabelText('Grace Hopper'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(seed, root);
  });

  it('SpeakerCardV3: mounts, fires onPress, token-pure', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <SpeakerCardV3 {...speakerProps} onPress={onPress} />,
      seed
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    fireEvent.press(getByLabelText('Grace Hopper'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(seed, root);
  });

  it('SessionCardV2: renders meter + toggles bookmark, token-pure', () => {
    const onBookmark = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <SessionCardV2 {...sessionProps} bookmarked={false} onBookmark={onBookmark} />,
      seed
    );
    expect(getByText('Scaling the Edge')).toBeTruthy();
    expect(getByText('40 / 100 seats taken')).toBeTruthy();
    fireEvent.press(getByLabelText('Bookmark session'));
    expect(onBookmark).toHaveBeenCalledWith(true);
    assertTokenPure(seed, root);
  });

  it('SessionCardV3: renders dense line + toggles bookmark, token-pure', () => {
    const onBookmark = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <SessionCardV3 {...sessionProps} bookmarked={false} onBookmark={onBookmark} />,
      seed
    );
    expect(getByText('Scaling the Edge')).toBeTruthy();
    expect(getByText('40/100')).toBeTruthy();
    fireEvent.press(getByLabelText('Bookmark session'));
    expect(onBookmark).toHaveBeenCalledWith(true);
    assertTokenPure(seed, root);
  });
});

describe('events design variants — empty / loading guards', () => {
  it('EventCardV2 + V3 render a loading skeleton with no crash', () => {
    const v2 = renderThemed(<EventCardV2 title="" loading />, SEED_LIGHT);
    const v3 = renderThemed(<EventCardV3 title="" loading />, SEED_LIGHT);
    assertTokenPure(SEED_LIGHT, v2.root);
    assertTokenPure(SEED_LIGHT, v3.root);
  });

  it('TicketStubV3 tolerates an empty code and no fields', () => {
    const { root } = renderThemed(<TicketStubV3 eventTitle="TBD" code="" />, SEED_LIGHT);
    assertTokenPure(SEED_LIGHT, root);
  });

  it('SessionCardV2 renders without speakers, meter, or bookmark', () => {
    const { getByText, root } = renderThemed(<SessionCardV2 title="Lightning Talk" />, SEED_LIGHT);
    expect(getByText('Lightning Talk')).toBeTruthy();
    assertTokenPure(SEED_LIGHT, root);
  });
});
