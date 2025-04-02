import Landing from '@/components/Landing';
import { Fragment } from 'react';
import { getClient } from '@/lib/apollo-client';
import { generateSEO } from '@/components/SEO';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import { GET_Landing_SEO_DATA } from '@/graphql/queries/meta';

export async function generateMetadata(): Promise<Metadata> {
    const client = getClient();

    try {
        const {
            data: {
                landing: { metaData: LandingSEO },
            },
        } = await client.query({
            query: GET_Landing_SEO_DATA,
        });

        const metaData: Partial<MetaData> = LandingSEO || {};

        return generateSEO({
            title: metaData?.title || '',
            description: metaData?.description,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/',
            noindex: false,
        });
    } catch {
        return generateSEO({
            title: '',
            description: '',
            pathname: '/',
        });
    }
}

export default async function Home() {
    return (
        <Fragment>
            <Landing />
        </Fragment>
    );
}
