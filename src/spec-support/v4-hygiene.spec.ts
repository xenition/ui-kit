/**
 * **The V4 line's token hygiene, asserted against the source.**
 *
 * ## Why this file exists
 *
 * Eight components across four modules spent a while painting every row in
 * `--xen-border` — the hairline colour — because `rowSeparatorClass`, which
 * describes a *standalone* 1px element, had been applied to the row itself.
 * The bug shipped in three separate passes. Then it was found by reading the
 * code, not by running it: **362 tests across those four modules stayed green
 * the entire time.**
 *
 * That is not a gap in those tests. They assert names, roles, handlers and
 * empty states, and they do it well. It is a gap in what a render test *can*
 * see: RNTL and Testing Library hand back a tree, not a computed style, so a
 * component drawn in the wrong colour still passes every behavioural
 * assertion ever written about it.
 *
 * So the rules that are about what a component *paints* are checked here,
 * against the text of the files, where they are actually visible. This is a
 * lint rule that happens to run in jest, because the repo has no linter — see
 * `V4-CONVENTIONS.md`.
 *
 * ## What it does not do
 *
 * It does not check base, V2 or V3 files. Those predate the line and are not
 * this pass's to change; a rule that fails on them would be noise nobody could
 * act on.
 *
 * It strips comments before matching, because every V4 file's docblock
 * *describes the defect it fixes* — quoting `opacity: pressed ? 0.85 : 1` in
 * prose is the file doing its job, and an earlier version of this sweep
 * flagged three files for exactly that.
 *
 * And it does **not** check for the border token used as a fill, which is the
 * defect that prompted the file. `backgroundColor: colors.border` on a 1px
 * `View` is a hairline and is exactly right — it is what `rowSeparatorStyle`
 * itself does. On a skeleton block it is wrong. The two are identical in text
 * and differ only in the element's size, so a textual rule would either miss
 * the bug or fail on every correct divider in the kit. That one still needs a
 * reader; this file is honest about not catching it.
 */

import * as fs from 'fs';
import * as path from 'path';

const SRC = path.join(__dirname, '..');

/**
 * The modules the V4 line has been through with an audit behind it.
 *
 * Everything else under `src` also has `*V4.tsx` files — another author has
 * been running the same line across a different set of modules in parallel —
 * and a sweep over all of them reports hundreds of hits. Those are not this
 * pass's to judge: nobody has read those bases, and a rule that fails on work
 * whose reasoning is not written down is noise, not a net.
 *
 * Widening this list is what finishing those modules looks like.
 */
const AUDITED = [
  'agriculture',
  'automotive',
  'beauty',
  'booking',
  'calendar',
  'chat',
  'content',
  'crm',
  'crypto',
  'dating',
  'email',
  'events',
  'fieldservice',
  'finance',
  'food',
  'gaming',
  'government',
  'health',
  'hr',
  'media',
  'onboarding',
] as const;

/** `content/ArticleCardV4.tsx` and `native/content/ArticleCardV4.tsx` both → `content`. */
function moduleOf(relative: string): string {
  const parts = relative.split('/');
  return parts[0] === 'native' ? (parts[1] ?? '') : (parts[0] ?? '');
}

/** Every `*V4.tsx` in the tree, web and native, as `[relativePath, source]`. */
function v4Files(): Array<[string, string]> {
  const out: Array<[string, string]> = [];

  const walk = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        walk(full);
        continue;
      }
      if (!entry.name.endsWith('V4.tsx')) continue;
      if (entry.name.includes('.spec.')) continue;
      const relative = path.relative(SRC, full).replace(/\\/g, '/');
      if (!(AUDITED as readonly string[]).includes(moduleOf(relative))) continue;
      out.push([relative, fs.readFileSync(full, 'utf8')]);
    }
  };

  walk(SRC);
  return out;
}

/**
 * Drop comments, so a docblock naming the defect it fixes is not read as the
 * defect. Strings are left alone: a banned pattern inside a string literal is
 * still shipped to the DOM.
 */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (line, lead: string) => lead + ' '.repeat(line.length - lead.length));
}

interface Rule {
  /** What the rule is called in a failure message. */
  name: string;
  /** The pattern that means the rule was broken. */
  pattern: RegExp;
  /** One sentence: why it is wrong, and what to use instead. */
  because: string;
  /** Files that predate the rule and are allowed to keep breaking it. */
  allow?: readonly string[];
}

const RULES: readonly Rule[] = [
  {
    name: 'press drawn as opacity',
    pattern: /opacity:\s*pressed\s*\?/,
    because:
      'M3 draws press as a state layer. 0.38 is the *disabled* band, so a press ' +
      'rendered as an opacity reads as an unavailable control. Use pressFill/pressOver ' +
      '(native) or data-xen-v4-state with stateGroundVars (web).',
  },
  {
    name: 'neutral ramp indexing',
    pattern: /\bbg-neutral-\d/,
    because:
      'The web neutral ramp mirrors under [data-theme="dark"], so a ramp step ignores ' +
      'the seed and inverts. Use a semantic slot — card, surface, selected — or SKELETON_CLASS.',
  },
  {
    name: 'a scheme branch',
    pattern: /scheme\s*===\s*['"]dark['"]/,
    because:
      'The compiler already resolved the scheme. A component that branches on it is ' +
      'undoing that, and it only ever gets one of the two branches right.',
  },
  {
    name: 'a font weight off the scale',
    pattern: /fontWeight:\s*['"]800['"]|\bfont-extrabold\b/,
    because: "The kit's weight scale stops at bold. 800 is not a step on it.",
  },
  {
    name: 'a hand-picked focus ring',
    pattern: /ring-(?:primary|accent|success|warn|danger)-\d/,
    because:
      'The preset ships a dedicated `ring` colour plus --xen-ring-width and ' +
      '--xen-ring-offset, so focus tracks the seed. A ramp step does not: the ' +
      'V4 line already uses `ring-ring` in 74 files against 2 that do not.',
  },
  {
    name: 'an invented disabled opacity',
    // 0.38 is M3's band and is allowed; these five are the values found in the wild.
    pattern: /disabled\s*\?\s*0\.(?:4|5|6|7|9)\b/,
    because:
      "M3's disabled-content band is 0.38, and the theme ships it as " +
      'state.disabledContent. A component that picks its own has thrown that away.',
  },
];

describe('the V4 line paints with tokens', () => {
  const files = v4Files();

  it('finds the V4 files to check', () => {
    // A guard on the guard: if the walk ever returns nothing, every rule below
    // passes vacuously and this file becomes decoration.
    expect(files.length).toBeGreaterThan(200);
  });

  it.each(RULES.map((rule) => [rule.name, rule] as const))('has no %s', (_name, rule) => {
    const offenders: string[] = [];

    for (const [file, source] of files) {
      if (rule.allow?.includes(file)) continue;
      const code = stripComments(source);
      code.split('\n').forEach((line, index) => {
        if (rule.pattern.test(line)) offenders.push(`${file}:${index + 1}  ${line.trim()}`);
      });
    }

    if (offenders.length > 0) {
      throw new Error(
        `${offenders.length} file(s) break "${rule.name}".\n\n${rule.because}\n\n` +
          offenders.join('\n')
      );
    }
  });
});
