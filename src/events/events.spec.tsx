/** @jest-environment jsdom */
/**
 * Web (React DOM) events module: render smoke, token-class binding (colors trace
 * to `--xen-*` utility classes, never a hex literal), and the behavioral
 * contracts (RSVP change, ticket select + sold-out guard, agenda empty state,
 * check-in toggle, countdown elapsed, calendar select).
 */
import { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { EventCard } from './EventCard';
import { TicketStub } from './TicketStub';
import { RSVPButton } from './RSVPButton';
import { AgendaList } from './AgendaList';
import { SpeakerCard } from './SpeakerCard';
import { ScheduleRow } from './ScheduleRow';
import { VenueCard } from './VenueCard';
import { CountdownBadge } from './CountdownBadge';
import { TicketTypeRow } from './TicketTypeRow';
import { CheckInRow } from './CheckInRow';
import { CalendarStrip } from './CalendarStrip';
import { SessionCard } from './SessionCard';
import { countdownParts, weekdayLabel } from './format';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** No color may reach the DOM as a hex literal in an inline style. */
const assertNoHexInStyles = (container: HTMLElement): void => {
  const styles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
  expect(HEX_LITERAL.test(styles)).toBe(false);
};

describe('EventCard (web)', () => {
  it('renders title/meta, fires onClick, and binds token classes', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <EventCard
        title="Synthwave Night"
        date="Sat, Aug 24"
        time="7:00 PM"
        location="The Warehouse"
        category="Music"
        attendeeCount={128}
        onClick={onClick}
      />
    );
    expect(getByText('Synthwave Night')).toBeTruthy();
    expect(getByText('Music')).toBeTruthy();
    const card = getByRole('button', { name: 'Synthwave Night' });
    expect(card.className).toContain('bg-surface');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
    assertNoHexInStyles(container);
  });

  it('forwards its ref to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<EventCard ref={ref} title="Ref" />);
    expect(ref.current?.tagName).toBe('DIV');
  });
});

describe('TicketStub (web)', () => {
  it('renders the placeholder barcode band + code with token classes', () => {
    const { getByText, container } = render(
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
      />
    );
    expect(getByText('XEN-4821-AA')).toBeTruthy();
    // Bars use token bg classes; widths are px numbers, never hex colors.
    expect(container.querySelector('.bg-on-surface, .bg-muted')).toBeTruthy();
    assertNoHexInStyles(container);
  });
});

describe('RSVPButton (web)', () => {
  it('reports the tapped status and exposes selection via aria (not color alone)', () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(<RSVPButton value={null} onChange={onChange} />);
    fireEvent.click(getByRole('radio', { name: 'Going' }));
    expect(onChange).toHaveBeenCalledWith('going');

    rerender(<RSVPButton value="going" onChange={onChange} />);
    expect(getByRole('radio', { name: 'Going' }).getAttribute('aria-checked')).toBe('true');
    expect(getByRole('radio', { name: 'Maybe' }).getAttribute('aria-checked')).toBe('false');
    // Glyph conveys state alongside color (WCAG 1.4.1).
    expect(getByRole('radio', { name: 'Going' }).textContent).toContain('✓');
  });
});

describe('AgendaList (web)', () => {
  it('renders an EmptyState message when there are no items', () => {
    const { getByText, container } = render(<AgendaList items={[]} emptyLabel="Nothing scheduled" />);
    expect(getByText('Nothing scheduled')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
    assertNoHexInStyles(container);
  });

  it('renders items and fires onSelectItem with the tapped item', () => {
    const onSelectItem = jest.fn();
    const { getByText } = render(
      <AgendaList
        onSelectItem={onSelectItem}
        items={[
          { id: '1', time: '09:00', title: 'Registration' },
          { id: '2', time: '10:00', title: 'Keynote', status: 'live' },
        ]}
      />
    );
    expect(getByText('LIVE')).toBeTruthy();
    fireEvent.click(getByText('Keynote'));
    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem.mock.calls[0][0].id).toBe('2');
  });
});

describe('SpeakerCard (web)', () => {
  it('renders name/role and binds token classes', () => {
    const { getByText, container } = render(
      <SpeakerCard name="Grace Hopper" role="Rear Admiral" company="US Navy" rating={5} bio="Compiler pioneer." />
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    expect(getByText('Rear Admiral · US Navy')).toBeTruthy();
    expect(container.firstElementChild?.className).toContain('border-border');
    assertNoHexInStyles(container);
  });
});

describe('ScheduleRow (web)', () => {
  it('spells out the cancelled status in words (not color alone)', () => {
    const { getByText } = render(<ScheduleRow time="10:30" title="Removed talk" status="cancelled" />);
    expect(getByText('Cancelled')).toBeTruthy();
    expect(getByText('Removed talk').className).toContain('line-through');
  });
});

describe('VenueCard (web)', () => {
  it('renders a nested directions button whose click does not bubble to the card', () => {
    const onClick = jest.fn();
    const onDirections = jest.fn();
    const { getByRole } = render(
      <VenueCard name="The Warehouse" address="1 Main St" capacity={500} rating={4} onClick={onClick} onDirections={onDirections} />
    );
    fireEvent.click(getByRole('button', { name: 'Directions to The Warehouse' }));
    expect(onDirections).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('CountdownBadge (web)', () => {
  it('renders remaining time and an elapsed label after the target', () => {
    const live = render(<CountdownBadge remainingMs={3 * 86400_000 + 4 * 3600_000} label="Starts in" />);
    expect(live.getByText(/3d/)).toBeTruthy();

    const done = render(<CountdownBadge remainingMs={0} elapsedLabel="Started" />);
    expect(done.getByText('Started')).toBeTruthy();
  });
});

describe('TicketTypeRow (web)', () => {
  it('fires onSelect and reflects selection through aria-checked', () => {
    const onSelect = jest.fn();
    const { getByRole, rerender } = render(
      <TicketTypeRow name="General Admission" price="$49" description="Standing" onSelect={onSelect} />
    );
    fireEvent.click(getByRole('radio', { name: 'General Admission, $49' }));
    expect(onSelect).toHaveBeenCalledTimes(1);

    rerender(<TicketTypeRow name="General Admission" price="$49" selected onSelect={onSelect} />);
    expect(getByRole('radio', { name: 'General Admission, $49' }).getAttribute('aria-checked')).toBe('true');
  });

  it('does not fire onSelect when sold out', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<TicketTypeRow name="VIP" price="$199" remaining={0} onSelect={onSelect} />);
    const row = getByRole('radio', { name: 'VIP, $199, sold out' });
    expect((row as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(row);
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('CheckInRow (web)', () => {
  it('toggles check-in and reports the next state', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(
      <CheckInRow name="Ada Lovelace" ticketType="VIP" checkedIn={false} onToggle={onToggle} />
    );
    fireEvent.click(getByRole('switch', { name: 'Check in Ada Lovelace' }));
    expect(onToggle).toHaveBeenCalledWith(true);
    assertNoHexInStyles(container);
  });
});

describe('CalendarStrip (web)', () => {
  it('renders day pills and reports the tapped date', () => {
    const onSelectDate = jest.fn();
    const start = new Date(2026, 7, 24); // Mon Aug 24 2026
    const { getByRole } = render(<CalendarStrip startDate={start} days={5} selected={start} onSelectDate={onSelectDate} />);
    const pill = getByRole('tab', { name: `${weekdayLabel(start)} Aug 24` });
    expect(pill.getAttribute('aria-selected')).toBe('true');
    fireEvent.click(pill);
    expect(onSelectDate).toHaveBeenCalledTimes(1);
  });
});

describe('SessionCard (web)', () => {
  it('renders the capacity meter and toggles the bookmark without triggering the card', () => {
    const onBookmark = jest.fn();
    const onClick = jest.fn();
    const { getByText, getByRole, container } = render(
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
        onClick={onClick}
      />
    );
    expect(getByText('Scaling the Edge')).toBeTruthy();
    expect(getByText('40 / 100 seats taken')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Bookmark session' }));
    expect(onBookmark).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
    assertNoHexInStyles(container);
  });
});

describe('events/format helpers', () => {
  it('breaks a delta into clamped parts and marks elapsed', () => {
    const p = countdownParts(3 * 86400_000 + 4 * 3600_000 + 5 * 60_000);
    expect(p).toMatchObject({ days: 3, hours: 4, minutes: 5, elapsed: false });
    expect(countdownParts(0).elapsed).toBe(true);
  });
});
