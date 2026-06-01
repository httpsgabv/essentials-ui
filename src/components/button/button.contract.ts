/**
 * Button data contract (inbound port).
 *
 * The minimal data the Button needs to render. Anything that varies by *source*
 * (a CMS, a feature flag, a domain entity) is mapped into this shape by an
 * adapter — see {@link Adapter}. Presentation/behaviour props live in
 * `button.types.ts`, kept separate from the data contract on purpose.
 */
export interface ButtonContract {
  /** Visible text of the button. */
  label: string;
  /** When true, the button is non-interactive. */
  disabled?: boolean;
}
