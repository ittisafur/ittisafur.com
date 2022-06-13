import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
}

const SEO = ({ title, description, keywords }: SEOProps) => {
    const router = useRouter();
    const primaryDomain = process.env.NEXT_PUBLIC_SITE_ADDRESS;
    const CurrentPath = `${primaryDomain}${router.asPath}`;
    const BrandName = process.env.NEXT_PUBLIC_WEBSITE_BRAND_NAME;
    return (
        <NextSeo
            title={title}
            titleTemplate={`%s | ${BrandName}`}
            description={description}
            canonical={CurrentPath}
            openGraph={{
                description: description,
                site_name: BrandName,
                title: title,
                url: CurrentPath,
                images: [
                    {
                        url: `https://images.unsplash.com/photo-1655083607502-db391c40652e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1223&q=80`,
                        alt: title,
                    },
                ],
            }}
            additionalMetaTags={[
                {
                    content: keywords,
                    property: 'keywords',
                },
                {
                    content: '#000000',
                    property: 'theme-color',
                },
                {
                    content: 'website',
                    property: 'og:type',
                },
            ]}
        />
    );
};

export default SEO;
