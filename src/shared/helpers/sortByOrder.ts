export function sortByOrder<T extends Record<string, any>, K extends keyof T>(
  items: T[],
  order: T[K][],
  key: K
): T[] {
  const orderMap = order.reduce<Record<T[K], number>>((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {} as Record<T[K], number>);

  return items.toSorted((a, b) => (orderMap[a[key]] ?? Infinity) - (orderMap[b[key]] ?? Infinity));
}
