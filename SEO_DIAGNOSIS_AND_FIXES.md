# SEO Diagnosis Report for evanyeh5118.github.io

## Summary
Your website is well-structured with good SEO fundamentals, but there are several critical issues preventing proper Google indexing and search visibility.

---

## Critical Issues Found 🔴

### 1. **Broken Canonical URLs in Blog Posts** (CRITICAL)
**Problem:** Blog posts have `undefined` in their canonical URLs
- Example: `https://evanyeh5118.github.io/blog/posts/undefined/`

**Impact:** 
- Search engines can't properly index blog content
- SEO signals are broken
- Links may not work properly

**Root Cause:** Missing or incorrect slug parameter in the Next.js blog generation

**Fix Required:** Update the blog post generation script (`blog/app/pages/[slug].js`)

---

### 2. **Outdated Sitemap Dates** (HIGH PRIORITY)
**Problem:** All lastmod dates in `sitemap.xml` are `2024-01-01`
- Current date should be updated

**Impact:**
- Search engines see content as old/unchanged
- May not re-crawl your site
- Missing indexable updates

**Fix:** Update all lastmod dates to current date in `sitemap.xml`

---

### 3. **Missing SEO Elements in Sub-pages** (HIGH PRIORITY)
**Problem:** Publications and Projects pages have minimal SEO metadata

**Files Affected:**
- `publications/publications.html`
- `projects/projects.html`

**Missing Elements:**
- No canonical URLs
- No robots meta tags
- No structured data (JSON-LD)
- No Open Graph image tags
- Missing proper description meta tags

**Fix:** Add comprehensive SEO metadata to all sub-pages

---

## Medium Priority Issues 🟡

### 4. **JavaScript-Heavy Content**
**Problem:** Most content loads via JavaScript (projects, publications, recent items)

**Impact:** 
- Search engines may not execute all JavaScript
- Critical content may not be indexed
- Slow initial page load

**Recommendation:** Consider server-side rendering or pre-rendering static content

---

### 5. **No Google Search Console Verification**
**Missing:**
- No `google-site-verification` meta tag found
- No indication of Google Search Console setup

**Fix:** 
1. Verify your site in Google Search Console
2. Add verification meta tag to `index.html`

---

### 6. **Limited Content Volume**
**Observation:** 
- Only 2 blog posts
- No blog posts yet in 2025 (assuming we're in 2025)
- Limited unique content

**Impact:**
- Google favors sites with fresh, regular content
- Low content volume = lower search rankings

**Recommendation:** 
- Publish more blog posts
- Update content regularly
- Add more unique, valuable content

---

## Low Priority Issues 🟢

### 7. **Missing Alt Text for Some Images**
**Problem:** Some images may lack descriptive alt text

**Fix:** Ensure all images have descriptive, keyword-rich alt text

### 8. **No Internal Linking Strategy**
**Observation:** Limited internal linking between pages

**Fix:** Add more internal links to connect content

---

## What's Already Good ✅

1. ✅ Comprehensive meta tags on homepage
2. ✅ Structured data (JSON-LD) implemented
3. ✅ Open Graph and Twitter Cards for social sharing
4. ✅ Proper robots.txt configuration
5. ✅ XML sitemap exists
6. ✅ Semantic HTML structure
7. ✅ Mobile responsive design
8. ✅ Fast loading (using CDN for Tailwind)

---

## Recommended Actions (Priority Order)

### Immediate (Do Today) 🚨
1. **Fix broken canonical URLs** in blog posts
2. **Update sitemap.xml** with current dates
3. **Verify site in Google Search Console**

### This Week 📅
4. **Add comprehensive SEO to sub-pages** (publications, projects)
5. **Fix all missing meta tags**
6. **Add canonical URLs to all pages**

### Ongoing 🎯
7. **Publish more blog content** (aim for 2-4 posts/month)
8. **Update sitemap regularly**
9. **Monitor in Google Search Console**
10. **Build backlinks** from academic networks

---

## How to Check Your Current Status

### 1. Google Search Console
- Visit: https://search.google.com/search-console
- Add property: `https://evanyeh5118.github.io`
- Verify ownership and submit sitemap

### 2. Google Index Check
- Test: `site:evanyeh5118.github.io`
- See which pages are indexed

### 3. PageSpeed Insights
- Visit: https://pagespeed.web.dev/
- Test your site performance

### 4. Rich Results Test
- Visit: https://search.google.com/test/rich-results
- Verify structured data

---

## Expected Timeline

- **1-2 weeks:** Fix critical issues
- **2-4 weeks:** Google begins indexing properly
- **1-3 months:** Notice improved rankings
- **3-6 months:** Consistent search traffic

---

## Additional Notes

### Why GitHub Pages Sites Are Hard to Find
1. **No domain authority:** GitHub Pages subdomains have low authority
2. **Static site limitations:** Pure static sites have fewer SEO opportunities
3. **Generic domain:** `username.github.io` is not memorable
4. **Limited backlinks:** Few external sites link to GitHub Pages sites

### Long-term Solutions
1. **Consider custom domain:** `www.yuyeh.com` or similar
2. **Add more content:** Regular blog posts increase authority
3. **Build backlinks:** Academic profiles, project showcases, collaborations
4. **Add to directories:** Academic directories, portfolio sites

---

## Questions?

If you need help implementing these fixes, I can:
- Fix the broken blog URLs
- Update the sitemap
- Add missing SEO to sub-pages
- Help set up Google Search Console

Let me know which fixes you'd like me to start with!

