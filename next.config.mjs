/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export", // Включаем статический экспорт
    webpack(config, { isServer }) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(webm|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/_next/static/videos/',
                            outputPath: `${isServer ? '../' : ''}static/videos/`,
                            name: '[name].[hash].[ext]',
                        },
                    },
                ],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },

    // ...other config
};

export default nextConfig;