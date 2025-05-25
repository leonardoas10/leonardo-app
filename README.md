# Leonardo App

## Development Setup

### Pre-commit Hooks

This project uses Husky to run pre-commit hooks that check for TypeScript errors and linting issues before allowing commits.

To set up the pre-commit hooks:

1. Install dependencies:
   ```
   npm install
   ```

2. The `prepare` script will automatically set up Husky:
   ```
   npm run prepare
   ```

3. Now, whenever you commit, the pre-commit hook will run:
   - ESLint to check for linting issues
   - TypeScript compiler to check for type errors

If any errors are found, the commit will be blocked until you fix them.

### Common TypeScript Errors to Watch For

1. Invalid prop values for MUI components:
   - Use only valid color values for components (e.g., `color="primary"` instead of `color="textPrimary"`)
   - Move custom colors to the `sx` prop: `sx={{ color: 'text.primary' }}`

2. Avoid using `any` type:
   - Create proper interfaces for your data structures
   - Use more specific types like `Record<string, unknown>` if needed

3. Handle unused variables:
   - Use variables you declare or prefix them with underscore
   - Or use empty catch blocks: `catch {}` instead of `catch (error) {}`