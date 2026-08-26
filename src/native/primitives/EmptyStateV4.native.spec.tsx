import * as React from 'react';
import { Text, View } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { MIN_CONTRAST, compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { Button } from './Button';
import type { EmptyStateProps } from './EmptyState';
import { EmptyStateV4 } from './EmptyStateV4';

function mount(props: Partial<EmptyStateProps> = {}) {
  return renderThemed(
    <EmptyStateV4
      icon={<Text>Icon</Text>}
      title="No habits yet"
      description="Create your first habit and start building your streak."
      action={<Button>Create habit</Button>}
      {...props}
    />,
    SEED_LIGHT
  );
}

/** The component's own root: the one View carrying its centring and padding. */
function rootOf(root: ReactTestInstance): Record<string, unknown> {
  return (
    root
      .findAll(() => true)
      .map((n) => flatStyle(n.props?.style))
      .find((s) => s.alignItems === 'center' && s.justifyContent === 'center') ?? {}
  );
}

describe('EmptyStateV4 (native)', () => {
  it('takes exactly the base component’s props', () => {
    const same: EmptyStateProps = {
      icon: <Text>Icon</Text>,
      title: 'No habits yet',
      description: 'Create your first habit.',
      action: <Button>Create habit</Button>,
    };
    const asV4: React.ComponentProps<typeof EmptyStateV4> = same;
    expect(asV4).toBe(same);
  });

  it('answers §15’s three questions, and the action is one of them', () => {
    const { getByText } = mount();
    expect(getByText('No habits yet')).toBeTruthy();
    expect(getByText('Create your first habit and start building your streak.')).toBeTruthy();
    expect(getByText('Create habit')).toBeTruthy();
  });

  it('gives the ACTION the largest gap, and the illustration the smallest', () => {
    const spacing = compileTheme(SEED_LIGHT).spacing;
    const { UNSAFE_root } = mount();
    const styles = UNSAFE_root.findAll(() => true).map((n) => flatStyle(n.props?.style));
    // The action is separated by `lg`, the biggest step in the component — that
    // separation is what makes it terminal rather than a caption (§15, §5).
    expect(styles.some((s) => s.marginTop === spacing.lg)).toBe(true);
    // The icon is one `sm` step from the title.
    expect(styles.some((s) => s.marginBottom === spacing.sm)).toBe(true);
  });

  it('hides the illustration from screen readers', () => {
    const { UNSAFE_root } = mount();
    expect(
      UNSAFE_root.findAll((n) => n.props?.accessibilityElementsHidden === true).length
    ).toBeGreaterThan(0);
  });

  it('drops the dashed box — the container did not earn itself', () => {
    // §11, and §8 lists a dashed placeholder rectangle among the tells of
    // generic generated UI.
    const { UNSAFE_root } = mount();
    const root = rootOf(UNSAFE_root);
    expect(root.borderWidth).toBeUndefined();
    expect(root.borderStyle).toBeUndefined();
    expect(root.backgroundColor).toBeUndefined();
    // What replaces it is space (§9).
    expect(root.paddingVertical).toBe(compileTheme(SEED_LIGHT).spacing['2xl']);
  });

  it('gives the title the heading face and the weight the icon gave up', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount();
    const title = getByText('No habits yet').props.style;
    expect(title.fontFamily).toBe(theme.typography.fontHeading);
    expect(title.fontSize).toBe(theme.typography.scale.lg);
    expect(title.fontWeight).toBe('600');
  });

  it('explains in the AA-promising muted slot, at a measure off the scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = mount();
    const copy = getByText('Create your first habit and start building your streak.').props.style;
    expect(copy.color).toBe(theme.light.mutedText);
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(
      MIN_CONTRAST
    );
    // Not the base's literal 320 — and the same expression the web twin uses.
    expect(copy.maxWidth).toBe(theme.spacing['2xl'] * 7);
  });

  it('survives its empty state: title only', () => {
    const { getByText, queryByText } = renderThemed(
      <EmptyStateV4 title="Nothing here" />,
      SEED_LIGHT
    );
    expect(getByText('Nothing here')).toBeTruthy();
    expect(queryByText('Icon')).toBeNull();
  });

  it('accepts non-string title and description slots', () => {
    const { getByText } = mount({
      title: <Text>Custom title</Text>,
      description: (
        <View>
          <Text>Custom copy</Text>
        </View>
      ),
    });
    expect(getByText('Custom title')).toBeTruthy();
    expect(getByText('Custom copy')).toBeTruthy();
  });

  it('paints only colours that exist in the compiled theme', () => {
    const { UNSAFE_root } = mount();
    const allowed = tokenHexSet(SEED_LIGHT);
    for (const hex of renderedStyleHexes(UNSAFE_root)) {
      expect(allowed.has(hex) || allowed.has(hex.slice(0, 7))).toBe(true);
    }
  });
});
