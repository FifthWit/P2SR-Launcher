import { clsx } from "clsx";
import { cubicOut } from "svelte/easing";
import { derived, get, writable } from "svelte/store";
import { twMerge } from "tailwind-merge";
import { persisted } from "svelte-persisted-store";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isBrowser = typeof document !== "undefined";

export function slugFromPath(path) {
  return path.replace("/src/content/", "").replace(".md", "");
}

export function hexToHsl(hex) {
  if (hex) {
    const sanitizedHex = hex.replace("#", "");

    const red = Number.parseInt(sanitizedHex.substring(0, 2), 16);
    const green = Number.parseInt(sanitizedHex.substring(2, 4), 16);
    const blue = Number.parseInt(sanitizedHex.substring(4, 6), 16);

    const normalizedRed = red / 255;
    const normalizedGreen = green / 255;
    const normalizedBlue = blue / 255;

    const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
    const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

    let hue, saturation, lightness;

    if (max === min) {
      hue = 0;
    } else if (max === normalizedRed) {
      hue = ((normalizedGreen - normalizedBlue) / (max - min)) % 6;
    } else if (max === normalizedGreen) {
      hue = (normalizedBlue - normalizedRed) / (max - min) + 2;
    } else {
      hue = (normalizedRed - normalizedGreen) / (max - min) + 4;
    }

    hue = Math.round(hue * 60);

    if (hue < 0) {
      hue += 360;
    }

    lightness = (max + min) / 2;

    if (max === min) {
      saturation = 0;
    } else if (lightness <= 0.5) {
      saturation = (max - min) / (max + min);
    } else {
      saturation = (max - min) / (2 - max - min);
    }

    saturation = Math.round(saturation * 100);
    lightness = Math.round(lightness * 100);

    return [hue, saturation, lightness];
  }
  return [0, 0, 0];
}

export function hexToRgb(hex) {
  if (hex) {
    const sanitizedHex = hex.replace("#", "");

    const red = Number.parseInt(sanitizedHex.substring(0, 2), 16);
    const green = Number.parseInt(sanitizedHex.substring(2, 4), 16);
    const blue = Number.parseInt(sanitizedHex.substring(4, 6), 16);

    return [red, green, blue];
  }
  return [0, 0, 0];
}

export function createCopyCodeButton() {
  const codeString = writable("");
  const copied = writable(false);
  let copyTimeout = 0;

  function copyCode() {
    if (!isBrowser) return;
    navigator.clipboard.writeText(get(codeString));
    copied.set(true);
    clearTimeout(copyTimeout);
    copyTimeout = window.setTimeout(() => {
      copied.set(false);
    }, 2500);
  }

  function setCodeString(node) {
    codeString.set(node.innerText.trim() ?? "");
  }

  return {
    copied,
    copyCode,
    setCodeString,
    codeString,
  };
}

export function updateTheme(activeTheme, path) {
  if (!isBrowser) return;
  document.body.classList.forEach((className) => {
    if (className.match(/^theme.*/)) {
      document.body.classList.remove(className);
    }
  });

  const theme = path === "/themes" ? activeTheme : null;
  if (theme) {
    return document.body.classList.add(`theme-${theme}`);
  }
}

export function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === undefined) return str;
    return `${str}${key}:${style[key]};`;
  }, "");
}

export function flyAndScale(
  node,
  params = { y: -8, x: 0, start: 0.95, duration: 150 }
) {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
}

function findMatch(slug, modules) {
  let match = {};

  for (const [path, resolver] of Object.entries(modules)) {
    if (slugFromPath(path) === slug) {
      match = { path, resolver };
      break;
    }
  }
  if (!match.path) {
    match = getIndexDocIfExists(slug, modules);
  }

  return match;
}

function getIndexDocIfExists(slug, modules) {
  let match = {};

  for (const [path, resolver] of Object.entries(modules)) {
    if (path.includes(`/${slug}/index.md`)) {
      match = { path, resolver };
      break;
    }
  }

  return match;
}

export async function getDoc(slug) {
  const modules = import.meta.glob(`/src/content/**/*.md`);
  const match = findMatch(slug, modules);
  const doc = await match?.resolver?.();

  return {
    component: doc.default,
    metadata: doc.metadata,
    title: doc.metadata.title,
  };
}

export function slugFromPathname(pathname) {
  return pathname.split("/").pop() ?? "";
}

const liftMode = persisted("lift-mode", []);

export function getLiftMode(name) {
  function toggleLiftMode(name) {
    liftMode.update((prev) => {
      return prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
    });
  }

  const isLiftMode = derived(liftMode, ($configStore) =>
    $configStore.includes(name)
  );

  return {
    isLiftMode,
    toggleLiftMode,
  };
}

export const packageManagers = ["pnpm", "bun", "yarn", "npm"];
export const selectedPackageManager = persisted("package-manager", "npm");

const packageManagerToScriptCmd = {
  npm: "npx",
  yarn: "yarn dlx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

export function getPackageManagerScriptCmd(pm) {
  return packageManagerToScriptCmd[pm];
}

const packageManagerToInstallCmd = {
  npm: "install",
  yarn: "add",
  pnpm: "add",
  bun: "add",
};

export function getPackageManagerInstallCmd(pm) {
  return packageManagerToInstallCmd[pm];
}

export function isPackageManager(value) {
  return packageManagers.includes(value);
}
