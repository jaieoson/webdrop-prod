/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["aws-s3-upload-ash.s3.sa-east-1.amazonaws.com", "avatars.githubusercontent.com", "lh3.googleusercontent.com", "limg.app"]
   
    },
    
  }
  
  module.exports = nextConfig
  