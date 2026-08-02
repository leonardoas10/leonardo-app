# Contributing Guidelines

Thank you for your interest in contributing to the Leonardo Aranguren Website project!

## Reporting Bugs / Feature Requests

- **Bug reports**: Open a [GitHub issue](https://github.com/leonardoas10/leonardo-app/issues/new) with steps to reproduce, expected vs actual behavior, and environment details.
- **Feature requests**: Same — clear description, rationale, and optional implementation notes.

Use labels such as `front-end`, `back-end`, or `aws` when relevant.

## Development Setup

1. Fork the repository and branch from `main`.
2. `npm install`
3. `cp .env.example .env` and fill required values.
4. `npm run sandbox` (backend) and `npm run dev` (frontend) in separate terminals.

See [README.md](README.md) for the full script list and repository layout.

## Branch Naming and Commits

Branch names should reference a GitHub issue when applicable:

```text
feat/42-add-feature
fix/15-send-cv-tests
```

Use [Conventional Commits](https://www.conventionalcommits.org/) with a **lowercase** subject:

```text
fix: verify send-cv handler without calling ses on validation failure

Mock SES, S3, and Amplify Data in handler tests. Return typed error codes for
validation and SES failures.

Refs #15
```

Footer reference: `Refs #<issue-number>` (GitHub) or `Refs: KEY-123` (JIRA-style keys).

## Before Submitting a PR

```bash
npm run pre-commit   # lint + type-check (same as Husky pre-commit)
npm test             # send-cv Lambda tests (mocked AWS)
npm run build        # optional but recommended for UI changes
```

Husky only runs **pre-commit** (`lint` + `type-check`). There is no pre-push hook; CI runs build and Lambda tests on every PR.

## Pull Request Checklist

1. Changes match an open issue or explain why a new issue was not needed.
2. `npm run pre-commit` passes locally.
3. Backend changes include or update tests in `amplify/**/*.test.ts` when behavior changes.
4. README / CONTRIBUTING updated if scripts, structure, or workflow changed.

## Code Standards

- TypeScript strict mode for app and Amplify backend.
- Follow existing folder and naming conventions.
- Prefer minimal, focused diffs.
- i18n copy lives in `utils/translations/en/` and `utils/translations/es/`.

## Security

Do **not** open a public issue for security vulnerabilities. Email [leoaranguren10@gmail.com](mailto:leoaranguren10@gmail.com) instead.

## Licensing

By contributing, you agree your contributions are licensed under the project [LICENSE](LICENSE).
