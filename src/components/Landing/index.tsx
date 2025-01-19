import React, { Fragment } from 'react';
import SocialButtons from '../Socials';
import { PortfolioAPI } from '@/utlis/dummy-data';
import GlowingButton from '../ui/glowing-button';

const Landing = () => {
    const filterFeaturedWorks = PortfolioAPI.data.portfolio.filter(
        (work) => work.breakthrough === true
    );

    const renderFeaturedWorks = () => {
      if (!filterFeaturedWorks.length) return <Fragment />
      
      const dataset = filterFeaturedWorks.map((content, index) => {
          return (
              <div>{content.title}</div>
          ) 
        })

      return dataset;
    }
    return (
        <Fragment>
            <section className="min-h-screen flex flex-col pt-0.5 md:pt-4 md:justify-center">
                <div className="flex flex-col font-inter gap-y-6">
                    <p>Hey, I&apos;m</p>
                    <h1 className="text-gradient text-4xl md:text-5xl lg:text-6xl font-figtree font-semibold tracking-wide">
                        Ittisafur Rahman
                    </h1>
                    <p>
                        I&apos;m a seasoned Full Stack Developer with over six years of experience,
                        starting my tech journey in 2013 with HTML/CSS out of curiosity. From 2017
                        I&apos;ve worked as a freelancer. Since 2019 I&apos;ve been working as a
                        Professional Web Developer. I&apos;ve sharpened my skills across various
                        tech stacks and frameworks through freelancing and contract work, always
                        aiming to push technical boundaries and foster community growth. I&apos;m
                        keen on exploring new opportunities and collaborations—let&apos;s connect
                        and see how I can help propel your business forward!
                    </p>
                </div>

        <div className="block lg:hidden py-12 lg:py-0">
          <GlowingButton href="/contact" className="text-it-white min-w-56">
Let&apos;s Talk
          </GlowingButton>
        </div>
                <div className="mt-8 md:mt-24 lg:mt-52">
                    <SocialButtons />
                </div>
            </section>

            <section>
                <div className="flex flex-col">
      {renderFeaturedWorks()}

        </div>
            </section>
        </Fragment>
    );
};

export default Landing;
