/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "gateway.ipfscdn.io",
      "bafybeidxd5cc2mbawfcrmgz273idstqhkyifwp42ulb7lbhdbi4b3tqqiy.ipfs.nftstorage.link",
    ],
  },
};

module.exports = nextConfig;
