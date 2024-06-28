/** @type {import('next').NextConfig} */
const nextConfig = {
    cssModules: true,
    async headers() {
        return [
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: '*',
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: 'GET',
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: 'X-Requested-With, content-type, Authorization',
                    },
                ],
            },
        ]
    },
   
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.maplabs.io",
                pathname: "/bridge/**"
            },
            {
                protocol: "https",
                hostname: "files.mapprotocol.io",
                pathname: "/bridge/**"
            },
            {
                protocol: "https",
                hostname: "cryptologos.cc"
            }
        ]
    }
};

export default nextConfig;
