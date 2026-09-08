/**
 * Runs before hydration so the correct theme is painted on the first frame.
 * Without this you get a white flash on every navigation in dark mode.
 */
export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem("theme");var d=s?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",d);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
