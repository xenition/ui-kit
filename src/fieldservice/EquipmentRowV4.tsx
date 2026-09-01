import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { BADGE_V4, discGround, spokenLine, type ToneV4 } from './internal/job-v4';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

export interface EquipmentRowV4Props extends EquipmentRowProps {
  /** Override the status words — four English words lived inside. */
  statusLabels?: Partial<Record<EquipmentStatus, string>>;
}

const EQUIPMENT_V4: Record<EquipmentStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  operational: { label: 'Operational', glyph: '✓', tone: 'success' },
  maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn' },
  down: { label: 'Down', glyph: '✕', tone: 'danger' },
  retired: { label: 'Retired', glyph: '⏻', tone: 'neutral' },
};

/**
 * **V4 equipment row** — the web twin of the native `EquipmentRowV4`, same
 * props as {@link EquipmentRow} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row's name carries the location and the service date.** A register
 *    is read to answer "where is it and when is it next due", and
 *    `` `${name}, ${tag}, ${status}` `` dropped both.
 * 2. **The asset disc is decorative.** It announced the bare word "Equipment"
 *    ahead of the asset's own name.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, rather than a `div` carrying `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler.
 * 4. **It joins the shared row family** and its badge takes the module's one
 *    badge shape — the web register was a wall of saturated pills where the
 *    phone showed soft tints.
 */
export const EquipmentRowV4 = React.forwardRef<HTMLDivElement, EquipmentRowV4Props>(
  function EquipmentRowV4(
    { name, assetTag, status, glyph = '🚜', nextService, location, onClick, statusLabels, className, style },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = EQUIPMENT_V4[status] ?? EQUIPMENT_V4.operational;
    const word = statusLabels?.[status] ?? sd.label;
    const service = nextService != null ? `Service ${nextService}` : null;
    const caption = metaLine([assetTag, location, service]);
    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(caption !== ''));

    const body = (
      <>
        <span
          aria-hidden
          className={cn(ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-md)]')}
          style={{ background: discGround(sd.tone) }}
        >
          <IconV4 glyph={glyph} />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
          {caption !== '' ? (
            <span className="truncate text-xs text-muted-text">{caption}</span>
          ) : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${word}`}
          </BadgeV4>
        </span>
      </>
    );

    if (onClick == null) {
      return (
        <div ref={ref} style={style} className={cn(rowClass, className)}>
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} style={style} className={cn('w-full', className)}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([name, assetTag, word, location, service])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(rowClass, 'rounded-[var(--xen-radius-md)]')}
        >
          {body}
        </button>
      </div>
    );
  }
);
