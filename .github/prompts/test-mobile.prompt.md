---
description: "Test the app at mobile resolutions using Chrome MCP browser"
agent: "agent"
tools: ['io.github.chromedevtools/chrome-devtools-mcp/*']
---

Test the web application at real mobile resolutions using Chrome MCP.

## Steps

1. **Emulate mobile viewport** with `mcp_io_github_chr_emulate` using the resolutions indicated below.
2. **Navigate** to the development server URL with `mcp_io_github_chr_navigate_page`.
3. **Take screenshot** with `mcp_io_github_chr_take_screenshot`.
4. **Evaluate scripts** with `mcp_io_github_chr_evaluate_script` to check computed styles if there are questions.
5. **Report** the problems found with screenshots.

## Devices to test

| Device              | Viewport         | Scale | Orientation |
|---------------------|------------------|-------|-------------|
| iPhone 15 Pro       | 393x852x3        | 3     | Portrait    |
| iPhone 15 Pro Max   | 430x932x3        | 3     | Portrait    |
| iPhone 15 Pro Max (L) | 932x430x3      | 3     | Landscape   |
| Samsung Galaxy S24  | 360x780x3        | 3     | Portrait    |
| iPad Mini           | 768x1024x2       | 2     | Portrait    |

Viewport parameter format: `{width}x{height}x{scale},mobile,touch`

## What to verify

- Elements that should be hidden on mobile (eg: QR codes)
- Horizontal overflow or elements that go off screen
- Legible text and buttons with adequate touch size (minimum 44x44px)
- Automatic scrolling and correct navigation
- Responsive layout: grid, flex, columns

Always respond in **English**.
