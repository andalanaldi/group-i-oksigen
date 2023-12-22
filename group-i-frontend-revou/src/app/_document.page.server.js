// app/_document.page.server.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

export default function Document({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
