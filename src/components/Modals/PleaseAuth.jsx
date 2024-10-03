
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import LoginModal from '../../pages/Authentication/Login/LoginModal';


const PleaseAuth = ({ isOpen, onClose }) => {

    const onLogin = () => {

        <LoginModal 

      />
    };

    const OnHome = () => {
        window.location.href = "/";
    }


  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onClose}
      radius="lg"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      classNames={{
        body: "py-6",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Please Log In</ModalHeader>
            <ModalBody>
              <h1> 
                Please Authenticate!
              </h1>
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={OnHome}>
                Home
              </Button>
<LoginModal onPress={onLogin} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PleaseAuth;
