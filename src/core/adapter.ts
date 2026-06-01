/**
 * Ports & adapters core primitive.
 *
 * A component declares a *contract* (its inbound port) — the exact shape of data
 * it needs to render. An `Adapter` is the seam that maps data from some external
 * source shape (`TSource`) into that contract (`TContract`). Swapping where data
 * comes from means swapping the adapter, never touching the component.
 *
 * @example
 * const fromUser: Adapter<User, AvatarContract> = (user) => ({
 *   name: user.fullName,
 *   imageUrl: user.photo,
 * });
 * <Avatar {...fromUser(user)} />
 */
export type Adapter<TSource, TContract> = (source: TSource) => TContract;

/**
 * Compose an adapter with a partial set of presentational props, producing a
 * single function from source data to ready-to-spread component props. Useful
 * when a call site always pairs the same adapter with the same styling props.
 */
export function bindAdapter<TSource, TContract, TExtra extends object = object>(
  adapter: Adapter<TSource, TContract>,
  extra?: TExtra,
): (source: TSource) => TContract & TExtra {
  return (source) => ({ ...adapter(source), ...(extra ?? ({} as TExtra)) });
}
