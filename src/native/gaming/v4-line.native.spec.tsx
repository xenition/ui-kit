/**
 * The **V4 gaming line** (native) — the twin of `gaming/v4-line.spec.tsx`. The
 * progress pass is the same pure module, so the slot and quest findings are
 * pinned once and hold on both sides.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { questParts, slotParts } from '../../gaming/progress-v4';
import { GameCardV4 } from './GameCardV4';
import { MatchmakingStatusV4 } from './MatchmakingStatusV4';

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
  it('reaches Play without going through the card', () => {
    // On native the outer Pressable was `accessible` with the card's own
    // label, so VoiceOver flattened the card and Play was not a focus stop.
    const onPress = jest.fn();
    const onPlay = jest.fn();
    const { getByLabelText } = renderThemed(
      <GameCardV4 game={GAME} onPress={onPress} onPlay={onPlay} installLabel="Get it" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Get it/i));
    expect(onPlay).toHaveBeenCalled();
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('MatchmakingStatusV4 — the headline', () => {
  it('leaves Accept reachable outside the summary element', () => {
    // The base put `accessible` on the root so the phase and slot count read
    // as one sentence — and `accessible` collapses everything beneath it,
    // which was Accept, Retry and Cancel. There was no other path to onAccept.
    const onAccept = jest.fn();
    const { getByLabelText } = renderThemed(
      <MatchmakingStatusV4 phase="found" onAccept={onAccept} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/accept/i));
    expect(onAccept).toHaveBeenCalled();
  });
});
