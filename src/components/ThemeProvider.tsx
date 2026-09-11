import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Wraps the app in next-themes, which toggles the `dark` class on <html>.
 * The matching palettes live in src/index.css (`:root` and `.dark`).
 *
 * `storageKey` must stay in sync with the inline no-flash script in index.html.
 */
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    storageKey="portfolio-theme"
    disableTransitionOnChange={false}
    {...props}
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
