/**
 * Join BEM class names, skipping falsy values.
 * cn("card", isActive && "card--active", className)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tiny BEM helper.
 * const b = bem("project-card");
 * b() => "project-card"; b("title") => "project-card__title";
 * b("title", { large: true }) => "project-card__title project-card__title--large"
 */
export function bem(block: string) {
  return (element?: string, modifiers: Record<string, boolean | undefined> = {}) => {
    const base = element ? `${block}__${element}` : block;
    const mods = Object.entries(modifiers)
      .filter(([, on]) => on)
      .map(([mod]) => `${base}--${mod}`);
    return [base, ...mods].join(" ");
  };
}
