/** @jest-environment jsdom */
/**
 * Web sports blocks: render smoke for the full set, plus the behavioral
 * contracts that matter — the empty Standings state, token-class styling (no
 * literal colors), and the two headline interactions (team select on a
 * Standings row, fixture tap). Plain jsdom render via `@testing-library/react`;
 * no provider needed since we assert on token *class names*, which are static.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  MatchScore,
  Standings,
  type StandingsRow,
  type StandingsZone,
  TeamCard,
  PlayerStatCard,
  FixtureRow,
  LiveCommentary,
  BracketView,
  type BracketRound,
  ScoreTicker,
  type TickerMatch,
  StatComparison,
  LineupField,
  type LineupPlayer,
  MatchTimeline,
  type MatchEvent,
  LeagueBadge,
} from './index';

const ROWS: StandingsRow[] = [
  { id: 'ars', team: 'Arsenal', crest: '🔴', played: 10, won: 8, drawn: 1, lost: 1, points: 25, goalDiff: 14, form: ['W', 'W', 'D', 'W', 'L'] },
  { id: 'mci', team: 'Man City', crest: '🔵', played: 10, won: 7, drawn: 2, lost: 1, points: 23, goalDiff: 12 },
  { id: 'lut', team: 'Luton', crest: '🟠', played: 10, won: 1, drawn: 2, lost: 7, points: 5, goalDiff: -12 },
];
const ZONES: StandingsZone[] = [
  { from: 1, to: 1, tone: 'success', label: 'Champions League' },
  { from: 3, to: 3, tone: 'danger', label: 'Relegation' },
];

describe('MatchScore (web)', () => {
  it('renders a live scoreline with LIVE text + a danger dot, and is token-styled', () => {
    const { getByText, container } = render(
      <MatchScore
        home={{ name: 'Arsenal', score: 2 }}
        away={{ name: 'Chelsea', score: 1 }}
        status="live"
        minute="67'"
        competition="Premier League"
      />
    );
    expect(getByText('Premier League')).toBeTruthy();
    expect(getByText("67'")).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('bg-surface');
    // Live is conveyed by text + a danger dot, never color alone.
    expect(container.querySelector('.bg-danger')).not.toBeNull();
  });

  it('activates onClick as a role=button (native onPress → web onClick)', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <MatchScore
        home={{ name: 'Arsenal', score: 2 }}
        away={{ name: 'Chelsea', score: 1 }}
        status="live"
        minute="67'"
        onClick={onClick}
      />
    );
    const btn = getByRole('button', { name: /Arsenal 2 versus Chelsea 1, LIVE/ });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    // Keyboard parity: Enter also activates.
    fireEvent.keyDown(btn, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('shows a skeleton while loading', () => {
    const { getByLabelText } = render(
      <MatchScore home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />
    );
    expect(getByLabelText('Loading match')).toBeTruthy();
  });
});

describe('Standings (web)', () => {
  it('renders rows + zones and selects a team on click', () => {
    const onSelectTeam = jest.fn();
    const { getByText, getByRole } = render(
      <Standings rows={ROWS} zones={ZONES} showForm onSelectTeam={onSelectTeam} activeId="mci" />
    );
    expect(getByText('Arsenal')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: /1\. Arsenal, 25 points.*Champions League/ }));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
    expect(onSelectTeam.mock.calls[0][0].id).toBe('ars');
  });

  it('renders an empty standings table via the shared EmptyState', () => {
    const { getByText, container } = render(<Standings rows={[]} />);
    expect(getByText('No standings yet')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
  });
});

describe('FixtureRow (web)', () => {
  it('renders a scheduled fixture and taps it', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <FixtureRow home="Arsenal" away="Spurs" kickoffLabel="Sat 15:00" meta="Emirates" onClick={onClick} />
    );
    expect(getByText('Sat 15:00')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: /Arsenal versus Spurs/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('ScoreTicker (web)', () => {
  const MATCHES: TickerMatch[] = [
    { id: 't1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, status: 'live', clock: "67'" },
    { id: 't2', home: 'LIV', away: 'EVE', status: 'upcoming', clock: '17:30' },
  ];
  it('selects a match tile on click (onSelect, DOM onSelect Omitted)', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<ScoreTicker matches={MATCHES} onSelect={onSelect} />);
    fireEvent.click(getByRole('button', { name: /ARS versus CHE, LIVE/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('t1');
  });
});

describe('TeamCard (web)', () => {
  it('renders record + rank and activates onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <TeamCard name="Arsenal" league="Premier League" won={8} drawn={1} lost={1} rank={1} form={['W', 'W', 'D']} onClick={onClick} />
    );
    expect(getByText('8W · 1D · 1L')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: /Arsenal, rank 1/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('sports showcase (web smoke, token-pure)', () => {
  const ROUNDS: BracketRound[] = [
    {
      title: 'Semi-finals',
      matches: [
        { id: 'm1', top: { name: 'Arsenal', score: 2, winner: true }, bottom: { name: 'PSG', score: 1 } },
        { id: 'm2', top: { name: 'Real', score: 0 }, bottom: { name: 'Bayern', score: 3, winner: true } },
      ],
    },
    { title: 'Final', matches: [{ id: 'f1', top: {}, bottom: {} }] },
  ];
  const PLAYERS: LineupPlayer[] = [
    { id: 'p1', name: 'Raya', number: 1, x: 0.5, y: 0.9, side: 'home' },
    { id: 'p2', name: 'Saka', number: 7, x: 0.8, y: 0.4, side: 'home' },
  ];
  const EVENTS: MatchEvent[] = [
    { id: 'e1', minute: "23'", kind: 'goal', side: 'home', label: 'Saka', detail: 'assist Ødegaard' },
    { id: 'e2', minute: "58'", kind: 'yellow', side: 'away', label: 'Silva' },
  ];

  it('renders the full composition without literal hex colors in class names', () => {
    const { container, getByText } = render(
      <main>
        <PlayerStatCard name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]} />
        <LiveCommentary entries={[{ id: 'c1', minute: "67'", kind: 'goal', text: 'GOAL! Saka finishes.', important: true }]} live />
        <LiveCommentary entries={[]} />
        <BracketView rounds={ROUNDS} />
        <StatComparison homeLabel="Arsenal" awayLabel="Chelsea" rows={[{ label: 'Possession', home: 62, away: 38, suffix: '%' }]} />
        <LineupField players={PLAYERS} formation="4-3-3" />
        <LineupField players={[]} />
        <MatchTimeline homeLabel="Arsenal" awayLabel="Chelsea" events={EVENTS} />
        <LeagueBadge name="Premier League" variant="solid" />
      </main>
    );
    expect(getByText('GOAL! Saka finishes.')).toBeTruthy();
    expect(getByText('No commentary yet')).toBeTruthy();
    expect(getByText('Lineup not announced')).toBeTruthy();
    // Away bar uses the accent token slot; home the primary slot.
    expect(container.querySelector('.bg-accent')).not.toBeNull();
    expect(container.querySelector('.bg-primary')).not.toBeNull();
    // No literal hex color leaked into any className.
    const classAttrs = Array.from(container.querySelectorAll<HTMLElement>('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');
    expect(classAttrs).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('BracketView selects a match on click', () => {
    const onSelectMatch = jest.fn();
    const { getByRole } = render(<BracketView rounds={ROUNDS} onSelectMatch={onSelectMatch} />);
    fireEvent.click(getByRole('button', { name: 'Arsenal versus PSG' }));
    expect(onSelectMatch).toHaveBeenCalledTimes(1);
    expect(onSelectMatch.mock.calls[0][0].id).toBe('m1');
  });

  it('LineupField selects a player token on click', () => {
    const onSelectPlayer = jest.fn();
    const { getByRole } = render(<LineupField players={PLAYERS} onSelectPlayer={onSelectPlayer} />);
    fireEvent.click(getByRole('button', { name: /Saka, number 7, home/ }));
    expect(onSelectPlayer).toHaveBeenCalledTimes(1);
    expect(onSelectPlayer.mock.calls[0][0].id).toBe('p2');
  });
});
