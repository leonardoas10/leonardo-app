import { Container, Grid, Typography, Button, Box } from '@mui/material';
import ImageSlideshow from '@/components/images/ImageSlideshow';

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
                        AWS cloud technologies. He holds multiple{' '}
                        <Typography
                            component="span"
                            sx={{ color: 'textSecondary' }}
                            display="inline"
                        >
                            AWS certifications
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
                <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ImageSlideshow />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography variant="h4" gutterBottom>
                        Skills
                    </Typography>
                    <Typography variant="body1" textAlign="justify">
                        React, Python, Terraform, Linux, CI/CD, Docker,
                        Kubernetes, etc. React, Python, Terraform, Linux, CI/CD,
                        Docker, Kubernetes, etc. React, Python, Terraform,
                        Linux, CI/CD, Docker, Kubernetes, etc. React, Python,
                        Terraform, Linux, CI/CD, Docker, Kubernetes, etc. React,
                        Python, Terraform, Linux, CI/CD, Docker, Kubernetes,
                        etc. React, Python, Terraform, Linux, CI/CD, Docker,
                        Kubernetes, etc.
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Experience Highlights
                    </Typography>
                    <Typography variant="body1">
                        Key projects in automation, serverless architectures,
                        and resilient systems.
                    </Typography>
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
