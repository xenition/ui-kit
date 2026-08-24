import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { MatchScore } from './MatchScore';
import { Standings, type StandingsRow, type StandingsZone } from './Standings';
import { TeamCard } from './TeamCard';
import { PlayerStatCard } from './PlayerStatCard';
import { FixtureRow } from './FixtureRow';
import { LiveCommentary, type CommentaryEntry } from './LiveCommentary';
import { BracketView, type BracketRound } from './BracketView';
import { ScoreTicker, type TickerMatch } from './ScoreTicker';
import { StatComparison, type StatComparisonRow } from './StatComparison';
import { LineupField, type LineupPlayer } from './LineupField';
import { MatchTimeline, type MatchEvent } from './MatchTimeline';
import { LeagueBadge } from './LeagueBadge';

const ROWS: StandingsRow[] = [
  { id: 'ars', team: 'Arsenal', crest: '🔴', played: 10, won: 8, drawn: 1, lost: 1, points: 25, goalDiff: 14, form: ['W', 'W', 'D', 'W', 'L'] },
  { id: 'mci', team: 'Man City', crest: '🔵', played: 10, won: 7, drawn: 2, lost: 1, points: 23, goalDiff: 12 },
  { id: 'lut', team: 'Luton', crest: '🟠', played: 10, won: 1, drawn: 2, lost: 7, points: 5, goalDiff: -12 },
];
const ZONES: StandingsZone[] = [
  { from: 1, to: 1, tone: 'success', label: 'Champions League' },
  { from: 3, to: 3, tone: 'danger', label: 'Relegation' },
];

describe('MatchScore (native)', () => {
  it('renders a live scoreline with LIVE text + minute and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchScore
        home={{ name: 'Arsenal', score: 2 }}
        away={{ name: 'Chelsea', score: 1 }}
        status="live"
        minute="67'"
        competition="Premier League"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Premier League')).toBeTruthy();
    expect(getByText("67'")).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal 2 versus Chelsea 1, LIVE/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows a skeleton while loading', () => {
    const { getByLabelText } = renderThemed(
      <MatchScore home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />,
      SEED_DARK
    );
    expect(getByLabelText('Loading match')).toBeTruthy();
  });
});

describe('Standings (native)', () => {
  it('renders rows, zones, and selects a team on tap', () => {
    const onSelectTeam = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <Standings rows={ROWS} zones={ZONES} showForm onSelectTeam={onSelectTeam} activeId="mci" />,
      SEED_LIGHT
    );
    expect(getByText('Arsenal')).toBeTruthy();
    fireEvent.press(getByLabelText(/1\. Arsenal, 25 points.*Champions League/));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
    expect(onSelectTeam.mock.calls[0][0].id).toBe('ars');
  });

  it('renders an empty standings table', () => {
    const { getByText } = renderThemed(<Standings rows={[]} />, SEED_DARK);
    expect(getByText('No standings yet')).toBeTruthy();
  });
});

describe('TeamCard (native)', () => {
  it('renders record + rank and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TeamCard name="Arsenal" league="Premier League" won={8} drawn={1} lost={1} rank={1} form={['W', 'W', 'D']} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('8W · 1D · 1L')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal, rank 1/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('FixtureRow (native)', () => {
  it('renders a scheduled fixture and taps it', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FixtureRow home="Arsenal" away="Spurs" kickoffLabel="Sat 15:00" meta="Emirates" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Sat 15:00')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal versus Spurs, vs, Sat 15:00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('LiveCommentary (native)', () => {
  const ENTRIES: CommentaryEntry[] = [
    { id: 'c1', minute: "67'", kind: 'goal', text: 'GOAL! Saka finishes.', important: true },
    { id: 'c2', minute: "70'", kind: 'card', text: 'Yellow for a late tackle.' },
  ];
  it('renders entries with a live header', () => {
    const { getByText } = renderThemed(<LiveCommentary entries={ENTRIES} live />, SEED_LIGHT);
    expect(getByText('GOAL! Saka finishes.')).toBeTruthy();
  });
  it('renders an empty state', () => {
    const { getByText } = renderThemed(<LiveCommentary entries={[]} />, SEED_DARK);
    expect(getByText('No commentary yet')).toBeTruthy();
  });
});

describe('BracketView (native, static)', () => {
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
  it('renders rounds and selects a match', () => {
    const onSelectMatch = jest.fn();
    const { getByLabelText } = renderThemed(<BracketView rounds={ROUNDS} onSelectMatch={onSelectMatch} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Arsenal versus PSG'));
    expect(onSelectMatch).toHaveBeenCalledTimes(1);
    expect(onSelectMatch.mock.calls[0][0].id).toBe('m1');
  });
});

describe('ScoreTicker (native)', () => {
  const MATCHES: TickerMatch[] = [
    { id: 't1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, status: 'live', clock: "67'" },
    { id: 't2', home: 'LIV', away: 'EVE', status: 'upcoming', clock: '17:30' },
  ];
  it('selects a match tile on tap', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(<ScoreTicker matches={MATCHES} onSelect={onSelect} />, SEED_DARK);
    fireEvent.press(getByLabelText(/ARS versus CHE, LIVE/));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('t1');
  });
});

describe('StatComparison (native)', () => {
  const STATS: StatComparisonRow[] = [
    { label: 'Possession', home: 62, away: 38, suffix: '%' },
    { label: 'Shots', home: 14, away: 9 },
  ];
  it('renders mirrored stat rows', () => {
    const { getByText } = renderThemed(
      <StatComparison homeLabel="Arsenal" awayLabel="Chelsea" rows={STATS} />,
      SEED_LIGHT
    );
    expect(getByText('Possession')).toBeTruthy();
    expect(getByText('62%')).toBeTruthy();
  });
});

describe('LineupField (native, static)', () => {
  const PLAYERS: LineupPlayer[] = [
    { id: 'p1', name: 'Raya', number: 1, x: 0.5, y: 0.9, side: 'home' },
    { id: 'p2', name: 'Saka', number: 7, x: 0.8, y: 0.4, side: 'home' },
  ];
  it('places player tokens and selects one', () => {
    const onSelectPlayer = jest.fn();
    const { getByLabelText } = renderThemed(
      <LineupField players={PLAYERS} formation="4-3-3" onSelectPlayer={onSelectPlayer} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Saka, number 7, home/));
    expect(onSelectPlayer).toHaveBeenCalledTimes(1);
  });
  it('renders an empty pitch', () => {
    const { getByText } = renderThemed(<LineupField players={[]} />, SEED_LIGHT);
    expect(getByText('Lineup not announced')).toBeTruthy();
  });
});

describe('MatchTimeline (native)', () => {
  const EVENTS: MatchEvent[] = [
    { id: 'e1', minute: "23'", kind: 'goal', side: 'home', label: 'Saka', detail: 'assist Ødegaard' },
    { id: 'e2', minute: "58'", kind: 'yellow', side: 'away', label: 'Silva' },
  ];
  it('renders events attributed to each side', () => {
    const { getByLabelText } = renderThemed(
      <MatchTimeline homeLabel="Arsenal" awayLabel="Chelsea" events={EVENTS} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/23', Goal, Arsenal: Saka/)).toBeTruthy();
  });
});

describe('token purity (native sports, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <MatchScore home={{ name: 'Arsenal', score: 2 }} away={{ name: 'Chelsea', score: 1 }} status="live" minute="67'" competition="PL" />
          <MatchScore home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />
          <Standings rows={ROWS} zones={ZONES} showForm activeId="mci" />
          <Standings rows={[]} />
          <TeamCard name="Arsenal" league="PL" won={8} drawn={1} lost={1} rank={1} form={['W', 'D', 'L']} />
          <PlayerStatCard name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]} />
          <PlayerStatCard name="Loading" loading />
          <FixtureRow home="Arsenal" away="Spurs" kickoffLabel="Sat 15:00" meta="Emirates" />
          <FixtureRow home="Liverpool" away="Everton" homeScore={3} awayScore={0} status="final" />
          <LiveCommentary entries={[{ id: 'c1', minute: "67'", kind: 'goal', text: 'GOAL', important: true }]} live />
          <LiveCommentary entries={[]} />
          <BracketView rounds={[{ title: 'Final', matches: [{ id: 'f1', top: { name: 'Arsenal', winner: true }, bottom: {} }] }]} />
          <BracketView rounds={[]} />
          <ScoreTicker matches={[{ id: 't1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, status: 'live', clock: "67'" }]} />
          <ScoreTicker matches={[]} />
          <StatComparison homeLabel="Arsenal" awayLabel="Chelsea" rows={[{ label: 'Possession', home: 62, away: 38, suffix: '%' }]} />
          <StatComparison homeLabel="A" awayLabel="B" rows={[]} />
          <LineupField players={[{ id: 'p1', name: 'Saka', number: 7, x: 0.8, y: 0.4, side: 'home' }, { id: 'p2', name: 'Silva', number: 6, x: 0.2, y: 0.4, side: 'away' }]} formation="4-3-3" />
          <LineupField players={[]} />
          <MatchTimeline homeLabel="Arsenal" awayLabel="Chelsea" events={[{ id: 'e1', minute: "23'", kind: 'goal', side: 'home', label: 'Saka' }, { id: 'e2', minute: "58'", kind: 'red', side: 'away', label: 'Silva' }]} />
          <MatchTimeline events={[]} />
          <LeagueBadge name="Premier League" variant="solid" />
          <LeagueBadge name="La Liga" variant="outline" size="lg" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
