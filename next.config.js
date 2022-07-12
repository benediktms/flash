// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withAxiom(nextConfig);
