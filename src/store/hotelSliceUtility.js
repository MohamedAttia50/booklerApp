export function getStarIcons(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return [
    ...Array(full).fill("full"),
    ...Array(half).fill("half"),
    ...Array(empty).fill("empty"),
  ];
}