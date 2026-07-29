/**
 * Simple client-side HTML and CSS code formatting helper
 */

export function formatHTML(html: string): string {
  let indent = 0;
  const lines = html
    .replace(/>\s*</g, '>\n<')
    .trim()
    .split('\n');

  return lines
    .map((line) => {
      line = line.trim();
      if (!line) return '';

      // Check closing tag
      if (line.match(/^<\//) || line.match(/^-->/)) {
        indent = Math.max(0, indent - 1);
      }

      const padding = '  '.repeat(indent);
      
      // Check opening tag that isn't self-closing
      if (
        line.match(/^<[^\/]/) &&
        !line.match(/\/>$/) &&
        !line.match(/<meta|<link|<img|<input|<br|<hr/)
      ) {
        indent++;
      }

      return padding + line;
    })
    .filter(Boolean)
    .join('\n');
}

export function formatCSS(css: string): string {
  let formatted = css
    .replace(/\s*\{\s*/g, ' {\n  ')
    .replace(/\s*;\s*/g, ';\n  ')
    .replace(/\s*\}\s*/g, '\n}\n\n')
    .replace(/  \}/g, '}');

  // Fix indentation inside braces
  const lines = formatted.split('\n');
  let inRule = false;

  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.includes('{')) {
        inRule = true;
        return trimmed;
      }
      if (trimmed === '}') {
        inRule = false;
        return '}';
      }
      return inRule ? '  ' + trimmed : trimmed;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function generateStandaloneHTML(html: string, css: string, title: string = 'CSS Art'): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0f172a;
      font-family: system-ui, -apple-system, sans-serif;
    }

${css
  .split('\n')
  .map((line) => '    ' + line)
  .join('\n')}
  </style>
</head>
<body>

${html
  .split('\n')
  .map((line) => '  ' + line)
  .join('\n')}

</body>
</html>`;
}
