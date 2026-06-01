# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@essentials/ui` is a React component library — a thin wrapper around the
**Base UI** primitives (`@base-ui/react`, the unstyled component library) —
published as an npm package. Each component must be pluggable: a consumer
imports it and passes props, nothing else. Built with Vite in library mode
(`src/index.ts` is the single public entry). React/React-DOM (peer deps),
`@base-ui/react` and `class-variance-authority` (runtime deps) are externalized
from the bundle so consumers resolve a single copy of each.

**Why the architecture is shaped this way:** the package is consumed by a
separate **Mendix** widget project. The per-component **contract is the
integration seam** — the Mendix project will write a "mendix-provider" (thin
adapters mapping Mendix datasource/attribute props into each contract) without
this package ever importing Mendix. That keeps component code publishable and
upgradable independently of the Mendix wiring. See "The provider boundary" below.

## Commands

```bash
npm run dev          # Vite playground (dev/) — manual visual check of components
npm run build        # tsc --noEmit, vite build (JS + .d.ts), then build:css → dist/styles.css
npm run build:css    # postcss src/styles/index.css → dist/styles.css (inlines @imports)
npm test             # vitest run (one-shot)
npm run test:watch   # vitest watch mode
npm run test:coverage
npm run lint         # eslint .   (lint:fix to autofix)
npm run format       # prettier --write .   (format:check to verify)
npm run typecheck    # tsc --noEmit
```

Run a single test file or name:

```bash
npx vitest run src/components/button/button.test.tsx
npx vitest run -t "does not fire onClick while disabled"
```

## Architecture: ports & adapters, one contract per component

This is the core idea of the codebase and the rule to preserve when adding code.

Each component owns a **contract** (its inbound port) — the exact data shape it
needs. Data from any external source is mapped into that contract by an
**adapter**, so _where data comes from can change without touching the
component_. Contracts are per-component on purpose: expected data differs by
component, so there is no shared "data" type.

```
external source ──(adapter: source → contract)──▶ contract ──▶ Component
```

- `Adapter<TSource, TContract>` lives in `src/core/adapter.ts` — the shared type
  for every adapter, a pure `(source) => contract` function. `bindAdapter`
  pre-binds presentation props to an adapter.
- Components consume contract data via props and stay ignorant of the source.

The visual layer (the `*.tsx` file) is the **only** place that touches Base UI.
It imports the matching primitive from `@base-ui/react/<name>`, maps the
contract onto it, and resolves `eui-*` classes via the component's CVA variants.
Base UI owns the accessible/unstyled behaviour; swapping or upgrading a primitive
happens in the `.tsx` alone, leaving the contract and adapters untouched.

### The provider boundary (Mendix integration)

Data flow is **pure adapter functions** — no context/provider abstraction in
this package. The consuming project maps its source into a contract and spreads
it. The Mendix widget (built later, in its own repo) is exactly this:

```ts
import { Button, type ButtonContract } from '@essentials/ui';
import '@essentials/ui/styles.css'; // import the stylesheet once, app-wide

const toContract = (p: MyWidgetProps): ButtonContract => ({
  label: p.caption?.value ?? '',
  disabled: p.disabledExpr?.value ?? false,
});
// <Button {...toContract(props)} variant="primary" onClick={() => props.onClick?.execute()} />
```

`adapters/*.adapter.ts` files here (`userToAvatar`, `actionToButton`) are
reference examples of the same pattern. Any tool (REST, GraphQL, Mendix) is
integrated by writing an adapter to the contract — never by changing a component.

### Variants & styling (CVA + design tokens)

- Each component's variants live in `*.variants.ts` as a single `cva()` call
  (e.g. `button.variants.ts`). This is the **single source of truth** for variant
  names; component prop types derive from `VariantProps<typeof xVariants>`, so
  adding a variant means editing one file. `*.tsx` calls
  `cn(xVariants({ ... }), className)` (`cn` = CVA's `cx`, in `src/core/cn.ts`).
- CVA emits **semantic class names** (`eui-button--primary`), not Tailwind. The
  actual CSS lives in `src/styles/` and is driven entirely by `--eui-*` design
  tokens in `tokens.css`. A consumer (Mendix theme) restyles by overriding those
  CSS variables — no Tailwind, so nothing clashes with Atlas UI.
- `src/styles/index.css` `@import`s the tokens + per-component CSS; `build:css`
  inlines it into `dist/styles.css`, exposed as `@essentials/ui/styles.css`.
  Components never import CSS in JS (keeps the JS bundle side-effect-free); the
  consumer imports the stylesheet once.

Base UI specifics worth knowing:

- `Button` (`@base-ui/react/button`) renders a native `<button>` and takes
  children plus native props. `Avatar` is compound: `Avatar.Root` /
  `Avatar.Image` / `Avatar.Fallback`.
- `Avatar.Image` only mounts once the image reports `loaded` (it preloads via
  `new Image()`), and `Avatar.Fallback` shows until then — they are mutually
  exclusive. jsdom never fires image load, so `avatar.test.tsx` stubs
  `window.Image` to resolve `onload`. Query the loaded `<img>` by `alt` and the
  fallback by its `aria-label` to avoid the duplicate `img` role.
- `Combobox` (`@base-ui/react/combobox`) is a compound, portaled popup
  (Root/InputGroup/Input/Trigger/Portal/Positioner/Popup/List/Item/Empty). Base
  UI consumes option **objects** `{ value, label }` (auto-derives display label +
  form value); the wrapper keeps a **string-based** public API (`value`,
  `onValueChange` in `option.value`) by mapping in/out, so flat sources like
  Mendix attributes plug in directly. Its floating popup needs browser APIs
  jsdom lacks — `src/test/setup.ts` shims `ResizeObserver`, `scrollIntoView`,
  pointer-capture, and `matchMedia` so it (and future popup components) mount in
  tests.
  - **Single vs multiple is one component**, not two: `ComboboxProps` is a
    discriminated union on `multiple`, so `value`/`onValueChange` are
    `string | null` (single) or `string[]` (multiple). The `.tsx` branches into
    private `SingleCombobox`/`MultipleCombobox` sharing one `OptionList`. Multiple
    mode renders selections as removable chips (`Combobox.Value` → `Chips` /
    `Chip` / `ChipRemove`, plus `Clear`). `multiple` is a behaviour/structure
    mode, **not** a CVA style variant — CVA still only owns `size`.
- `DataTable` wraps the headless **`@tanstack/react-table`** engine (the same one
  shadcn's data table uses) — _not_ a Base UI primitive, since Base UI has no
  table. shadcn/Tailwind is deliberately avoided (Tailwind preflight clashes with
  Mendix Atlas UI); we reuse only the headless engine and skin it with `eui-*`
  classes + tokens. The contract is generic `DataTableContract<TRow>` with flat
  `columns[].value` accessors (Mendix-attribute friendly); selection/pagination
  reuse the Base UI `Checkbox` and our own `Button`. Keep the public API
  string-based: `onSelectionChange` emits row **ids** (`getRowId`, default index).
  - **Features (all opt-in):** per-column sorting (always on), global search
    (`searchable` + `searchPlaceholder`), pagination (`pageSize`), row selection
    (`selectable` → `onSelectionChange`), sticky header (`stickyHeader`), infinite
    scroll (`infiniteScroll` = batch size, mutually exclusive with `pageSize`),
    empty-state message (`emptyMessage`).
  - **Numeric columns:** mark a column `numeric: true` to right-align cells and
    include it in the totals row. Add a `format: NumericFormat` to apply
    `groupDigits`, `prefix`, `suffix`, or `decimalPlaces` to both cells and totals.
    `totals: 'top' | 'bottom' | 'both'` renders a sum row over the filtered rows.
  - **Action column:** `actionColumn: DataTableActionColumn<TRow>` adds a
    non-sortable column of per-row `DataTableAction` buttons. Each action takes a
    Phosphor `Icon` and/or a `label` (icon-only, label-only, or both) and an
    `onClick(row)` handler; place it at `'start'` or `'end'` (default). Column-
    visibility and row-action **menus** are intentionally left out (they need a Menu
    primitive; put richer UI in a custom `cell` instead).
  - **Internal sub-components** (`DataTableToolbar`, `DataTableHeader`,
    `DataTableBody`, `DataTableTotalsRow`, `DataTablePagination`,
    `DataTableCheckbox`, `DataTableActionCell`) live in the same folder but are
    **not exported** — `index.ts` only surfaces the public API.

## Per-component file layout

A component is a folder under `src/components/<name>/` (kebab-case folder,
PascalCase component). Follow the existing `button/` and `avatar/` examples for
simple components, or `data-table/` for complex ones that decompose into internal
sub-components:

```
<name>/
  <name>.tsx           # component — wraps the Base UI primitive, consumes the contract
  <name>.contract.ts   # the data contract (inbound port); data props only
  <name>.variants.ts   # cva() variant definition + VariantProps type (source of truth)
  <name>.types.ts      # ComponentProps = contract + VariantProps + behaviour
  <name>.test.tsx      # Vitest + Testing Library (+ <name>.variants.test.ts)
  <name>-*.tsx         # optional internal sub-components (not exported via index.ts)
  adapters/            # optional — *.adapter.ts mapping a source shape → contract
  index.ts             # barrel: export component + variants + contract/props/adapter
```

Keep the **data contract separate from presentation props**: `*.contract.ts`
holds only what data the component needs; variants come from `*.variants.ts` and
`onClick`/`className` live in `*.types.ts`, where
`ComponentProps extends Contract, VariantProps`. Styles for the variant classes
go in `src/styles/<name>.css` (tokens only) and are `@import`ed by
`src/styles/index.css`.

When adding a component, also re-export its barrel from `src/index.ts` — that is
the package's public surface.

## Conventions

- File names: **kebab-case**. Component (and exported type) names: **PascalCase**.
- `@/*` path alias maps to `src/*` (configured in both `tsconfig.json` and
  `vite.config.ts`). `dev/` is the playground and is excluded from the library build.
- TypeScript is strict with `verbatimModuleSyntax` + `consistent-type-imports`:
  import types with `import type` / inline `type` (ESLint enforces this).
- ESLint flat config (`eslint.config.js`); Prettier owns formatting (single
  quotes, trailing commas, width 100).
