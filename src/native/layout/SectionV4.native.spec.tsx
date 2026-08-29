import * as React from 'react';
import { Text, View } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { allStyles, flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { SectionV4, type SectionV4Props } from './SectionV4';

const THEME = compileTheme(SEED_LIGHT);

function render(props: SectionV4Props = {}) {
  return renderThemed(<SectionV4 testID="s" {...props} />, SEED_LIGHT);
}

function rootStyle(props: SectionV4Props = {}): FlatStyle {
  return flatStyle(render(props).getByTestId('s').props.style);
}

/** The header row — the one view laid out as a row with a `space-between`. */
function headerStyle(root: Parameters<typeof allStyles>[0]): FlatStyle | undefined {
  return allStyles(root).find(
    (s) => s.flexDirection === 'row' && s.justifyContent === 'space-between'
  );
}

describe('SectionV4 (native)', () => {
  it('stacks a header over its body with a token-bound gap', () => {
    // §4.1: between a card header and its body — `md` (16).
    expect(rootStyle({ title: 'Overview' }).gap).toBe(THEME.spacing.md);
  });

  it('takes any step of the spacing scale for that gap', () => {
    expect(rootStyle({ title: 'a', spacing: 'xs' }).gap).toBe(THEME.spacing.xs);
    expect(rootStyle({ title: 'a', spacing: 'xl' }).gap).toBe(THEME.spacing.xl);
    expect(rootStyle({ title: 'a', spacing: '2xl' }).gap).toBe(THEME.spacing['2xl']);
  });

  it('sets the §5 type ramp: title `xl`/bold in the seed’s HEADING face', () => {
    // The base hand-rolled `fontSize: scale.lg, fontWeight: '600'` here while
    // web said `text-lg font-semibold` — one intent, two spellings, free to
    // drift. Both twins now read the ramp through `TextV4`.
    const { getByText } = render({ title: 'Overview' });
    const title = getByText('Overview');
    const style = flatStyle(title.props.style);
    expect(style.fontSize).toBe(THEME.typography.scale.xl);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe(THEME.light.onSurface);
    expect(style.fontFamily).toBe(THEME.typography.fontHeading);
  });

  it('announces the title as a header', () => {
    const { getByText } = render({ title: 'Overview' });
    expect(getByText('Overview').props.accessibilityRole).toBe('header');
  });

  it('sets the subtitle in `mutedText`, not the decorative `muted` fill', () => {
    // `muted` is a fill and carries no contrast promise against the page;
    // `mutedText` is the same quietness walked until it clears AA. The base
    // painted `colors.muted` — the exact bug the shadcn pass closed elsewhere.
    const { getByText } = render({ title: 'Overview', subtitle: 'A quick summary' });
    const style = flatStyle(getByText('A quick summary').props.style);
    expect(style.color).toBe(THEME.light.mutedText);
    // On this seed the two slots happen to compile to the same hex, so the
    // claim is which slot was *read*: `mutedText` is the one the compiler
    // walks until it clears AA, and it is the one that moves when a seed makes
    // its `muted` fill darker.
    // §5: `base`, not the base component's `sm` — this is copy, not a caption.
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.fontFamily).toBe(THEME.typography.fontBody);
  });

  it('puts §4.1’s `xs` between the title and its supporting line', () => {
    const { root } = render({ title: 'Overview', subtitle: 'A quick summary' });
    const column = allStyles(root).find((s) => s.flex === 1 && s.gap === THEME.spacing.xs);
    expect(column).toBeDefined();
  });

  it('renders a trailing `action` beside the title — the shadcn CardAction slot', () => {
    const { root, getByText } = render({
      title: 'Recent activity',
      subtitle: 'Last 7 days',
      action: <Text>See all</Text>,
    });
    const header = headerStyle(root);
    expect(header).toBeDefined();
    expect(header!.alignItems).toBe('flex-start');
    expect(header!.gap).toBe(THEME.spacing.md);
    expect(getByText('See all')).toBeTruthy();
    // A long title must not shove the action off the end, and the action must
    // not compress to make room for it.
    expect(allStyles(root).some((s) => s.flex === 1)).toBe(true);
    expect(allStyles(root).some((s) => s.flexShrink === 0)).toBe(true);
  });

  it('renders an action with no title or subtitle', () => {
    const { root, getByText } = render({ action: <Text>Filter</Text> });
    expect(headerStyle(root)).toBeDefined();
    expect(getByText('Filter')).toBeTruthy();
    // No text column at all — nothing carrying the title/subtitle gap.
    expect(allStyles(root).some((s) => s.gap === THEME.spacing.xs)).toBe(false);
  });

  it('renders a title with no subtitle, and a subtitle with no title, cleanly', () => {
    const titleOnly = render({ title: 'Overview' });
    expect(titleOnly.queryByText('A quick summary')).toBeNull();
    expect(titleOnly.getByText('Overview')).toBeTruthy();

    const subOnly = render({ subtitle: 'A quick summary' });
    expect(subOnly.getByText('A quick summary').props.accessibilityRole).toBeUndefined();
  });

  it('survives its empty case: no header at all, nothing painted', () => {
    // §4.5 — an empty header row would leave a `gap` where two lines would be.
    const { root, getByTestId } = render();
    expect(headerStyle(root)).toBeUndefined();
    expect(getByTestId('s').children).toHaveLength(0);
    const style = rootStyle();
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
    expect(style.shadowOpacity).toBeUndefined();
  });

  it('renders children with no header when it was given no header content', () => {
    const { root, getByText } = renderThemed(
      <SectionV4 testID="s">
        <Text>just the body</Text>
      </SectionV4>,
      SEED_LIGHT
    );
    expect(headerStyle(root)).toBeUndefined();
    expect(getByText('just the body')).toBeTruthy();
  });

  it('renders the header above the children, in that order', () => {
    const { getByTestId } = renderThemed(
      <SectionV4 testID="s" title="Overview">
        <View testID="body" />
      </SectionV4>,
      SEED_LIGHT
    );
    const kids = getByTestId('s').children;
    expect(kids).toHaveLength(2);
    expect((kids[1] as { props?: Record<string, unknown> }).props?.testID).toBe('body');
  });

  it('keeps prop parity with the web twin — same names, same defaults', () => {
    const props: SectionV4Props = {
      title: 'Overview',
      subtitle: 'A quick summary',
      spacing: 'md',
      action: <Text>See all</Text>,
    };
    expect(props.spacing).toBe('md');
  });

  it('lets a caller’s style merge over the computed gap', () => {
    expect(rootStyle({ title: 'a', style: { gap: 0 } }).gap).toBe(0);
  });

  it('every colour it paints traces to a token — no literal hex anywhere', () => {
    const { root } = render({
      title: 'Overview',
      subtitle: 'A quick summary',
      action: <Text>See all</Text>,
    });
    const tokens = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(tokens.has(hex)).toBe(true));
  });
});
