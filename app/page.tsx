import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { About } from '@/components/about/about';
import { ThumbImage } from '@/components/common/ThumbImage';
import { CloudFrontURLs } from '@/utils/constants';

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
