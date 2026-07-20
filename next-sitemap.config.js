/** @type { import('next-sitemap').IConfig } */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: './out',
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 1.0,
    autoLastmod: true,

    // Exclusion de certaines pages
    exclude: [
        '/dashboard',
        '/dashboard/*',
        '/authentication/*'
    ],

    // Configuration pour le fichier robots.txt
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: [
                    "/dashboard",
                    "/authentication"
                ]
            }
        ]
    }
}