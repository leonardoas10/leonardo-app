import { TextField, Box, Typography, Snackbar, Alert } from '@mui/material';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef } from 'react';

import type { Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/utils/analytics/trackEvent';
import { useRecaptcha } from '@/utils/hooks/useRecaptcha';
import { useTranslation } from '@/utils/hooks/useTranslation';

// Configure Amplify
Amplify.configure(outputs, { ssr: true });

// Generate the client
const client = generateClient<Schema>();

interface CVModalProps {
    open: boolean;
    onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ open, onClose }) => {
    const { t } = useTranslation('contact');
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        language: language || 'en',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { executeRecaptcha, isLoaded, loadRecaptchaScript } = useRecaptcha();
    const userInteracted = useRef(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info' as 'success' | 'error' | 'info',
    });

    const validateName = useCallback(
        (value: string): string => {
            if (!value) return t('cvModal.errors.nameRequired');
            if (value.length < 2) return t('cvModal.errors.nameLength');
            if (!/^[A-Za-z\s]+$/.test(value))
                return t('cvModal.errors.nameLetters');
            return '';
        },
        [t]
    );

    const validateEmail = useCallback(
        (value: string): string => {
            if (!value) return t('cvModal.errors.emailRequired');
            if (value.length < 2) return t('cvModal.errors.emailLength');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return t('cvModal.errors.emailValid');
            return '';
        },
        [t]
    );

    const validateLanguage = useCallback(
        (value: string): string => {
            if (!value) return t('cvModal.errors.languageRequired');
            if (value.length < 2) return t('cvModal.errors.languageLength');
            if (!/^[A-Za-z\s]+$/.test(value))
                return t('cvModal.errors.languageLetters');
            return '';
        },
        [t]
    );

    // Update error messages when language changes
    useEffect(() => {
        // Only update errors if there are any existing errors
        const hasErrors = Object.values(errors).some((error) => error !== '');
        if (hasErrors) {
            const newErrors = {
                name: formData.name ? validateName(formData.name) : '',
                email: formData.email ? validateEmail(formData.email) : '',
                language: formData.language
                    ? validateLanguage(formData.language)
                    : '',
                company:
                    formData.company && formData.company.length < 2
                        ? t('cvModal.errors.companyLength')
                        : '',
            };
            setErrors(newErrors);
        }
        // Remove errors from dependencies to prevent infinite loop
    }, [language, t, formData, validateName, validateEmail, validateLanguage]);

    // Update form language when the context language changes
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            language: language || 'en',
        }));
    }, [language]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Track user interaction and load reCAPTCHA only after user starts filling the form
        if (!userInteracted.current) {
            userInteracted.current = true;
            // Load reCAPTCHA script in the background after user interaction
            loadRecaptchaScript();
        }

        // Validate field on change
        let error = '';
        switch (name) {
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'language':
                error = validateLanguage(value);
                break;
            case 'company':
                if (value && value.length < 2)
                    error = t('cvModal.errors.companyLength');
                break;
        }

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const validateForm = (): boolean => {
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const languageError = validateLanguage(formData.language);
        const companyError =
            formData.company && formData.company.length < 2
                ? t('cvModal.errors.companyLength')
                : '';

        const newErrors = {
            name: nameError,
            email: emailError,
            language: languageError,
            company: companyError,
        };

        setErrors(newErrors);
        return !nameError && !emailError && !languageError && !companyError;
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [requestError, setRequestError] = useState(false);

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        // Track form submission event
        trackEvent('form_submit', {
            form_language: formData.language,
            user_language: language,
        });

        setLoading(true);

        try {
            // Execute reCAPTCHA (this will load the script if not already loaded)
            const token = await executeRecaptcha('cv_form_submit');

            if (!token) {
                throw new Error('reCAPTCHA verification failed');
            }

            // Close the modal immediately
            onClose();

            // Show "sending" snackbar
            setSnackbar({
                open: true,
                message: t('cvModal.sending') || 'Sending your request...',
                severity: 'info',
            });

            // Create CV request using Amplify Gen 2 API
            const result = await client.mutations.sendCV({
                name: formData.name,
                email: formData.email,
                company: formData.company || '',
                language: formData.language || language,
            });

            console.info('CV request created:', result);

            // Check if the response has an empty ID (indicating failure)
            if (result.data!.id === '') {
                throw new Error('Failed to create CV request');
            }

            // Show success snackbar
            setSnackbar({
                open: true,
                message:
                    t('cvModal.successSnackbar') ||
                    'Your CV will be sent to your email shortly',
                severity: 'success',
            });
        } catch (error) {
            console.error('Error submitting CV request:', error);
            setRequestError(true);
            // Show error snackbar
            setSnackbar({
                open: true,
                message:
                    t('cvModal.errorSnackbar') ||
                    'Failed to process your request',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    // Check if form is valid for enabling the submit button
    const isFormValid = () => {
        return (
            formData.name &&
            formData.email &&
            formData.language &&
            !errors.name &&
            !errors.email &&
            !errors.language &&
            !errors.company
        );
    };

    // Preload reCAPTCHA when user focuses on the form
    const handleFormFocus = useCallback(() => {
        if (!userInteracted.current) {
            userInteracted.current = true;
            loadRecaptchaScript();
        }
    }, [loadRecaptchaScript]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Modal
                key={`modal-${language}`}
                open={open}
                onClose={onClose}
                title={t('cvModal.title')}
                submitButtonText={t('cvModal.get')}
                onSubmit={handleSubmit}
                loading={loading}
                t={t}
                disableSubmitButton={!isFormValid() || !isLoaded}
                hideActions={showSuccessMessage}
            >
                {showSuccessMessage ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            gutterBottom
                        >
                            {t('cvModal.successTitle') || 'Success!'}
                        </Typography>
                        <Typography sx={{ mb: 3 }} color="textPrimary">
                            {t('cvModal.successMessage') ||
                                `Thank you for your request. Your CV will be sent to ${formData.email} shortly.`}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setShowSuccessMessage(false);
                                setFormData({
                                    name: '',
                                    email: '',
                                    company: '',
                                    language: language || 'en',
                                });
                            }}
                            sx={{ mt: 2 }}
                        >
                            {t('cvModal.submitAgain') ||
                                'Want to submit again?'}
                        </Button>
                    </Box>
                ) : requestError ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Typography
                            variant="h6"
                            color="error.main"
                            gutterBottom
                        >
                            {t('cvModal.errorTitle') || 'Error'}
                        </Typography>
                        <Typography>
                            {t('cvModal.errorMessage') ||
                                'There was an error processing your request. Please try again later.'}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('cvModal.name')}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={handleFormFocus}
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('cvModal.email')}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={handleFormFocus}
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('cvModal.company')}
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={handleFormFocus}
                            error={!!errors.company}
                            helperText={errors.company}
                        />
                        <TextField
                            select
                            fullWidth
                            margin="dense"
                            label={t('cvModal.language')}
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            onFocus={handleFormFocus}
                            required
                            error={!!errors.language}
                            helperText={errors.language}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="en">{t('cvModal.english')}</option>
                            <option value="es">{t('cvModal.spanish')}</option>
                        </TextField>

                        {/* reCAPTCHA notice */}
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                opacity: 0.7,
                                fontSize: '0.75rem',
                            }}
                        >
                            <Typography variant="caption" color="textSecondary">
                                {t('cvModal.protectedBy')}
                            </Typography>
                            <Image
                                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                                alt="reCAPTCHA"
                                width={18}
                                height={18}
                                loading="eager"
                                style={{ height: '18px', width: 'auto' }}
                            />
                        </Box>
                    </>
                )}
            </Modal>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={8000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    top: '50% !important',
                    left: '50% !important',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{
                        width: '100%',
                        bgcolor:
                            snackbar.severity === 'success'
                                ? 'rgba(46, 125, 50, 0.9)' // Darker green
                                : snackbar.severity === 'info'
                                  ? 'rgba(2, 136, 209, 0.9)' // Darker blue
                                  : 'rgba(211, 47, 47, 0.9)', // Darker red
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white',
                        },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CVModal;
