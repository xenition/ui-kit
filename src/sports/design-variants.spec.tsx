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
