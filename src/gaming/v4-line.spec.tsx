/** @jest-environment jsdom */
/**
 * The **V4 gaming line** (web) — the progress pass, and the finding this
 * module exists for: Space on Play started nothing.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { questParts, slotParts } from './progress-v4';
import { GameCardV4 } from './GameCardV4';
import { LobbyRowV4 } from './LobbyRowV4';

describe('progress-v4', () => {
  it('does not call a lobby with no capacity full', () => {
    // The finding. The base computed `clamp(players, 0, cap || players)` and
    // rendered `${filled}/${cap || players}`, so capacity 0 showed "5/5" —
    // apparently full — while `isFull` required `cap > 0`, so `joinable`
    // stayed true and the button still said Join. The badge and the button
    // read the same zero and disagreed.
    const unknown = slotParts(5, 0);
    expect(unknown.capacity).toBe(0);
    expect(unknown.full).toBe(false);
    expect(unknown.joinable).toBe(false);
    expect(unknown.ratio).toBeUndefined();
  });

  it('reads an ordinary lobby', () => {
    expect(slotParts(3, 10)).toMatchObject({ filled: 3, capacity: 10, full: false, joinable: true });
    expect(slotParts(10, 10)).toMatchObject({ full: true, joinable: false });
    // More players than slots is still full, not 11/10.
    expect(slotParts(11, 10)).toMatchObject({ filled: 10, full: true, joinable: false });
  });

  it('keeps a quest bar and its announced value in agreement', () => {
    // The V2/V3 lines passed `quest.goal` raw to aria-valuemax while the drawn
    // fill used a clamped percentage, so for out-of-range input the bar and
    // the announced value disagreed — and a goal of 0 produced an invalid
    // range.
    expect(questParts(5, 10)).toMatchObject({ value: 5, goal: 10, ratio: 0.5, complete: false });
    expect(questParts(50, 10)).toMatchObject({ value: 10, goal: 10, ratio: 1, complete: true });
    expect(questParts(-5, 10).value).toBe(0);
    expect(questParts(1, 0).goal).toBe(1);
    expect(questParts(Number.NaN, 10).value).toBe(0);
  });
});

const GAME = { id: 'g1', title: 'Hollow Depths', genre: 'Roguelike', price: '$19.99' };

describe('GameCardV4', () => {
  it('keeps Play out of the card\'s own activation', () => {
    // The base guarded the click path and left the key path open: the card's
    // handler caught the bubbled keydown, preventDefault()ed the button's own
    // synthesised click and fired the card. So Enter did both and Space did
    // only the card — Play silently did nothing.
    const onClick = jest.fn();
    const onPlay = jest.fn();
    const { getByRole } = render(
      <GameCardV4 game={GAME} onClick={onClick} onPlay={onPlay} installLabel="Get it" />
    );
    const play = getByRole('button', { name: /Get it/i });
    expect(play.closest('button')).toBe(play);

    fireEvent.click(play);
    expect(onPlay).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('LobbyRowV4', () => {
  it('does not offer Join on a lobby with no capacity', () => {
    const onJoin = jest.fn();
    const { container } = render(
      <LobbyRowV4 lobby={{ id: 'l1', name: 'Ranked', players: 5, capacity: 0 }} onJoin={onJoin} />
    );
    // The base showed "5/5" and an enabled Join at the same time.
    expect(container.textContent).not.toContain('5/5');
  });

  it('joins an ordinary lobby', () => {
    const onJoin = jest.fn();
    const { getByRole } = render(
      <LobbyRowV4 lobby={{ id: 'l1', name: 'Ranked', players: 3, capacity: 10 }} onJoin={onJoin} />
    );
    fireEvent.click(getByRole('button', { name: /join/i }));
    expect(onJoin).toHaveBeenCalled();
  });
});
