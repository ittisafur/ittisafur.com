/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GTM_ID: 'GTM-T2XMWBJ',
    NEXT_PUBLIC_GA4_MEASURMENT_ID: 'G-7VYVZFTH80',
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
