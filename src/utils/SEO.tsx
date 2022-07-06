import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface SEOProps {
    title: string;
    description: string;
    keywords: string;
    image: string;
}

const SEO = ({ title, description, keywords, image }: SEOProps) => {
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
                        url: image ,
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
