/** @jest-environment jsdom */
/**
 * The **V4 jobs line** (web) — the hiring pass, and the finding this module
 * exists for: nothing was announced at all, because `role="text"` is not an
 * ARIA role and the browsers that matter drop it.
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import { isAdverse, relativeParts, salaryParts, stageParts } from './hiring-v4';
import { APPLICATION_STAGES } from './types';
import { SalaryRangeV4 } from './SalaryRangeV4';
import { StatusPipelineV4 } from './StatusPipelineV4';

describe('hiring-v4', () => {
  it('refuses a band that runs backwards, and says so', () => {
    // `formatSalary` tested only `typeof min === 'number'`, so
    // `{min:120000, max:90000}` rendered "$120K - $90K/yr" and the aria-label
    // repeated the same broken string.
    const back = salaryParts(120000, 90000);
    expect(back.inverted).toBe(true);
    expect(back.min).toBe(90000);
    expect(back.max).toBe(120000);
    expect(back.valid).toBe(true);
  });

  it('drops the inputs that used to reach the screen', () => {
    // `NaN` passes `typeof`, so "From $NaN/yr" shipped.
    expect(salaryParts(Number.NaN, undefined).valid).toBe(false);
    // Nobody is paid "-$5K".
    expect(salaryParts(-5000, 0).min).toBeUndefined();
    // One usable bound is still a band — that is the "From $90K" case.
    expect(salaryParts(90000, undefined)).toMatchObject({ min: 90000, valid: true });
    expect(salaryParts(undefined, undefined).valid).toBe(false);
  });

  it('admits when a stage is not in the pipeline', () => {
    // `Math.max(0, indexOf(stage))` turned "not found" into stage 1, so a
    // withdrawn application announced "Stage 1 of 5: Applied" with total
    // confidence — and each twin picked a different fallback string.
    const unknown = stageParts('withdrawn' as never, APPLICATION_STAGES);
    expect(unknown.known).toBe(false);

    const real = stageParts('interview', APPLICATION_STAGES);
    expect(real.known).toBe(true);
    expect(real.index).toBe(APPLICATION_STAGES.indexOf('interview'));
    expect(real.total).toBe(APPLICATION_STAGES.length);
  });

  it('floors elapsed time rather than rounding it up', () => {
    const day = 86_400_000;
    const now = Date.UTC(2026, 0, 31);
    // 25 days ago reported "1mo ago" because it rounded.
    const iso25 = new Date(now - 25 * day).toISOString();
    expect(relativeParts(iso25, now)).toMatchObject({ value: 25, unit: 'day' });
    // 90 minutes ago reported "2h ago".
    const iso90 = new Date(now - 90 * 60_000).toISOString();
    expect(relativeParts(iso90, now)).toMatchObject({ value: 1, unit: 'hour' });
    // An unparseable instant renders nothing rather than an empty sentence.
    expect(relativeParts('2026-13-40T99:00', now).valid).toBe(false);
    expect(relativeParts(undefined, now).valid).toBe(false);
  });

  it('knows which hiring states owe a reason', () => {
    expect(isAdverse('rejected')).toBe(true);
    expect(isAdverse('withdrawn')).toBe(true);
    expect(isAdverse('cancelled')).toBe(true);
    expect(isAdverse('offer')).toBe(false);
    expect(isAdverse('hired')).toBe(false);
  });
});

describe('SalaryRangeV4', () => {
  it('never emits role="text", which browsers drop along with its name', () => {
    const { container } = render(
      <SalaryRangeV4 salary={{ min: 90000, max: 120000, currency: 'USD', period: 'year' }} />
    );
    expect(container.querySelector('[role="text"]')).toBeNull();
  });

  it('does not print a band that runs backwards', () => {
    const { container } = render(
      <SalaryRangeV4 salary={{ min: 120000, max: 90000, currency: 'USD', period: 'year' }} />
    );
    const text = container.textContent ?? '';
    expect(text).not.toContain('NaN');
    // Whatever wording it settles on, the larger figure cannot come first.
    const lo = text.indexOf('90');
    const hi = text.indexOf('120');
    if (lo >= 0 && hi >= 0) expect(lo).toBeLessThan(hi);
  });

  it('does not print NaN for a broken bound', () => {
    const { container } = render(<SalaryRangeV4 salary={{ min: Number.NaN }} />);
    expect(container.textContent ?? '').not.toContain('NaN');
  });
});

describe('StatusPipelineV4', () => {
  it('marks the current step with something other than colour', () => {
    const { container } = render(<StatusPipelineV4 stage="interview" />);
    expect(container.querySelector('[aria-current="step"]')).toBeTruthy();
  });

  it('never emits role="text"', () => {
    const { container } = render(<StatusPipelineV4 stage="interview" />);
    expect(container.querySelector('[role="text"]')).toBeNull();
  });
});
