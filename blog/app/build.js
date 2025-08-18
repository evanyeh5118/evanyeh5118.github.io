const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to remove directory recursively
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Main build process
async function build() {
  console.log('🚀 Building Next.js app...');
  
  try {
    // Build the Next.js app (this will be run by npm script)
    console.log('✅ Build completed successfully!');
    
    // Copy files from out/ to parent directory
    const outDir = path.join(__dirname, '..', 'out');
    const targetDir = path.join(__dirname, '..');
    
    if (fs.existsSync(outDir)) {
      console.log('📁 Copying static files...');
      copyDir(outDir, targetDir);
      console.log('✅ Files copied successfully!');
      
      // Clean up out directory
      console.log('🧹 Cleaning up build artifacts...');
      removeDir(outDir);
      console.log('✅ Cleanup completed!');
      
      console.log('🎉 Blog is ready for GitHub Pages!');
      console.log('📍 Access at: yourdomain.com/blog/');
    } else {
      console.log('❌ Build output not found. Make sure to run "npm run build" first.');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build if this script is executed directly
if (require.main === module) {
  build();
}

module.exports = { build };
