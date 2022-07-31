import React from 'react';
import { useRouter } from 'next/router';

const Portfolio = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className="container mx-auto">
            <h3 className="text-center text-xl text-cyan uppercase font-ProximaNovaBold tracking-wider underline">

            This Page is under Development. Please check back later.
      </h3>
            <h4>The {slug} Page</h4>
        </div>
    );
};

export default Portfolio;
