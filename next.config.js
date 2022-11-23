/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "poll",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./poll": "./components/Poll.tsx",
        },
        shared: {},
      })
    );

    return config;
  },
};
