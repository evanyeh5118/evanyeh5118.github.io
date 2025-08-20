# Guide to Embedding Figures in Blog Posts

This guide explains how to embed figures and images in your blog posts using the updated markdown processing system.

## Directory Structure

Images for blog posts should be placed in the following directory structure:

```
blog/app/public/images/posts/
├── post-slug-1/
│   ├── figure1.png
│   ├── diagram.jpg
│   └── chart.svg
├── post-slug-2/
│   ├── image1.png
│   └── image2.jpg
└── ...
```

## Supported Image Formats

The following image formats are supported:
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- SVG (.svg)
- WebP (.webp)

## How to Embed Images

### 1. Basic Image Embedding

Use standard markdown syntax to embed images:

```markdown
![Alt text](/images/posts/post-slug/image-name.png)
```

**Example:**
```markdown
![Website Architecture](/images/posts/inital_post/website-architecture.png)
```

### 2. Images with Captions

Add captions below images using italics:

```markdown
![Alt text](/images/posts/post-slug/image-name.png)

*Figure 1: Description of the figure*
```

**Example:**
```markdown
![Control System Diagram](/images/posts/control-systems/system-overview.png)

*Figure 1: Overview of the control system architecture*
```

### 3. Images with Links

Make images clickable by wrapping them in a link:

```markdown
[![Alt text](/images/posts/post-slug/image-name.png)](https://example.com)
```

### 4. Responsive Images

Images are automatically made responsive and will scale appropriately on different screen sizes.

## Best Practices

1. **Naming Convention**: Use descriptive, lowercase names with hyphens for image files
2. **Alt Text**: Always provide meaningful alt text for accessibility
3. **File Organization**: Keep images organized in folders named after your post slug
4. **Image Optimization**: Optimize images for web use (compress PNGs, use appropriate formats)
5. **Captions**: Use captions to provide context and explanations for complex figures

## Example Post Structure

Here's how a complete post with figures might look:

```markdown
---
title: "My Research on Control Systems"
date: "2025-08-20"
description: "An overview of my research in control theory"
tags: ["research", "control-systems"]
---

# My Research on Control Systems

## Introduction

Control systems are fundamental to modern engineering...

## System Architecture

Here's the overall architecture of my control system:

![System Architecture](/images/posts/control-systems/architecture.png)

*Figure 1: High-level system architecture showing the main components*

## Performance Results

The system demonstrates excellent performance:

![Performance Chart](/images/posts/control-systems/performance.png)

*Figure 2: Performance metrics over time showing stability improvements*

## Conclusion

This research shows promising results...
```

## Troubleshooting

### Images Not Displaying

1. Check that the image path is correct
2. Ensure the image file exists in the specified directory
3. Verify the image format is supported
4. Check that the post slug in the path matches your actual post

### Build Errors

If you encounter build errors:
1. Make sure all required npm packages are installed
2. Check that image files are not corrupted
3. Verify the markdown syntax is correct

## Advanced Features

The system supports:
- Automatic image optimization
- Responsive design
- Lazy loading for better performance
- Accessibility features (alt text support)

## Need Help?

If you encounter issues with figure embedding, check:
1. The image file exists and is accessible
2. The markdown syntax is correct
3. The directory structure follows the convention
4. All required dependencies are installed
