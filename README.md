# essentials-ui

A React wrapper around the [Base UI](https://base-ui.com) primitives
(`@base-ui/react`), published as an npm package (`@essentials/ui`). Each
component is **pluggable**: one import, pass the props. Variants are styled with
[CVA](https://cva.style) against design tokens; consumed source-agnostically via
per-component contracts (built for a separate Mendix widget project).

```tsx
import { Button, Avatar, userToAvatar } from '@essentials/ui';
import '@essentials/ui/styles.css'; // once, app-wide

<Button label="Save" variant="primary" size="md" onClick={save} />;
<Avatar {...userToAvatar(currentUser)} size="md" />;
```

## Architecture: per-component contracts (ports & adapters)

Every component owns a **contract** — the inbound port describing exactly the
data it needs. Data from any source (API DTO, domain entity, CMS) is mapped into
that contract by an **adapter**, so where the data comes from can change without
touching the component.

```
external source ──(adapter)──▶ component contract ──▶ Component
   User, DTO, …                  ButtonContract           <Button />
```

- **Contract** (`*.contract.ts`) — the data port. One per component, since each
  component's expected data differs.
- **Adapter** (`adapters/*.adapter.ts`) — pure `(source) => contract` mapping.
- **Component** (`*.tsx`) — wraps the Base UI primitive and consumes the contract.
  This is the only layer that imports `@base-ui/react`.

The contract is also the **integration seam for Mendix**: the Mendix widget
writes an adapter from its datasource/attribute props to the contract and spreads
it — this package never imports Mendix.

```ts
const toContract = (p: MyWidgetProps): ButtonContract => ({
  label: p.caption?.value ?? '',
  disabled: p.disabledExpr?.value ?? false,
});
// <Button {...toContract(props)} onClick={() => props.onClick?.execute()} />
```

## Variants & theming

Variants live in `*.variants.ts` (CVA) and emit semantic classes; styling is
plain CSS in `src/styles/` driven by `--eui-*` design tokens. Override those CSS
variables to theme — no Tailwind. Import the compiled stylesheet once:
`import '@essentials/ui/styles.css'`.

## Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Vite playground (`dev/`) for eyeballing components |
| `npm run build`      | Build the library + `dist/styles.css`              |
| `npm test`           | Run the Vitest suite once                          |
| `npm run test:watch` | Vitest in watch mode                               |
| `npm run lint`       | ESLint                                             |
| `npm run format`     | Prettier write                                     |

## Conventions

- Files: **kebab-case**. Components: **PascalCase**.
- Stack: React + TypeScript + Vite, tested with Vitest. Variants via CVA.
