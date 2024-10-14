import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import CONFIG from './gitprofile.config';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: CONFIG.seo.title,
          metaDescription: CONFIG.seo.description,
          metaImageURL: CONFIG.seo.imageURL,
          metaGoogleTagManagerHead: CONFIG.googleTagManager.id && `<!-- Google Tag Manager --> <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${CONFIG.googleTagManager.id}');</script> <!-- End Google Tag Manager -->`,
          metaGoogleTagManagerBody: CONFIG.googleTagManager.id && `<!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${CONFIG.googleTagManager.id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) -->`,
          metaClarity: CONFIG.clarity.id && `<script type="text/javascript"> (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "${CONFIG.clarity.id}"); </script>`,
        },
      },
    }),
    ...(CONFIG.enablePWA
      ? [
        VitePWA({
          registerType: 'autoUpdate',
          workbox: {
            navigateFallback: undefined,
          },
          includeAssets: ['logo.png'],
          manifest: {
            name: 'Portfolio',
            short_name: 'Portfolio',
            description: 'Personal Portfolio',
            icons: [
              {
                src: 'logo.png',
                sizes: '64x64 32x32 24x24 16x16 192x192 512x512',
                type: 'image/png',
              },
            ],
          },
        }),
      ]
      : []),
  ],
  define: {
    CONFIG: CONFIG,
  },
});
