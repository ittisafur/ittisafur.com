import { GET_BLOGS } from '@/graphql/queries/blog/getBlogs';
import { getClient } from '@/lib/apollo-client';
import React from 'react';
import BlogList from './BlogList';

const BlogLanding = async () => {
    const client = getClient();
    const { data } = await client.query({
        query: GET_BLOGS,
    });

    const blogItems = data?.blogs || [];

    return (
        <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8">
            <div
                className="container mx-auto mb-16 text-center"
                data-animate
                data-animate-order="1"
                data-animate-type="blur-to-sharp"
            >
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">
                    Latest Blog Entries
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2">
                    Exploring <span className="text-gray-400">Insights</span>
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
                    Beyond The{' '}
                    <span className="relative">
                        Surface.
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                    </span>
                </h2>
            </div>

            {/* Pass the data to our client component */}
            <BlogList blogItems={blogItems} />
        </div>
    );
};

export default BlogLanding;
