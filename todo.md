# Project Improvement Plan: Next.js Markdown Blog

## Phase 1: Project Foundation & Cleanup

- [x] Audit and update all dependencies (Next.js, React, etc.)
- [ ] Remove unused packages and files
- [x] Set up Prettier and ESLint for code consistency
- [x] Add Husky for pre-commit hooks
- [x] Update README with project overview and setup instructions

## Phase 2: Content & Markdown Enhancements

- [x] Organize markdown content into a clear folder structure (e.g., `content/posts/`)
- [x] Enhance frontmatter metadata (author, readingTime, status, lastModified, etc.)
- [x] Add support for MDX (React components in markdown)
- [x] Implement syntax highlighting for code blocks
- [x] Add support for custom markdown extensions (tables, footnotes, etc.)

## Phase 3: App Router Migration & Structure

- [ ] Migrate from Pages Router to App Router (`app/` directory)
- [ ] Set up layouts, templates, and error boundaries
- [ ] Implement static generation for blog posts
- [ ] Add dynamic routing for blog slugs
- [ ] Refactor components for modularity (UI, features, layouts)

## Phase 4: Blog Features & UX Improvements

- [ ] Implement blog context for categories, tags, and filtering
- [ ] Add search functionality for posts
- [ ] Implement tag cloud and category navigation
- [ ] Add related posts section
- [ ] Add reading progress bar and estimated reading time
- [ ] Implement table of contents for long posts
- [ ] Add social sharing buttons
- [ ] Integrate a comment system (e.g., Giscus or Disqus)
- [ ] Add newsletter subscription form

## Phase 5: Performance, SEO & Analytics

- [ ] Optimize images using `next/image`
- [ ] Add proper metadata and Open Graph tags
- [ ] Implement sitemap and RSS feed generation
- [ ] Integrate analytics (Google Analytics or Plausible)
- [ ] Implement proper caching strategies

## Phase 6: Testing & Security

- [ ] Set up Jest and React Testing Library for unit tests
- [ ] Add E2E testing with Cypress or Playwright
- [ ] Add security headers and CSP in `next.config.js`
- [ ] Review and improve accessibility (a11y)

## Phase 7: Documentation & Launch

- [ ] Update documentation for all new features
- [ ] Add usage examples and code comments
- [ ] Prepare a launch checklist
- [ ] Announce the relaunch and gather feedback
