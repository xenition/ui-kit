import * as charts from './index';
import { CHARTS_V4_ROSTER, CHARTS_V4_SHARED } from './v4-roster';

/**
 * The barrel is the only thing an app actually sees.
 *
 * A component can be written, tested, reviewed and merged and still be
 * unreachable. That is not hypothetical for this package: `0.2.0` shipped with
 * 44 native modules written, committed and mirrored, and every one of them
 * unreachable from an install.
 *
 * The native twin of this file asserts the same roster, which is how "the same
 * twenty on both twins" is checked across two Jest projects that cannot import
 * each other.
 */
describe('@xenition/ui/charts — the V4 barrel', () => {
  it.each(CHARTS_V4_ROSTER)('exports %s as a renderable component', (name) => {
    const exported = (charts as Record<string, unknown>)[name];
    expect(exported).toBeDefined();
    // A plain function component OR a `forwardRef` / `memo` object — the line
    // uses both, and asserting `typeof === 'function'` would quietly demand
    // that no chart ever forwards a ref.
    expect(typeof exported === 'function' || typeof exported === 'object').toBe(true);
  });

  it.each(CHARTS_V4_SHARED)('exposes %s', (name) => {
    expect((charts as Record<string, unknown>)[name]).toBeDefined();
  });

  it('ships exactly twenty', () => {
    expect(CHARTS_V4_ROSTER).toHaveLength(20);
  });

  /**
   * The palette is never cycled, and the barrel is where an app first meets
   * that rule. Five slots is the measured limit for a palette rotated off a
   * single brand hue; the scatter cap is lower because any two scatter marks
   * can end up adjacent, which is the harder all-pairs test.
   */
  it('holds the palette limits the whole module is built on', () => {
    expect(charts.CHART_SERIES_COUNT).toBe(5);
    expect(charts.CHART_SCATTER_SERIES_CAP).toBe(3);
    expect(charts.CHART_MARK.gap).toBe(2);
  });
});
