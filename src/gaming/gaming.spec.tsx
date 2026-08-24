/** @jest-environment jsdom */
/**
 * Web gaming components — jsdom render smoke, token-class purity (no literal
 * colors in className), and the behavioral / a11y contracts: card + action
 * interaction, keyboard-operable interactive cards, real-`<button>` action
 * cells, disabled-when-blocked controls, guarded indexing, empty states, and
 * the `LevelBar` progressbar role.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  GameCard,
  PlayerStatCard,
  TournamentBracket,
  ScoreBoard,
  LeaderboardPodium,
  LobbyRow,
  MatchmakingStatus,
  LevelBar,
  QuestCard,
  AchievementUnlock,
  InventoryItem,
  ControllerHint,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** All className strings under a root — used to assert token purity. */
const classText = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[class]'))
    .map((el) => el.getAttribute('class') ?? '')
    .join(' ');

describe('gaming (web)', () => {
  it('GameCard: fires onClick (keyboard) on the interactive card and onPlay on the action button', () => {
    const onClick = jest.fn();
    const onPlay = jest.fn();
    const { getByRole } = render(
      <GameCard
        game={{ id: 'g1', title: 'Star Drifter', genre: 'Roguelike', rating: 4, installed: true }}
        onClick={onClick}
        onPlay={onPlay}
      />
    );
    const card = getByRole('button', { name: 'Star Drifter' });
    expect(card.className).toContain('bg-surface');
    // Keyboard operable interactive card.
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
    // Action is a real <button>; its click must not bubble to the card.
    const play = getByRole('button', { name: 'Play Star Drifter' });
    expect(play.tagName).toBe('BUTTON');
    fireEvent.click(play);
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('GameCard: loading blocks (disables) the action button', () => {
    const { getByRole } = render(
      <GameCard game={{ id: 'g2', title: 'Nebula', installed: false }} loading onPlay={jest.fn()} />
    );
    expect((getByRole('button', { name: 'Install Nebula' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('PlayerStatCard: renders a presence indicator with a text label (not color alone) and stats grid', () => {
    const { getByLabelText, getByText } = render(
      <PlayerStatCard
        variant="detailed"
        online
        player={{ id: 'p1', name: 'Ada', rank: 'Diamond II', level: 42, stats: [{ label: 'K/D', value: '2.4' }] }}
      />
    );
    expect(getByLabelText('Online')).toBeTruthy();
    expect(getByText('2.4')).toBeTruthy();
    expect(getByText('K/D')).toBeTruthy();
  });

  it('PlayerStatCard: detailed with no stats shows the graceful empty line', () => {
    const { getByText } = render(
      <PlayerStatCard variant="detailed" player={{ id: 'p2', name: 'Zeb' }} />
    );
    expect(getByText('No stats yet')).toBeTruthy();
  });

  it('ScoreBoard: renders an EmptyState when there are no entries', () => {
    const { getByText } = render(<ScoreBoard entries={[]} emptyLabel="Nothing here" />);
    expect(getByText('Nothing here')).toBeTruthy();
  });

  it('ScoreBoard: ranked sorts by score descending', () => {
    const { getAllByText, container } = render(
      <ScoreBoard
        entries={[
          { id: 'a', name: 'Alpha', score: 10 },
          { id: 'b', name: 'Bravo', score: 30 },
        ]}
      />
    );
    // Leader row is labeled Rank 1 with Bravo.
    expect(container.querySelector('[aria-label="Rank 1, Bravo, 30 points"]')).toBeTruthy();
    expect(getAllByText('Bravo').length).toBeGreaterThan(0);
  });

  it('LeaderboardPodium: guarded indexing omits missing places; empty renders EmptyState', () => {
    const { rerender, getByText, container } = render(
      <LeaderboardPodium entries={[{ id: '1', name: 'One', score: 999 }]} onClick={jest.fn()} />
    );
    // Only one place is a real button; the other two are empty spacers.
    expect(container.querySelectorAll('button').length).toBe(1);
    rerender(<LeaderboardPodium entries={[]} emptyLabel="No rankings" />);
    expect(getByText('No rankings')).toBeTruthy();
  });

  it('LobbyRow: a full lobby disables the Join button with a "Full" label (not color alone)', () => {
    const { getByRole } = render(
      <LobbyRow lobby={{ id: 'l1', name: 'Arena', players: 5, capacity: 5 }} onJoin={jest.fn()} />
    );
    const btn = getByRole('button', { name: 'Full Arena' }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.textContent).toBe('Full');
  });

  it('TournamentBracket: renders a real <button> per match and fires onMatchClick with guarded indices', () => {
    const onMatchClick = jest.fn();
    const { getByRole } = render(
      <TournamentBracket
        rounds={[{ name: 'Final', matches: [{ id: 'm1', home: 'A', away: 'B', winner: 'home' }] }]}
        onMatchClick={onMatchClick}
      />
    );
    const match = getByRole('button', { name: 'A versus B' });
    expect(match.tagName).toBe('BUTTON');
    fireEvent.click(match);
    expect(onMatchClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }), 0, 0);
  });

  it('TournamentBracket: no matches renders an EmptyState', () => {
    const { getByText } = render(<TournamentBracket rounds={[]} emptyLabel="No matches" />);
    expect(getByText('No matches')).toBeTruthy();
  });

  it('LevelBar: exposes role="progressbar" with the announced fraction and guards a zero xpMax', () => {
    const { getByRole, unmount } = render(<LevelBar level={7} xp={40} xpMax={100} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-label')).toBe('Level 7, 40% to next level');
    expect(bar.getAttribute('aria-valuenow')).toBe('40');
    unmount();

    // No NaN: a zero xpMax guards to 0%.
    const { getByRole: getByRole2 } = render(<LevelBar level={1} xp={10} xpMax={0} />);
    expect(getByRole2('progressbar').getAttribute('aria-label')).toBe('Level 1, 0% to next level');
  });

  it('QuestCard: claim button only enables when completed and fires onClaim', () => {
    const onClaim = jest.fn();
    const { getByRole, rerender } = render(
      <QuestCard quest={{ id: 'q1', title: 'Slay 10', progress: 3, goal: 10 }} onClaim={onClaim} />
    );
    expect((getByRole('button', { name: /Claim reward/ }) as HTMLButtonElement).disabled).toBe(true);

    rerender(
      <QuestCard quest={{ id: 'q1', title: 'Slay 10', progress: 10, goal: 10 }} onClaim={onClaim} />
    );
    const claim = getByRole('button', { name: /Claim reward/ }) as HTMLButtonElement;
    expect(claim.disabled).toBe(false);
    fireEvent.click(claim);
    expect(onClaim).toHaveBeenCalledTimes(1);
  });

  it('AchievementUnlock: locked renders a disabled button announced as locked', () => {
    const { getByRole } = render(
      <AchievementUnlock achievement={{ id: 'a1', title: 'First Blood' }} unlocked={false} onClick={jest.fn()} />
    );
    const btn = getByRole('button', { name: 'Locked achievement: First Blood' });
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });

  it('InventoryItem: rarity resolves to a token border class (no literal color) + a text rarity label', () => {
    const { getByText, container } = render(
      <InventoryItem item={{ id: 'i1', name: 'Excalibur', rarity: 'legendary', equipped: true }} />
    );
    // legendary → warn slot → border-warn token utility.
    expect(classText(container)).toContain('border-warn');
    expect(getByText('Legendary')).toBeTruthy();
    expect(getByText('Equipped')).toBeTruthy();
  });

  it('MatchmakingStatus: searching shows a spinner + Cancel', () => {
    const { getByRole } = render(
      <MatchmakingStatus phase="searching" elapsedSeconds={65} onCancel={jest.fn()} />
    );
    expect(getByRole('status', { name: 'Loading' })).toBeTruthy();
    expect(getByRole('button', { name: 'Cancel search' })).toBeTruthy();
  });

  it('ControllerHint: pairs each glyph with its action label for a screen reader', () => {
    const { getByLabelText } = render(<ControllerHint button="A" action="Jump" />);
    expect(getByLabelText('Jump: A')).toBeTruthy();
  });

  it('emits no literal hex colors in any className', () => {
    const { container } = render(
      <div>
        <GameCard game={{ id: 'g', title: 'T', genre: 'RPG', rating: 5 }} onClick={jest.fn()} onPlay={jest.fn()} />
        <QuestCard quest={{ id: 'q', title: 'Q', progress: 1, goal: 2 }} onClaim={jest.fn()} />
        <InventoryItem item={{ id: 'i', name: 'N', rarity: 'epic' }} />
        <LevelBar level={2} xp={5} xpMax={10} />
      </div>
    );
    expect(HEX_LITERAL.test(classText(container))).toBe(false);
  });
});
