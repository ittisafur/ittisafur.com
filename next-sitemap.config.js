/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://ittisafur.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      additionalSitemaps: [ `${process.env.SITE_URL}/portfolio/sitemap.xml` ],
    }
};
