import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { GameCard } from './GameCard';
import { PlayerStatCard } from './PlayerStatCard';
import { TournamentBracket } from './TournamentBracket';
import { LobbyRow } from './LobbyRow';
import { ScoreBoard } from './ScoreBoard';
import { InventoryItem } from './InventoryItem';
import { QuestCard } from './QuestCard';
import { AchievementUnlock } from './AchievementUnlock';
import { LevelBar } from './LevelBar';
import { MatchmakingStatus } from './MatchmakingStatus';
import { LeaderboardPodium } from './LeaderboardPodium';
import { ControllerHint } from './ControllerHint';
import { rarityColorKey, rarityRank, formatElapsed } from './types';
import type {
  GameRecord,
  PlayerProfile,
  BracketRound,
  GameLobby,
  ScoreEntry,
  GameItem,
  Quest,
  Achievement,
  LeaderboardEntry,
} from './types';

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

const rounds: BracketRound[] = [
  {
    name: 'Semifinals',
    matches: [
      { id: 'm1', home: 'Coil', away: 'Marlow', homeScore: 2, awayScore: 1, winner: 'home' },
      { id: 'm2', home: 'Nova', away: undefined, homeScore: undefined, awayScore: undefined },
    ],
  },
  { name: 'Final', matches: [{ id: 'm3', home: 'Coil', away: 'TBD' }] },
];

const lobby: GameLobby = { id: 'l1', name: 'Ranked Grind', host: 'Coil', mode: 'Ranked 5v5', players: 3, capacity: 10 };

const scores: ScoreEntry[] = [
  { id: 's1', name: 'Team Alpha', score: 16, detail: '16 / 9' },
  { id: 's2', name: 'Team Bravo', score: 9, detail: '9 / 16' },
  { id: 's3', name: 'Team Charlie', score: 4 },
];

const item: GameItem = { id: 'i1', name: 'Ember Blade', rarity: 'legendary', quantity: 2, equipped: true };

const quest: Quest = {
  id: 'q1',
  title: 'Clear the Catacombs',
  description: 'Defeat 10 wraiths',
  progress: 10,
  goal: 10,
  reward: '500 XP',
};

const achievement: Achievement = { id: 'a1', title: 'Untouchable', description: 'Win without taking damage', points: 50 };

const standings: LeaderboardEntry[] = [
  { id: 'e1', name: 'Nova', score: 9800 },
  { id: 'e2', name: 'Coil', score: 8700 },
  { id: 'e3', name: 'Marlow', score: 7400 },
];

describe('gaming/types helpers', () => {
  it('orders rarities and maps them to semantic slots', () => {
    expect(rarityRank('legendary')).toBeGreaterThan(rarityRank('common'));
    expect(rarityColorKey('rare')).toBe('primary');
    expect(rarityColorKey(undefined)).toBe('muted');
    expect(formatElapsed(65)).toBe('1:05');
    expect(formatElapsed(-1)).toBe('0:00');
  });
});

describe('GameCard (native)', () => {
  it('mounts and fires the play/install action', () => {
    const onPlay = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <GameCard game={game} variant="featured" onPlay={onPlay} />,
      SEED_LIGHT
    );
    expect(getByText('Hollow Ascent')).toBeTruthy();
    fireEvent.press(getByLabelText('Install Hollow Ascent'));
    expect(onPlay).toHaveBeenCalledWith(game);
  });
});

describe('PlayerStatCard (native)', () => {
  it('mounts with a stat grid in the detailed variant', () => {
    const { getByText } = renderThemed(<PlayerStatCard player={player} variant="detailed" online />, SEED_DARK);
    expect(getByText('Nova Kestrel')).toBeTruthy();
    expect(getByText('K/D')).toBeTruthy();
    expect(getByText('2.4')).toBeTruthy();
  });
});

describe('TournamentBracket (native)', () => {
  it('renders the empty state when there are no rounds', () => {
    const { getByText } = renderThemed(<TournamentBracket rounds={[]} />, SEED_LIGHT);
    expect(getByText('No matches scheduled')).toBeTruthy();
  });

  it('fires onMatchPress with the match and guarded indices', () => {
    const onMatchPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <TournamentBracket rounds={rounds} onMatchPress={onMatchPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Coil versus Marlow'));
    expect(onMatchPress).toHaveBeenCalledWith(rounds[0].matches[0], 0, 0);
  });
});

describe('LobbyRow (native)', () => {
  it('mounts and fires onJoin with the lobby', () => {
    const onJoin = jest.fn();
    const { getByText, getByLabelText } = renderThemed(<LobbyRow lobby={lobby} onJoin={onJoin} />, SEED_LIGHT);
    expect(getByText('Ranked Grind')).toBeTruthy();
    fireEvent.press(getByLabelText('Join Ranked Grind'));
    expect(onJoin).toHaveBeenCalledWith(lobby);
  });

  it('disables joining a full lobby (state via label, not color)', () => {
    const onJoin = jest.fn();
    const { getByLabelText } = renderThemed(
      <LobbyRow lobby={{ ...lobby, players: 10, capacity: 10 }} onJoin={onJoin} />,
      SEED_DARK
    );
    const btn = getByLabelText('Full Ranked Grind');
    expect(btn.props.accessibilityState.disabled).toBe(true);
  });
});

describe('ScoreBoard (native)', () => {
  it('renders the empty state when there are no entries', () => {
    const { getByText } = renderThemed(<ScoreBoard entries={[]} />, SEED_LIGHT);
    expect(getByText('No scores yet')).toBeTruthy();
  });

  it('renders a ranked board sorted by score', () => {
    const { getByText } = renderThemed(<ScoreBoard entries={scores} title="Finals" />, SEED_DARK);
    expect(getByText('Finals')).toBeTruthy();
    expect(getByText('Team Alpha')).toBeTruthy();
  });
});

describe('QuestCard (native)', () => {
  it('claims a completed quest', () => {
    const onClaim = jest.fn();
    const { getByLabelText } = renderThemed(<QuestCard quest={quest} onClaim={onClaim} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Claim reward for Clear the Catacombs'));
    expect(onClaim).toHaveBeenCalledWith(quest);
  });

  it('disables the claim button while the quest is still active', () => {
    const onClaim = jest.fn();
    const { getByLabelText } = renderThemed(
      <QuestCard quest={{ ...quest, progress: 4 }} onClaim={onClaim} />,
      SEED_DARK
    );
    const btn = getByLabelText('Claim reward for Clear the Catacombs');
    expect(btn.props.accessibilityState.disabled).toBe(true);
  });
});

describe('MatchmakingStatus (native)', () => {
  it('accepts a found match', () => {
    const onAccept = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <MatchmakingStatus phase="found" found={10} needed={10} onAccept={onAccept} />,
      SEED_LIGHT
    );
    expect(getByText('Match found!')).toBeTruthy();
    fireEvent.press(getByLabelText('Accept match'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});

describe('LeaderboardPodium (native)', () => {
  it('renders the empty state with no entries', () => {
    const { getByText } = renderThemed(<LeaderboardPodium entries={[]} />, SEED_DARK);
    expect(getByText('No rankings yet')).toBeTruthy();
  });

  it('renders top-3 and survives a short list via guarded indexing', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <LeaderboardPodium entries={standings.slice(0, 2)} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Rank 1, Nova, 9800 points'));
    expect(onPress).toHaveBeenCalledWith(standings[0], 1);
  });
});

describe('ControllerHint (native)', () => {
  it('renders a row of hints with action labels', () => {
    const { getByText } = renderThemed(
      <ControllerHint hints={[{ button: 'A', action: 'Jump' }, { button: 'X', action: 'Attack' }]} />,
      SEED_DARK
    );
    expect(getByText('Jump')).toBeTruthy();
    expect(getByText('Attack')).toBeTruthy();
  });

  it('renders nothing when given no hints', () => {
    const { toJSON } = renderThemed(<ControllerHint />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('token purity (native gaming, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <GameCard game={game} variant="grid" onPlay={() => undefined} onPress={() => undefined} />
          <PlayerStatCard player={player} variant="detailed" online onPress={() => undefined} />
          <TournamentBracket rounds={rounds} onMatchPress={() => undefined} />
          <ScoreBoard entries={scores} title="Finals" />
          <ScoreBoard entries={scores} variant="versus" />
          <LobbyRow lobby={lobby} onJoin={() => undefined} />
          <InventoryItem item={item} variant="row" onPress={() => undefined} />
          <InventoryItem item={{ id: 'i2', name: 'Potion', rarity: 'common' }} />
          <QuestCard quest={quest} onClaim={() => undefined} />
          <QuestCard quest={{ ...quest, progress: 2 }} state="locked" />
          <AchievementUnlock achievement={achievement} variant="toast" />
          <AchievementUnlock achievement={achievement} variant="inline" unlocked={false} />
          <LevelBar level={42} xp={640} xpMax={1000} />
          <LevelBar level={1} xp={5} xpMax={0} variant="compact" />
          <MatchmakingStatus phase="searching" elapsedSeconds={37} found={3} needed={10} onCancel={() => undefined} />
          <LeaderboardPodium entries={standings} onPress={() => undefined} />
          <ControllerHint hints={[{ button: 'A', action: 'Jump' }, { button: 'B', action: 'Roll' }]} />
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
