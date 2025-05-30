'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';

import { Button } from './Button';

interface FormData {
    name: string;
    email: string;
    company: string;
    language: string;
    [key: string]: string; // Allow additional string fields
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    submitButtonText: string;
    onSubmit: () => Promise<void> | void;
    loading?: boolean;
    onFieldChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fields?: Array<{
        name: string;
        label: string;
        type?: string;
        required?: boolean;
        options?: Array<{ value: string; label: string }>;
        defaultValue?: string;
        error?: string;
    }>;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    submitButtonText,
    onSubmit,
    loading: externalLoading,
    fields,
    onFieldChange,
    children,
}) => {
    const initialFormData = () => {
        const data: FormData = {
            name: '',
            email: '',
            company: '',
            language: '',
        };

        // Set default values from fields if provided
        if (fields) {
            fields.forEach((field) => {
                if (field.defaultValue !== undefined) {
                    data[field.name] = field.defaultValue;
                }
            });
        }

        return data;
    };

    const [formData, setFormData] = useState<FormData>(initialFormData());
    const [internalLoading, setInternalLoading] = useState(false);
    const loading =
        externalLoading !== undefined ? externalLoading : internalLoading;
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        
        // Call external change handler if provided
        if (onFieldChange) {
            onFieldChange(e);
        }
    };

    const handleSubmit = async () => {
        if (externalLoading === undefined) {
            setInternalLoading(true);
        }
        try {
            // Call onSubmit with or without formData based on the function signature
            await onSubmit();
            setSnackbar({
                open: true,
                message: 'Form submitted successfully!',
                severity: 'success',
            });
            onClose();
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to submit form. Please try again.',
                severity: 'error',
            });
        } finally {
            if (externalLoading === undefined) {
                setInternalLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                disableScrollLock={true}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        {children ? (
                            children
                        ) : fields ? (
                            fields.map((field) =>
                                field.type === 'select' ? (
                                    <TextField
                                        key={field.name}
                                        select
                                        fullWidth
                                        margin="dense"
                                        label={field.label}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                        error={!!field.error}
                                        helperText={field.error}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="" />
                                        {field.options?.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                ) : (
                                    <TextField
                                        key={field.name}
                                        fullWidth
                                        margin="dense"
                                        label={field.label}
                                        name={field.name}
                                        type={field.type || 'text'}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                        error={!!field.error}
                                        helperText={field.error}
                                    />
                                )
                            )
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    label="Company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        sx={{ bgcolor: 'gray', boxShadow: '0' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={
                            loading ||
                            (fields
                                ? fields.some(
                                      (f) => f.required && !formData[f.name]
                                  )
                                : !formData.name || !formData.email)
                        }
                        sx={{
                            bgcolor: 'background.aws',
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: 'background.aws',
                                opacity: 0.9,
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            submitButtonText
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Modal;
