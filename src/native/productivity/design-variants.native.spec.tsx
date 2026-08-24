import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import type { ThemeSeed } from '../../theme/types';
import { TaskRowV2 } from './TaskRowV2';
import { TaskRowV3 } from './TaskRowV3';
import { ProjectCardV2 } from './ProjectCardV2';
import { ProjectCardV3 } from './ProjectCardV3';
import { NoteCardV2 } from './NoteCardV2';
import { NoteCardV3 } from './NoteCardV3';
import { MilestoneRowV2 } from './MilestoneRowV2';
import { MilestoneRowV3 } from './MilestoneRowV3';

const SEEDS: ReadonlyArray<ThemeSeed> = [SEED_LIGHT, SEED_DARK];

function expectTokenPure(root: Parameters<typeof renderedStyleHexes>[0], seed: ThemeSeed): void {
  const allowed = tokenHexSet(seed);
  const found = renderedStyleHexes(root);
  expect(found.length).toBeGreaterThan(0);
  found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
}

describe('productivity alternate designs (V2 / V3, native)', () => {
  SEEDS.forEach((seed) => {
    it(`TaskRow V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<TaskRowV2 title="Write brief" variant="priority" priority="high" onToggle={() => undefined} />, seed);
      expect(a.getByText('Write brief')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<TaskRowV3 title="Review PR" variant="dated" dueLabel="Tomorrow" dueTone="upcoming" onToggle={() => undefined} />, seed);
      expectTokenPure(b.root, seed);
    });

    it(`ProjectCard V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<ProjectCardV2 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onPress={() => undefined} />, seed);
      expect(a.getByText('Apollo')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<ProjectCardV3 title="Zephyr" progress={30} taskCount={4} onPress={() => undefined} />, seed);
      expect(b.getByText('Zephyr')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });

    it(`NoteCard V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<NoteCardV2 title="Idea" body="A great idea" timestamp="2h ago" pinned onPress={() => undefined} />, seed);
      expect(a.getByText('Idea')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<NoteCardV3 title="Reminder" body="Call client" timestamp="1d" />, seed);
      expect(b.getByText('Reminder')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });

    it(`MilestoneRow V2/V3 mount token-pure (${seed.mode})`, () => {
      const a = renderThemed(<MilestoneRowV2 title="Beta launch" progress={80} dateLabel="Sep 1" dateTone="upcoming" />, seed);
      expect(a.getByText('Beta launch')).toBeTruthy();
      expectTokenPure(a.root, seed);
      const b = renderThemed(<MilestoneRowV3 title="Alpha done" reached dateLabel="Aug 1" />, seed);
      expect(b.getByText('Alpha done')).toBeTruthy();
      expectTokenPure(b.root, seed);
    });
  });

  it('TaskRowV2 fires onToggle from the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(<TaskRowV2 title="Ship it" onToggle={onToggle} />, SEED_LIGHT);
    fireEvent.press(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalled();
  });
});
