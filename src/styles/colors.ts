export const colors = {
  // Status
  error: "var(--color-error)",

  // Primary
  primary50: "var(--color-primary-50)",
  primary100: "var(--color-primary-100)",
  primary200: "var(--color-primary-200)",
  primary300: "var(--color-primary-300)",
  primary400: "var(--color-primary-400)",
  primary500: "var(--color-primary-500)",
  primary600: "var(--color-primary-600)",
  primary700: "var(--color-primary-700)",

  // Accent
  orange500: "var(--color-orange-500)",
  pink500: "var(--color-pink-500)",
  blue500: "var(--color-blue-500)",

  // Grayscale
  white: "var(--color-white)",
  gray100: "var(--color-gray-100)",
  gray200: "var(--color-gray-200)",
  gray300: "var(--color-gray-300)",
  gray400: "var(--color-gray-400)",
  gray500: "var(--color-gray-500)",
  gray600: "var(--color-gray-600)",
  gray700: "var(--color-gray-700)",
  gray800: "var(--color-gray-800)",
  gray900: "var(--color-gray-900)",
  black: "var(--color-black)",
} as const;

export type ColorKey = keyof typeof colors;
