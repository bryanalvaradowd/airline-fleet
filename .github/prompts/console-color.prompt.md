---
name: console-color
description: Prompt to test different console colors
agent: agent
model: GPT-5.4 (copilot)
tools: [execute/getTerminalOutput, execute/awaitTerminal, execute/killTerminal, execute/runTask, execute/createAndRunTask, execute/runInTerminal, read, agent, browser, edit/editFiles, search, todo]
---

## Objective
Test different console colors and describe the visual result of each one.

## Steps to follow

### 1. Start the development server
- Run `npm run dev` in the background.
- **Wait for the server to start** and navigate to http://localhost:4321/airline-fleet

### 2. Open the browser
- Use the integrated browser to navigate to the URL provided by the server.
- Take a screenshot to verify the application loads correctly.

### 3. Turn on the console
- Before changing colors, **turn on the console** by clicking the power button.
- Take a screenshot to confirm it is on.

### 4. Verify color control
- Check if there is a visible control in the interface to change the console color.
- **Do not modify code or styles** to simulate the color change.
- If the control does not exist or does not work, stop the color test and report it as a blocker.

### 5. Test the colors
Test the following colors one by one:
1. **Green**
2. **Red**
3. **Blue**
4. **Yellow**

For each color:
- Change the console color using the real interface.
- Take a screenshot.
- Describe how it looks: is it vibrant, dull, does it have any interesting visual effect?

### 6. Conclusion
- Indicate which color you liked the most and why.
- Briefly summarize the visual differences between the tested colors.
- If there was a blocker, explain exactly at which step it occurred.
