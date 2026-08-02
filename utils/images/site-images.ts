/** CloudFront image filenames used on the site — source list for thumbhash generation. */
export const SITE_IMAGE_FILES = [
    'teide.webp',
    'developer-associate-badge.webp',
    'solutions-architect-badge.webp',
    'cq-generative-ai.webp',
    'cq-serverless.webp',
    'cq-data-analytics.webp',
    'cq-networking.webp',
    'cq-security.webp',
    'cq-solutions-architect.webp',
    'cq-cloud-practitioner.webp',
    'serverless-badge.webp',
    'amazon-eks-badge.webp',
    'networking-core-badge.webp',
    'cloud-practitioner-badge.webp',
    'architecture.webp',
    'white-architecture.webp',
] as const;

export type SiteImageFile = (typeof SITE_IMAGE_FILES)[number];
