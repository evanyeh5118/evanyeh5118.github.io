# Blog Build System

This directory contains the Next.js blog application source code.

## Build Workflow

### 1. **Development**
```bash
npm run dev
```
Runs the development server for local testing.

### 2. **Build Only**
```bash
npm run build
```
Builds the blog and outputs static files to `../posts/` directory.

### 3. **Build and Copy**
```bash
npm run build:copy
# or
npm run export
```
Builds the blog and copies all files from `../posts/` to the blog root directory for deployment.

## Directory Structure

```
blog/
├── app/                    # Source code (this directory)
│   ├── pages/            # Next.js pages
│   ├── posts/            # Markdown source files
│   ├── styles/           # CSS styles
│   ├── lib/              # Utility functions
│   ├── build.js          # Build script
│   └── package.json      # Dependencies
├── posts/                 # Build output (generated HTML)
│   ├── index.html        # Main blog page
│   ├── 404.html          # Error page
│   ├── _next/            # Next.js assets
│   ├── hello-world/      # Post directory
│   └── getting-started-with-nextjs/  # Post directory
├── _next/                 # Legacy assets (can be cleaned up)
├── hello-world/           # Copied from posts/ (for deployment)
├── getting-started-with-nextjs/  # Copied from posts/ (for deployment)
├── 404/                  # Copied from posts/ (for deployment)
├── index.html            # Copied from posts/ (for deployment)
└── 404.html             # Copied from posts/ (for deployment)
```

## Build Process

1. **Source**: Markdown files in `app/posts/`
2. **Build**: Next.js generates HTML in `../posts/`
3. **Copy**: `build.js` copies files to blog root for deployment
4. **Deploy**: Upload the blog root directory to your web server

## Why This Structure?

- **Development**: Clean separation of source and build files
- **Organization**: All generated content in one place (`/posts/`)
- **Deployment**: Easy to upload entire blog directory
- **Maintenance**: Clear distinction between source and output

## Commands Summary

- `npm run dev` - Development server
- `npm run build` - Build only (outputs to `/posts/`)
- `npm run build:copy` - Build and copy to root (for deployment)
- `npm run export` - Same as build:copy (legacy command)
