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

const ROWS: StandingsRow[] = [
  { id: 'ars', team: 'Arsenal', crest: '🔴', played: 10, won: 8, drawn: 1, lost: 1, points: 25, goalDiff: 14, form: ['W', 'W', 'D', 'W', 'L'] },
  { id: 'mci', team: 'Man City', crest: '🔵', played: 10, won: 7, drawn: 2, lost: 1, points: 23, goalDiff: 12, form: ['W', 'D', 'W'] },
  { id: 'lut', team: 'Luton', crest: '🟠', played: 10, won: 1, drawn: 2, lost: 7, points: 5, goalDiff: -12, form: ['L', 'L', 'D'] },
];
const ZONES: StandingsZone[] = [
  { from: 1, to: 1, tone: 'success', label: 'Champions League' },
  { from: 3, to: 3, tone: 'danger', label: 'Relegation' },
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
