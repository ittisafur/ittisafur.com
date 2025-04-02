import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge'; // Optional: Use edge runtime
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoUrl = searchParams.get('url');

        if (!videoUrl) {
            return NextResponse.json({ error: 'No video URL provided' }, { status: 400 });
        }

        // Handle YouTube URLs
        if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
            const videoId = videoUrl.includes('youtu.be')
                ? videoUrl.split('youtu.be/')[1]
                : new URLSearchParams(new URL(videoUrl).search).get('v');

            if (!videoId) {
                return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
            }

            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return NextResponse.json({ embedUrl });
        }

        // For other video types
        return NextResponse.json({ url: videoUrl });
    } catch (error) {
        console.error('Video processing error:', error);
        return NextResponse.json({ error: 'Failed to process video URL' }, { status: 500 });
    }
}
