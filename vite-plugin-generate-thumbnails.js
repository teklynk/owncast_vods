import fs from 'fs-extra';
import { resolve } from 'path';
import ffmpeg from 'fluent-ffmpeg';

function generateThumbnails() {
    const videoDir = resolve('public/videos');
    const thumbnailDir = resolve('public/thumbnails');
    const videos = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));
    fs.ensureDirSync(thumbnailDir);

    videos.forEach(video => {
        const videoPath = resolve(videoDir, video);

        ffmpeg(videoPath)
            .screenshots({
                timestamps: ['30'],
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
