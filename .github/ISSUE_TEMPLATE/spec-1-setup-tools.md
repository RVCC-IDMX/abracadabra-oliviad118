---
name: "Specification 1: Setup npm tools"
about: Setup npm, package.json, and install project dependencies
title: "Spec 1: Setup npm tools"
labels: ["status:todo", "type:specification"]
assignees: ""
---

## Specification 1: Setup npm tools

### Overview
Set up your development environment with npm, create a package.json file, and install the required dependencies for this project.

### Requirements checklist

- [ ] Initialize npm in the project directory (`npm init -y`)
- [ ] Install cowsay as a development dependency (`npm install --save-dev cowsay`)
- [ ] Install http-server as a development dependency (`npm install --save-dev http-server`)
- [ ] Add the following npm scripts to your package.json:
  - [ ] `"generate"`: Creates cowsay content files and builds HTML
  - [ ] `"serve"`: Starts http-server on port 3000
  - [ ] `"dev"`: Runs generate then serve
- [ ] Verify package.json contains all required scripts and dependencies

### Required npm scripts
Add these exact scripts to your package.json:

```json
{
  "scripts": {
    "generate": "cowsay 'Welcome to the most AWESOME website ever!' > generated/welcome.txt && cowsay -f dragon 'I am the guardian of this amazing site!' > generated/dragon.txt && cowsay -f tux 'Professional development tools make everything better!' > generated/tux.txt && node scripts/build-content.js",
    "serve": "http-server -p 3000 -o",
    "dev": "npm run generate && npm run serve"
  }
}
```

### Evidence required
Create a folder called `evidence/spec-1/` in your project root and include:

1. **terminal-npm-init.png** - Screenshot showing `npm init -y` command and output
2. **terminal-install-deps.png** - Screenshot showing installation of cowsay and http-server
3. **package-json.png** - Screenshot of your complete package.json file showing all scripts and dependencies
4. **terminal-verify.png** - Screenshot showing `npm list --depth=0` to verify installed packages

### Success criteria
- [ ] `npm init -y` creates package.json successfully
- [ ] `npm install --save-dev cowsay http-server` completes without errors
- [ ] package.json contains all required scripts exactly as specified
- [ ] `npm list --depth=0` shows cowsay and http-server as devDependencies
- [ ] All evidence screenshots are clear and complete

### Tips
- Run commands from your project root directory
- If you get permission errors, make sure you're not using `sudo` with npm
- The scripts must be exactly as shown above for the magic to work
- Don't worry if the website still looks boring - that's the point at this stage!

### Next step
Once completed, move on to **Specification 2: Run the magic** to see the transformation happen.