Pages images organization

- `images/global/` — site-wide assets (icons, logos, patterns)
- `images/hero/` — hero-specific imagery (large hero backgrounds)
- `images/services/` — service-related imagery
- `images/pages/home/` — images used only on the Home page
- `images/pages/about/` — images used only on the About page
- `images/pages/portfolio/` — portfolio images
- `images/pages/shop/` — product/shop images

Guidelines:
- Put page-specific images under `images/pages/<page>/`.
- Use `images/global/` for shared icons and brand assets.
- Update templates to reference the new paths via `{% static %}` as needed.
