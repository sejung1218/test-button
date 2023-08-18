/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/:path*",
                // destination: "http://192.168.50.67:8080/:path*"
                destination: "http://192.168.100.188:8080/:path*"
            }
        ]
    }
}

module.exports = nextConfig
