import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { About } from '@/components/about/about';
import { ThumbImage } from '@/components/common/ThumbImage';
import { CloudFrontURLs } from '@/utils/constants';

// Dynamically import components that aren't needed immediately
const ImageSlideshow = dynamic(
    () =>
        import('@/components/images/ImageSlideshow').then(
            (mod) => mod.ImageSlideshow
        ),
    { ssr: true }
);

const ExperienceTabs = dynamic(
    () =>
        import('@/components/tabs/ExperienceTabs').then(
            (mod) => mod.ExperienceTabs
        ),
    { ssr: true }
);

export default function Home() {
    return (
        <About
            teideImage={
                <ThumbImage
                    src={`${CloudFrontURLs.IMAGES}/teide.webp`}
                    alt="Teide, Terife, Spain"
                    fill
                    priority
                    sizes="(max-width: 600px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                />
            }
            imageSlideshow={
                <Suspense
                    fallback={
                        <div style={{ height: 300, width: '100%' }}></div>
                    }
                >
                    <ImageSlideshow />
                </Suspense>
            }
            experienceTabs={
                <Suspense
                    fallback={
                        <div style={{ height: 300, width: '100%' }}></div>
                    }
                >
                    <ExperienceTabs />
                </Suspense>
            }
        />
    );
}
