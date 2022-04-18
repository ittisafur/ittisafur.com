/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const moduleExports = withPlugins([withImages], {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
});

module.exports = moduleExports;
