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
    type: http
    url: "https://mcp.tavily.com/mcp/?tavilyApiKey=${{ secrets.TAVILY_API_KEY }}"
    allowed: ["search"]

network:
  allowed:
    - defaults
    - "*.tavily.com"
---

# Issue Quality Enhancer

Automatically improves new issues to make them clear, well-structured, and easy to understand. Also searches the web for relevant references to enrich the context.

## Issue to improve

| Field   | Value           |
| ------- | --------------- |
| Number  | #$ISSUE_NUMBER  |
| Author  | @$ISSUE_AUTHOR  |
| Title   | $ISSUE_TITLE    |
| Body    | $ISSUE_BODY     |

## Your tasks

### 1. Get context

- Read the README to understand the project (it's a retro Game Boy style web for JSConf Spain 2026)
- List the repository labels (you'll need them later)

### 2. Search for relevant references

Use Tavily's `search` tool to find useful information related to the issue:

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

Add an emoji prefix according to the issue type:

- 🐛 Bug (something is not working)
- ✨ Enhancement (new improvement or feature)
- 📝 Documentation (documentation, README)
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

## ❌ Current behavior

(What is actually happening)

## 📸 Screenshots (if applicable)

(Images or GIFs of the problem)

## 🔗 Useful References

(Links found in the search that can help resolve the bug)
```

**For enhancements/features:**

```markdown
## ✨ Description

(What you want to add or improve)

## 🎯 Why is it needed?

(Context and motivation)

## 📐 Proposed solution

(How it could be implemented)

## 🔗 Useful References

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

## 🔗 Useful References

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
- **Comment** with a brief summary of the improvements made (in English)

## Rules

- Never change the original meaning of the issue
- If the issue is already well-written, make minimal changes
- Keep content useful, not verbose
- All content should be in English
- Respect the retro/gaming style of the project in comments
