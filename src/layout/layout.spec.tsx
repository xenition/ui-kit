/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  AspectRatio,
  Bleed,
  Center,
  Cluster,
  Column,
  Container,
  Divider,
  Flex,
  Grid,
  Inset,
  PageHeader,
  Row,
  ScrollArea,
  Section,
  Spacer,
  Sticky,
} from './index';

describe('layout (web)', () => {
  it('Container centers, caps width, and binds padding to a token class', () => {
    const { getByTestId } = render(<Container data-testid="c" maxWidth={640} padding="lg" />);
    const el = getByTestId('c');
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain('px-[var(--xen-space-lg)]');
    expect(el.style.maxWidth).toBe('640px');
  });

  it('Row is a flex row with token gap + alignment classes', () => {
    const { getByTestId } = render(<Row data-testid="r" gap="sm" align="center" justify="between" wrap />);
    const el = getByTestId('r');
    expect(el.className).toContain('flex');
    expect(el.className).toContain('flex-row');
    expect(el.className).toContain('gap-[var(--xen-space-sm)]');
    expect(el.className).toContain('items-center');
    expect(el.className).toContain('justify-between');
    expect(el.className).toContain('flex-wrap');
  });

  it('Column is a flex column and forwards its ref to the div', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(<Column ref={ref} data-testid="col" gap="md" />);
    const el = getByTestId('col');
    expect(el.className).toContain('flex-col');
    expect(el.className).toContain('gap-[var(--xen-space-md)]');
    expect(ref.current).toBe(el);
  });

  it('Grid sets equal columns via inline grid-template and a token gap', () => {
    const { getByTestId } = render(<Grid data-testid="g" columns={3} gap="lg" />);
    const el = getByTestId('g');
    expect(el.className).toContain('grid');
    expect(el.className).toContain('gap-[var(--xen-space-lg)]');
    expect(el.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
  });

  it('Divider renders an <hr> in the token border color', () => {
    const { getByRole } = render(<Divider inset="md" />);
    const el = getByRole('separator');
    expect(el.tagName).toBe('HR');
    expect(el.className).toContain('border-border');
    expect(el.className).toContain('mx-[var(--xen-space-md)]');
  });

  it('Section renders a heading and a token-bound spacing gap', () => {
    const { getByRole, getByText } = render(
      <Section title="Team" subtitle="Members" spacing="lg">
        <div>body</div>
      </Section>
    );
    expect(getByRole('heading', { name: 'Team' }).className).toContain('text-on-surface');
    expect(getByText('Members').className).toContain('text-muted');
  });

  it('PageHeader lays out title + actions over a token border', () => {
    const { getByRole, getByText } = render(
      <PageHeader title="Dashboard" actions={<button>New</button>} />
    );
    const header = getByRole('banner');
    expect(header.className).toContain('border-border');
    expect(getByRole('heading', { name: 'Dashboard' }).className).toContain('text-2xl');
    expect(getByText('New').tagName).toBe('BUTTON');
  });

  it('ScrollArea is overflow-scrollable with token padding, filled surface', () => {
    const { getByTestId } = render(<ScrollArea data-testid="s" padding="md" filled />);
    const el = getByTestId('s');
    expect(el.className).toContain('overflow-y-auto');
    expect(el.className).toContain('p-[var(--xen-space-md)]');
    expect(el.className).toContain('bg-surface');
  });

  it('Inset / Bleed apply token padding and negative margins', () => {
    const { getByTestId } = render(
      <>
        <Inset data-testid="in" space="lg" />
        <Bleed data-testid="bl" space="lg" />
      </>
    );
    expect(getByTestId('in').className).toContain('px-[var(--xen-space-lg)]');
    expect(getByTestId('bl').className).toContain('-mx-[var(--xen-space-lg)]');
  });

  it('Sticky pins to an edge with a numeric offset', () => {
    const { getByTestId } = render(<Sticky data-testid="st" side="top" offset={16} />);
    const el = getByTestId('st');
    expect(el.className).toContain('sticky');
    expect(el.style.top).toBe('16px');
  });

  it('Spacer, Center, Cluster, Flex, AspectRatio render with expected classes', () => {
    const { getByTestId } = render(
      <>
        <Spacer data-testid="sp" size="flex" />
        <Center data-testid="ce" fill />
        <Cluster data-testid="cl" gap="xs" />
        <Flex data-testid="fx" direction="column" grow={2} />
        <AspectRatio data-testid="ar" ratio={16 / 9} rounded />
      </>
    );
    expect(getByTestId('sp').getAttribute('aria-hidden')).toBe('true');
    expect(getByTestId('sp').className).toContain('grow');
    expect(getByTestId('ce').className).toContain('items-center');
    expect(getByTestId('cl').className).toContain('flex-wrap');
    expect(getByTestId('cl').className).toContain('gap-[var(--xen-space-xs)]');
    expect(getByTestId('fx').className).toContain('flex-col');
    expect(getByTestId('fx').style.flexGrow).toBe('2');
    expect(getByTestId('ar').className).toContain('rounded-[var(--xen-radius-lg)]');
    expect(getByTestId('ar').style.aspectRatio).toBe('1.7777777777777777');
  });
});
