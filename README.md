# Frontend Foundations

A modern Front-End Automation Testing framework built with Playwright, TypeScript, and scalable automation architecture principles.

This project represents my growing expertise in Front-End Quality Engineering, UI automation, API testing, and CI/CD integration, focusing on:

- scalable Playwright architecture
- maintainable automation patterns
- accessibility-first selectors
- reliable end-to-end testing
- clean TypeScript implementation
- reusable Page Object Models
- centralized locator management
- REST API test automation
- CI/CD pipeline integration with GitHub Actions
- modern QE best practices

---

## Goals of This Project

The main purpose of this repository is to demonstrate my practical knowledge in:

- Front-End Automation
- UI Functional Testing
- End-to-End Testing
- REST API Testing
- Playwright + TypeScript
- Test Architecture Design
- Page Object Model implementation
- Locator strategy optimization
- Maintainable automation frameworks
- Scalable test organization
- Cross-browser testing
- CI/CD pipeline configuration
- Automation best practices

This project continuously evolves as I improve my QA Engineering and automation architecture skills.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Main programming language |
| Playwright | End-to-End and API automation |
| Node.js | Runtime environment |
| Dotenvx | Environment variable management |
| Page Object Model | Framework architecture |
| Centralized Locators | Shared selector architecture |
| GitHub Actions | CI/CD pipeline |
| HTML Reports | Test reporting |

---

## Features Implemented

### Authentication Testing

- Valid login flows across all user types
- Invalid credentials validation
- Locked user error handling
- Performance glitch user detection
- Logout and session invalidation verification

### Inventory / Home Page Testing

- Product visibility and content validation
- Product name, description, price and image verification
- Cart badge add/remove interactions
- Default and custom sort order validation (A–Z, Z–A, low–high, high–low price)
- Burger menu open/close functionality
- Reset App State verification
- Cart synchronization validation

### Product Details Testing

- Product name, description, price, and image validation
- Add to cart and Remove button state transitions
- Cart count synchronization from detail page
- Navigation back to products
- Cross-product navigation by ID

### Cart Testing

- Empty cart on first login
- Item persistence across navigation
- Item names and prices verification
- Continue shopping functionality
- Proceed to checkout navigation

### Checkout Testing

- Successful end-to-end checkout flow
- Missing first name validation
- Missing last name validation
- Missing postal code validation
- Order completion and redirect verification

### Navigation & Menu Testing

- About page external redirection validation
- Burger menu link visibility
- Menu close interaction
- Reset App State from burger menu

### API Testing (GoRest API)

- User CRUD operations (Create, Read, Update, Patch, Delete)
- User validation (invalid email, gender, status)
- Post creation and retrieval
- Comment management on posts
- ToDo task creation and status management
- Sequential test execution for dependent flows

---

## Framework Architecture

```text
Frontend-Foundations
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── locators/
│   ├── basePage.locators.ts
│   ├── loginPage.locators.ts
│   ├── inventoryPage.locators.ts
│   ├── cartPage.locators.ts
│   ├── checkoutPage.locators.ts
│   └── productDetailPage.locators.ts
│
├── pages/
│   ├── basePage.ts
│   ├── loginPage.ts
│   ├── inventoryPage.ts
│   ├── cartPage.ts
│   ├── checkoutPage.ts
│   └── productDetailPage.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── home.spec.ts
│   ├── items.spec.ts
│   ├── myCart.spec.ts
│   ├── checkout.spec.ts
│   ├── about.spec.ts
│   └── API/
│       ├── user.spec.ts
│       ├── posts.spec.ts
│       ├── comments.spec.ts
│       └── toDos.spec.ts
│
├── Interface/
│   ├── user.ts
│   ├── post.ts
│   ├── comments.ts
│   └── toDos.ts
│
├── dataApi/
│   └── user.ts
│
├── types/
│   ├── index.ts
│   └── ui.ts
│
├── playwright.config.ts
└── package.json
```

---

## CI/CD Pipeline

This project uses **GitHub Actions** to automatically run the full test suite on every push or pull request to `main`.

### Workflow: `.github/workflows/playwright.yml`

```yaml
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

### Pipeline steps

1. Checkout repository
2. Set up Node.js (LTS)
3. Install dependencies (`npm ci`)
4. Cache Playwright browsers (keyed by `package-lock.json`)
5. Install Playwright browsers and OS dependencies
6. Run all tests across Chromium, Firefox, and WebKit
7. Upload the HTML report as a downloadable artifact (retained 30 days)

### Artifacts

The HTML test report is uploaded after every run — including failed runs — and is available under the **Actions** tab in GitHub.

---

## Automation Architecture

This framework follows the **Page Object Model (POM)** design pattern combined with centralized locator abstraction to improve:

- maintainability
- readability
- scalability
- reusability
- selector consistency

Each page contains:

- reusable actions
- helper methods
- page-specific flows
- assertion support

Selectors are centralized in dedicated locator files to reduce duplication and simplify maintenance across the framework.

---

## Locator Architecture

The framework uses dedicated `.locators.ts` files to centralize selectors and standardize locator usage across Page Objects.

This architecture helps:

- reduce selector duplication
- keep selectors consistent across Pages
- simplify Page Object logic
- improve scalability
- make selector updates easier
- standardize locator strategy
- separate selectors from page actions

Example:

```ts
export const loginPageLocators = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
};
```

Page Objects consume shared locators instead of redefining selectors repeatedly.

---

## Locator Strategy

The framework follows Playwright best practices for stable and maintainable selectors.

Preferred selector priority:

```text
Role → TestId → Id → Name → CSS → XPath
```

The project prioritizes:

- `data-test` attribute selectors
- semantic Playwright locators
- accessibility-aware selectors
- resilient selector strategies
- minimal brittle CSS selectors

Example locators:

```ts
page.getByRole('button', { name: 'Login' })

page.getByTestId('shopping-cart-link')

page.locator('[data-test="inventory-item-name"]')
```

XPath selectors are intentionally avoided to reduce brittleness and improve long-term maintainability.

---

## API Testing

The framework includes a dedicated REST API test suite targeting the [GoRest public API](https://gorest.co.in/).

### API Test Coverage

| Suite | File | Description |
|---|---|---|
| Users | `tests/API/user.spec.ts` | Full CRUD + validation |
| Posts | `tests/API/posts.spec.ts` | Post creation and retrieval |
| Comments | `tests/API/comments.spec.ts` | Comment management on posts |
| ToDos | `tests/API/toDos.spec.ts` | Task creation and status |

### TypeScript Interfaces

API response models are typed using dedicated interfaces under `Interface/`:

```ts
// Interface/user.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
```

### Shared Test Data

Reusable test data objects are stored under `dataApi/` and imported by the specs that need them:

```ts
// dataApi/user.ts
export const userData: User = {
  name: Math.random().toString(36).substring(2, 15),
  email: Math.random().toString(36).substring(2, 15) + '@example.com',
  gender: 'male',
  status: 'active',
};
```

### Environment Configuration

API tests read credentials from a `.env` file in the project root:

```env
baseURL = "https://gorest.co.in"
token = YOUR_GOREST_API_TOKEN
```

Get a free token at [gorest.co.in](https://gorest.co.in/).

---

## Best Practices Applied

- Page Object Model (POM)
- Dedicated locator abstraction files
- Reusable methods
- Centralized selectors
- Accessibility-first automation approach
- Semantic Playwright locators
- Async/Await implementation
- Minimal flaky selectors
- Shared setup with `beforeEach`
- Cross-browser configuration (Chromium, Firefox, WebKit)
- Failure screenshots, traces, and videos
- Clean TypeScript typing
- Separation of concerns
- Environment variable management with Dotenvx
- TypeScript interfaces for API response models
- Serial test execution for dependent API flows
- Playwright browser caching in CI
- Retries enabled on CI for external dependency resilience
- Reduced selector maintenance overhead

---

## Running the Project

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run only API tests

```bash
npx playwright test tests/API/
```

### Open HTML report

```bash
npx playwright show-report
```

---

## Browser Coverage

Current configuration supports:

- Chromium
- Firefox
- WebKit

---

## What This Project Demonstrates

This repository showcases my ability to:

- design scalable automation frameworks
- build maintainable UI automation
- implement Playwright best practices
- write clean TypeScript automation
- create reusable Page Objects
- build REST API test suites with Playwright
- model API responses with TypeScript interfaces
- implement locator optimization strategies
- create scalable locator abstraction systems
- improve accessibility-aware automation
- configure CI/CD pipelines with GitHub Actions
- manage test artifacts and reporting in CI
- improve test stability with retries and caching
- structure real-world QE projects
- apply modern QA Engineering principles

---

## Repository Purpose

This repository functions as:

- a learning platform
- an automation playground
- a professional QA portfolio project

showcasing my growth in modern Front-End Quality Engineering, automation architecture, and CI/CD integration.

---

## Author

Odin Jacques

GitHub: https://github.com/OdinJacques
