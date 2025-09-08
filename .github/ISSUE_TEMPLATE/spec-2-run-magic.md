---
name: "Specification 2: Run the magic"
about: Generate cowsay content and serve the transformed website
title: "Spec 2: Run the magic"
labels: ["status:todo", "type:specification"]
assignees: ""
---

## Specification 2: Run the magic

### Overview

Execute the npm development workflow to completely transform your boring corporate website - all ACME content will disappear and be replaced with "Abracadabra Magic! 🪄" and cowsay-generated ASCII art under "Abracadabra Cow!!"

### Requirements checklist

- [ ] Run `npm run generate` to create cowsay content files
- [ ] Verify generated content files are created in the `generated/` directory
- [ ] Run `npm run serve` to start the development server on port 3000
- [ ] Verify the website opens automatically in your browser
- [ ] Confirm the page transformation from boring to awesome
- [ ] Test that the magic only works when served on port 3000
- [ ] Run the complete workflow with `npm run dev`

### Step-by-step process

1. **Generate content**: Run `npm run generate`
   - Should create welcome.txt, dragon.txt, and tux.txt files
   - Should run the build script to create cowsay-content.html
   - Watch for success messages in terminal

2. **Serve the website**: Run `npm run serve`
   - Should start http-server on port 3000
   - Should automatically open browser to localhost:3000
   - Page should completely transform - ACME content disappears, title becomes "Abracadabra Magic! 🪄", replaced with "Abracadabra Cow!!" section containing ASCII art

3. **Test the full workflow**: Run `npm run dev`
   - Should run both generate and serve in sequence
   - Should result in the fully transformed website

### Evidence required

Create a folder called `evidence/spec-2/` in your project root and include:

1. **terminal-generate.png** - Screenshot of `npm run generate` command and all output
2. **terminal-serve.png** - Screenshot of `npm run serve` starting the server
3. **generated-files.png** - Screenshot showing generated .txt and .html files were created
4. **before-transformation.png** - Screenshot of boring ACME page (before port 3000)
5. **after-transformation.png** - Screenshot showing complete transformation: "Abracadabra Magic! 🪄" title and "Abracadabra Cow!!" section with cowsay content (all ACME content gone)
6. **terminal-dev-workflow.png** - Screenshot of complete `npm run dev` execution

### Success criteria

- [ ] `npm run generate` creates all expected files without errors
- [ ] Generated directory contains welcome.txt, dragon.txt, tux.txt, and cowsay-content.html
- [ ] `npm run serve` starts server on port 3000 and opens browser
- [ ] Complete website transformation: ACME content hidden, title changes to "Abracadabra Magic! 🪄", colorful styling applied, "Abracadabra Cow!!" section with ASCII art visible
- [ ] Page shows appropriate guidance messages when not on port 3000 (file://, Live Server, other ports)
- [ ] `npm run dev` executes the complete workflow successfully

### Reflection questions

Answer these questions in your evidence folder as **reflection.md**:

1. What happens when you open index.html directly in the browser (file://) vs using the development server?
2. Why does the magic only work on port 3000 specifically?
3. What did you learn about npm scripts and how they can chain together?
4. How does this project demonstrate the value of development tools and automation?
5. What other npm scripts could be useful for web development workflows?

### Testing different scenarios

Try these to understand the port detection:

- [ ] Open index.html as a file (file://) - should show "😴 Something's missing..." with explanation about development servers
- [ ] Use Live Server (port 5500/5501) - should show "🤔 Close, but not quite right..." with npm guidance
- [ ] Use other development servers - should show port-specific guidance messages
- [ ] Use npm run serve on port 3000 - should show the complete Abracadabra transformation

### Tips

- If the server doesn't open automatically, manually navigate to localhost:3000
- Check terminal output for any error messages during generation
- The transformation should be dramatic - all ACME content disappears, replaced with "Abracadabra Magic!" and colorful cowsay ASCII art
- Make sure all cowsay files are generated before the build script runs

### Completion

Once you've successfully run the magic and captured all evidence, you've completed the project! You now understand how npm scripts can automate development workflows and transform a simple project into something awesome.
