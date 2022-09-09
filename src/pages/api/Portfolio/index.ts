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
                summary: 'This is a summary',
                stack: ['React', 'Next.js', 'Typescript', 'Tailwind'],
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
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658417518/Portfolio/Banana_Boyz_Club_nphhr8.png',
                    images: [
                        'https://res.cloudinary.com/dv7g8veki/image/upload/v1662747663/Personal%20Website/Portfolio/banana_boyz_club_roadmap.png',
                    ],
                },
                summary: 'This is a summary',
                stack: ['React.js', 'Next.js', 'Typescript', 'Tailwind'],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://bananaboyzclub.io',
            },
            {
                id: 3,
                title: 'Protoconn',
                slug: 'protoconn',
                startDate: '2022-02-01',
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
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/Portfolio/raush.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: ['React.js', 'Next.js', 'Typescript', 'Tailwind'],
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
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/Portfolio/raush.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: ['React.js', 'Next.js', 'Typescript', 'Tailwind'],
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
                stack: ['Vue.js', 'Tailwind'],
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
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/Portfolio/raush.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: ['Wordpress', 'PHP', 'Bootstrap', 'ACF Pro'],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://rehashltd.com',
            },
            {
                id: 7,
                title: 'movie app',
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
                        'https://res.cloudinary.com/dv7g8veki/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1658408288/portfolio/raush.png',
                    images: [],
                },
                summary: 'This is a summary',
                stack: ['Wordpress', 'PHP', 'Bootstrap', 'ACF Pro'],

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
                stack: ['Wordpress', 'Customization', 'Beaver Builder'],
                testimonial:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar nullam est egestas lorem elit duis. Maecenas id amet enim, lorem elit sed.',
                url: 'https://kbtrust.com',
            },
        ],
    },
};

export { PortfolioAPI };
