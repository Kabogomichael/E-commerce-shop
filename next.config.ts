import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
   remotePatterns:[{
    protocol:"https",
    hostname:"mmjtualaqjusseitgmje.supabase.co"
   }]
  },
  typescript:{
    ignoreBuildErrors:true
  }

};

export default nextConfig;
