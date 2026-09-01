# `crypto` + `dating` + `email` — the V4 pass

Thirty-seven components across three modules, both twins. Written after a full
read of all 74 base files by three independent audits. Every claim below is a
defect someone can reproduce, not a preference.

Companion to `ONBOARDING-V4-BRIEF.md`, `VERTICALS-V4-BRIEF.md`,
`AUTOMOTIVE-BEAUTY-V4-BRIEF.md`, `CALENDAR-CHAT-V4-BRIEF.md` and
`CONTENT-CRM-V4-BRIEF.md`. The rules those set — no base file is edited, every
V4 prop is optional and additive, the twins keep prop parity — hold unchanged.

---

## 1. Three components that do not work

These are not styling defects. Each one is a control that cannot do the thing
it exists to do, on **both** platforms, and none is visible in a screenshot.

### 1.1 `SwapForm` cannot accept a decimal amount

`crypto/SwapForm.tsx:94-96`, `native/crypto/SwapForm.tsx:99-102`. The field is
fully controlled off a **number**:

```tsx
value={fromAmount === 0 ? '' : String(fromAmount)}
onChange={(event) => emit(parseAmount(event.target.value))}
```

`Number.parseFloat('1.')` is `1`. So the instant the user types the decimal
point the parent is handed `1`, the field re-renders as `"1"`, and the point
disappears from under the caret. A leading `0` collapses to `''` and vanishes
outright.

**Only whole token units can ever be entered** — in the one component in the
kit whose submit hands a value to a chain transaction. A user swapping 0.25
types `0`, sees nothing, types `.`, sees nothing, types `2`, and submits **2**.
An order of magnitude, silently, on both twins, so neither platform's
behaviour flags the other as wrong.

**The fix:** `crypto/amount-v4.ts` — pure, shared by both twins — holds the
draft as *text*, emits the parsed number, and only overwrites the draft when
the parent's value genuinely disagrees with what is on screen.

### 1.2 `EmailThread`'s expansion state cannot change

`email/EmailThread.tsx:82-83`, `native/email/EmailThread.tsx:79`:

```ts
const expanded = new Set(expandedIds ?? (lastId ? [lastId] : []));
```

Recomputed from props on every render, with **no `useState` anywhere in either
file** — while `expandedIds` is an *optional* prop and `onToggleMessage` an
optional callback. Mount it the way the module's own barrel doc describes
(`<EmailThread subject messages />`) and every header click fires
`onToggleMessage` into a callback nobody is listening to: the newest message
stays open, every earlier one stays a clipped one-line snippet, `aria-expanded`
never flips.

A user taps the third reply, sees nothing happen, taps again, and concludes the
app is broken. A screen-reader user hears "Expand message from Priya, button,
collapsed" every single time they activate it. The JSDoc advertises the header
as "an interactive `role="button"` toggle" and never mentions that the caller
is obliged to own the state.

**The fix:** `email/thread-state-v4.ts` — pure, shared — `useThreadExpansion`
keeps the controlled path exactly as it was and gives the uncontrolled path
somewhere to put its state.

### 1.3 `SwipeDeck` makes pass irreversible, and refuses the undo it already ships

`dating/SwipeDeck.tsx:179`, `native/dating/SwipeDeck.tsx:265`. Both twins
hard-code `actions={['pass', 'superlike', 'like']}`. `LikePassButtons` has
always defined a `rewind` action — and `SwipeDeck` exposes no `actions`,
`onRewind` or `disabledActions` prop, so a caller cannot add one. Even if they
could, `onButton` would eat it: the handler tests `like`, `pass`, `superlike`
and lets `'rewind'` and `'boost'` fall through to nothing.

Meanwhile the threshold is a single 120px drag or one 56px tap, and `commit`
advances the index and fires `onSwipeLeft` before anything is rendered that
could recall it. Flick a card slightly too far and the person is gone — no
toast, no undo, no announcement.

**Plus a second bug in the same file:** web fires `onSwipe`, `onSwipeRight`,
`onSwipeLeft` and `onEmpty` from **inside a `setIndex` updater**
(`dating/SwipeDeck.tsx:78-88`). State updaters must be pure; React invokes them
twice in StrictMode, so every swipe emits a **duplicate** like or pass. Native
does it correctly, outside the updater.

---

## 2. What the sweep measured

Across the 37 components, before this pass:

| | count |
|---|--:|
| press/hover drawn as raw `opacity` instead of an M3 state layer | **21** |
| fill tokens (`primary`, `success`, `muted`, `accent`) used as **ink** | **40+** |
| ramp-step / `border`-as-fill sites | **55** |
| interactive elements under 44 | **13** |
| web `div`/`span` + `role="button"` + hand-written key handler | **8** |
| hard-coded English strings | **~195** |

`tokens.state` is referenced **zero** times across all three modules, while 25
sites in `email` alone hand-roll an opacity. Six different invented values are
in play — 0.4, 0.5, 0.6, 0.7, 0.85, 0.9 — for four states. M3's pressed layer
is 0.12 and its disabled band 0.38, both already compiled into the theme.

---

## 3. `crypto` — the rest

- **"down +3.20%".** Three components build the spoken direction as
  `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
  `formatPct` re-applies a sign, so `Math.abs` guarantees a `+` on a loss.
  `>= 0` also sends a flat `0` down the "up" branch while the glyph drawn
  beside it is `•`: the spoken direction contradicts the drawn one.
- **The module's own helper hands back a fill token for text.**
  `internal/format.ts`'s `changeToneClass()` returns `text-success` /
  `text-danger` / `text-muted`; the native `changeToneKey()` returns
  `keyof SemanticColors`. Twelve native sites and every web price inherit it.
  **The V2/V3 lines already fixed this** — which makes the base line a
  regression, not an oversight.
- **`SeedPhraseGrid`'s `columns` is broken on native.** `width: 100/cols%`
  inside a `flexWrap` row with a 4px gap overflows, so a 12-word phrase set to
  3 columns renders as 6 rows of 2.
- **Revealing a seed phrase makes a screen reader read the recovery words
  aloud, in order**, one accessibility stop per word. Reported as observed.
- **A transaction amount and an NFT floor price can print with no ticker** —
  `symbol` is optional and there is no fallback, so a send renders as "−0.5".
- **`WalletCard`'s copy chip fires the card's `onClick` too** on web; native
  does not, so the twins differ on the same tap.
- **`variant="elevated"` — `WalletCard`'s own default — is dropped on web.**
  The default wallet card is elevated on the phone and flat on the web.
- **`StakingCard` prints APY with a change sign** (`+4.20%`, reading as a
  movement *in* the APY) and colours it `success` unconditionally — a yield is
  a level, not a gain.
- **`PortfolioSummary` never renders the allocation numbers.** The donut is
  colour-matching only: "how much is in ETH" is answerable solely by matching a
  swatch hue to a ring segment. Its direction is also taken from the percentage
  while the money is toned from the cents, so `changePct={0}` with
  `changeCents={-500}` draws a muted `•` beside a red `−$5.00`.
- **`TxList` has no loading state**, so a feed still fetching is
  indistinguishable from a wallet with no history.
- `truncateHash(hash, 6, 4)` counts the `0x` prefix in its lead, leaving **four**
  significant leading hex digits for address verification.

## 4. `dating` — the rest

- **Every scrim inverts in dark mode.** Eight sites build a scrim over a
  **photograph** out of theme slots — `from-neutral-950` on web (the ramp
  mirrors under `[data-theme="dark"]`), `withAlpha(colors.onSurface, …)` on
  native (light in a dark theme). The bottom of every profile photo is washed
  near-**white**, taking the white text on it with it. A photo does not follow
  the scheme, so neither does its scrim: `deck-v4.ts` pins them.
- **`PhotoCarousel` has no visible next/previous control** on either twin —
  two `<button>`s with **no children**, invisible halves of the frame, and no
  focus ring on web. And `CarouselPhoto.alt` is documented, accepted, and never
  applied to the native `Image`: every profile photo on native is silent.
- **`LikePassButtons` spends four status slots on five identities** —
  `rewind → warn`, `pass → danger`, `like → success`. `danger` and `warn` mean
  something has gone wrong; passing on someone has not.
- **`MatchCelebration` cannot be dismissed.** Web's Escape handler is on a
  backdrop `<div>` with no `tabIndex` and nothing autofocuses, so the keydown
  never reaches it — no focus trap, no restore. The native backdrop is a plain
  `View`, not a `Pressable`, so on iOS with `onKeepSwiping` unset `onClose`
  never fires from the UI at all.
- **`BoostBanner`: supplying `onDismiss` silently deletes the CTA**, so
  `ctaLabel` is accepted and never rendered — the two props are mutually
  exclusive with nothing saying so. And the native CTA is wrapped in
  `pointerEvents="none"`: unpressable, still announced as a button.
- **`WhoLikedYouRow` paints the like count in `danger`** — the most positive
  number in a dating app, in the error slot.
- **`SwipeCard`'s NOPE stamp is drawn in the LIKE corner on native** —
  `left: spacing.lg` unconditionally for all three overlays, where web
  positions per overlay.
- No reduced-motion path anywhere in the module; no safe-area inset on the
  pinned action row or the full-screen celebration.

## 5. `email` — the rest

- **A hovered row is indistinguishable from the selected one.** Web resolves
  both to `bg-neutral-100`; native collapses them into
  `selected || pressed ? colors.border`. In a split-view inbox the mouse
  repaints every row it passes as "the selected one" — and `border` is a
  hairline token being used as a fill.
- **`role="button"` makes a row's children presentational**, so the preview,
  the thread count and every label chip are removed from the accessibility tree
  outright. The row's six-item `aria-label` is all a reader ever gets.
- **`ComposeBar` sends with an empty recipient.** `canSend` tests the body and
  the attachments and never tests `to`, so one character of body — or a single
  staged file — fires `onSend({ to: '', … })`.
- **`MailSwipeActions` deletes on a single tap** with no confirmation, no undo,
  and no way for a caller to express either. On native the rail is the *only*
  path to archive or delete, and it exists only behind a gesture: a
  switch-control or VoiceOver user has no route to it at all. `side="trailing"`
  also reverses the visual order without reversing tab order, on a rail whose
  last item is typically Delete.
- **`MailLabelChip`'s `soft` renders `solid` for three of six tones on web** —
  the two class maps are byte-identical for `success`, `warn` and `danger` — so
  a soft danger chip is a pale wash on the phone and a saturated red block on
  the web. And a mail label is identity: a red "Receipts" chip is
  indistinguishable from an error.
- **`ReadUnreadToggle` ships a zero-size `View` carrying a comment that claims
  an accessibility guarantee it does not provide** — the element is empty and
  explicitly hidden from assistive tech. The toggle never announces its state.
- **`AttachmentChip` hides remove while uploading**, so an in-flight upload
  cannot be cancelled — exactly the interval in which a user discovers they
  attached the wrong file.
- **`SignatureBlock` paints contact lines as links that are completely inert** —
  no `href`, no `onPress` in the type at all.
- **`FolderRow` asserts "unread"** for a prop its own doc defines as "unread /
  item count", so "Drafts, 3 unread" is wrong for every folder where it is a
  count.
- Nothing in the module is a list and no row is a list item, so a reader never
  hears "item 3 of 40".

---

## 6. What the V4 line adds

Two **pure, shared** modules — one file each, imported by both twins, the way
`calendar/layout-v4.ts` is:

- `crypto/amount-v4.ts` — `useAmountField`, `sanitizeAmountText`,
  `changeParts`. §1.1 and the "down +3.20%" bug.
- `email/thread-state-v4.ts` — `useThreadExpansion`, `canSendMail`. §1.2 and
  the empty-recipient send.
- `dating/deck-v4.ts` — `PHOTO_SCRIM`, `PHOTO_INK`, `deckPosition`,
  `canRewind`. The dark-mode scrim inversion and §1.3.

And three per-twin vocabularies: `crypto/internal/market-v4`,
`dating/internal/profile-v4`, `email/internal/mail-v4` — each correcting its
module's fill-as-ink helper and giving it one badge shape, one placeholder
ground and one comma-joined spoken line.

The rules the earlier passes set apply here unchanged:

1. Every interactive element is a real button and clears 44.
2. Press and hover are the M3 state layer. Disabled is 0.38, not a guess.
3. A fill token never inks text; an `on*` ink is only drawn on its own pair.
4. A status colour means status. A network, a mail label, a deck action, an
   interest and a token are identity — the glyph carries them.
5. A multi-part row is **one** accessible name, joined with commas, and it
   contains the numbers.
6. Nothing is carried by colour alone.
7. Money and stacked figures are tabular.
8. Empty is a real empty state; loading is skeleton rows in the shape it is
   about to be.
9. Every visible English string is a prop with today's string as its default.
