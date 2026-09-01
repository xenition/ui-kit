import * as charts from './index';
import { CHARTS_V4_ROSTER, CHARTS_V4_SHARED } from '../../charts/v4-roster';

/**
 * The native barrel, against the same roster the web spec reads.
 *
 * Four of these twenty existed only here until 2026-08-30, while
 * `COMPONENTS.md` counted twenty for both twins. One shared roster, checked
 * from both projects, is how that stops being discoverable only by a hand
 * count.
 */
describe('@xenition/ui/native/charts — the V4 barrel', () => {
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
