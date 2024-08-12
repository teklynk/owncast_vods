import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginPugI18n from 'vite-plugin-pug-i18n';
import vitePluginGenerateThumbnails from './vite-plugin-generate-thumbnails';
import fs from 'fs-extra';

// Helper function to parse the filename and return a formatted date
function formatDateFromFilename(filename) {
    const datePattern = /^recording_(\d{8})_(\d{6})\.mp4$/;
    const match = filename.match(datePattern);

    if (match) {
        const [_, datePart, timePart] = match;
        const year = datePart.substring(0, 4);
        const month = datePart.substring(4, 6);
        const day = datePart.substring(6, 8);
        const hours = timePart.substring(0, 2);
        const minutes = timePart.substring(2, 4);
        const seconds = timePart.substring(4, 6);
        
        const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
        return date.toLocaleString(); // Format as human-readable date and time
    }
    return filename; // Fallback to the original filename if it doesn't match the pattern
}

export default defineConfig({
    base: '',
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
            locals: {
                // Original line to gather and sort video files
                videos: fs.readdirSync(resolve(__dirname, 'public/videos'))
                    .filter(file => file.endsWith('.mp4'))
                    .sort((a, b) => a.localeCompare(b))
                    .reverse()
                    // Map the video filenames to include both the original and formatted date
                    .map(file => ({
                        filename: file,
                        formattedDate: formatDateFromFilename(file)
                    }))
            },
            options: {},
        }),
        vitePluginGenerateThumbnails()
    ], 
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/main-[hash].js'
            }
        }
    }
});
