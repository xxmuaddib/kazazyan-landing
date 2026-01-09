# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based landing page for "Haik Kazazyan" (violin artist). The site is bilingual (Russian/English) with content managed through Contentful CMS. It features a multi-page layout with sections and integrates Yandex Metrika for analytics.

## Development Commands

```bash
# Start development server (runs on http://localhost:8000)
yarn develop
# or
yarn start

# Build for production
yarn build

# Serve production build locally
yarn serve

# Clean Gatsby cache and public directory
yarn clean
```

## Architecture

### Content Management
- **Contentful CMS Integration**: All dynamic content (text, images, news, gallery, awards, contact info, SEO tags) is fetched from Contentful via GraphQL queries at build time
- Content supports bilingual fields with `field` (English) and `fieldRu` (Russian) naming convention
- Contentful configuration in `gatsby-config.js` includes space ID and access token

### Internationalization
- Language state managed in `localStorage` with key `"lang"`
- Default language is English (`"en"`)
- Language toggle available in mobile menu (currently commented out in desktop nav)
- Components receive `lang` prop and conditionally render based on language:
  ```javascript
  {lang === "ru" ? pageDataText.titleRu?.titleRu : pageDataText.title?.title}
  ```

### Component Structure
Components follow a pattern with two files:
- `ComponentName/index.js` - exports the component
- `ComponentName/ComponentName.js` - contains implementation

Main sections (in order on homepage):
1. **Header** - Fixed navigation with logo, menu, language switcher (mobile), social links
2. **CoverBlock** - Hero section with title and subtitle
3. **AboutUsBlock** - About section with text and image
4. **NewsBlock** - News listing with links to individual news pages
5. **AwardsBlock** - Awards/achievements display
6. **GalleryBlock** - Image gallery (limited to 5 on homepage, full on /gallery page)
7. **PressKitBlock** - Press kit information
8. **Footer** - Contact info, navigation, social links, copyright

### Pages
- `/` - Homepage with all sections
- `/gallery` - Full gallery page
- `/404` - Not found page

### Responsive Design
- Uses styled-components with media query breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: ≥ 1024px
  - Large Desktop: ≥ 1440px (max-width container)
- Mobile menu with full-screen overlay navigation

### Styling
- **styled-components** for all styling
- Global styles in `src/common/GlobalStyles.js`
- Primary font: "Bricolage Grotesque" (loaded via gatsby-plugin-webfonts)
- Color scheme: #F3F3F3 (light gray background), #222222 (dark/header/footer), #FFF (white sections)

### Analytics
- **Yandex Metrika** integration (ID: 104436956):
  - Loaded in both `gatsby-browser.js` (client-side) and `gatsby-ssr.js` (SSR)
  - Configured with webvisor, clickmap, ecommerce tracking
  - Route changes tracked via `onRouteUpdate` in `gatsby-browser.js`

### Gatsby Configuration
Key plugins:
- `gatsby-source-contentful` - CMS integration
- `gatsby-plugin-styled-components` - CSS-in-JS
- `gatsby-plugin-image` + `gatsby-plugin-sharp` - Image optimization
- `gatsby-plugin-webfonts` - Google Fonts loading
- `gatsby-plugin-react-helmet` - SEO meta tags

### Schema Customization
`gatsby-node.js` defines custom Contentful types, particularly `ContentfulContactData` with fields for addresses, phones, emails, and up to 6 social media links.

## Common Development Patterns

### Querying Contentful Data
```javascript
const pageData = useStaticQuery(graphql`
  query AllContentfulYourType {
    allContentfulYourType {
      nodes {
        title { title }
        titleRu { titleRu }
        text { text }
        textRu { textRu }
        image { url }
      }
    }
  }
`);

const pageDataText = pageData.allContentfulYourType.nodes?.[0] || {};
```

### Layout Pattern
Pages use nested container structure:
```javascript
<OuterContainer>        {/* Full-width, handles background color */}
  <InnerContainer>      {/* Constrained to 1440px, centers content */}
    {/* Content */}
  </InnerContainer>
</OuterContainer>
```

Container variants: `OuterContainer`, `WhiteOuterContainer`, `BlackOuterContainer`

### Anchor Links
Sections use invisible anchor divs positioned above the content to account for fixed header:
```javascript
const AnchorDiv = styled.div`
  position: absolute;
  top: -70px;  // Offset for header height
`;
```

## Important Notes

- Site URL in `gatsby-config.js` is placeholder (`yourdomain.tld`)
- Contentful credentials are hardcoded in config (should be environment variables in production)
- SEO tags dynamically loaded from Contentful per language
- Slick carousel CSS imported in `gatsby-browser.js`
- `react-slick` available for slider components (see MobileSlider)
