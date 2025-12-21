// Module entry — imports organize code into components/pages
import { initMobileMenu } from './components/menu.js';
import { initHome } from './pages/home.js';

// Initialize immediately — modules internally guard element existence
try {
  initMobileMenu();
} catch (err) {
  console.error('initMobileMenu error', err);
}

try {
  initHome();
} catch (err) {
  console.error('initHome error', err);
}

