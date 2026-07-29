/**
 * Share & Export Helpers using base64 URL encoding
 */

export function encodeStateToHash(html: string, css: string): string {
  try {
    const payload = JSON.stringify({ h: html, c: css });
    const encoded = btoa(encodeURIComponent(payload));
    return '#' + encoded;
  } catch {
    return '';
  }
}

export function decodeHashToState(): { html: string; css: string } | null {
  try {
    const hash = window.location.hash.substring(1);
    if (!hash) return null;
    const jsonStr = decodeURIComponent(atob(hash));
    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed.h === 'string' && typeof parsed.c === 'string') {
      return { html: parsed.h, css: parsed.c };
    }
  } catch (err) {
    console.warn('Could not parse hash state:', err);
  }
  return null;
}

export function downloadFile(filename: string, content: string, contentType: string = 'text/html') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
