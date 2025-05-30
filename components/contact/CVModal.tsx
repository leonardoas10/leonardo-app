import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../common/Modal';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { TextField } from '@mui/material';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

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

    const validateName = useCallback((value: string): string => {
        if (!value) return t('cvModal.errors.nameRequired');
        if (value.length < 2) return t('cvModal.errors.nameLength');
        if (!/^[A-Za-z\s]+$/.test(value)) return t('cvModal.errors.nameLetters');
        return '';
    }, [t]);

    const validateEmail = useCallback((value: string): string => {
        if (!value) return t('cvModal.errors.emailRequired');
        if (value.length < 2) return t('cvModal.errors.emailLength');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('cvModal.errors.emailValid');
        return '';
    }, [t]);

    const validateLanguage = useCallback((value: string): string => {
        if (!value) return t('cvModal.errors.languageRequired');
        if (value.length < 2) return t('cvModal.errors.languageLength');
        if (!/^[A-Za-z\s]+$/.test(value)) return t('cvModal.errors.languageLetters');
        return '';
    }, [t]);

    // Update error messages when language changes
    useEffect(() => {
        // Only update errors if there are any existing errors
        if (Object.values(errors).some(error => error !== '')) {
            const newErrors = {
                name: formData.name ? validateName(formData.name) : '',
                email: formData.email ? validateEmail(formData.email) : '',
                language: formData.language ? validateLanguage(formData.language) : '',
                company: formData.company && formData.company.length < 2 
                    ? t('cvModal.errors.companyLength') 
                    : '',
            };
            setErrors(newErrors);
        }
    }, [language, t, formData, validateName, validateEmail, validateLanguage, errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

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
                if (value && value.length < 2) error = t('cvModal.errors.companyLength');
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
        const companyError = formData.company && formData.company.length < 2 
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

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Create CV request using Amplify Gen 2 API
            const result = await client.models.CVRequest.create({
                name: formData.name,
                email: formData.email,
                company: formData.company || '',
                language: formData.language || language,
                requestedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            });

            console.log('CV request created:', result);
            onClose();
        } catch (error) {
            console.error('Error submitting CV request:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            key={`modal-${language}`}
            open={open}
            onClose={onClose}
            title={t('cvModal.title')}
            submitButtonText={t('cvModal.get')}
            onSubmit={handleSubmit}
            loading={loading}
        >
            <TextField
                fullWidth
                margin="dense"
                label={t('cvModal.name')}
                name="name"
                value={formData.name}
                onChange={handleChange}
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
        </Modal>
    );
};

export default CVModal;