// src/components/LogoutModal.js
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

const LogoutModal = ({ isOpen, onClose, logout }) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Logout</ModalHeader>
            <ModalBody>
              <h1>Are you sure you want to logout?</h1>
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                className="bg-[#cd2a2a] shadow-lg shadow-indigo-500/20 text-white"
                onPress={() => { onClose(); logout(); }}
              >
                Logout
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
