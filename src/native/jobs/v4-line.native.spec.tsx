/**
 * The **V4 jobs line** (native) — the twin of `jobs/v4-line.spec.tsx`. The
 * hiring pass is the same pure module, so the salary, stage and elapsed-time
 * findings are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { isAdverse, relativeParts, salaryParts, stageParts } from '../../jobs/hiring-v4';
import { APPLICATION_STAGES } from '../../jobs/types';
import { StatusPipelineV4 } from './StatusPipelineV4';

describe('hiring-v4', () => {
  it('refuses a band that runs backwards, and says so', () => {
    const back = salaryParts(120000, 90000);
    expect(back.inverted).toBe(true);
    expect(back.min).toBe(90000);
    expect(back.max).toBe(120000);
  });

  it('drops the inputs that used to reach the screen', () => {
    expect(salaryParts(Number.NaN, undefined).valid).toBe(false);
    expect(salaryParts(-5000, 0).min).toBeUndefined();
    expect(salaryParts(90000, undefined)).toMatchObject({ min: 90000, valid: true });
  });

  it('admits when a stage is not in the pipeline', () => {
    // Each twin used to pick a DIFFERENT fallback here — web the label
    // 'Applied', native the raw union member 'applied' — so one input
    // announced two different things. Now neither guesses.
    expect(stageParts('withdrawn' as never, APPLICATION_STAGES).known).toBe(false);
    expect(stageParts('interview', APPLICATION_STAGES).known).toBe(true);
  });

  it('floors elapsed time rather than rounding it up', () => {
    const day = 86_400_000;
    const now = Date.UTC(2026, 0, 31);
    expect(relativeParts(new Date(now - 25 * day).toISOString(), now)).toMatchObject({
      value: 25,
      unit: 'day',
    });
    expect(relativeParts(new Date(now - 90 * 60_000).toISOString(), now)).toMatchObject({
      value: 1,
      unit: 'hour',
    });
    expect(relativeParts('2026-13-40T99:00', now).valid).toBe(false);
  });

  it('knows which hiring states owe a reason', () => {
    expect(isAdverse('rejected')).toBe(true);
    expect(isAdverse('withdrawn')).toBe(true);
    expect(isAdverse('hired')).toBe(false);
  });
});

describe('StatusPipelineV4', () => {
  it('exposes its position instead of leaving it to colour', () => {
    // The summary was set on a View that was never `accessible`, so the stage
    // — the entire point of the row — was silent.
    const { getAllByRole } = renderThemed(<StatusPipelineV4 stage="interview" />, SEED_LIGHT);
    const meters = getAllByRole('progressbar');
    expect(meters.length).toBeGreaterThan(0);
    expect(meters[0]?.props.accessibilityValue).toBeDefined();
  });
});
