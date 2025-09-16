
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/',
    build: {
        sourcemap: true
    },
    plugins: [
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'service-worker.js',
            injectManifest: {
                injectionPoint: 'self.__WB_MANIFEST'
            },
            manifest: {
                name: 'Take Me Notes',
                short_name: 'Take Me',
                description: 'A simple note-taking PWA',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: '/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff'
            },
            devOptions: {
                enabled: true,
                type: 'module'
            }
        })
    ]
})