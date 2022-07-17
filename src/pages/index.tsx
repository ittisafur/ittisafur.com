import type { NextPage } from 'next';
import SEO from 'utils/SEO';

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';

// Import Swiper styles
import 'swiper/css';
import { memo } from 'react';
const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    return (
        <div className={cx('wrapper')}>
            <SEO
                title="Welcome, Home"
                description="Your go to guy for business solution"
                image="/assets/svg/logo-white.svg"
                keywords="web design, website design, website builder, wordpress, web developer, web designer, website creator, responsive web design"
            />
           
            <Intro />

        </div>
    );
};

const Intro = memo(() => {
    return (
        <div className="max-w-xl mx-auto">
          <h1 className="font-ProximaNovaBold text-3xl text-center uppercase text-cyan tracking-wider ">Hi, I'm Ittisafur</h1>
          <p className="tracking-wide mt-2">
            I'm a web developer and designer based in Dhaka, Bangladesh.
          </p>
          <p>
            Primarily focused on building modern, responsive websites and web accessibility websites.
          </p>
          <p>
            Love to experiment with new technologies and build awesome stuff.
          </p>

     <p>

      Diehard fan of <a href="https://www.vim.org/" target="_blank" rel="noopener noreferrer" className="text-cyan font-bold">Vim</a>, {' '}
      <a href="">i3wm</a>{' '}
      <a href="">tmux</a>{' '}
      Checkout my dotfiles 
      </p>       
          <p>
            Take a look at my portfolio and get in touch if you have any questions.
          </p>
        </div>
    )
})

Intro.displayName = 'Introduction';
Home.displayName = 'Home';

export default Home;
