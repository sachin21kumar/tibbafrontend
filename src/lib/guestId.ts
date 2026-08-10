import Cookies from "js-cookie";

const GUEST_ID_COOKIE = "guestCartId";

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Identifies this browser to the backend so each visitor gets their own
// cart instead of sharing one per restaurant location.
export function getGuestId(): string {
  if (typeof window === "undefined") return "";

  const existing = Cookies.get(GUEST_ID_COOKIE);
  if (existing) return existing;

  const id = generateId();
  Cookies.set(GUEST_ID_COOKIE, id, { expires: 365 });
  return id;
}
