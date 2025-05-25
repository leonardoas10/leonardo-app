import React from 'react';
import Modal from '../common/Modal';

interface CVModalProps {
    open: boolean;
    onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ open, onClose }) => {
    const handleSubmit = async (formData: any) => {
        // Simulate API call with a delay
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', formData);
                resolve();
            }, 1000);
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Download CV"
            submitButtonText="Download"
            onSubmit={handleSubmit}
        />
    );
};

export default CVModal;
