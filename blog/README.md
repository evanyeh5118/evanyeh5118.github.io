# Personal Blog

This is a Next.js blog that integrates with your main personal website repository.

## Structure

```
/blog/
  app/                    # Next.js source code
    package.json         # Dependencies and scripts
    next.config.js      # Next.js configuration
    lib/posts.js        # Blog post utilities
    posts/*.md          # Markdown blog posts
    pages/              # Next.js pages
    styles/             # CSS styles
  index.html            # Blog listing page
  <slug>/               # Individual post directories
    index.html          # Post pages
  _next/                # Next.js assets
  README.md             # This file
```

## Getting Started

### Development

1. Navigate to the blog directory:
   ```bash
   cd blog/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The blog will be available at `http://localhost:3001/blog`

### Building for Production

1. Build the static site:
   ```bash
   npm run build
   ```

   This will:
   - Build the Next.js app
   - Export static files to `/blog/out/`
   - Copy files to `/blog/` for GitHub Pages

2. The static files will be ready for GitHub Pages

## Adding New Posts

1. Create a new `.md` file in `/blog/app/posts/`
2. Add YAML frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   description: "Brief description of the post"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content in Markdown
4. Build the site to see your new post

## Configuration

- **Base Path**: `/blog` (configured in `next.config.js`)
- **Static Export**: Enabled for GitHub Pages compatibility
- **Trailing Slash**: Enabled for clean URLs
- **Output Directory**: `../out` (one level up from app)

## GitHub Pages

The blog is configured to work with GitHub Pages serving from the repository root. After building, the static files in `/blog/` will be accessible at:

- Blog listing: `yourdomain.com/blog/`
- Individual posts: `yourdomain.com/blog/<slug>/`

## Dependencies

- **Next.js**: React framework
- **React**: UI library
- **Gray-matter**: YAML frontmatter parsing
- **Remark**: Markdown processing
- **Date-fns**: Date formatting

## Scripts

- `npm run dev`: Development server
- `npm run build`: Build and export static site
- `npm run start`: Production server (for testing)
- `npm run lint`: Code linting

## Build Process

1. `npm run build` generates static files in `/blog/out/`
2. Files are automatically copied to `/blog/` for GitHub Pages
3. The `out/` directory is cleaned up after copying
