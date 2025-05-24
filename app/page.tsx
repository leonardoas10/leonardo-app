import { Container, Grid, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';

import ImageSlideshow from '@/components/images/ImageSlideshow';
import ExperienceTabs, { experienceData } from '@/components/experience/ExperienceTabs';

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        About
                    </Typography>
                    <Typography variant="body1" textAlign="justify">
                        Leonardo Aranguren is a Software Developer, Cloud
                        Engineer, and Technical Lead with a strong foundation in
                        AWS Cloud Technologies. He holds multiple{' '}
                        <Typography
                            component="span"
                            sx={{ color: 'textSecondary' }}
                            display="inline"
                        >
                            AWS Certifications
                        </Typography>
                        , including Developer Associate, Solutions Architect,
                        and Serverless, and has completed advanced training in
                        EKS, Networking Core, and Cloud Quests. Leonardo
                        graduated as a Higher University Technician in Foreign
                        Trade from Simón Bolívar University and is bilingual,
                        having completed studies with Open English. He brings a
                        bold and solution-driven approach to modern cloud
                        infrastructure and software development.
                    </Typography>
                </Grid>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ImageSlideshow />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 350,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            key="1"
                            src="/hiking.jpeg"
                            alt="Hiking"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                padding: '8px',
                                backdropFilter: 'blur(2px)',
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    lineHeight: 1,
                                }}
                            >
                                Teide, Tenerife - Spain
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h4" gutterBottom>
                        Driven by Discovery...
                    </Typography>
                    <Typography variant="body1" textAlign="justify">
                        Leonardo’s professional journey is fueled by a passion
                        for innovation and continuous learning. He actively
                        participates in{' '}
                        <Typography
                            component="span"
                            sx={{ color: 'textSecondary' }}
                            display="inline"
                        >
                            AWS Community Days
                        </Typography>{' '}
                        and tech meetups, where he both contributes and draws
                        inspiration from the cloud-native community. Always
                        exploring the latest advancements in cloud computing,
                        serverless architectures, and AI integrations, Leonardo
                        is on a constant quest to expand his skill set and stay
                        ahead of the curve. His drive for{' '}
                        <Typography
                            component="span"
                            sx={{ color: 'textSecondary' }}
                            display="inline"
                        >
                            excellence
                        </Typography>{' '}
                        is reflected in his commitment to earning new
                        certifications and applying cutting-edge technologies to
                        real-world solutions.
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Experience Highlights
                    </Typography>

                    <ExperienceTabs tabs={experienceData} />
                </Grid>
            </Grid>

            {/* Download CV */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    href="/cv.pdf"
                    download
                >
                    Download My CV
                </Button>
            </Box>
        </Container>
    );
}
