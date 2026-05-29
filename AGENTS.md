# Mandatory Agent Rules

## 1. GitHub Flow — ALWAYS

Every time you are asked to implement something, change code, or make any modification:

1. **Create a new branch** from `main` with a descriptive name (e.g., `feature/short-description`, `fix/short-description`).
2. **Make clear and descriptive commits** as you progress.
3. **Open a Pull Request** so I can review your code before merging it.
4. **NEVER push directly to `main`.**

> ⚠️ Do not start modifying files without creating the branch first.

## 2. Integrated Browser — ALWAYS

Before implementing any visual or functional change:

1. **Check if the development server is running** (`npm run dev` or similar).
2. **If it's not running, start it.**
3. **Open the integrated browser** to show the current state.
4. **Implement the changes.**
5. **Show the result in the browser** after the changes.

> ⚠️ Do not consider a visual task complete without verifying it in the browser.

## 3. Language — Spanish always, except for code

- **Spanish:** commits, code comments, PRs, issues, user responses, documentation.
- **English:** only variable names, function names, class names, file names, and code in general.

> ⚠️ Do not write commit messages, comments, or PR descriptions in English.

## 4. AI Agents — Airline Fleet Project

The project is an Airline aircraft model selection website with a retro Game Boy aesthetic.

### Mobile Tester Agent

The `mobile-tester.agent.md` agent verifies that the website displays correctly on mobile devices.

### Issue-Quality-Enhancer Workflow

Automatically improves open issues with structure, web context, and relevant labels.

## 5. Agentic Workflows — Always Compile

When you create or modify an agentic workflow (`.md` files in `.github/workflows/`):

1. **Create or edit the `.md` file** with the workflow definition.
2. **Run `gh aw compile`** to generate the actual GitHub Actions workflow.
3. **Include the generated files** (`.github/aw/` and `.lock.yml`) in the commit.

> ⚠️ An agentic workflow does NOT work until it is compiled. Do not forget this step.
