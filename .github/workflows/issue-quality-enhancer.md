---
on:
  issues:
    types: [opened]

permissions:
  issues: read
  contents: read

safe-outputs:
  update-issue:
    title:
    body:

tools:
  github:
    toolsets: [issues]

mcp-servers:
  tavily:
    command: npx
    args: ["-y", "@tavily/mcp-server"]
    env:
      TAVILY_API_KEY: "${{ secrets.TAVILY_API_KEY }}"
    allowed: ["search"]

network:
  allowed:
    - defaults
    - "*.tavily.com"

gh-aw:
  skip-pre-activation: true
---

# Issue Quality Enhancer

Automatically enhances new issues to be clear, well-structured, and easy to understand. Also searches for relevant web references to enrich the context.

## Issue to enhance

| Field  | Value          |
| ------ | -------------- |
| Number | #$ISSUE_NUMBER |
| Author | @$ISSUE_AUTHOR |
| Title  | $ISSUE_TITLE   |
| Body   | $ISSUE_BODY    |

## Your tasks

### 1. Get context

- Read the README to understand the project (it's a retro Game Boy style web for Airline Fleet)
- List the repository labels (you'll need them later)

### 2. Search for relevant references

Use the Tavily `search` tool to find useful information related to the issue:

- Search for articles, documentation, or resources that can help resolve or better understand the problem
- Focus on technologies mentioned in the issue (Astro, TypeScript, CSS, etc.)
- If it's a bug, search for known solutions or similar issues in other projects
- If it's an enhancement, search for implementation examples or best practices

**Format for found references:**

```markdown
## 🔗 Useful References

- [Resource Title](URL) - Brief description of why it's relevant
```

> ⚠️ Only include references if they are truly useful for the issue. Don't add generic links.

### 3. Improve the title

Add an emoji as a prefix according to the issue type:

- 🐛 Bug (something not working)
- ✨ Enhancement (new improvement or feature)
- 📝 Documentation (docs, README)
- ❓ Question (question or doubt)
- 🕹️ Retro-UI (interface and site aesthetics)
- 🖼️ Covers (covers and visual composition)
- 👤 Avatars (avatars and pixel-art)
- 📅 Agenda-data (agenda data)
- ⚙️ Build-pipeline (scripts and automation)

Example: `🐛 Error loading speaker avatar`

### 4. Restructure the body

Use clear sections with emoji headers.

**For bugs:**

```markdown
## 🐛 Description

(What is failing)

## 📋 Steps to reproduce

1. ...
2. ...
3. ...

## ✅ Expected behavior

(What should happen)

## ❌ Actual behavior

(What really happens)

## 📸 Screenshots (if applicable)

(Images or GIFs of the problem)

## 🔗 Useful references

(Links found in search that can help resolve the bug)
```

**For enhancements/features:**

```markdown
## ✨ Description

(What to add or improve)

## 🎯 Why is it necessary?

(Context and motivation)

## 📐 Proposed solution

(How it could be implemented)

## 🔗 Useful references

(Links to examples, documentation, or similar implementations)

## 📝 Additional notes

(Any other relevant information)
```

**For documentation:**

```markdown
## 📝 Description

(What documentation is missing or needs improvement)

## 📍 Location

(Where the documentation should be)

## ✏️ Suggested content

(What it should include)

## 🔗 Useful references

(Reference documentation or examples from other projects)
```

### 5. Add footer

```markdown
---

> 🤖 _Issue automatically enhanced by Copilot. Original author: @$ISSUE_AUTHOR_
```

### 6. Apply changes

- **Update** issue #$ISSUE_NUMBER with the new title and body
- **Assign** 1-3 relevant labels from the available ones in the repository
- **Comment** with a brief summary of the improvements made

## Rules

- Never change the original meaning of the issue
- If the issue is already well-written, make minimal changes
- Keep content useful, not verbose
- All content should be in English
- Respect the retro/gaming style of the project in comments
