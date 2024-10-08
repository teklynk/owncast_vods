import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginPugI18n from 'vite-plugin-pug-i18n';
import vitePluginGenerateThumbnails from './vite-plugin-generate-thumbnails';
import fs from 'node:fs';

export default defineConfig({
    base: './', // running the website inside a sub directory
    resolve: {
        alias: {
            '~': resolve(__dirname, './node_modules')
        }
    },
    preview: {
        host: "0.0.0.0",
        port: 8000
    },
    plugins: [
        vitePluginPugI18n({
            pages: {
                baseDir: resolve(__dirname, 'src/pages')
            },
            //langs: {
            //    baseDir: resolve(__dirname, 'src/language')
            //},
            locals: {
                videos: fs.readdirSync(resolve(__dirname, 'public/videos')).filter(file => file.endsWith('.mp4')).sort((a, b) => a.localeCompare(b)).reverse()
            },
            options: {},
        }),
        vitePluginGenerateThumbnails()
    ],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'assets/main-[hash][extname]',
                entryFileNames: 'assets/main-[hash].js'
            }
        }
    }
});
