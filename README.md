# Leonardo Aranguren Website

A modern portfolio website built with Next.js 14 and AWS Amplify, featuring server-side rendering, multi-language support (English/Spanish), and serverless architecture. The application uses TypeScript for type safety, Material UI for responsive design, and AWS services (DynamoDB, CloudFront, Cognito) for a robust cloud infrastructure.

## Diagram

![Architecture Diagram](https://assets.leonardoaranguren.com/images/architecture.webp)

## Repository Structure

```
.
├── amplify/                      # AWS Amplify backend configuration and resources
│   ├── backend.ts                # Main backend configuration
│   ├── auth/                     # Authentication resources (Cognito)
│   ├── data/                     # Data resources (DynamoDB, API)
│   └── storage/                  # Storage resources (S3)
├── app/                          # Next.js application pages and layouts
│   ├── [locale]/                 # Locale-specific routes (en, es)
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── projects/             # Projects section
│   │   ├── contact/              # Contact form
│   │   └── blog/                 # Blog section
│   ├── api/                      # API routes
│   └── layout.tsx                # Root layout
├── components/                   # Reusable React components organized by feature
│   ├── common/                   # Shared components (Button, Card, etc.)
│   ├── layout/                   # Layout components (Header, Footer, etc.)
│   ├── sections/                 # Page section components
│   └── forms/                    # Form components
├── contexts/                     # React context providers
│   ├── ThemeContext.tsx          # Theme provider
│   └── LanguageContext.tsx       # Language provider
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   └── useForm.ts                # Form handling hook
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   ├── fonts/                    # Font files
│   └── locales/                  # Translation files
├── styles/                       # Global styles and theme configuration
│   ├── theme.ts                  # MUI theme configuration
│   └── globals.css               # Global CSS
├── utils/                        # Utility functions and helpers
│   ├── api.ts                    # API utilities
│   ├── translations/             # Internationalization resources
│   └── analytics.ts              # Analytics utilities
├── types/                        # TypeScript type definitions
├── tests/                        # Test files
│   ├── unit/                     # Unit tests
│   └── integration/              # Integration tests
├── .env.example                  # Example environment variables
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies and scripts
```

## Usage Instructions

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later
- AWS Account with appropriate permissions
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
npm install
```

3. Set up AWS Amplify sandbox:

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
```

4. Set up environment variables:

```
cp .env.example .env
```

Edit `.env` with your configuration values:

```
NEXT_PUBLIC_CLOUDFRONT_URL_IMAGES=<your-cloudfront-url>
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-recaptcha-key>
NEXT_PUBLIC_GTM_ID=<your-gtm-id>
```

5. Start the development server (in a new terminal):

```bash
npm run dev
```

## Development Features

### TypeScript Integration

- Strict type checking enabled for better code quality
- Custom type definitions for all components and utilities
- Automatic type inference for AWS Amplify operations
- Improved developer experience with IDE support

### Husky Git Hooks

- Pre-commit hooks for linting and type checking
- Pre-push hooks for running tests
- Ensures code quality before commits
- Maintains consistent code style

## Continuous Integration/Deployment

AWS Amplify Gen 2 provides automated CI/CD:

- Automatic builds on code push
- Branch preview deployments
- Environment variable management
- Serverless infrastructure deployment
- Zero-downtime updates

## Cost of Implementation

This implementation leverages AWS's serverless architecture, which provides a cost-effective solution for personal portfolio websites:

- **Estimated monthly cost**: $1-3 USD per month
- **Cost breakdown**:
    - AWS Amplify Hosting: Free tier for the first 12 months, then ~$0.01 per build minute
    - DynamoDB: Free tier includes 25GB storage and sufficient read/write capacity for portfolio sites
    - CloudFront: Free tier includes 1TB data transfer and 10M requests per month
    - Lambda: Free tier includes 1M requests and 400,000 GB-seconds of compute time
    - S3: Free tier includes 5GB storage and 20,000 GET requests

The actual cost may vary based on traffic and usage patterns, but for a typical portfolio website with moderate traffic, costs should remain within the $1-3 range after free tier benefits expire.
