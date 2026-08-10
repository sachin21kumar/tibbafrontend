const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

// The API returns `name` translated to whatever locale was requested via
// the x-locale header, but always includes the full `translations` map
// alongside it. Slugs must stay identical across languages, so always
// derive them from the English name — regardless of which locale the
// location object itself was fetched with.
export function canonicalLocationName(location: {
  name: string;
  translations?: { en?: { name?: string } };
}): string {
  return location?.translations?.en?.name || location?.name;
}

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
