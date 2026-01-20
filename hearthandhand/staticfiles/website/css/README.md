# CSS Organization Guide

## Structure Overview

Your CSS is organized into logical modules for maintainability and scalability:

```
static/website/css/
├── variables.css          # CSS custom properties (colors, spacing, etc.)
├── base.css              # Global reset and base styles
├── layout.css            # Flexbox, grid, spacing utilities
├── components.css        # Reusable component styles (header, footer, cards)
├── colors.css            # Color utilities and button variations
└── pages/
    ├── home.css          # Home page specific styles
    ├── services.css      # Services page styles
    ├── portfolio.css     # Portfolio page styles
    └── consultation.css  # Consultation form page styles
```

## File Descriptions

### `variables.css`
Contains all CSS custom properties (CSS variables) for:
 - **Header height**: `--header-height` controls the sticky header height for layout alignment and hero overlay; adjust this to match header sizing.
 - **Navigation**: The header includes a right-side CTA `Request Consultation` (class `nav-cta`) and is sticky by default. Mobile will hide the CTA and nav links until a mobile nav is added.
 - **Hero overlay**: The hero has a dark overlay using `.hero::before` to improve text contrast. The hero background uses `url('/static/website/images/image.png')` and a gradient overlay for a gentle fade. Adjust `--primary-1-rgb`, `--bg-light-rgb` or overlay opacity in `components.css` to tweak.

**Update these with Denise's exact hex codes!**

### `base.css`
Global styles including:
- CSS reset (`box-sizing`)
- Body typography and defaults
- Container max-width and padding

### `layout.css`
Reusable layout utilities:
- **Flexbox utilities**: `.flex`, `.flex-column`, `.flex-center`, `.flex-between`, `.gap-1` through `.gap-4`
- **Grid system**: `.grid`, `.grid-2`, `.grid-3`, `.grid-4` with responsive breakpoints
- **Spacing utilities**: Margin and padding classes (`.m-1` through `.m-4`, `.mt-1`, `.mb-2`, etc.)
- **Text alignment**: `.text-center`, `.text-left`, `.text-right`
- **Display utilities**: `.block`, `.inline-block`, `.hidden`, responsive `.hide-mobile`, `.show-mobile`
- **Width utilities**: `.w-full`, `.w-half`, `.max-w-container`
- **Text utilities**: `.truncate`, `.line-clamp-2`

### `components.css`
Reusable component styles:
- **Header**: Navigation styling with hover effects
- **Footer**: Footer layout and typography
- **Service Cards**: Hover effects, shadows, transitions
- **Hero Section**: Gradient backgrounds, responsive typography
- **General Content**: Main content wrapper styling

### `colors.css`
Color and button utilities:
- **Text color classes**: `.text-primary`, `.text-secondary`, `.text-muted`, etc.
- **Background color classes**: `.bg-primary`, `.bg-secondary`, `.bg-light`, etc.
- **Button styles**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Button sizes**: `.btn-large`, `.btn-small`

### Page-Specific Styles (`pages/`)

#### `home.css`
- Hero section with gradient
- About section typography
- Featured services grid
- CTA section styling

#### `services.css`
- Services header with background
- Service grid layout
- Service item cards with hover effects
- Category tags
- Responsive grid adjustments

#### `portfolio.css`
- Portfolio header
- Portfolio grid with responsive columns
- Portfolio items with image and info sections
- Filter/tab buttons
- Image hover zoom effects

#### `consultation.css`
- Consultation header
- Form container and styling
- Form groups and labels
- Input, textarea, select styling with focus states
- Checkbox and radio styling
- Form validation states
- Two-column form layout (responsive)
- Button styling
- Help text and error messages
- Success message styling
- Additional info section

## How to Use

### In Base Template (`base.html`)
All pages automatically include:
```html
<link rel="stylesheet" href="{% static 'website/css/variables.css' %}">
<link rel="stylesheet" href="{% static 'website/css/base.css' %}">
<link rel="stylesheet" href="{% static 'website/css/layout.css' %}">
<link rel="stylesheet" href="{% static 'website/css/components.css' %}">
```

### Page-Specific Styles
Each page adds its own CSS via the `{% block extra_css %}` block:
```html
{% block extra_css %}
<link rel="stylesheet" href="{% static 'website/css/pages/home.css' %}">
{% endblock %}
```

## Responsive Breakpoints

- **Desktop**: 769px and above
- **Tablet**: 481px to 768px
- **Mobile**: 480px and below

Key breakpoints used:
- `@media (max-width: 768px)` - Tablet and mobile
- `@media (max-width: 480px)` - Mobile only
- `@media (min-width: 769px)` - Desktop only

## Utility Classes

### Spacing
```html
<!-- Margin -->
<div class="m-1">8px margin all sides</div>
<div class="mt-2">16px margin top</div>
<div class="mb-3">24px margin bottom</div>

<!-- Padding -->
<div class="p-2">16px padding all sides</div>
<div class="px-2">16px padding left/right</div>
```

### Flexbox
```html
<!-- Flex containers -->
<div class="flex">Standard flex</div>
<div class="flex-column">Column direction</div>
<div class="flex-center">Center all</div>
<div class="flex-between">Space between</div>
```

### Grid
```html
<!-- Grid systems -->
<div class="grid grid-2">2 columns (responsive)</div>
<div class="grid grid-3">3 columns (responsive)</div>
<div class="grid grid-4">4 columns (responsive)</div>
```

## Color Customization

To update colors, edit `/static/website/css/variables.css` (the file includes canonical names and backwards-compatible aliases):

```css
:root {
  --primary-1: #YOUR_PRIMARY_COLOR;   /* main brand color */
  --primary-2: #YOUR_PRIMARY_SECONDARY; /* lighter/darker variant */
  --secondary-1: #YOUR_SECONDARY_COLOR; /* complementary accent (terracotta) */
  --secondary-2: #YOUR_SECONDARY_DARK; /* depth/darker variant */
  --accent-gold: #YOUR_TERTIARY_COLOR; /* gold/mustard highlights */
  /* Aliases maintained for legacy code. You can update these too, or leave them mapped */
  --accent-1: var(--primary-1);
  --accent-2: var(--secondary-1);
  --accent-3: var(--accent-gold);
  --text: #YOUR_TEXT_COLOR;
  --muted: #YOUR_MUTED_COLOR;
  --bg: #YOUR_BG_COLOR;
}
```

All components will automatically update since they use CSS variables.

## Adding New Pages

1. Create a new HTML template in `templates/website/`
2. Create a corresponding CSS file in `static/website/css/pages/`
3. Add page-specific styles to the new CSS file
4. Link it in your template via `{% block extra_css %}`

## Best Practices

1. **Use CSS variables** for colors and consistent values
2. **Use utility classes** for common spacing and layout
3. **Keep component styles** in `components.css`
4. **Keep page styles** in respective `pages/` files
5. **Use semantic class names** (`.service-card` not `.box-1`)
6. **Mobile-first approach** - start with mobile styles, then add media queries
7. **Maintain consistency** - use existing spacing scale and colors

## Notes

- All colors reference CSS variables from `variables.css`
- Hover states use `var(--accent-2)` for consistency
- Transitions are set to `0.3s ease` globally
- Box shadows follow a consistent pattern for depth
- Border radius is consistently `4px` or `8px`
