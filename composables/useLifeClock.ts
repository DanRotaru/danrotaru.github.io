/**
 * Life clock for the "days" cards: everything is derived from my birth date.
 *
 * The site is statically generated, so `now` starts as the build/SSR time
 * (shared with the client through useState, so hydration matches) and is
 * refreshed to the visitor's real time after mount.
 */
import { LIFE_BIRTH } from "@/lib/birth";

export { LIFE_BIRTH };

const DAY = 86_400_000;
const BORN = Date.UTC(LIFE_BIRTH.year, LIFE_BIRTH.month - 1, LIFE_BIRTH.day);
/** Days in 100 years from birth (2000-03-13 → 2100-03-13). */
const LIFE_TOTAL_DAYS = Math.round((Date.UTC(LIFE_BIRTH.year + 100, LIFE_BIRTH.month - 1, LIFE_BIRTH.day) - BORN) / DAY);

/** Midnight UTC of the (UTC) calendar day containing `t`; UTC keeps server and client in agreement. */
const dayStart = (t: number) => Math.floor(t / DAY) * DAY;

export function useLifeClock() {
  const now = useState("life-clock-now", () => Date.now());

  onMounted(() => {
    now.value = Date.now();
  });

  const today = computed(() => dayStart(now.value));
  const daysLived = computed(() => Math.max(0, Math.round((today.value - BORN) / DAY)));

  const lastBirthday = computed(() => {
    const y = new Date(today.value).getUTCFullYear();
    const thisYear = Date.UTC(y, LIFE_BIRTH.month - 1, LIFE_BIRTH.day);
    return thisYear <= today.value ? thisYear : Date.UTC(y - 1, LIFE_BIRTH.month - 1, LIFE_BIRTH.day);
  });
  const nextBirthday = computed(() => {
    const last = new Date(lastBirthday.value);
    return Date.UTC(last.getUTCFullYear() + 1, LIFE_BIRTH.month - 1, LIFE_BIRTH.day);
  });

  const age = computed(() => new Date(lastBirthday.value).getUTCFullYear() - LIFE_BIRTH.year);
  const daysToBirthday = computed(() => Math.round((nextBirthday.value - today.value) / DAY));
  const yearProgress = computed(
    () => (today.value - lastBirthday.value) / (nextBirthday.value - lastBirthday.value),
  );
  const lifeShare = computed(() => daysLived.value / LIFE_TOTAL_DAYS);

  return { now, daysLived, age, daysToBirthday, yearProgress, lifeShare, totalDays: LIFE_TOTAL_DAYS };
}
