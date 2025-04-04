/** @type {import('next-sitemap').IConfig} */
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client');
const fetch = require('cross-fetch');

// Create a dedicated Apollo client for sitemap generation
const createSitemapClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API || 'https://endpoints.ittisafur.com/graphql',
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};

// Define queries directly in this file to avoid import issues
const GET_PORTFOLIO_SLUGS = gql`
  query GetPortfolioSlugs {
    portfolios {
      Portfolio {
        slug
      }
    }
  }
`;

const GET_BLOG_SLUGS = gql`
  query GetBlogSlugs {
    blogs {
      slug
    }
  }
`;

module.exports = {
  // Your website URL - IMPORTANT: use the production URL, not localhost
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ittisafur.com',

  // Generate robots.txt
  generateRobotsTxt: true,

  // Default configuration
  changefreq: 'weekly',
  priority: 0.7,

  // IMPORTANT: These two settings ensure a single sitemap file
  sitemapSize: 50000,         // Make this larger than your total URLs
  generateIndexSitemap: false, // Disable sitemap index creation

  // Exclude paths
  exclude: ['/api/*', '/admin/*', '/404', '/500'],

  // Dynamic routes
  additionalPaths: async (config) => {
    console.log('Starting sitemap generation...');
    const result = [];
    const client = createSitemapClient();

    try {
      // Fetch portfolio slugs
      console.log('Fetching portfolio data...');
      const portfolioResponse = await client.query({
        query: GET_PORTFOLIO_SLUGS
      });

      const portfolioItems = portfolioResponse.data?.portfolios?.[0]?.Portfolio || [];
      console.log(`Found ${portfolioItems.length} portfolio items`);

      portfolioItems.forEach(item => {
        if (item && item.slug) {
          result.push({
            loc: `/portfolio/${item.slug}`,
            priority: 0.8,
            changefreq: 'monthly'
          });
        }
      });

      // Fetch blog slugs
      console.log('Fetching blog data...');
      const blogResponse = await client.query({
        query: GET_BLOG_SLUGS
      });

      const blogPosts = blogResponse.data?.blogs || [];
      console.log(`Found ${blogPosts.length} blog posts`);

      blogPosts.forEach(post => {
        if (post && post.slug) {
          result.push({
            loc: `/blog/${post.slug}`,
            priority: 0.7,
            changefreq: 'monthly'
          });
        }
      });

      console.log(`Added ${result.length} dynamic paths to sitemap`);
    } catch (error) {
      console.error('Error generating sitemap:', error);
    }

    return result;
  },

  // Robots.txt options
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
