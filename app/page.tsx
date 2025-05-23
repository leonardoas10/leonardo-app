import { Container, Grid, Typography, Button, Box } from '@mui/material';
import ImageSlideshow from '@/components/images/ImageSlideshow';

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        About Me
                    </Typography>
                    <Typography variant="body1">
                        I'm a Site Reliability Engineer with AWS certifications
                        and a passion for automation, CI/CD, and scalable cloud
                        infrastructure. I'm a Site Reliability Engineer with AWS
                        certifications and a passion for automation, CI/CD, and
                        scalable cloud infrastructure. I'm a Site Reliability
                        Engineer with AWS certifications and a passion for
                        automation, CI/CD, and scalable cloud infrastructure.
                        I'm a Site Reliability Engineer with AWS certifications
                        and a passion for automation, CI/CD, and scalable cloud
                        infrastructure. I'm a Site Reliability Engineer with AWS
                        certifications and a passion for automation, CI/CD, and
                        scalable cloud infrastructure. I'm a Site Reliability
                        Engineer with AWS certifications and a passion for
                        automation, CI/CD, and scalable cloud infrastructure.
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
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
                    <Typography variant="body1">
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
