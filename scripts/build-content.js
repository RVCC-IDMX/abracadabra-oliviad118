#!/usr/bin/env node

// build-content.js - Combines cowsay files into awesome HTML content
const fs = require('fs');
const path = require('path');

console.log('🔨 Building awesome content from cowsay files...');

// Ensure generated directory exists
const generatedDir = path.join(__dirname, '..', 'generated');
if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
    console.log('📁 Created generated directory');
}

// Define the files we expect from cowsay
const cowsayFiles = [
    { file: 'welcome.txt', title: 'Welcome Message' },
    { file: 'dragon.txt', title: 'Dragon Guardian' },
    { file: 'tux.txt', title: 'Professional Tux' }
];

// Function to safely read a text file and escape HTML
function readAndEscapeFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Escape HTML characters but preserve formatting
        return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    } catch (error) {
        console.error(`⚠️  Could not read ${filePath}:`, error.message);
        return `Error loading content from ${path.basename(filePath)}`;
    }
}

// Read all cowsay files
const cowsayContent = cowsayFiles.map(({ file, title }) => {
    const filePath = path.join(generatedDir, file);
    console.log(`📖 Reading ${file}...`);
    const content = readAndEscapeFile(filePath);
    
    return {
        title,
        content,
        found: fs.existsSync(filePath)
    };
});

// Create the HTML content
const htmlContent = `
<div class="cowsay-content">
    <div class="cowsay-celebration">
        <h4>🎉 TRANSFORMATION COMPLETE! 🎉</h4>
        <p>You've successfully used npm scripts to create something awesome!</p>
    </div>
    
    ${cowsayContent.map(({ title, content, found }) => `
        <div class="cowsay-section">
            <h4>✨ ${title}</h4>
            ${found 
                ? `<pre class="cowsay-ascii">${content}</pre>`
                : `<p class="cowsay-error">❌ ${title} content not found</p>`
            }
        </div>
    `).join('')}
    
    <div class="cowsay-celebration">
        <h4>🚀 What You Just Learned!</h4>
        <p>✅ How to use npm init to create a package.json file</p>
        <p>✅ How to install packages with npm install</p>
        <p>✅ How to create npm scripts for automation</p>
        <p>✅ How to chain commands together for powerful workflows</p>
        <p>✅ How development servers can enhance web development</p>
        <p>🌟 You're now ready to build amazing things with npm!</p>
    </div>
</div>
`;

// Write the combined HTML file
const outputPath = path.join(generatedDir, 'cowsay-content.html');

try {
    fs.writeFileSync(outputPath, htmlContent.trim());
    console.log('✅ Successfully created cowsay-content.html');
    
    // Report on what we found
    const foundFiles = cowsayContent.filter(c => c.found).length;
    const totalFiles = cowsayContent.length;
    
    console.log(`📊 Content summary: ${foundFiles}/${totalFiles} cowsay files found`);
    
    if (foundFiles === totalFiles) {
        console.log('🎊 All cowsay content successfully processed!');
        console.log('🌐 Ready to serve on port 3000 for the full experience!');
    } else {
        console.log('⚠️  Some cowsay files were missing, but content was still generated');
    }
    
} catch (error) {
    console.error('❌ Error writing cowsay-content.html:', error.message);
    process.exit(1);
}

console.log('🏁 Build complete! Run "npm run serve" to see the magic happen!');