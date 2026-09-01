import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { ScrollAreaV4 } from './ScrollAreaV4';

/** The fixed inset the safe-area mock reports for a notch-like device. */
const MOCK_BOTTOM_INSET = 16;

function scrollOf(root: ReactTestInstance): ReactTestInstance {
  return root.findAllByType(ScrollView)[0]!;
}

function contentOf(root: ReactTestInstance): Record<string, unknown> {
  return flatStyle(scrollOf(root).props.contentContainerStyle);
}

function boxOf(root: ReactTestInstance): Record<string, unknown> {
  return flatStyle(scrollOf(root).props.style);
}

describe('ScrollAreaV4 (native)', () => {
  it('scrolls vertically with the page gutter by default — unchanged (§1.4)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 />, SEED_LIGHT);
    expect(scrollOf(root).props.horizontal).toBe(false);
    // §4.1's page gutter, and changing this default would not be additive.
    expect(contentOf(root).padding).toBe(theme.spacing.lg);
  });

  it('takes `axis`, closing §5’s parity gap with the web twin (§1.3)', () => {
    // The base had no `axis` at all here, so a native caller reached past the
    // component to `horizontal` and the same carousel read two ways.
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 axis="horizontal" />, SEED_LIGHT);
    expect(scrollOf(root).props.horizontal).toBe(true);
  });

  it('degrades `axis="both"` to vertical — RN has no two-axis ScrollView', () => {
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 axis="both" />, SEED_LIGHT);
    expect(scrollOf(root).props.horizontal).toBe(false);
  });

  it('lets an explicit `horizontal` win over `axis`', () => {
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 axis="vertical" horizontal />, SEED_LIGHT);
    expect(scrollOf(root).props.horizontal).toBe(true);
  });

  it('binds every padding step to a spacing token', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(contentOf(renderThemed(<ScrollAreaV4 padding="xs" />, SEED_LIGHT).UNSAFE_root).padding).toBe(
      theme.spacing.xs
    );
    expect(contentOf(renderThemed(<ScrollAreaV4 padding="md" />, SEED_LIGHT).UNSAFE_root).padding).toBe(
      theme.spacing.md
    );
    expect(contentOf(renderThemed(<ScrollAreaV4 padding="2xl" />, SEED_LIGHT).UNSAFE_root).padding).toBe(
      theme.spacing['2xl']
    );
  });

  it('padding="none" is truly full-bleed, for content that owns its own gutter', () => {
    // A row list carries §4.3's spacing.md itself; inside a padded region it is
    // indented twice and stops lining up with the rest of the screen.
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 padding="none" />, SEED_LIGHT);
    expect(contentOf(root).padding).toBeUndefined();
  });

  it('fills the theme surface on request, and is transparent otherwise', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(boxOf(renderThemed(<ScrollAreaV4 filled />, SEED_LIGHT).UNSAFE_root).backgroundColor).toBe(
      theme.light.surface
    );
    expect(boxOf(renderThemed(<ScrollAreaV4 />, SEED_LIGHT).UNSAFE_root).backgroundColor).toBeUndefined();
  });

  it('pays no safe-area inset by default — the base read none (§1.4)', () => {
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 />, SEED_LIGHT);
    expect(contentOf(root).paddingBottom).toBeUndefined();
  });

  it('clears the home indicator when asked, composing the inset onto the padding', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 safeArea />, SEED_LIGHT);
    const content = contentOf(root);
    expect(content.paddingBottom).toBe(theme.spacing.lg + MOCK_BOTTOM_INSET);
    // The inset is paid by the CONTENT, not the frame, so the region's own
    // ground and its scroll indicator still run to the true bottom.
    expect(boxOf(root).paddingBottom).toBeUndefined();
    expect(content.padding).toBe(theme.spacing.lg);
  });

  it('pays the bare inset when the content is full-bleed', () => {
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 safeArea padding="none" />, SEED_LIGHT);
    expect(contentOf(root).paddingBottom).toBe(MOCK_BOTTOM_INSET);
    expect(contentOf(root).padding).toBeUndefined();
  });

  it('renders the content it is handed, untouched', () => {
    const { getByText } = renderThemed(
      <ScrollAreaV4>
        <Text>Row one</Text>
      </ScrollAreaV4>,
      SEED_LIGHT
    );
    expect(getByText('Row one')).toBeTruthy();
  });

  it('empty state: an empty region is still a viewport, not a blank box', () => {
    // §4.5's "render nothing" is about a component with nothing to SAY; this is
    // a viewport the caller sized, and collapsing it takes the scroll with it.
    const { UNSAFE_root: root, toJSON } = renderThemed(<ScrollAreaV4 />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
    expect(scrollOf(root)).toBeTruthy();
  });

  it('empty state: paints no ground, no border and no shadow of its own', () => {
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 />, SEED_LIGHT);
    const box = boxOf(root);
    expect(box.backgroundColor).toBeUndefined();
    expect(box.borderWidth).toBeUndefined();
    expect(box.shadowOpacity).toBeUndefined();
    expect(box.elevation).toBeUndefined();
  });

  it('merges a caller’s styles rather than replacing its own', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(
      <ScrollAreaV4 style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }} />,
      SEED_LIGHT
    );
    expect(boxOf(root).flex).toBe(1);
    expect(contentOf(root).gap).toBe(8);
    expect(contentOf(root).padding).toBe(theme.spacing.lg);
  });

  it('passes scroll-view props through', () => {
    const { getByTestId } = renderThemed(
      <ScrollAreaV4 testID="feed" showsVerticalScrollIndicator={false} />,
      SEED_LIGHT
    );
    expect(getByTestId('feed').props.showsVerticalScrollIndicator).toBe(false);
  });

  it('every colour it paints traces to a token (§1.1)', () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(<ScrollAreaV4 filled safeArea />, SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
