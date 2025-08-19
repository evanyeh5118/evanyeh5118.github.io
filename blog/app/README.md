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

### 3. **Export**
```bash
npm run export
```
Builds the blog and outputs static files to `../posts/` directory for deployment.

## Directory Structure

```
blog/
├── app/                    # Source code (this directory)
│   ├── pages/            # Next.js pages
│   ├── posts/            # Markdown source files
│   ├── styles/           # CSS styles
│   ├── lib/              # Utility functions
│   └── package.json      # Dependencies
├── posts/                 # Build output (generated HTML)
│   ├── index.html        # Main blog page
│   ├── 404.html          # Error page
│   ├── _next/            # Next.js assets
│   ├── hello-world/      # Post directory
│   └── getting-started-with-nextjs/  # Post directory
```

## Build Process

1. **Source**: Markdown files in `app/posts/`
2. **Build**: Next.js generates HTML in `../posts/`
3. **Deploy**: Upload the `posts/` directory to your web server

## Why This Structure?

- **Development**: Clean separation of source and build files
- **Organization**: All generated content in one place (`/posts/`)
- **Deployment**: Simple - just upload the `posts/` directory
- **Maintenance**: Clear distinction between source and output
- **No Duplication**: Single source of truth for all built files

## Commands Summary

- `npm run dev` - Development server
- `npm run build` - Build only (outputs to `/posts/`)
- `npm run export` - Build and export (outputs to `/posts/`)
