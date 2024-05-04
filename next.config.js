/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GTM_ID: 'GTM-T2XMWBJ',
    NEXT_PUBLIC_GA4_MEASURMENT_ID: 'G-7VYVZFTH80',
    NEXT_PUBLIC_POSTHOG_KEY: 'phc_7pB8k3PKt7XoCW2ofbKn3MbtejoBaz5KqlHjSeGA46R',
    NEXT_PUBLIC_POSTHOG_HOST: 'https://us.i.posthog.com'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
};
