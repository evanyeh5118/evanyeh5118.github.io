#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to set up image directories for new blog posts
 * Usage: node scripts/setup-post-images.js <post-slug>
 */

const postSlug = process.argv[2];

if (!postSlug) {
  console.error('Usage: node scripts/setup-post-images.js <post-slug>');
  console.error('Example: node scripts/setup-post-images.js my-new-post');
  process.exit(1);
}

const imagesDir = path.join(__dirname, '..', 'image_src', 'posts', postSlug);

try {
  // Create the images directory for the post
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`✅ Created images directory: ${imagesDir}`);
  } else {
    console.log(`ℹ️  Images directory already exists: ${imagesDir}`);
  }

  // Create a README file with usage instructions
  const readmePath = path.join(imagesDir, 'README.md');
  const readmeContent = `# Images for post: ${postSlug}

Place your images in this directory and reference them in your markdown file like this:

\`\`\`markdown
![Alt text](/images/posts/${postSlug}/your-image.png)

*Figure 1: Description of your figure*
\`\`\`

## Supported formats:
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- SVG (.svg)
- WebP (.webp)

## Tips:
- Use descriptive filenames
- Optimize images for web use
- Keep file sizes reasonable (< 1MB recommended)
- Use alt text for accessibility

## Note:
Images are stored in the source directory (image_src) and will be automatically copied to the public directory during build.
`;

  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`📝 Created README with usage instructions`);
  }

  console.log(`\n🎉 Setup complete for post: ${postSlug}`);
  console.log(`📁 Images directory: ${imagesDir}`);
  console.log(`📖 Check the README.md file in the images directory for usage instructions`);

} catch (error) {
  console.error('❌ Error setting up images directory:', error.message);
  process.exit(1);
}
