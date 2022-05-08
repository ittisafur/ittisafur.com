/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const moduleExports = withPlugins([withImages, { silent: false }], {
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        outputStandalone: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
});

module.exports = moduleExports;
