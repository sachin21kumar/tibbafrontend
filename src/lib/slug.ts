const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(value: string): string {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Location names follow "Tibba Restaurant for Mandi & Madhbi - <Area>" —
// pull out just the area, e.g. "Tibba Restaurant for Mandi & Madhbi - Al
// Qusais" -> "Al Qusais".
function locationAreaSuffix(name: string): string {
  return (name.split("-").pop() ?? name).trim();
}

// Makes slugify(name) produce a long URL, so use just the area suffix
// instead, e.g. "Tibba Restaurant for Mandi & Madhbi - Al Qusais" ->
// "tibba-al-qusais".
export function locationSlug(name: string): string {
  return `tibba-${slugify(locationAreaSuffix(name))}`;
}

// Short display name for the same area suffix, e.g. "Tibba Restaurant - Al
// Qusais".
export function locationDisplayName(name: string): string {
  return `Tibba Restaurant - ${locationAreaSuffix(name)}`;
}
