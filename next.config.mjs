/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: false,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: `${process.env.SUPABASE_PROJECT_URL_WITHOUT_HTTPS}`,
          },
        ],
      },
};

export default nextConfig;
