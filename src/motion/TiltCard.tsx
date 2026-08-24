import * as React from 'react';
import { usePrefersReducedMotion } from './internal/reduced-motion';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees (clamped to 15). */
  maxTilt?: number;
}

/**
 * Pointer-tracked 3D tilt. The tilt resets on pointer leave and is disabled
 * for touch pointers and under `prefers-reduced-motion`. State is written
 * straight to the element style (no re-render per pointer move).
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(function TiltCard(
  { maxTilt = 8, style, children, onPointerMove, onPointerLeave, ...rest },
  forwardedRef
) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);
  const reduced = usePrefersReducedMotion();
  const clampedMax = Math.max(0, Math.min(15, maxTilt));

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>): void => {
    onPointerMove?.(event);
    const el = localRef.current;
    if (el === null || reduced || event.pointerType === 'touch') return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = (px * 2 * clampedMax).toFixed(2);
    const rotateX = (-py * 2 * clampedMax).toFixed(2);
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>): void => {
    onPointerLeave?.(event);
    const el = localRef.current;
    if (el !== null) el.style.transform = '';
  };

  return (
    <div
      ref={localRef}
      data-xen-tilt=""
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transition: reduced ? undefined : 'transform 200ms ease-out',
        willChange: reduced ? undefined : 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
