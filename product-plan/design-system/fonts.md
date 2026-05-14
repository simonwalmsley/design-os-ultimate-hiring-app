# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** Inter
- **Body text:** Inter
- **Code/technical:** JetBrains Mono

## Notes

- The components apply Inter implicitly (it is expected to be the app-level default sans font).
- JetBrains Mono is applied explicitly via inline style wherever numerics appear - KPI values, scores, phase numbers, counts, ranks, percentages. Look for `style={{ fontFamily: "'JetBrains Mono', monospace" }}` in the components and make sure the font is loaded so those render correctly.
