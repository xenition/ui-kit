/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { EditorialGrid, EditorialItem } from './EditorialGrid';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const sheet = (): string => document.getElementById('xen-editorial-styles')?.textContent ?? '';

describe('EditorialGrid / EditorialItem', () => {
  it('renders a 12-column canvas with per-item span/start/offset geometry vars', () => {
    const { container } = render(
      <EditorialGrid>
        <EditorialItem span={7}>a</EditorialItem>
        <EditorialItem span={4} start={9} offset={176}>
          b
        </EditorialItem>
        <EditorialItem span={5} start={2} offset={-96}>
          c
        </EditorialItem>
      </EditorialGrid>
    );
    const grid = container.querySelector<HTMLElement>('[data-xen-editorial-grid]');
    expect(grid?.getAttribute('style')).toContain('--xen-editorial-cols: 12');

    const items = container.querySelectorAll<HTMLElement>('[data-xen-editorial-item]');
    expect(items).toHaveLength(3);
    expect(items[0]?.getAttribute('style')).toContain('--xen-editorial-col: span 7 / span 7');
    expect(items[1]?.getAttribute('style')).toContain('--xen-editorial-col: 9 / span 4');
    expect(items[1]?.getAttribute('style')).toContain('--xen-editorial-offset: 176px');
    expect(items[2]?.getAttribute('style')).toContain('--xen-editorial-offset: -96px');

    const css = sheet();
    expect(css).toContain('repeat(var(--xen-editorial-cols, 12), minmax(0, 1fr))');
    expect(css).toContain('@media (min-width: 1024px)');
  });

  it('stacks earlier items above later ones so overlaps slide underneath', () => {
    const { container } = render(
      <EditorialGrid>
        <EditorialItem>a</EditorialItem>
        <EditorialItem offset={-80}>b</EditorialItem>
        <EditorialItem>c</EditorialItem>
      </EditorialGrid>
    );
    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-xen-editorial-item]')
    );
    const zs = items.map((item) => Number(item.style.zIndex));
    expect(zs).toEqual([3, 2, 1]);
  });

  it('honors an explicit z override', () => {
    const { container } = render(
      <EditorialGrid>
        <EditorialItem z={40}>a</EditorialItem>
        <EditorialItem>b</EditorialItem>
      </EditorialGrid>
    );
    const items = container.querySelectorAll<HTMLElement>('[data-xen-editorial-item]');
    expect(items[0]?.style.zIndex).toBe('40');
    expect(items[1]?.style.zIndex).toBe('1');
  });

  it('backs the caption slot with the surface token and raises it', () => {
    const { container, getByText } = render(
      <EditorialGrid>
        <EditorialItem caption={<h3>Atlas — identity, 2026</h3>}>media</EditorialItem>
      </EditorialGrid>
    );
    expect(getByText('Atlas — identity, 2026')).toBeTruthy();
    const caption = container.querySelector<HTMLElement>('[data-xen-editorial-caption]');
    expect(caption).not.toBeNull();
    expect(Number(caption?.style.zIndex)).toBeGreaterThan(1);
    expect(sheet()).toContain(
      '[data-xen-editorial-caption]'
    );
    expect(sheet()).toContain('background-color: var(--xen-surface)');
  });

  it('collapses to one column below lg and emits no hex anywhere', () => {
    const { container } = render(
      <EditorialGrid columns={10}>
        <EditorialItem span={3}>a</EditorialItem>
      </EditorialGrid>
    );
    const css = sheet();
    expect(css).toContain('grid-template-columns: minmax(0, 1fr)');
    expect(css).not.toMatch(HEX_LITERAL);
    const styles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(styles).toContain('--xen-editorial-cols: 10');
    expect(styles).not.toMatch(HEX_LITERAL);
  });
});
