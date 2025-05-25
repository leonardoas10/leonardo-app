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
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    submitButtonText: string;
    onSubmit: (formData: FormData) => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    submitButtonText,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
    });
    const [loading, setLoading] = useState(false);
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
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit(formData);
            setSnackbar({
                open: true,
                message: 'Form submitted successfully!',
                severity: 'success',
            });
            onClose();
        } catch (_error) {
            setSnackbar({
                open: true,
                message: 'Failed to submit form. Please try again.',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
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
                        disabled={loading || !formData.name || !formData.email}
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
