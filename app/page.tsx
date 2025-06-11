import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';

import { About } from '@/components/about/about';
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
                <Image
                    src={`${CloudFrontURLs.IMAGES}/teide.webp`}
                    alt="Teide, Terife, Spain"
                    fill
                    priority
                    sizes="(max-width: 600px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL="9E F7 0D 35 8A 95 88 67 5F 76 87 95 89 47 77 77 78 60 95 06 56"
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
