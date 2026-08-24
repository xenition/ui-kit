/** @jest-environment jsdom */
/**
 * Web (React DOM) events alternate-design variants (V2 = bold/elevated/media-
 * forward, V3 = minimal/compact/structural). For each variant: a render smoke
 * test, token-class purity (no hex literal reaches the DOM as an inline style),
 * and one key interaction / state assertion. Mirrors the base `events.spec.tsx`
 * contracts without re-testing them.
 */
import { fireEvent, render } from '@testing-library/react';
import { EventCardV2 } from './EventCardV2';
import { EventCardV3 } from './EventCardV3';
import { SessionCardV2 } from './SessionCardV2';
import { SessionCardV3 } from './SessionCardV3';
import { SpeakerCardV2 } from './SpeakerCardV2';
import { SpeakerCardV3 } from './SpeakerCardV3';
import { TicketStubV2 } from './TicketStubV2';
import { TicketStubV3 } from './TicketStubV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** No color may reach the DOM as a hex literal in an inline style. */
const assertNoHexInStyles = (container: HTMLElement): void => {
  const styles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
  expect(HEX_LITERAL.test(styles)).toBe(false);
};

describe('EventCardV2 (web)', () => {
  it('renders as a hero, fires onClick, and binds token classes with no hex', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <EventCardV2 title="Synthwave Night" date="Sat, Aug 24" time="7:00 PM" location="The Warehouse" category="Music" onClick={onClick} />
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    const card = getByRole('button', { name: 'Synthwave Night' });
    expect(card.className).toContain('shadow-md');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
    assertNoHexInStyles(container);
  });
});

describe('EventCardV3 (web)', () => {
  it('renders the media-left row and fires onClick with no hex', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <EventCardV3 title="Jazz Brunch" date="Sun, Aug 25" location="Blue Room" attendeeCount={42} onClick={onClick} />
    );
    expect(getByText('Jazz Brunch')).toBeTruthy();
    const card = getByRole('button', { name: 'Jazz Brunch' });
    expect(card.className).toContain('border-border');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
    assertNoHexInStyles(container);
  });
});

describe('SessionCardV2 (web)', () => {
  it('renders the meter and toggles the bookmark without triggering the card', () => {
    const onBookmark = jest.fn();
    const onClick = jest.fn();
    const { getByText, getByRole, container } = render(
      <SessionCardV2
        title="Scaling the Edge"
        time="14:00 – 14:45"
        room="Hall B"
        track="Platform"
        capacity={100}
        seatsTaken={40}
        bookmarked={false}
        onBookmark={onBookmark}
        onClick={onClick}
      />
    );
    expect(getByText('40 / 100 seats taken')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Bookmark session' }));
    expect(onBookmark).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
    assertNoHexInStyles(container);
  });
});

describe('SessionCardV3 (web)', () => {
  it('renders a terse seat count and announces bookmark state via aria', () => {
    const onBookmark = jest.fn();
    const { getByText, getByRole, container } = render(
      <SessionCardV3 title="Closing Keynote" time="17:00" track="Main" capacity={50} seatsTaken={50} bookmarked onBookmark={onBookmark} />
    );
    expect(getByText('Full')).toBeTruthy();
    expect(getByRole('button', { name: 'Remove bookmark' }).getAttribute('aria-pressed')).toBe('true');
    assertNoHexInStyles(container);
  });
});

describe('SpeakerCardV2 (web)', () => {
  it('renders the centered profile hero and binds token classes with no hex', () => {
    const { getByText, container } = render(
      <SpeakerCardV2 name="Grace Hopper" role="Rear Admiral" company="US Navy" rating={5} bio="Compiler pioneer." tags={['Systems']} />
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    expect(getByText('Rear Admiral · US Navy')).toBeTruthy();
    expect(container.firstElementChild?.className).toContain('shadow-md');
    assertNoHexInStyles(container);
  });
});

describe('SpeakerCardV3 (web)', () => {
  it('renders the compact directory row, fires onClick, with no hex', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <SpeakerCardV3 name="Alan Turing" role="Cryptographer" rating={4} tags={['AI', 'Math', 'Extra']} onClick={onClick} />
    );
    expect(getByText('Alan Turing')).toBeTruthy();
    const row = getByRole('button', { name: 'Alan Turing' });
    expect(row.className).toContain('border-b');
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
    assertNoHexInStyles(container);
  });
});

describe('TicketStubV2 (web)', () => {
  it('renders the elevated stub with barcode + code and no hex', () => {
    const { getByText, container } = render(
      <TicketStubV2 eventTitle="Synthwave Night" holderName="Ada Lovelace" tier="VIP" code="XEN-4821-AA" fields={[{ label: 'Seat', value: '14' }]} />
    );
    expect(getByText('XEN-4821-AA')).toBeTruthy();
    expect(container.firstElementChild?.className).toContain('shadow-lg');
    assertNoHexInStyles(container);
  });
});

describe('TicketStubV3 (web)', () => {
  it('renders the boarding-pass line with the code and no hex', () => {
    const { getByText, container } = render(
      <TicketStubV3 eventTitle="Jazz Brunch" dateLabel="Aug 25" code="XEN-9000-BB" fields={[{ label: 'Gate', value: 'C' }]} />
    );
    expect(getByText('XEN-9000-BB')).toBeTruthy();
    expect(container.firstElementChild?.className).toContain('border-border');
    assertNoHexInStyles(container);
  });
});
