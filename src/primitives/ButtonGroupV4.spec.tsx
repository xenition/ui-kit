/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import { ButtonGroupV4 } from './ButtonGroupV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { scope: within(container), container };
}

const group = (
  <ButtonGroupV4>
    <Button variant="secondary">Day</Button>
    <Button variant="secondary">Week</Button>
    <Button variant="secondary">Month</Button>
  </ButtonGroupV4>
);

const shell = (container: HTMLElement): HTMLElement =>
  container.querySelector('[data-xen-v4-button-group]') as HTMLElement;

describe('ButtonGroupV4 (web)', () => {
  it('stretches its cells to one height, so the seam is full-bleed', () => {
    const { container } = renderThemed(group);
    // A group mixing an `sm` and an `md` button had a ragged bottom edge inside
    // a single border, and the divider between them stopped short.
    expect(shell(container).className).toContain('items-stretch');
  });

  it('keeps a 44px floor — fusing buttons does not shrink a finger', () => {
    const { container } = renderThemed(group);
    expect(shell(container).className).toContain('min-h-[44px]');
  });

  it('is a `group`, the role both twins can honestly keep', () => {
    const { container } = renderThemed(group);
    // Native claimed `toolbar`, which promises arrow-key navigation this
    // component does not provide.
    expect(shell(container).getAttribute('role')).toBe('group');
  });

  it('flattens each child’s corner, which is what closes the seams', () => {
    const { container } = renderThemed(group);
    const cells = Array.from(shell(container).children).filter(
      (c) => !c.hasAttribute('aria-hidden')
    );
    expect(cells).toHaveLength(3);
    cells.forEach((c) => expect(c.className).toContain('[&>*]:rounded-none'));
  });

  it('draws one hairline between every pair, and none at the ends', () => {
    const { container } = renderThemed(group);
    const dividers = Array.from(shell(container).children).filter((c) =>
      c.hasAttribute('aria-hidden')
    );
    expect(dividers).toHaveLength(2);
    dividers.forEach((d) => {
      expect(d.className).toContain('bg-border');
      expect(d.className).toContain('self-stretch');
    });
  });

  it('hugs its content, and fills when asked', () => {
    const { container } = renderThemed(group);
    expect(shell(container).className).toContain('inline-flex');
    expect(shell(container).className).not.toContain('w-full');

    const filled = renderThemed(
      <ButtonGroupV4 fill>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroupV4>
    );
    expect(shell(filled.container).className).toContain('w-full');
    const cells = Array.from(shell(filled.container).children).filter(
      (c) => !c.hasAttribute('aria-hidden')
    );
    cells.forEach((c) => expect(c.className).toContain('flex-1'));
  });

  it('adds no colour of its own beyond the hairline', () => {
    const { container } = renderThemed(group);
    const className = shell(container).className;
    // A segmented control groups by adjacency and an edge; the buttons inside
    // are what carry colour (§9, §11).
    expect(className).not.toMatch(/\bbg-(primary|accent|surface)\b/);
    expect(className).not.toContain('gradient');
    expect(className).not.toContain('shadow');
  });

  it('renders every child and keeps the caller’s className', () => {
    const { scope, container } = renderThemed(
      <ButtonGroupV4 className="mt-md">
        <Button>Day</Button>
        <Button>Week</Button>
      </ButtonGroupV4>
    );
    expect(scope.getByText('Day')).toBeTruthy();
    expect(scope.getByText('Week')).toBeTruthy();
    expect(shell(container).className).toContain('mt-md');
  });
});
