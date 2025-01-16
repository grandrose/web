# Grand Rose - Website Repository

###### _`Last Updated: 12/10/24`_

Welcome to the Grand Rose web repository! This is the codebase for the **Grand Rose** website, a React-based shop powered by Shopify's API.

**Grand Rose** is a functional-dose protein beverage infused with cannabinoids, designed to nourish health seekers, elevate active experiences, and serve as an integrated catalyst for recovery.

---

## 🗈 Version

Latest: **`v0.1(beta)`**<br>
Next: **`v0.2(beta - backend)`**

---

### Included Pages

1. **Home**: Showcase the brand and its mission.
2. **Shop**: Explore and purchase products.
3. **About**: Learn about the Grand Rose story and values.
4. **Store Locator**: Find nearby retailers carrying Grand Rose products.
5. **Member Page (Profile)**: Personalized member experiences, including account and order details.

---

## Technology Stack

- **React**: Frontend framework for building the user interface.
- **Shopify Storefront API**: Headless Shopify integration for product and cart management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Handles page navigation and routing.
- **Context API**: Manages global state for cart, user sessions, and more.

---

## Getting Started

### Prerequisites

- **Node.js** (>= 16.x) ([Node.js Download](https://nodejs.org/en/download/package-manager))
- **npm** (>= 8.x)
- Shopify API keys (stored in environment variables)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/grandrose/web.git
   cd web
   npm install
   ```

### Environment Setup

Create a `.env` file in the root directory and add the following variables:

```plaintext
REACT_APP_SHOPIFY_STORE_DOMAIN=<your-shopify-store-domain>
REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<your-shopify-storefront-access-token>
REACT_APP_SHOPIFY_ADMIN_API=<shpat...shopify-customer-access-token>
REACT_APP_SHOPIFY_CLIENT_ID=<shp... shopify-client-id>
REACT_APP_LOCATION_ID=<location-id>
```

### Run the Development Server

```bash
npm run start
```

Access the site at `http://localhost:3000`.

---

## Project Structure

```graphql
grand-rose-web/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, and other media
│   ├── components/       # Reusable UI components
│   ├── context/          # Context API for state management
│   ├── lib/              # Utilities for Shopify integration
│   ├── pages/            # Individual page components
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point
└── README.md             # Documentation
```

---

## Roadmap

### Future Versions

###### _(Listed features are not final and version features are subject to change)_

- **v0.2(beta) - New Features & Improvements**

  - Backend deployment for customer and admin API.
  - Member page with orders, history and customer details.
  - Mobile opimizations for cart and login.
  - General bug fixes

- **v1.0.0 - Initial Public Release**

  - General bug fixes
  - Wholesale page

- **v1.0.1 - Continued Support**
  - Enhanced member page with order history and preferences.
  - Interactive animations and micro-interactions.
  - Expanded product pages with detailed descriptions and reviews.
  - Subscription and auto-reorder options.

---

## Development Team / Contributors

- **Austin Barrett** - Lead Developer
- **TBD**

---
