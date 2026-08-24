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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
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

  // On open, seed the active option to the current locale and move focus into
  // the listbox so arrow-key navigation works immediately.
  React.useEffect(() => {
    if (!open) return;
    const idx = locales.findIndex((l) => l.code === locale);
    setActiveIndex(idx < 0 ? 0 : idx);
    listRef.current?.focus();
  }, [open, locale, locales]);

  const choose = (code: Locale) => {
    setLocale(code);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Roving keyboard control for the listbox (design.md §46 semantic controls):
  // Up/Down move the active option, Enter/Space select, Escape closes.
  const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const n = locales.length;
    if (n === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % n);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + n) % n);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(n - 1);
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const opt = locales[activeIndex];
        if (opt) choose(opt.code);
        break;
      }
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const activeCode = locales[activeIndex]?.code;

  return (
    <div ref={rootRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('lang.label')}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--xen-space-xs)',
          padding: 'var(--xen-space-xs) var(--xen-space-sm)',
          fontSize: 'var(--xen-text-sm)',
          fontWeight: 500,
          lineHeight: 1,
          color: 'var(--xen-on-surface)',
          background: 'transparent',
          border: '1px solid var(--xen-border)',
          borderRadius: 'var(--xen-radius-md)',
          cursor: 'pointer',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 'var(--xen-text-base)' }}>
          {current.flag}
        </span>
        {!compact && <span>{current.label}</span>}
        <span aria-hidden="true" style={{ opacity: 0.6, fontSize: 'var(--xen-text-xs)' }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={0}
          aria-label={t('lang.label')}
          aria-activedescendant={activeCode ? `xen-lang-opt-${activeCode}` : undefined}
          onKeyDown={onListKeyDown}
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--xen-space-xs))',
            [align === 'end' ? 'right' : 'left']: 0,
            zIndex: 50,
            minWidth: '11rem',
            maxHeight: '18rem',
            overflowY: 'auto',
            margin: 0,
            padding: 'var(--xen-space-xs)',
            listStyle: 'none',
            background: 'var(--xen-surface)',
            color: 'var(--xen-on-surface)',
            border: '1px solid var(--xen-border)',
            borderRadius: 'var(--xen-radius-lg)',
            outline: 'none',
            boxShadow: '0 12px 32px -8px var(--xen-border)',
          }}
        >
          {locales.map((l, i) => {
            const selected = l.code === locale;
            const highlighted = i === activeIndex;
            return (
              <li key={l.code} id={`xen-lang-opt-${l.code}`} role="option" aria-selected={selected}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => choose(l.code)}
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--xen-space-sm)',
                    width: '100%',
                    padding: 'var(--xen-space-sm) var(--xen-space-sm)',
                    fontSize: 'var(--xen-text-sm)',
                    textAlign: 'left',
                    color: 'inherit',
                    background: highlighted || selected ? 'var(--xen-primary-50)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--xen-radius-md)',
                    cursor: 'pointer',
                    fontWeight: selected ? 600 : 400,
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: 'var(--xen-text-base)' }}>
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
