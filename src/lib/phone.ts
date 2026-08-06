// Converts a local UAE number like "04 576 6874" to E.164 "+97145766874".
export function toUaePhone(value: string): string {
  const digits = value.replace(/\D/g, "").replace(/^0+/, "");
  return `+971${digits}`;
}
