import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { GameCardV2 } from './GameCardV2';
import { GameCardV3 } from './GameCardV3';
import { PlayerStatCardV2 } from './PlayerStatCardV2';
import { PlayerStatCardV3 } from './PlayerStatCardV3';
import { QuestCardV2 } from './QuestCardV2';
import { QuestCardV3 } from './QuestCardV3';
import { LeaderboardPodiumV2 } from './LeaderboardPodiumV2';
import { LeaderboardPodiumV3 } from './LeaderboardPodiumV3';
import type { GameRecord, PlayerProfile, Quest, LeaderboardEntry } from './types';

const game: GameRecord = {
  id: 'g1',
  title: 'Hollow Ascent',
  genre: 'Roguelike',
  rating: 4.5,
  price: '$19.99',
  coverUrl: 'https://x/cover.jpg',
};

const player: PlayerProfile = {
  id: 'p1',
  name: 'Nova Kestrel',
  rank: 'Diamond II',
  level: 42,
  stats: [
    { label: 'K/D', value: '2.4' },
    { label: 'Wins', value: '128' },
    { label: 'MVP', value: '31' },
  ],
};

const quest: Quest = {
  id: 'q1',
  title: 'Clear the Catacombs',
  description: 'Defeat 10 wraiths',
  progress: 10,
  goal: 10,
  reward: '500 XP',
};

const standings: LeaderboardEntry[] = [
  { id: 'e1', name: 'Nova', score: 9800 },
  { id: 'e2', name: 'Coil', score: 8700 },
  { id: 'e3', name: 'Marlow', score: 7400 },
];

describe('GameCard design variants (native)', () => {
  it('V2 renders the full-bleed hero and fires the play overlay', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <GameCardV2 game={{ ...game, installed: true }} onPlay={onPlay} />,
      SEED_LIGHT
    );
    expect(getByText('Hollow Ascent')).toBeTruthy();
    fireEvent.press(getByLabelText('Play Hollow Ascent'));
    expect(onPlay).toHaveBeenCalledWith({ ...game, installed: true });
  });

  it('V3 renders the cover-left row and fires the install action', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText } = renderThemed(<GameCardV3 game={game} onPlay={onPlay} />, SEED_DARK);
    expect(getByText('Hollow Ascent')).toBeTruthy();
    fireEvent.press(getByLabelText('Install Hollow Ascent'));
    expect(onPlay).toHaveBeenCalledWith(game);
  });
});

describe('PlayerStatCard design variants (native)', () => {
  it('V2 renders the centered passport with a stat grid', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PlayerStatCardV2 player={player} online onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Nova Kestrel')).toBeTruthy();
    expect(getByText('K/D')).toBeTruthy();
    fireEvent.press(getByLabelText(/Nova Kestrel/));
    expect(onPress).toHaveBeenCalledWith(player);
  });

  it('V3 renders the compact row with inline stats', () => {
    const { getByText } = renderThemed(<PlayerStatCardV3 player={player} online />, SEED_DARK);
    expect(getByText('Nova Kestrel')).toBeTruthy();
    expect(getByText('2.4')).toBeTruthy();
  });
});

describe('QuestCard design variants (native)', () => {
  it('V2 claims a completed quest via the big CTA', () => {
    const onClaim = jest.fn();
    const { getByLabelText } = renderThemed(<QuestCardV2 quest={quest} onClaim={onClaim} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Claim reward for Clear the Catacombs'));
    expect(onClaim).toHaveBeenCalledWith(quest);
  });

  it('V3 disables claim while the quest is still active', () => {
    const onClaim = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuestCardV3 quest={{ ...quest, progress: 4 }} onClaim={onClaim} />,
      SEED_DARK
    );
    const btn = getByLabelText('Claim reward for Clear the Catacombs');
    expect(btn.props.accessibilityState.disabled).toBe(true);
  });
});

describe('LeaderboardPodium design variants (native)', () => {
  it('V2 renders the empty podium', () => {
    const { getByText } = renderThemed(<LeaderboardPodiumV2 entries={[]} />, SEED_DARK);
    expect(getByText('No rankings yet')).toBeTruthy();
  });

  it('V2 renders a full podium and fires onPress with a guarded rank', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <LeaderboardPodiumV2 entries={standings.slice(0, 2)} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Rank 1, Nova, 9800 points'));
    expect(onPress).toHaveBeenCalledWith(standings[0], 1);
  });

  it('V3 renders the empty strip', () => {
    const { getByText } = renderThemed(<LeaderboardPodiumV3 entries={[]} />, SEED_LIGHT);
    expect(getByText('No rankings yet')).toBeTruthy();
  });

  it('V3 renders the horizontal top-3 strip and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(<LeaderboardPodiumV3 entries={standings} onPress={onPress} />, SEED_DARK);
    fireEvent.press(getByLabelText('Rank 2, Coil, 8700 points'));
    expect(onPress).toHaveBeenCalledWith(standings[1], 2);
  });
});

describe('token purity (native gaming design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <GameCardV2 game={game} onPlay={() => undefined} onPress={() => undefined} />
          <GameCardV2 game={{ id: 'g2', title: 'No Cover', genre: 'Indie' }} />
          <GameCardV3 game={{ ...game, installed: true }} onPlay={() => undefined} onPress={() => undefined} />
          <GameCardV3 game={{ id: 'g3', title: 'Bare' }} />
          <PlayerStatCardV2 player={player} online onPress={() => undefined} />
          <PlayerStatCardV2 player={{ id: 'p2', name: 'Solo' }} />
          <PlayerStatCardV3 player={player} online onPress={() => undefined} />
          <PlayerStatCardV3 player={{ id: 'p3', name: 'Rookie' }} />
          <QuestCardV2 quest={quest} onClaim={() => undefined} />
          <QuestCardV2 quest={{ ...quest, progress: 2 }} state="locked" />
          <QuestCardV3 quest={quest} onClaim={() => undefined} />
          <QuestCardV3 quest={{ ...quest, progress: 3 }} state="active" />
          <LeaderboardPodiumV2 entries={standings} onPress={() => undefined} />
          <LeaderboardPodiumV2 entries={[]} />
          <LeaderboardPodiumV3 entries={standings} onPress={() => undefined} />
          <LeaderboardPodiumV3 entries={standings.slice(0, 1)} />
          <LeaderboardPodiumV3 entries={[]} />
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
