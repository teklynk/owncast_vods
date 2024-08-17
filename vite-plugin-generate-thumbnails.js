import { resolve } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';

function generateThumbnails() {
    const videoDir = resolve('public/videos');
    const thumbnailDir = resolve('public/thumbnails');
    const videos = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));

    if (!fs.existsSync(thumbnailDir)) {
        console.error(`${thumbnailDir}: Does not exist`, err);
        return
    }

    videos.forEach(video => {
        const videoPath = resolve(videoDir, video);

        ffmpeg(videoPath)
            .screenshots({
                timestamps: ['600'], // 10 minutes
                filename: `${video.split('.mp4')[0]}_thumbnail.png`,
                folder: thumbnailDir,
                size: '1280x720'
            })
            .on('end', () => {
                console.log(`Generated thumbnail for ${video}`);
            })
            .on('error', err => {
                console.error(`Error generating thumbnail for ${video}:`, err);
            });
    });
}

export default function vitePluginGenerateThumbnails() {
    return {
        name: 'vite-plugin-generate-thumbnails',
        buildStart() {
            generateThumbnails();
        }
    };
}
