/**
 * The native spelling of the V4 line's state layers.
 *
 * The scale itself, the reasoning, and the M3 citation live in
 * `src/primitives/internal/v4-state.ts`, which both platforms share. This file
 * is the two-line adapter that reads the opacities off the resolved native
 * theme (`useXenitionTheme().state`) instead of the compile-time constant, so
 * a native control layers with the same numbers the web sheet mixes with.
 *
 * Why two spellings survive:
 *
 *   - {@link pressLayer} returns `rgba()`. Use it when the control does not own
 *     the surface beneath it — a tab over a segmented rail, a ✕ over a tone
 *     band, a chevron over whatever the caller put behind the toolbar. This is
 *     M3's literal model, and it is what replaced the `opacity: 0.6 | 0.7 |
 *     0.85` dimming the line used to do, which lightened the *content* instead
 *     of tinting the *container* and so made a pressed icon look disabled.
 *   - {@link pressFill} returns an opaque hex composited against `surface`. Use
 *     it for rows and option lists, whose label carries a measured contrast
 *     promise against the fill it is drawn on — a translucent layer there would
 *     make that promise depend on whatever is underneath.
 */
import { type StateLevel } from '../../../primitives/internal/v4-state';
import type { XenitionNativeTheme } from '../../theme';
export type { StateLevel };
/**
 * A ground-independent state layer: the content colour at the M3 opacity, as
 * `rgba()`.
 *
 * `ink` defaults to `onSurface`. Pass the band's own ink when the control sits
 * on a coloured fill, so the layer stays visible there too.
 */
export declare function stateLayer(theme: XenitionNativeTheme, level: StateLevel, ink?: string): string;
/** {@link stateLayer} at the pressed opacity — the common case on a touch device. */
export declare function pressLayer(theme: XenitionNativeTheme, ink?: string): string;
/**
 * The pressed layer flattened against a container the component names, as an
 * opaque hex.
 *
 * For a control that already has a fill of its own — a filled "Done" button, a
 * tone-coloured chip, a drop zone — where a translucent layer would have to
 * replace that fill rather than sit on it.
 */
export declare function pressOver(theme: XenitionNativeTheme, container: string, ink?: string): string;
/**
 * The pressed layer flattened against `surface`, as an opaque hex.
 *
 * For a row, a menu item, a suggestion or a day cell — anything whose text is
 * contrast-checked against the fill it sits on.
 */
export declare function pressFill(theme: XenitionNativeTheme): string;
//# sourceMappingURL=state-v4.d.ts.map