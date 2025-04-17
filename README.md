# RFP Landing Page

A modern, reactive landing page for RFP Global that connects vetted borrowers with premium lenders. This landing page features a sleek, dynamic UI with interactive elements and a form integration with Airtable.

## 🚀 Tech Stack

### Core Technologies
- **React 18** - Frontend library for building the user interface
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Vite** - Next-generation frontend tooling for fast development and optimized builds

### UI Framework & Components
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - High-quality React components built with Radix UI and Tailwind CSS
- **Radix UI** - Unstyled, accessible components for building high-quality design systems
- **Lucide Icons** - Beautiful, consistent icon set

### Routing & State Management
- **React Router DOM** - Client-side routing for single-page applications
- **TanStack React Query** - Data fetching, caching, and state management library

### Form Handling & Validation
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema validation with static type inference

### Animation & Interaction
- **Tailwind Animate** - Animation utilities for Tailwind CSS
- **Class Variance Authority** - For building type-safe UI component variants
- **clsx/tailwind-merge** - Utility for constructing CSS class strings conditionally

### External Services
- **Airtable API** - External database service for storing form submissions

### Developer Tools
- **ESLint** - Code linting
- **SWC** - Fast TypeScript/JavaScript compiler used with Vite
- **PostCSS** - Tool for transforming CSS with JavaScript plugins
- **Autoprefixer** - PostCSS plugin to parse CSS and add vendor prefixes

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components 
├── lib/           # Utilities and services (Airtable integration)
├── pages/         # Application pages/routes
├── hooks/         # Custom React hooks
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16.0.0 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landing-page-zenith-react
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following:
```
AIRTABLE_API_KEY=<your-airtable-api-key>
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:8080

### Build

Create a production build:
```bash
npm run build
# or
yarn build
```

## 🌟 Features

- Interactive, animated background that responds to mouse movements
- Responsive design for all device sizes
- Form integration with Airtable for lead capture
- Clean, modern UI with accessible components

## 📝 License

Copyright © 2025 RFP Global. All rights reserved.
