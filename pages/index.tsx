import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='px-3 lg:px-0 container mx-auto'>
      <div className='h-screen text-secondary flex justify-center items-center '>
        <div className='text-center'>
          <h1 className='text-4xl'>
            <span className='font-bold'>Welcome</span>, I'm working on bringing
            a new version pretty soon.
          </h1>
          <p className='my-4 text-xl'>
            In the meantime, if you are planning to contact me. I'm available at{' '}
            <a
              className='cursor-pointer hover:text-white transition-all duration-150 delay-75 ease-in'
              href='mailto:ittisafur@gmail.com'
            >
              ittisafur@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
