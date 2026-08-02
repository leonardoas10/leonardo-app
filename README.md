# Leonardo Aranguren Website

A modern portfolio website built with Next.js 15 and AWS Amplify Gen 2, featuring server-side rendering, multi-language support (English/Spanish), and serverless architecture. The application uses TypeScript for type safety, Material UI for responsive design, and AWS services (DynamoDB, CloudFront, Lambda, S3, SES) for a robust cloud infrastructure.

## 📊 Diagram

![Architecture Diagram](https://assets.leonardoaranguren.com/images/architecture.webp)

## 📁 Repository Structure

```
.
├── .amplify/                     # Amplify generated artifacts (env stubs in CI)
├── .github/                      # GitHub Actions workflows and CI fixtures
│   ├── fixtures/                 # amplify_outputs.json and Lambda env stubs for CI
│   └── workflows/                # ci.yml, lambda-tests.yml, auto-labeler.yml
├── .husky/                       # Git hooks (pre-commit only)
├── amplify/                      # AWS Amplify Gen 2 backend
│   ├── auth/                     # Cognito auth resources
│   ├── cdk/                      # CDK policy helpers
│   ├── data/                     # DynamoDB schema and AppSync API
│   ├── functions/                # Lambda functions (e.g. send-cv mutation)
│   └── utils/                    # Backend utilities (GraphQL client)
├── app/                          # Next.js App Router pages and layouts
│   ├── architecture/             # Architecture page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components by feature
│   ├── about/                    # About section
│   ├── architecture/             # Architecture diagram page
│   ├── common/                   # Shared UI (Button, Modal, IOSSwitch, …)
│   ├── contact/                  # CV modal and contact flow
│   ├── images/                   # Image slideshow and ThumbHash helpers
│   ├── layout/                   # NavBar, Footer, SkipLink, theme sync
│   ├── tabs/                     # Experience and architecture tabs
│   └── toggles/                  # Language and theme toggles
├── contexts/                     # React context providers (theme, language)
├── public/                       # Static assets and PWA icons
├── scripts/                      # Build-time scripts (e.g. thumbhash generation)
├── types/                        # Shared TypeScript declarations
├── utils/                        # Frontend utilities, i18n, SEO, analytics
├── .env.example                  # Example environment variables
├── next.config.ts                # Next.js configuration
├── vitest.config.ts              # Vitest config for Amplify Lambda tests
└── package.json                  # Dependencies and npm scripts
```

## 📝 Usage Instructions

### 🔍 Prerequisites

- Node.js 22.x (matches CI)
- npm 10.x or later
- AWS account with appropriate permissions (for sandbox/deploy)
- Git

### 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/leonardoas10/leonardo-app.git
cd leonardo-app
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your CloudFront URLs, reCAPTCHA site key, and GTM id.

4. Start the Amplify sandbox (backend) in one terminal:

```bash
npm run sandbox
```

5. Start the Next.js dev server in another terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ⚙️ npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js) |
| `npm run type-check` | TypeScript for app + Amplify backend |
| `npm test` | Vitest — send-cv Lambda integration tests (mocked AWS) |
| `npm run test:watch` | Vitest watch mode |
| `npm run pre-commit` | Lint + type-check (same as Husky hook) |
| `npm run sandbox` | Amplify Gen 2 sandbox with function logs |
| `npm run generate:thumbhashes` | Regenerate ThumbHash placeholders for images |

## 🐶 Git Hooks

Husky runs **pre-commit only**:

```bash
npm run lint && npm run type-check
```

There is no pre-push hook. Lambda tests run in GitHub Actions (`lambda-tests.yml`).

## 🧪 Testing

Backend tests live next to the Lambda handler:

- `amplify/functions/cv/mutations/send-cv/handler.test.ts`

They mock SES, S3, DynamoDB (Amplify Data client), and reCAPTCHA — no real AWS calls.

```bash
mkdir -p .amplify/generated/env
cp .github/fixtures/amplify/env/send-cv-mutation.ts .amplify/generated/env/
npm test
```

CI runs the same suite in [.github/workflows/lambda-tests.yml](.github/workflows/lambda-tests.yml).

## 📋 Backlog and Issues

Work is tracked in [GitHub Issues](https://github.com/leonardoas10/leonardo-app/issues) and the [Leonardo Apps project board](https://github.com/users/leonardoas10/projects/5).

Branch naming for linked issues:

```text
feat/42-short-description    → Refs #42
fix/15-send-cv-tests         → Refs #15
```

Create or triage issues with the GitHub CLI:

```bash
gh issue list
gh issue create --title "[P2] My task" --label front-end
```

Import or bulk-manage issues from the project UI (**Projects → Add item → Import issues**).

## 🔄 Continuous Integration

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| [ci.yml](.github/workflows/ci.yml) | PR / push to `main` | Lint, type-check, production build |
| [lambda-tests.yml](.github/workflows/lambda-tests.yml) | PR / push to `main` | send-cv Lambda tests (mocked AWS) |
| [auto-labeler.yml](.github/workflows/auto-labeler.yml) | PR | Auto labels from changed paths |

AWS Amplify Gen 2 handles deployment on merge to `main` (hosting + backend).

## 💰 Cost of Implementation

This implementation leverages AWS serverless architecture:

- **Estimated monthly cost**: $1–3 USD for typical portfolio traffic
- **Main services**: Amplify Hosting, DynamoDB, CloudFront, Lambda, S3, SES (mostly free tier)

Actual cost depends on traffic and usage patterns.
