import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import { PortfolioAPI as API } from 'pages/api/Portfolio';

const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_ADDRESS;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const data = API.data.portfolio.map((slug) => {
        return {
            lastmod: new Date().toISOString(),
            loc: `${WEBSITE_URL}/portfolio/${slug.slug}`,
        };
    });

    return getServerSideSitemapLegacy(ctx, data);
};

const schema = () => {};

export default schema;
