import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { EventCard } from './EventCard';
import { TicketStub } from './TicketStub';
import { RSVPButton, type RSVPStatus } from './RSVPButton';
import { AgendaList } from './AgendaList';
import { SpeakerCard } from './SpeakerCard';
import { TicketTypeRow } from './TicketTypeRow';
import { CheckInRow } from './CheckInRow';
import { CountdownBadge } from './CountdownBadge';
import { CalendarStrip } from './CalendarStrip';
import { SessionCard } from './SessionCard';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

describe('EventCard (native)', () => {
  it('renders title/meta, fires onPress, and stays token-pure', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <EventCard
        title="Synthwave Night"
        date="Sat, Aug 24"
        time="7:00 PM"
        location="The Warehouse"
        category="Music"
        attendeeCount={128}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    expect(getByText('Music')).toBeTruthy();
    fireEvent.press(getByLabelText('Synthwave Night'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('TicketStub (native)', () => {
  it('renders the placeholder barcode band and code, token-pure', () => {
    const { getByText, root } = renderThemed(
      <TicketStub
        eventTitle="Synthwave Night"
        holderName="Ada Lovelace"
        dateLabel="Aug 24 · 7:00 PM"
        tier="VIP"
        code="XEN-4821-AA"
        fields={[
          { label: 'Section', value: 'A' },
          { label: 'Seat', value: '14' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    expect(getByText('XEN-4821-AA')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('RSVPButton (native)', () => {
  it('reports the tapped status and exposes selection via a11y (not color alone)', () => {
    const onChange = jest.fn();
    const unanswered = renderThemed(<RSVPButton value={null} onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(unanswered.getByLabelText('Going'));
    expect(onChange).toHaveBeenCalledWith('going');

    // Render the controlled selected state and assert it announces via a11y.
    const selectedValue: RSVPStatus = 'going';
    const { getByLabelText, root } = renderThemed(
      <RSVPButton value={selectedValue} onChange={onChange} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Going').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Maybe').props.accessibilityState.selected).toBe(false);
    assertTokenPure(root);
  });
});

describe('AgendaList (native)', () => {
  it('renders an empty-state message when there are no items', () => {
    const { getByText, root } = renderThemed(
      <AgendaList items={[]} emptyLabel="Nothing scheduled" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing scheduled')).toBeTruthy();
    assertTokenPure(root);
  });

  it('renders items and fires onSelectItem', () => {
    const onSelectItem = jest.fn();
    const { getByText } = renderThemed(
      <AgendaList
        onSelectItem={onSelectItem}
        items={[
          { id: '1', time: '09:00', title: 'Registration' },
          { id: '2', time: '10:00', title: 'Keynote', status: 'live' },
        ]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Keynote'));
    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem.mock.calls[0][0].id).toBe('2');
  });
});

describe('SpeakerCard (native)', () => {
  it('renders name/role and stays token-pure', () => {
    const { getByText, root } = renderThemed(
      <SpeakerCard name="Grace Hopper" role="Rear Admiral" company="US Navy" rating={5} bio="Compiler pioneer." />,
      SEED_LIGHT
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    expect(getByText('Rear Admiral · US Navy')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('TicketTypeRow (native)', () => {
  it('fires onSelect and reflects selection through a11y state', () => {
    const onSelect = jest.fn();
    const unselected = renderThemed(
      <TicketTypeRow name="General Admission" price="$49" description="Standing" onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(unselected.getByLabelText('General Admission, $49'));
    expect(onSelect).toHaveBeenCalledTimes(1);

    const { getByLabelText } = renderThemed(
      <TicketTypeRow name="General Admission" price="$49" description="Standing" selected onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByLabelText('General Admission, $49').props.accessibilityState.selected).toBe(true);
  });

  it('does not fire onSelect when sold out', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <TicketTypeRow name="VIP" price="$199" remaining={0} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('VIP, $199, sold out'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('CheckInRow (native)', () => {
  it('toggles check-in and reports the next state', () => {
    const onToggle = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <CheckInRow name="Ada Lovelace" ticketType="VIP" checkedIn={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Check in Ada Lovelace'));
    expect(onToggle).toHaveBeenCalledWith(true);
    assertTokenPure(root);
  });
});

describe('CountdownBadge (native)', () => {
  it('renders remaining time and an elapsed label after the target', () => {
    const live = renderThemed(<CountdownBadge remainingMs={3 * 86400_000 + 4 * 3600_000} label="Starts in" />, SEED_LIGHT);
    expect(live.getByText(/3d/)).toBeTruthy();

    const done = renderThemed(<CountdownBadge remainingMs={0} elapsedLabel="Started" />, SEED_LIGHT);
    expect(done.getByText('Started')).toBeTruthy();
    assertTokenPure(done.root);
  });
});

describe('CalendarStrip (native)', () => {
  it('renders day pills and reports the tapped date', () => {
    const onSelectDate = jest.fn();
    const start = new Date(2026, 7, 24); // Aug 24 2026
    const { getByLabelText, root } = renderThemed(
      <CalendarStrip startDate={start} days={5} selected={start} onSelectDate={onSelectDate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Mon Aug 24'));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('SessionCard (native)', () => {
  it('renders speakers + capacity meter and toggles bookmark', () => {
    const onBookmark = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <SessionCard
        title="Scaling the Edge"
        time="14:00 – 14:45"
        room="Hall B"
        track="Platform"
        abstract="How we shipped globally."
        speakers={[{ name: 'Grace Hopper' }, { name: 'Alan Turing' }]}
        capacity={100}
        seatsTaken={40}
        bookmarked={false}
        onBookmark={onBookmark}
      />,
      SEED_LIGHT
    );
    expect(getByText('Scaling the Edge')).toBeTruthy();
    expect(getByText('40 / 100 seats taken')).toBeTruthy();
    fireEvent.press(getByLabelText('Bookmark session'));
    expect(onBookmark).toHaveBeenCalledWith(true);
    assertTokenPure(root);
  });
});
