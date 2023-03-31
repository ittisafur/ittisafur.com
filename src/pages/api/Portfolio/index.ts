const PortfolioAPI = {
    page: 1,
    totalPage: 3,
    data: {
        portfolio: [
            {
                id: 1,
                title: 'Raush',
                slug: 'raush',
                startDate: '2022-01-21',
                endDate: '',
                isWorking: true,
                hasDesign: false,
                workType: 'Part Time',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/Portfolio/raush.png',
                    images: [],
                },
                summary: 'Turning Content into Products',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://rau.sh',
            },
            {
                id: 2,
                title: 'Banana Boyz Club',
                slug: 'banana-boyz-club',
                startDate: '2022-01-21',
                endDate: '2022-07-21',
                isWorking: false,
                hasDesign: true,
                workType: 'Contract',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1663187274/personal_website/portfolio/banana-boyz-club/thumbnail_u9nifz.png',
                    images: [
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1662747663/Personal%20Website/Portfolio/banana_boyz_club_roadmap.png',
                    ],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://bananaboyzclub.io',
            },
            {
                id: 3,
                title: 'Protoconn',
                slug: 'protoconn',
                startDate: '2022-02-25',
                endDate: '2022-05-31',
                isWorking: false,
                hasDesign: true,
                workType: 'Contract',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1679869295/personal_website/portfolio/protoconn/2023-03-27_04-20_evkvrd.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://protoconn.com',
            },
            {
                id: 4,
                title: 'Think Studio',
                slug: 'think-studio',
                startDate: '2021-02-01',
                endDate: '2021-05-31',
                isWorking: false,
                hasDesign: false,
                workType: 'Contract',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1679869660/personal_website/portfolio/think-studio/2023-03-27_04-24_bxekqw.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://protoconn.com',
            },
            {
                id: 5,
                title: 'WilsonH',
                slug: 'wilsonh',
                startDate: '2021-02-01',
                endDate: '2021-05-31',
                isWorking: false,
                hasDesign: false,
                workType: 'Contract',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/Portfolio/raush.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: null,
            },
            {
                id: 6,
                title: 'Rehash LTD',
                slug: 'rehash-ltd',
                startDate: '2021-02-01',
                endDate: '2021-05-31',
                isWorking: false,
                hasDesign: true,
                workType: 'Contract',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideProject: false,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1679869758/personal_website/portfolio/rehashltd/2023-03-27_04-28_wxzirz.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://rehashltd.com',
            },
            {
                id: 7,
                title: 'Movie app',
                slug: 'movie-app',
                startdate: '2021-02-01',
                enddate: '2021-05-31',
                isworking: false,
                hasdesign: true,
                worktype: 'side project',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideproject: true,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1679869819/personal_website/portfolio/movie-app/2023-03-27_04-29_mhwqe1.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://movieapp.ittisafur.com',
            },
            {
                id: 8,
                title: 'KB Trust',
                slug: 'kb-trust',
                startdate: '2021-02-01',
                enddate: '2021-05-31',
                isworking: false,
                hasdesign: false,
                worktype: 'Professional',
                location: 'Remote',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, sodales cursus integer tristique nulla praesent senectus interdum. Quam nunc, ut posuere ut feugiat nisi viverra vitae. Pulvinar eget ipsum, nulla duis vel. Posuere nec commodo nulla in ac ullamcorper aenean.',
                sideproject: true,
                media: {
                    thumbnail:
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1618826713/Portfolio/kbtrust.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: [
                    {
                        title: 'React.js',
                        icon: '/assets/svg/react.svg',
                    },
                    {
                        title: 'Next.js',
                        icon: '/assets/svg/next.svg',
                    },
                    {
                        title: 'Typescript',
                        icon: '/assets/svg/typescript.svg',
                    },
                    {
                        title: 'Tailwindcss',
                        icon: '/assets/svg/tailwindcss.svg',
                    },
                    {
                        title: 'MUI',
                        icon: '/assets/svg/mui.svg',
                    },
                    {
                        title: 'React Query',
                        icon: '/assets/svg/react-query.svg',
                    },
                    {
                        title: 'Playwright',
                        icon: '/assets/svg/playwright.svg',
                    },
                    {
                        title: 'Yarn Workspace',
                        icon: '/assets/svg/yarn.svg',
                    },
                    {
                        title: 'Gitlab CI',
                        icon: '/assets/svg/gitlab.svg',
                    },
                ],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://kbtrust.com',
            },
        ],
    },
};

export { PortfolioAPI };
