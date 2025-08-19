# Personal Blog

This is a personal blog built with Next.js that's now consistent with the main website's styling and includes the same banner component.

## Features

- ✅ **Consistent Styling**: Matches the main website's design and color scheme
- ✅ **Banner Integration**: Uses the same header/navigation as the main website
- ✅ **Theme Toggle**: Dark/light mode support with the same theme toggle functionality
- ✅ **Back to Home Button**: Easy navigation back to the main website
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Markdown Support**: Write blog posts in Markdown format

## Structure

```
blog/
├── app/                    # Next.js application
│   ├── pages/             # React pages
│   │   ├── _app.js        # Main app wrapper with banner
│   │   ├── index.js       # Blog listing page
│   │   └── [slug].js      # Individual blog post page
│   ├── posts/             # Markdown blog posts
│   ├── styles/            # CSS styles
│   ├── lib/               # Utility functions
│   ├── next.config.js     # Next.js configuration
│   ├── package.json       # Dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── postcss.config.js  # PostCSS configuration
├── index.html             # Built blog listing page
├── getting-started-with-nextjs/ # Built blog post
├── hello-world/           # Built blog post
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the blog directory:
   ```bash
   cd blog/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

1. Build the blog:
   ```bash
   npm run build
   ```

2. The built files will be automatically copied to the blog root directory.

## Adding New Blog Posts

1. Create a new Markdown file in `posts_md/` with the following frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   description: "Brief description of your post"
   tags: ["tag1", "tag2", "tag3"]
   ---

   Your post content here...
   ```

2. The post will automatically appear in the blog listing.

## Customization

### Styling

- Edit `app/styles/globals.css` to modify the blog's appearance
- The blog uses a consistent color scheme with the main website
- Dark/light mode is automatically supported

### Banner

- The banner is integrated in `app/pages/_app.js`
- It includes the same navigation and theme toggle as the main website
- The banner is fixed at the top for easy navigation

### Navigation

- Back to Home button: Returns to the main website
- Back to Blog button: Returns to the blog listing (on individual posts)

## Deployment

The blog is configured for static export and can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Dependencies

- **Next.js**: React framework
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **@tailwindcss/typography**: Typography plugin for better content styling

## Notes

- The blog uses the same theme system as the main website
- All styling is consistent with the main website's design language
- The banner provides seamless navigation between the blog and main website
- Posts are automatically formatted with proper typography and spacing
