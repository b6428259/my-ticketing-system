// LanguageModal.js
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@nextui-org/react';
import { useLanguage } from '../../../../../contexts/LanguageContext';

const LanguageModal = ({ isOpen, onClose }) => {
    const { language, toggleLanguage } = useLanguage();

    const handleLanguageSelect = (selectedLanguage) => {
        if (language !== selectedLanguage) {
            toggleLanguage();
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} hideCloseButton isDismissable={false}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">Select Language / เลือกภาษา</div>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-4">
                        <Button
                            size="lg"
                            onClick={() => handleLanguageSelect('en')}
                            className={`p-6 ${language === 'en' ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <span className="text-xl">English</span>
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => handleLanguageSelect('th')}
                            className={`p-6 ${language === 'th' ? 'bg-blue-600' : 'bg-gray-600'}`}
                        >
                            <span className="text-xl">ภาษาไทย</span>
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LanguageModal;