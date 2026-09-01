import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { MatchScoreV2 } from './MatchScoreV2';
import { MatchScoreV3 } from './MatchScoreV3';
import { TeamCardV2 } from './TeamCardV2';
import { TeamCardV3 } from './TeamCardV3';
import { StandingsV2 } from './StandingsV2';
import { StandingsV3 } from './StandingsV3';
import { PlayerStatCardV2 } from './PlayerStatCardV2';
import { PlayerStatCardV3 } from './PlayerStatCardV3';
import type { StandingsRow, StandingsZone } from './Standings';
import {
  MatchScoreV4,
  PlayerStatCardV4,
  StandingsV4,
  TeamCardV4,
  FixtureRowV4,
  ScoreTickerV4,
  LiveCommentaryV4,
  BracketViewV4,
  MatchTimelineV4,
  LineupFieldV4,
  StatComparisonV4,
  LeagueBadgeV4,
  MatchHeader,
  PlayerProfileHeader,
  ChampionCard,
  TeamFormGuide,
  EventFeed,
  OddsBar,
} from './index';
import type { TickerMatch } from './ScoreTicker';
import type { CommentaryEntry } from './LiveCommentary';
import type { BracketRound } from './BracketView';
import type { MatchEvent } from './MatchTimeline';
import type { LineupPlayer } from './LineupField';
import type { StatComparisonRow } from './StatComparison';
import type { EventFeedItem } from './EventFeed';

const ROWS: StandingsRow[] = [
  { id: 'ars', team: 'Arsenal', crest: '🔴', played: 10, won: 8, drawn: 1, lost: 1, points: 25, goalDiff: 14, form: ['W', 'W', 'D', 'W', 'L'] },
  { id: 'mci', team: 'Man City', crest: '🔵', played: 10, won: 7, drawn: 2, lost: 1, points: 23, goalDiff: 12, form: ['W', 'D', 'W'] },
  { id: 'lut', team: 'Luton', crest: '🟠', played: 10, won: 1, drawn: 2, lost: 7, points: 5, goalDiff: -12, form: ['L', 'L', 'D'] },
];
const ZONES: StandingsZone[] = [
  { from: 1, to: 1, tone: 'success', label: 'Champions League' },
  { from: 3, to: 3, tone: 'danger', label: 'Relegation' },
];

const TICKER_MATCHES: TickerMatch[] = [
  { id: 'm1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, status: 'live', clock: "67'" },
  { id: 'm2', home: 'LIV', away: 'MCI', status: 'upcoming', clock: '17:30' },
];
const COMMENTARY: CommentaryEntry[] = [
  { id: 'c1', minute: "67'", kind: 'goal', text: 'Saka finishes low into the corner.', side: 'home', important: true },
  { id: 'c2', minute: "70'", kind: 'card', text: 'Booking for a late challenge.', side: 'away' },
];
const BRACKET_ROUNDS: BracketRound[] = [
  {
    title: 'Semi-finals',
    matches: [
      { id: 'sf1', top: { name: 'Arsenal', score: 2, winner: true }, bottom: { name: 'Chelsea', score: 1 } },
      { id: 'sf2', top: { name: 'Man City', score: 0 }, bottom: { name: 'Liverpool', score: 3, winner: true } },
    ],
  },
  { title: 'Final', matches: [{ id: 'f1', top: { name: 'Arsenal' }, bottom: { name: 'Liverpool' } }] },
];
const TIMELINE_EVENTS: MatchEvent[] = [
  { id: 't1', minute: "23'", kind: 'goal', side: 'home', label: 'Saka', detail: 'assist: Ødegaard' },
  { id: 't2', minute: "54'", kind: 'yellow', side: 'away', label: 'Fernández' },
  { id: 't3', minute: "78'", kind: 'sub', side: 'home', label: 'Jesus', detail: 'off: Havertz' },
];
const LINEUP_PLAYERS: LineupPlayer[] = [
  { id: 'p1', name: 'Raya', number: 22, x: 0.5, y: 0.9, side: 'home' },
  { id: 'p2', name: 'Saka', number: 7, x: 0.8, y: 0.4, side: 'home' },
  { id: 'p3', name: 'Palmer', number: 10, x: 0.3, y: 0.35, side: 'away' },
];
const COMPARISON_ROWS: StatComparisonRow[] = [
  { label: 'Possession', home: 58, away: 42, suffix: '%' },
  { label: 'Shots', home: 14, away: 9 },
  { label: 'Fouls', home: 11, away: 8, better: 'lower' },
];
const FEED_EVENTS: EventFeedItem[] = [
  { minute: "23'", kind: 'goal', text: 'Saka (assist: Ødegaard)', side: 'home' },
  { minute: "54'", kind: 'yellow', text: 'Fernández', side: 'away' },
  { minute: "78'", kind: 'sub', text: 'Jesus on for Havertz', side: 'home' },
];

describe('MatchScore alt designs (native)', () => {
  it('V2 renders a live scoreboard and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchScoreV2
        home={{ name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 }}
        away={{ name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 }}
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

  it('V2 shows a skeleton while loading', () => {
    const { getByLabelText } = renderThemed(
      <MatchScoreV2 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />,
      SEED_DARK
    );
    expect(getByLabelText('Loading match')).toBeTruthy();
  });

  it('V3 renders a compact fixture line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchScoreV3
        home={{ name: 'Arsenal', short: 'ARS', score: 2 }}
        away={{ name: 'Chelsea', short: 'CHE', score: 1 }}
        status="final"
        onPress={onPress}
      />,
      SEED_DARK
    );
    expect(getByText('2 - 1')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal 2 versus Chelsea 1, FT/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('TeamCard alt designs (native)', () => {
  it('V2 renders the crest hero record and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TeamCardV2 name="Arsenal" crest="🔴" league="Premier League" won={8} drawn={1} lost={1} rank={1} form={['W', 'W', 'D']} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Rank #1')).toBeTruthy();
    expect(getByText('Won')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal, rank 1/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TeamCardV3 name="Arsenal" crest="🔴" league="Premier League" won={8} drawn={1} lost={1} rank={2} form={['W', 'D', 'L']} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('#2')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal, rank 2/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('Standings alt designs (native)', () => {
  it('V2 renders rows, zones, form dots and selects a team', () => {
    const onSelectTeam = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <StandingsV2 rows={ROWS} zones={ZONES} showForm onSelectTeam={onSelectTeam} activeId="mci" />,
      SEED_LIGHT
    );
    expect(getByText('Arsenal')).toBeTruthy();
    fireEvent.press(getByLabelText(/1\. Arsenal, 25 points.*Champions League/));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
    expect(onSelectTeam.mock.calls[0][0].id).toBe('ars');
  });

  it('V2 renders an empty table', () => {
    const { getByText } = renderThemed(<StandingsV2 rows={[]} />, SEED_DARK);
    expect(getByText('No standings yet')).toBeTruthy();
  });

  it('V3 renders a ranked list with movement and selects a team', () => {
    const onSelectTeam = jest.fn();
    const { getByText, getAllByText, getByLabelText } = renderThemed(
      <StandingsV3 rows={ROWS} zones={ZONES} showForm onSelectTeam={onSelectTeam} activeId="mci" />,
      SEED_DARK
    );
    expect(getByText('Luton')).toBeTruthy();
    expect(getAllByText('Played 10').length).toBeGreaterThan(0);
    fireEvent.press(getByLabelText(/1\. Arsenal, 25 points.*moving down/));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
    expect(onSelectTeam.mock.calls[0][0].id).toBe('ars');
  });

  it('V3 renders an empty list', () => {
    const { getByText } = renderThemed(<StandingsV3 rows={[]} />, SEED_LIGHT);
    expect(getByText('No standings yet')).toBeTruthy();
  });
});

describe('PlayerStatCard alt designs (native)', () => {
  it('V2 renders the profile with a stat grid and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PlayerStatCardV2
        name="Bukayo Saka"
        position="Winger"
        number={7}
        team="Arsenal"
        status="available"
        stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Goals')).toBeTruthy();
    fireEvent.press(getByLabelText(/Bukayo Saka, Winger, Available/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense stat row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PlayerStatCardV3
        name="Bukayo Saka"
        position="Winger"
        number={7}
        team="Arsenal"
        status="injured"
        stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]}
        onPress={onPress}
      />,
      SEED_DARK
    );
    expect(getByText('Goals')).toBeTruthy();
    fireEvent.press(getByLabelText(/Bukayo Saka, Winger, Injured/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('sports V4 "broadcast" line (native)', () => {
  it('MatchScoreV4 renders and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchScoreV4
        home={{ name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 }}
        away={{ name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 }}
        status="live"
        minute="67'"
        competition="Premier League"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Arsenal')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal 2 versus Chelsea 1, LIVE/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('MatchScoreV4 renders the feature gradient variant', () => {
    const { getByText } = renderThemed(
      <MatchScoreV4
        home={{ name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 }}
        away={{ name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 }}
        status="final"
        variant="feature"
        competition="Cup Final"
      />,
      SEED_DARK
    );
    expect(getByText('Chelsea')).toBeTruthy();
  });

  it('FixtureRowV4 renders and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FixtureRowV4 home="Arsenal" away="Chelsea" homeScore={2} awayScore={1} status="live" minute="67'" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Arsenal')).toBeTruthy();
    fireEvent.press(getByLabelText(/Arsenal versus Chelsea, LIVE/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('PlayerStatCardV4 renders', () => {
    const { getByText } = renderThemed(
      <PlayerStatCardV4 name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]} />,
      SEED_DARK
    );
    expect(getByText('Goals')).toBeTruthy();
  });

  it('StandingsV4 renders', () => {
    const { getByText } = renderThemed(<StandingsV4 rows={ROWS} zones={ZONES} showForm activeId="mci" />, SEED_LIGHT);
    expect(getByText('Arsenal')).toBeTruthy();
  });

  it('TeamCardV4 renders', () => {
    const { getByText } = renderThemed(
      <TeamCardV4 name="Arsenal" crest="🔴" league="Premier League" won={8} drawn={1} lost={1} rank={1} form={['W', 'W', 'D']} />,
      SEED_DARK
    );
    expect(getByText('Arsenal')).toBeTruthy();
  });

  it('ScoreTickerV4 renders', () => {
    const { getByText } = renderThemed(<ScoreTickerV4 matches={TICKER_MATCHES} />, SEED_LIGHT);
    expect(getByText('ARS')).toBeTruthy();
  });

  it('LiveCommentaryV4 renders', () => {
    const { getByText } = renderThemed(<LiveCommentaryV4 entries={COMMENTARY} live title="Live commentary" />, SEED_DARK);
    expect(getByText('Saka finishes low into the corner.')).toBeTruthy();
  });

  it('BracketViewV4 renders', () => {
    const { getByText } = renderThemed(<BracketViewV4 rounds={BRACKET_ROUNDS} />, SEED_LIGHT);
    expect(getByText('Semi-finals')).toBeTruthy();
  });

  it('MatchTimelineV4 renders', () => {
    const { getByText } = renderThemed(
      <MatchTimelineV4 homeLabel="Arsenal" awayLabel="Chelsea" events={TIMELINE_EVENTS} />,
      SEED_DARK
    );
    expect(getByText('Saka')).toBeTruthy();
  });

  it('LineupFieldV4 renders', () => {
    const { getByText } = renderThemed(<LineupFieldV4 players={LINEUP_PLAYERS} formation="4-3-3" />, SEED_LIGHT);
    expect(getByText('Saka')).toBeTruthy();
  });

  it('StatComparisonV4 renders', () => {
    const { getByText } = renderThemed(
      <StatComparisonV4 homeLabel="Arsenal" awayLabel="Chelsea" rows={COMPARISON_ROWS} homeCrest="🔴" awayCrest="🔵" />,
      SEED_DARK
    );
    expect(getByText('Possession')).toBeTruthy();
  });

  it('LeagueBadgeV4 renders', () => {
    const { getByText } = renderThemed(<LeagueBadgeV4 name="Premier League" crest="🏴" />, SEED_LIGHT);
    expect(getByText('Premier League')).toBeTruthy();
  });
});

describe('sports V4 new blocks (native)', () => {
  it('MatchHeader renders and fires onBack', () => {
    const onBack = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchHeader
        home={{ name: 'Arsenal', crest: '🔴', score: 2 }}
        away={{ name: 'Chelsea', crest: '🔵', score: 1 }}
        status="live"
        minute="67'"
        competition="Premier League · MD 12"
        venue="Emirates Stadium"
        onBack={onBack}
      />,
      SEED_LIGHT
    );
    expect(getByText('Emirates Stadium')).toBeTruthy();
    fireEvent.press(getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('PlayerProfileHeader renders', () => {
    const { getByText } = renderThemed(
      <PlayerProfileHeader name="Bukayo Saka" position="Forward" team="Arsenal" number={7} crest="🧑" stats={[{ label: 'Goals', value: '24' }, { label: 'Assists', value: '11' }]} onFollow={jest.fn()} />,
      SEED_DARK
    );
    expect(getByText('Bukayo Saka')).toBeTruthy();
  });

  it('ChampionCard renders', () => {
    const { getByText } = renderThemed(
      <ChampionCard title="Champions 2024" team="Arsenal" crest="🔴" subtitle="Premier League" stat={{ label: 'Points', value: '89' }} onShare={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('Champions 2024')).toBeTruthy();
  });

  it('TeamFormGuide renders and fires onResultPress', () => {
    const onResultPress = jest.fn();
    const { getAllByLabelText } = renderThemed(
      <TeamFormGuide results={['W', 'D', 'L', 'W', 'W']} label="Last 5" onResultPress={onResultPress} />,
      SEED_DARK
    );
    fireEvent.press(getAllByLabelText('Win')[0]);
    expect(onResultPress).toHaveBeenCalledTimes(1);
    expect(onResultPress.mock.calls[0][0]).toBe(0);
  });

  it('EventFeed renders', () => {
    const { getByText } = renderThemed(<EventFeed title="Key events" events={FEED_EVENTS} />, SEED_LIGHT);
    expect(getByText('Key events')).toBeTruthy();
  });

  it('OddsBar renders and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(<OddsBar home={1.85} draw={3.4} away={4.2} onSelect={onSelect} />, SEED_DARK);
    fireEvent.press(getByLabelText(/^Home 1\.85/));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBe('home');
  });
});

describe('token purity (native sports alt designs, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <MatchScoreV2 home={{ name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 }} away={{ name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 }} status="live" minute="67'" competition="PL" />
          <MatchScoreV2 home={{ name: 'A' }} away={{ name: 'B' }} status="final" />
          <MatchScoreV2 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" kickoffLabel="Sat 15:00" />
          <MatchScoreV2 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />
          <MatchScoreV3 home={{ name: 'Arsenal', short: 'ARS', score: 2 }} away={{ name: 'Chelsea', short: 'CHE', score: 1 }} status="live" minute="67'" competition="PL" />
          <MatchScoreV3 home={{ name: 'A', short: 'A' }} away={{ name: 'B', short: 'B' }} status="upcoming" kickoffLabel="17:30" />
          <MatchScoreV3 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />
          <TeamCardV2 name="Arsenal" crest="🔴" league="PL" won={8} drawn={1} lost={1} rank={1} form={['W', 'D', 'L']} selected />
          <TeamCardV2 name="Empty" loading />
          <TeamCardV3 name="Arsenal" crest="🔴" league="PL" won={8} drawn={1} lost={1} rank={2} form={['W', 'D', 'L']} selected />
          <TeamCardV3 name="Empty" loading />
          <StandingsV2 rows={ROWS} zones={ZONES} showForm activeId="mci" />
          <StandingsV2 rows={ROWS} variant="compact" />
          <StandingsV2 rows={[]} />
          <StandingsV2 rows={[]} loadingRows={3} />
          <StandingsV3 rows={ROWS} zones={ZONES} showForm activeId="mci" />
          <StandingsV3 rows={[]} />
          <StandingsV3 rows={[]} loadingRows={3} />
          <PlayerStatCardV2 name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }, { label: 'Apps', value: 12 }]} />
          <PlayerStatCardV2 name="Injured" status="injured" />
          <PlayerStatCardV2 name="Loading" loading />
          <PlayerStatCardV3 name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="suspended" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]} />
          <PlayerStatCardV3 name="Empty" />
          <PlayerStatCardV3 name="Loading" loading />
          {/* ── V4 "broadcast" line ── */}
          <MatchScoreV4 home={{ name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 }} away={{ name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 }} status="live" minute="67'" competition="PL" />
          <MatchScoreV4 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" kickoffLabel="Sat 15:00" />
          <MatchScoreV4 home={{ name: 'A' }} away={{ name: 'B' }} status="upcoming" loading />
          {/* gradient piece — feature variant */}
          <MatchScoreV4 home={{ name: 'Arsenal', crest: '🔴', score: 2 }} away={{ name: 'Chelsea', crest: '🔵', score: 1 }} status="final" variant="feature" competition="Cup Final" />
          <FixtureRowV4 home="Arsenal" away="Chelsea" homeScore={2} awayScore={1} status="live" minute="67'" />
          <FixtureRowV4 home="Luton" away="Everton" status="scheduled" kickoffLabel="Sat 15:00" highlighted />
          <PlayerStatCardV4 name="Bukayo Saka" position="Winger" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 9, highlight: true }, { label: 'Assists', value: 6 }]} />
          <PlayerStatCardV4 name="Injured" status="injured" />
          <StandingsV4 rows={ROWS} zones={ZONES} showForm activeId="mci" />
          <StandingsV4 rows={[]} />
          <TeamCardV4 name="Arsenal" crest="🔴" league="PL" won={8} drawn={1} lost={1} rank={1} form={['W', 'D', 'L']} />
          <ScoreTickerV4 matches={TICKER_MATCHES} />
          <LiveCommentaryV4 entries={COMMENTARY} live />
          <BracketViewV4 rounds={BRACKET_ROUNDS} />
          <MatchTimelineV4 homeLabel="Arsenal" awayLabel="Chelsea" events={TIMELINE_EVENTS} />
          <LineupFieldV4 players={LINEUP_PLAYERS} formation="4-3-3" />
          <StatComparisonV4 homeLabel="Arsenal" awayLabel="Chelsea" rows={COMPARISON_ROWS} homeCrest="🔴" awayCrest="🔵" />
          <LeagueBadgeV4 name="Premier League" crest="🏴" />
          {/* ── V4 new blocks (gradient pieces MUST be here) ── */}
          <MatchHeader home={{ name: 'Arsenal', crest: '🔴', score: 2 }} away={{ name: 'Chelsea', crest: '🔵', score: 1 }} status="live" minute="67'" competition="Premier League · MD 12" venue="Emirates Stadium" onBack={() => {}} />
          <PlayerProfileHeader name="Bukayo Saka" position="Forward" team="Arsenal" number={7} crest="🧑" stats={[{ label: 'Goals', value: '24' }, { label: 'Assists', value: '11' }]} onFollow={() => {}} following />
          <ChampionCard title="Champions 2024" team="Arsenal" crest="🔴" subtitle="Premier League" stat={{ label: 'Points', value: '89' }} onShare={() => {}} />
          <TeamFormGuide results={['W', 'D', 'L', 'W', 'W']} label="Last 5" onResultPress={() => {}} />
          <EventFeed title="Key events" events={FEED_EVENTS} />
          <OddsBar home={1.85} draw={3.4} away={4.2} selected="home" onSelect={() => {}} />
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
