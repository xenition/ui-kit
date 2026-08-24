/**
 * A small, self-contained language dropdown. It styles itself from the kit's
 * `--xen-*` CSS custom properties, so it automatically matches whatever theme
 * the surrounding template uses — no props required. Drop it into a navbar.
 */
import * as React from 'react';
import { useT } from './context';
import type { Locale } from './locales';

export interface LanguageSwitcherProps {
  /** Extra classes for the trigger button. */
  className?: string;
  /** Show only the flag on the trigger (no language name). Good for tight navbars. */
  compact?: boolean;
  /** Menu alignment relative to the trigger. Defaults to `end` (right-aligned). */
  align?: 'start' | 'end';
}

export function LanguageSwitcher({
  className,
  compact = false,
  align = 'end',
}: LanguageSwitcherProps): React.ReactElement {
  const { locale, setLocale, locales, t } = useT();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === locale) ?? locales[0]!;

  // Close on outside click / Escape.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('lang.label')}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 0.6rem',
          fontSize: '0.85rem',
          fontWeight: 500,
          lineHeight: 1,
          color: 'var(--xen-color-on-surface, currentColor)',
          background: 'transparent',
          border: '1px solid var(--xen-color-border, rgba(0,0,0,0.12))',
          borderRadius: 'var(--xen-radius-md, 0.5rem)',
          cursor: 'pointer',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1rem' }}>
          {current.flag}
        </span>
        {!compact && <span>{current.label}</span>}
        <span aria-hidden="true" style={{ opacity: 0.6, fontSize: '0.7rem' }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('lang.label')}
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.35rem)',
            [align === 'end' ? 'right' : 'left']: 0,
            zIndex: 50,
            minWidth: '11rem',
            maxHeight: '18rem',
            overflowY: 'auto',
            margin: 0,
            padding: '0.3rem',
            listStyle: 'none',
            background: 'var(--xen-color-surface, #fff)',
            color: 'var(--xen-color-on-surface, #111)',
            border: '1px solid var(--xen-color-border, rgba(0,0,0,0.12))',
            borderRadius: 'var(--xen-radius-lg, 0.75rem)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.16)',
          }}
        >
          {locales.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    color: 'inherit',
                    background: active
                      ? 'var(--xen-color-primary-50, rgba(0,0,0,0.05))'
                      : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--xen-radius-md, 0.5rem)',
                    cursor: 'pointer',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: '1.05rem' }}>
                    {l.flag}
                  </span>
                  <span>{l.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
