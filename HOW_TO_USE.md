# Hearth&Hand Website - How To Use

A comprehensive guide to building and maintaining the Hearth&Hand Django website.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Django Setup](#django-setup)
4. [CSS Architecture](#css-architecture)
5. [JavaScript Functionality](#javascript-functionality)
6. [Templates & Components](#templates--components)
7. [Color System](#color-system)
8. [Adding New Pages](#adding-new-pages)
9. [Mobile Responsive Design](#mobile-responsive-design)
10. [Common Tasks](#common-tasks)

---

## Project Overview

**Hearth&Hand** is a Django-based business website for a Charleston concierge services company. The site features:
- Responsive design with dark forest green and warm terracotta color scheme
- Service showcase with interactive modal functionality
- Smooth mobile navigation with hamburger menu
- Full-width gradient backgrounds for sections
- Google Fonts (Be Vietnam Pro, Alex Brush)

**Tech Stack:**
- Backend: Django
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Database: SQLite (default Django)
- Package Manager: pip (Python)

---

## Project Structure

```
heartandhand/
├── heartandhand/              # Main Django project folder
│   ├── settings.py            # Django configuration
│   ├── urls.py               # Main URL router
│   ├── wsgi.py               # WSGI config
│   ├── asgi.py               # ASGI config
│   └── manage.py             # Django management script
│
├── website/                   # Main Django app
│   ├── views.py              # View functions for pages
│   ├── urls.py               # App-specific URL routes
│   ├── models.py             # Database models (currently empty)
│   ├── admin.py              # Django admin config
│   ├── forms.py              # Django forms (if needed)
│   │
│   ├── static/website/       # Static assets
│   │   ├── css/
│   │   │   ├── variables.css        # CSS custom properties
│   │   │   ├── base.css             # Global reset & baseline
│   │   │   ├── layout.css           # Flexbox & grid utilities
│   │   │   ├── components.css       # Reusable UI components
│   │   │   ├── buttons.css          # Button styles
│   │   │   ├── colors.css           # Color utilities
│   │   │   └── pages/
│   │   │       └── home.css         # Home page specific styles
│   │   │
│   │   ├── js/
│   │   │   └── main.js              # Mobile menu + service modal logic
│   │   │
│   │   └── images/                  # Static images
│   │
│   └── templates/website/   # HTML templates
│       ├── base.html                # Master template (all pages extend)
│       ├── home.html                # Home/landing page
│       ├── portfolio.html           # Portfolio page
│       ├── shop.html                # Shop page
│       ├── about.html               # About page
│       ├── services.html            # Services page
│       ├── consultation.html        # Consultation/contact page
│       └── components/
│           ├── header.html          # Navigation bar
│           ├── footer.html          # Site footer
│           ├── hero.html            # Hero section component
│           ├── service_card.html    # Service card component
│           └── ...                  # Other shared components
```

---

## Django Setup

### Running the Development Server

```bash
# Navigate to project directory
cd c:\Users\Dane\Desktop\Website\Hearth&Hand\heartandhand

# Activate virtual environment (if using)
.\.venv\Scripts\activate

# Run development server
python manage.py runserver

# Visit http://localhost:8000 in your browser
```

### Creating a New Page

1. **Add a view in `website/views.py`:**
   ```python
   def new_page(request):
       return render(request, 'website/new_page.html')
   ```

2. **Add a URL route in `website/urls.py`:**
   ```python
   urlpatterns = [
       # ... existing routes
       path('new-page/', views.new_page, name='new-page'),
   ]
   ```

3. **Create the template in `website/templates/website/new_page.html`:**
   ```html
   {% extends "website/base.html" %}
   {% load static %}

   {% block title %}New Page - Hearth&Hand{% endblock %}

   {% block extra_css %}
   <link rel="stylesheet" href="{% static 'website/css/pages/new_page.css' %}">
   {% endblock %}

   {% block content %}
   <!-- Your page content here -->
   {% endblock %}
   ```

### Database & Admin

- Database: `heartandhand/db.sqlite3` (SQLite)
- Admin interface: http://localhost:8000/admin
- Models currently not in use (add to `website/models.py` if needed)
- Run migrations: `python manage.py makemigrations && python manage.py migrate`

---

## CSS Architecture

### File Organization

The CSS is organized in layers for maintainability:

- **variables.css** - Global CSS custom properties (colors, spacing, fonts)
- **base.css** - HTML reset, body defaults
- **layout.css** - Flexbox & grid utilities, spacing helpers
- **components.css** - Header, footer, buttons, cards
- **buttons.css** - Button-specific styles
- **colors.css** - Color utility classes
- **pages/\*.css** - Page-specific overrides

### Key CSS Custom Properties (from variables.css)

#### Colors
```css
--primary-1: #39442a;        /* Deep forest green */
--secondary-1: #8b3b29;      /* Warm brown/terracotta */
--accent-3: #bc9c22;         /* Gold accent */

--text-dark: #2a2a2a;
--text-on-dark: #f5f4ef;     /* Light text on dark backgrounds */
--bg-light: #ebe7db;         /* Cream/beige background */
--bg-white: #fdfcf9;         /* Softened white for cards */
```

#### Green Gradient (Services Section)
```css
--services-green-dark: #1a2415;   /* Ultra-deep forest */
--services-green-mid: #2d3d27;    /* Darker forest */
--services-green-light: #3d5239;  /* Deep olive */
```

#### Terracotta Gradient (CTA Section)
```css
--cta-terra-light: #a0512d;    /* Warm terracotta */
--cta-terra-mid: #8b3b29;      /* Deeper terracotta */
--cta-terra-dark: #6b2817;     /* Deep clay tone */
```

#### Spacing Scale
```css
--space-1: 8px;
--space-2: 12px;
--space-3: 20px;
--space-4: 28px;
--space-5: 40px;
--space-6: 64px;
```

### Layout Utilities

From `layout.css`, you have these pre-made classes:

```html
<!-- Flexbox Utilities -->
<div class="flex">            <!-- display: flex -->
<div class="flex-column">     <!-- flex with column -->
<div class="flex-center">     <!-- centered flex -->
<div class="flex-between">    <!-- space-between -->

<!-- Gap Utilities -->
<div class="gap-1">           <!-- gap: 8px -->
<div class="gap-2">           <!-- gap: 16px -->

<!-- Grid System -->
<div class="grid grid-2">     <!-- 2-column responsive grid -->
<div class="grid-3">          <!-- 3-column responsive grid -->

<!-- Margin Utilities -->
<div class="mt-4">            <!-- margin-top: 32px -->
<div class="mb-2">            <!-- margin-bottom: 16px -->
<div class="mx-auto">         <!-- centered horizontally -->

<!-- Padding Utilities -->
<div class="p-3">             <!-- padding: 20px -->
```

### Adding Page-Specific Styles

1. Create `website/static/website/css/pages/your_page.css`
2. Link in template:
   ```html
   {% block extra_css %}
   <link rel="stylesheet" href="{% static 'website/css/pages/your_page.css' %}">
   {% endblock %}
   ```
3. Styles are loaded after global CSS, so they take precedence

---

## JavaScript Functionality

Located in `website/static/website/js/main.js`

### Mobile Menu System (Hamburger Navigation)

**HTML Structure (in header.html):**
- `.mobile-menu-btn` - The hamburger button (only visible on mobile)
- `.mobile-nav-menu` - The dropdown menu container

**JavaScript Functionality:**
- Opens/closes menu on button click
- Closes menu when a link is clicked
- Closes menu on Escape key press
- Prevents body scroll when menu is open (using `overflow: hidden`)
- Prevents touch scroll on mobile
- Auto-closes on window resize (when screen > 768px)

**Key Functions:**
```javascript
openMenu()    // Displays menu, disables scrolling
closeMenu()   // Hides menu, re-enables scrolling
```

### Service Modal System

**Features:**
- Click a service card to open detailed modal
- Modal shows full description and service details
- Close button, Escape key, or clicking backdrop closes modal
- Keyboard accessible (tab navigation)

**Service Data Object:**
```javascript
serviceData = {
  'service-slug': {
    title: 'Service Name',
    description: 'Full description...',
    details: ['Detail 1', 'Detail 2', ...]
  }
}
```

**Key Modal Elements:**
- `.service-card` - Clickable card (data-service attribute)
- `.service-modal` - The modal dialog
- `.service-modal-backdrop` - Semi-transparent overlay
- `.modal-close` - Close button

---

## Templates & Components

### Base Template (base.html)

All pages extend this master template:

```html
{% extends "website/base.html" %}
{% load static %}

{% block title %}Page Title - Hearth&Hand{% endblock %}

{% block extra_css %}
<!-- Optional page-specific CSS -->
{% endblock %}

{% block content %}
<!-- Your page content here -->
{% endblock %}
```

### Included Components

#### Header (header.html)
- Logo on left
- Navigation links in center (hidden on mobile)
- CTA button on right (hidden on mobile)
- Mobile menu button (only on mobile)
- Mobile menu dropdown

#### Footer (footer.html)
- Located at bottom of every page
- Spans full width
- Semi-transparent background
- Contact info

### Service Card Component

Used in services carousel on home page:

```html
<div class="service-card" data-service="service-slug">
  <div class="service-card-content">
    <h3>Service Name</h3>
    <p class="service-description">Brief description</p>
  </div>
</div>
```

Add service to `main.js` serviceData object to enable modal.

---

## Color System

### Brand Colors

**Primary (Forest Green):**
```
#39442a - Dark forest green (text, accents)
#465732 - Secondary green
```

**Secondary (Warm Brown/Terracotta):**
```
#8b3b29 - Warm brown accent
#463029 - Deep brown
```

**Accents:**
```
#bc9c22 - Gold (hover states, highlights)
```

### Usage Guidelines

- **Backgrounds:** Use `--bg-light` (#ebe7db) for cream, `--bg-white` (#fdfcf9) for cards
- **Text on Light:** Use `--text-dark` (#2a2a2a)
- **Text on Dark:** Use `--text-on-dark` (#f5f4ef)
- **Hover States:** Use gold (`--accent-3`) or adjust opacity
- **Buttons:** CTA uses gold, primary actions use forest green

### Gradient Sections

#### Services Section (Full Width)
```css
.body-gradient::before {
  background: linear-gradient(180deg, 
    var(--services-green-dark) 0%,
    var(--services-green-mid) 65%,
    var(--services-green-light) 100%
  );
}
```

#### CTA Section (Full Width)
```css
.cta-section {
  background: linear-gradient(135deg,
    var(--cta-terra-light) 0%,
    var(--cta-terra-mid) 55%,
    var(--cta-terra-dark) 100%
  );
}
```

---

## Adding New Pages

### Step-by-Step Process

1. **Create View Function** (`website/views.py`)
   ```python
   def my_page(request):
       context = {
           'page_data': 'some data',
       }
       return render(request, 'website/my_page.html', context)
   ```

2. **Add URL Route** (`website/urls.py`)
   ```python
   path('my-page/', views.my_page, name='my-page'),
   ```

3. **Create Template** (`website/templates/website/my_page.html`)
   ```html
   {% extends "website/base.html" %}
   {% load static %}

   {% block title %}My Page - Hearth&Hand{% endblock %}

   {% block extra_css %}
   <link rel="stylesheet" href="{% static 'website/css/pages/my_page.css' %}">
   {% endblock %}

   {% block content %}
   <section class="hero">
     <h1>My Page</h1>
     <p>Content here</p>
   </section>
   {% endblock %}
   ```

4. **Add to Navigation** (edit `website/templates/website/components/header.html`)
   ```html
   <ul class="nav-links" id="navLinks">
     <!-- ... existing links ... -->
     <li><a href="/my-page/">My Page</a></li>
   </ul>

   <!-- Also add to mobile menu inside .mobile-nav-menu -->
   <li><a href="/my-page/">My Page</a></li>
   ```

5. **Create Page-Specific CSS** (optional)
   ```css
   /* website/static/website/css/pages/my_page.css */
   .my-page-hero {
     /* your styles */
   }
   ```

---

## Mobile Responsive Design

### Breakpoint

- **Mobile:** max-width: 768px
- **Desktop:** 769px and above

### Mobile-First Approach

CSS is written for mobile first, then enhanced for desktop:

```css
/* Mobile styles by default */
.nav-links {
  display: none;
}

/* Desktop enhancement */
@media (min-width: 769px) {
  .nav-links {
    display: flex;
  }
}
```

### Mobile Navigation

On mobile:
- Hamburger button appears on right side of header
- Desktop nav links and CTA hidden
- Tap hamburger to reveal full-screen dropdown menu
- Menu includes all links + CTA button styled as primary action
- Body scroll disabled while menu is open

### Key Mobile Styles

```css
@media (max-width: 768px) {
  .nav-bar {
    grid-template-columns: 1fr auto;  /* Push button to right */
  }

  .mobile-menu-btn {
    display: flex;  /* Show on mobile */
  }

  .mobile-nav-menu.active {
    display: block;  /* Show menu when active */
  }

  /* Adjust card layouts, spacing, font sizes as needed */
}
```

### Testing Mobile

- Use browser DevTools (F12 → toggle device toolbar)
- Test at 375px width (iPhone SE)
- Test at 768px (iPad)
- Test at 1024px (Desktop)

---

## Common Tasks

### Changing Colors

1. Update `variables.css` custom properties
2. Changes automatically apply everywhere using that variable
3. Example: Change primary green
   ```css
   --primary-1: #your-new-color;
   ```

### Adding a New Service Card

1. Add HTML card in `home.html` services section:
   ```html
   <div class="service-card" data-service="new-service">
     <div class="service-card-content">
       <h3>New Service</h3>
       <p class="service-description">Description</p>
     </div>
   </div>
   ```

2. Add data in `main.js` serviceData object:
   ```javascript
   'new-service': {
     title: 'New Service',
     description: 'Full description here',
     details: ['Detail 1', 'Detail 2']
   }
   ```

### Adjusting Spacing

Use spacing variables in CSS:

```css
/* Instead of hard-coding: */
padding: 20px;

/* Use: */
padding: var(--space-3);  /* Same as 20px */

/* Or combine: */
margin: var(--space-5) var(--space-3);  /* 40px top/bottom, 20px left/right */
```

### Creating a Full-Width Section

```html
<div class="body-gradient">
  <section class="my-section">
    <div class="container">
      <!-- Content stays centered, background is full width -->
    </div>
  </section>
</div>
```

The `.body-gradient` pseudo-element creates full-width backgrounds while content stays centered.

### Modifying Gradients

Green gradient (services):
```css
/* In variables.css */
--services-green-light: #new-light-color;
--services-green-mid: #new-mid-color;
--services-green-dark: #new-dark-color;
```

Terracotta gradient (CTA):
```css
--cta-terra-light: #new-light-color;
--cta-terra-mid: #new-mid-color;
--cta-terra-dark: #new-dark-color;
```

### Disabling Body Scroll (for modals/overlays)

```javascript
// Lock scroll
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

// Unlock scroll
document.body.style.overflow = '';
document.documentElement.style.overflow = '';
```

### Adding a New Font

1. Add to Google Fonts import in `base.html`
2. Define custom property in `variables.css`:
   ```css
   --font-heading: 'New Font', sans-serif;
   ```
3. Use in CSS:
   ```css
   h1 {
     font-family: var(--font-heading);
   }
   ```

---

## Z-Index Hierarchy

Used consistently across the site:

```
0-1:    Background shapes, decorative elements
2:      Main text content
999:    Mobile menu backdrop overlay
1000:   Mobile navigation menu
1001:   Mobile menu button (hamburger)
1002:   Sticky header
1005:   Service modal backdrop
1006:   Service modal dialog
```

---

## Performance Tips

1. **CSS:** Utilities are loaded once, reused across pages
2. **JS:** Event listeners use event delegation where possible
3. **Images:** Store in `website/static/website/images/`
4. **Fonts:** Using Google Fonts (no server overhead)
5. **Database:** Currently minimal use (SQLite sufficient)

---

## Troubleshooting

### Mobile Menu Not Showing
- Check that `.mobile-menu-btn` and `.mobile-nav-menu` IDs match in HTML and JS
- Ensure `display: flex` is applied to `.mobile-menu-btn` on mobile breakpoint
- Verify event listener is properly attached in main.js

### Gap Between Header and Mobile Menu
- Ensure `.mobile-nav-menu { top: var(--header-height); margin-top: 0; padding-top: 0; }`
- Check that `--header-height: 72px` matches header height

### Colors Not Changing
- Verify CSS file is loaded in template
- Check for specificity issues (inline styles override classes)
- Use browser DevTools to inspect computed styles
- Clear browser cache (Ctrl+Shift+Delete)

### Service Modal Not Opening
- Check data-service attribute matches serviceData object key
- Verify serviceData object is populated in main.js
- Check z-index hierarchy (modal should be 1006, higher than everything)

### Styles Not Applying on Mobile
- Check media query breakpoint (768px) is correct
- Verify media query is at end of file (cascading rules)
- Test in actual device or DevTools device emulation

---

## Quick Reference

### Running the Server
```bash
cd heartandhand
python manage.py runserver
```

### File Locations
- Django views: `website/views.py`
- URL routes: `website/urls.py`
- Templates: `website/templates/website/`
- CSS: `website/static/website/css/`
- JavaScript: `website/static/website/js/main.js`

### Key Variables
- Primary color: `--primary-1` (#39442a)
- Secondary color: `--secondary-1` (#8b3b29)
- Gold accent: `--accent-3` (#bc9c22)
- Content max-width: `--content-max-width` (1100px)
- Header height: `--header-height` (72px)

### Important CSS Classes
- `.container` - Max-width container for content
- `.flex`, `.flex-column`, `.flex-center` - Flexbox utilities
- `.grid`, `.grid-2`, `.grid-3` - Grid utilities
- `.mobile-menu-btn` - Hamburger button
- `.mobile-nav-menu` - Mobile menu dropdown
- `.body-gradient` - Full-width gradient background

### Key JavaScript Objects/Functions
- `serviceData` - Object with all service information
- `openMenu()` - Open mobile navigation
- `closeMenu()` - Close mobile navigation
- `preventScroll()` - Disable body scrolling

---

## Next Steps

When ready to expand:
1. Add a database model for blog posts/case studies
2. Add contact form with email backend
3. Add image gallery component
4. Implement search functionality
5. Add SEO metadata
6. Set up production deployment

---

**Last Updated:** December 17, 2025
