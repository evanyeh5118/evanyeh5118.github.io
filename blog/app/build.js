const fs = require('fs');
const path = require('path');

// Copy the built files to the blog root directory
// Next.js config outputs to '../posts' relative to the app directory
const sourceDir = path.join(__dirname, '..', 'posts');
const targetDir = path.join(__dirname, '..', 'posts');

if (fs.existsSync(sourceDir)) {
  // Copy all files from posts directory to blog root
  function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir(sourceDir, targetDir);
  console.log('Blog built successfully!');
} else {
  console.error('Build directory not found. Please run "npm run build" first.');
  console.error('Looking for:', sourceDir);
}
