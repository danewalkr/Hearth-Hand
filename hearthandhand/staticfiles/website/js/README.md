JS organization

- `js/components/` — reusable UI components (menu, modals, sliders)
- `js/pages/` — page-specific code (home, services, shop)
- `js/main.js` — entrypoint that imports components/pages (loaded as `type="module"`)

Guidelines:
- Export an `init` function from components/pages and call it from `main.js`.
- Keep components small and single-responsibility.
- Prefer query guards: modules should early-return if expected DOM elements are missing.
