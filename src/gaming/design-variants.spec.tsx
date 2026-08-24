/** @jest-environment jsdom */
/**
 * Alternate gaming designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of GameCard, LeaderboardPodium, PlayerStatCard, QuestCard. Each variant keeps
 * the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles beyond geometric widths/heights), and (c) honor a
 * key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { GameCardV2 } from './GameCardV2';
import { GameCardV3 } from './GameCardV3';
import { LeaderboardPodiumV2 } from './LeaderboardPodiumV2';
import { LeaderboardPodiumV3 } from './LeaderboardPodiumV3';
import { PlayerStatCardV2 } from './PlayerStatCardV2';
import { PlayerStatCardV3 } from './PlayerStatCardV3';
import { QuestCardV2 } from './QuestCardV2';
import { QuestCardV3 } from './QuestCardV3';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const GAME = { id: 'g1', title: 'Star Rogue', genre: 'Roguelike', rating: 4.6, price: '$19.99', installed: false };
const ENTRIES = [
  { id: 'a', name: 'Ada', score: 9800, avatarUrl: '' },
  { id: 'b', name: 'Leo', score: 8600 },
  { id: 'c', name: 'Kim', score: 7400 },
];
const PLAYER = { id: 'p1', name: 'xX_Ada_Xx', rank: 'Diamond II', level: 42, stats: [{ label: 'K/D', value: '2.4' }, { label: 'Wins', value: '128' }] };
const QUEST = { id: 'q1', title: 'Win 5 matches', description: 'Ranked only', progress: 5, goal: 5, reward: '500 XP' };

describe('GameCard alternates (web)', () => {
  it('V2 fires onPlay', () => {
    const onPlay = jest.fn();
    const { getByText, container } = render(<GameCardV2 game={GAME} onPlay={onPlay} />);
    expect(getByText('Star Rogue')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Install'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<GameCardV3 game={GAME} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Open Star Rogue'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('LeaderboardPodium alternates (web)', () => {
  it('V2 fires onClick with rank', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<LeaderboardPodiumV2 entries={ENTRIES} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Rank 1, Ada'));
    expect(onClick).toHaveBeenCalled();
  });
  it('V3 renders a compact list', () => {
    const { getByText, container } = render(<LeaderboardPodiumV3 entries={ENTRIES} />);
    expect(getByText('Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('PlayerStatCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PlayerStatCardV2 player={PLAYER} online onClick={onClick} />);
    expect(getByText('xX_Ada_Xx')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('xX_Ada_Xx'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<PlayerStatCardV3 player={PLAYER} online />);
    expect(getByText('xX_Ada_Xx')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('QuestCard alternates (web)', () => {
  it('V2 claims a completed quest', () => {
    const onClaim = jest.fn();
    const { getByText, container } = render(<QuestCardV2 quest={QUEST} onClaim={onClaim} />);
    expect(getByText('Win 5 matches')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Claim reward'));
    expect(onClaim).toHaveBeenCalledTimes(1);
  });
  it('V3 claims a completed quest', () => {
    const onClaim = jest.fn();
    const { getByText, container } = render(<QuestCardV3 quest={QUEST} onClaim={onClaim} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Claim'));
    expect(onClaim).toHaveBeenCalledTimes(1);
  });
});
