import type { Adapter } from '@/core';
import type { ButtonContract } from '../button.contract';

/**
 * Example source shape: a generic "UI action" coming from a CMS, a config
 * service, or a domain command. Real projects import their own type here — the
 * adapter is the seam that lets the source shape change without the Button ever
 * knowing. A future Mendix provider writes its own `mendix*ToButtonContract`
 * adapter the same way.
 */
export interface UiAction {
  text: string;
  enabled?: boolean;
}

/** Map a {@link UiAction} source into the Button contract. */
export const actionToButton: Adapter<UiAction, ButtonContract> = (action) => ({
  label: action.text,
  disabled: action.enabled === false,
});
