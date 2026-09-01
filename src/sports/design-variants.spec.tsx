/** @jest-environment jsdom */
/**
 * Alternate sports designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of MatchScore, PlayerStatCard, Standings, TeamCard. Each variant keeps the base
 * props; these specs prove they (a) mount, (b) stay token-pure (no literal hex in
 * inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { MatchScoreV2 } from './MatchScoreV2';
import { MatchScoreV3 } from './MatchScoreV3';
import { PlayerStatCardV2 } from './PlayerStatCardV2';
import { PlayerStatCardV3 } from './PlayerStatCardV3';
import { StandingsV2 } from './StandingsV2';
import { StandingsV3 } from './StandingsV3';
import { TeamCardV2 } from './TeamCardV2';
import { TeamCardV3 } from './TeamCardV3';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const HOME = { name: 'Arsenal', short: 'ARS', crest: '🔴', score: 2 };
const AWAY = { name: 'Chelsea', short: 'CHE', crest: '🔵', score: 1 };
const ROWS = [
  { id: 'a', team: 'Alpha', played: 10, won: 7, drawn: 2, lost: 1, points: 23, form: ['W', 'W', 'D'] as ('W' | 'D' | 'L')[] },
  { id: 'b', team: 'Beta', played: 10, won: 3, drawn: 3, lost: 4, points: 12 },
];

describe('MatchScore alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<MatchScoreV2 home={HOME} away={AWAY} status="live" minute="67'" onClick={onClick} />);
    expect(getByText('Arsenal')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Arsenal'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<MatchScoreV3 home={HOME} away={AWAY} status="final" />);
    expect(getByText('ARS')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PlayerStatCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PlayerStatCardV2 name="Bukayo" position="Forward" number={7} stats={[{ label: 'Goals', value: 12, highlight: true }]} status="available" onClick={onClick} />);
    expect(getByText('Bukayo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Bukayo'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<PlayerStatCardV3 name="Kai" position="Mid" stats={[{ label: 'Assists', value: 5 }]} status="injured" />);
    expect(getByText('Kai')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('Standings alternates (web)', () => {
  it('V2 selects a team', () => {
    const onSelectTeam = jest.fn();
    const { getByText, container } = render(<StandingsV2 rows={ROWS} zones={[{ from: 1, to: 1, tone: 'success', label: 'Promotion' }]} onSelectTeam={onSelectTeam} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Alpha'));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
  });
  it('V3 selects a team', () => {
    const onSelectTeam = jest.fn();
    const { getByText, container } = render(<StandingsV3 rows={ROWS} onSelectTeam={onSelectTeam} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Beta'));
    expect(onSelectTeam).toHaveBeenCalledTimes(1);
  });
});

describe('TeamCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<TeamCardV2 name="Rangers" league="Prem" won={7} drawn={2} lost={1} rank={2} form={['W', 'W', 'L']} onClick={onClick} />);
    expect(getByText('Rangers')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Rangers'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<TeamCardV3 name="Celtic" league="Prem" rank={1} form={['W', 'D']} />);
    expect(getByText('Celtic')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

// ── V4 "broadcast" line ──────────────────────────────────────────────────────

const TICKER_MATCHES = [
  { id: 'm1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, status: 'live' as const, clock: "67'" },
  { id: 'm2', home: 'LIV', away: 'MCI', status: 'upcoming' as const, clock: '17:30' },
];
const COMMENTARY = [
  { id: 'c1', minute: "67'", kind: 'goal' as const, text: 'Saka finishes low into the corner.', side: 'home' as const, important: true },
  { id: 'c2', minute: "70'", kind: 'card' as const, text: 'Booking for a late challenge.', side: 'away' as const },
];
const BRACKET_ROUNDS = [
  {
    title: 'Semi-finals',
    matches: [
      { id: 'sf1', top: { name: 'Arsenal', score: 2, winner: true }, bottom: { name: 'Chelsea', score: 1 } },
      { id: 'sf2', top: { name: 'Man City', score: 0 }, bottom: { name: 'Liverpool', score: 3, winner: true } },
    ],
  },
  {
    title: 'Final',
    matches: [{ id: 'f1', top: { name: 'Arsenal' }, bottom: { name: 'Liverpool' } }],
  },
];
const TIMELINE_EVENTS = [
  { id: 't1', minute: "23'", kind: 'goal' as const, side: 'home' as const, label: 'Saka', detail: 'assist: Ødegaard' },
  { id: 't2', minute: "54'", kind: 'yellow' as const, side: 'away' as const, label: 'Fernández' },
  { id: 't3', minute: "78'", kind: 'sub' as const, side: 'home' as const, label: 'Jesus', detail: 'off: Havertz' },
];
const LINEUP_PLAYERS = [
  { id: 'p1', name: 'Raya', number: 22, x: 0.5, y: 0.9, side: 'home' as const },
  { id: 'p2', name: 'Saka', number: 7, x: 0.8, y: 0.4, side: 'home' as const },
  { id: 'p3', name: 'Palmer', number: 10, x: 0.3, y: 0.35, side: 'away' as const },
];
const COMPARISON_ROWS = [
  { label: 'Possession', home: 58, away: 42, suffix: '%' },
  { label: 'Shots', home: 14, away: 9 },
  { label: 'Fouls', home: 11, away: 8, better: 'lower' as const },
];

describe('sports V4 "broadcast" line (web)', () => {
  it('MatchScoreV4 mounts, stays token-pure and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <MatchScoreV4 home={HOME} away={AWAY} status="live" minute="67'" competition="Premier League" onClick={onClick} />
    );
    expect(getByText('Arsenal')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Arsenal'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('MatchScoreV4 renders the feature gradient variant token-pure', () => {
    const { getByText, container } = render(
      <MatchScoreV4 home={HOME} away={AWAY} status="final" variant="feature" competition="Cup Final" />
    );
    expect(getByText('Chelsea')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('FixtureRowV4 mounts, stays token-pure and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <FixtureRowV4 home="Arsenal" away="Chelsea" homeScore={2} awayScore={1} status="live" minute="67'" onClick={onClick} />
    );
    expect(getByText('Arsenal')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Arsenal'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('PlayerStatCardV4 mounts token-pure', () => {
    const { getByText, container } = render(
      <PlayerStatCardV4 name="Bukayo" position="Forward" number={7} team="Arsenal" status="available" stats={[{ label: 'Goals', value: 12, highlight: true }, { label: 'Assists', value: 6 }]} />
    );
    expect(getByText('Bukayo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('StandingsV4 mounts token-pure', () => {
    const { getByText, container } = render(
      <StandingsV4 rows={ROWS} zones={[{ from: 1, to: 1, tone: 'success', label: 'Promotion' }]} showForm />
    );
    expect(getByText('Alpha')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TeamCardV4 mounts token-pure', () => {
    const { getByText, container } = render(
      <TeamCardV4 name="Rangers" crest="🔵" league="Prem" won={7} drawn={2} lost={1} rank={2} form={['W', 'W', 'L']} />
    );
    expect(getByText('Rangers')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('ScoreTickerV4 mounts token-pure', () => {
    const { getByText, container } = render(<ScoreTickerV4 matches={TICKER_MATCHES} />);
    expect(getByText('ARS')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('LiveCommentaryV4 mounts token-pure', () => {
    const { getByText, container } = render(<LiveCommentaryV4 entries={COMMENTARY} live title="Live commentary" />);
    expect(getByText('Saka finishes low into the corner.')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('BracketViewV4 mounts token-pure', () => {
    const { getByText, container } = render(<BracketViewV4 rounds={BRACKET_ROUNDS} />);
    expect(getByText('Semi-finals')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('MatchTimelineV4 mounts token-pure', () => {
    const { getByText, container } = render(
      <MatchTimelineV4 homeLabel="Arsenal" awayLabel="Chelsea" events={TIMELINE_EVENTS} />
    );
    expect(getByText('Saka')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('LineupFieldV4 mounts token-pure', () => {
    const { getByText, container } = render(<LineupFieldV4 players={LINEUP_PLAYERS} formation="4-3-3" />);
    expect(getByText('Saka')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('StatComparisonV4 mounts token-pure', () => {
    const { getByText, container } = render(
      <StatComparisonV4 homeLabel="Arsenal" awayLabel="Chelsea" rows={COMPARISON_ROWS} homeCrest="🔴" awayCrest="🔵" />
    );
    expect(getByText('Possession')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('LeagueBadgeV4 mounts token-pure', () => {
    const { getByText, container } = render(<LeagueBadgeV4 name="Premier League" crest="🏴" />);
    expect(getByText('Premier League')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('sports V4 new blocks (web)', () => {
  it('MatchHeader mounts token-pure and fires onBack', () => {
    const onBack = jest.fn();
    const { getByLabelText, container } = render(
      <MatchHeader home={HOME} away={AWAY} status="live" minute="67'" competition="Premier League · MD 12" venue="Emirates Stadium" onBack={onBack} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('PlayerProfileHeader mounts token-pure', () => {
    const { getByText, container } = render(
      <PlayerProfileHeader name="Bukayo Saka" position="Forward" team="Arsenal" number={7} crest="🧑" stats={[{ label: 'Goals', value: '24' }, { label: 'Assists', value: '11' }]} onFollow={() => {}} />
    );
    expect(getByText('Bukayo Saka')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('ChampionCard mounts token-pure', () => {
    const { getByText, container } = render(
      <ChampionCard title="Champions 2024" team="Arsenal" crest="🔴" subtitle="Premier League" stat={{ label: 'Points', value: '89' }} onShare={() => {}} />
    );
    expect(getByText('Champions 2024')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TeamFormGuide mounts token-pure and fires onResultPress', () => {
    const onResultPress = jest.fn();
    const { getAllByLabelText, container } = render(
      <TeamFormGuide results={['W', 'D', 'L', 'W', 'W']} label="Last 5" onResultPress={onResultPress} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getAllByLabelText('Win')[0]!);
    expect(onResultPress).toHaveBeenCalledTimes(1);
  });

  it('EventFeed mounts token-pure', () => {
    const { getByText, container } = render(
      <EventFeed
        title="Key events"
        events={[
          { minute: "23'", kind: 'goal', text: 'Saka (assist: Ødegaard)', side: 'home' },
          { minute: "54'", kind: 'yellow', text: 'Fernández', side: 'away' },
          { minute: "78'", kind: 'sub', text: 'Jesus on for Havertz', side: 'home' },
        ]}
      />
    );
    expect(getByText('Key events')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('OddsBar mounts token-pure and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByLabelText, container } = render(
      <OddsBar home={1.85} draw={3.4} away={4.2} onSelect={onSelect} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(/^Home 1\.85/));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBe('home');
  });
});
