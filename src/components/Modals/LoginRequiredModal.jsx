import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import LoginModal from "../../pages/Authentication/Login/LoginModal";
  
  export default function LoginRequired() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  
    const handleLoginPress = () => {
      console.log("Login button pressed");
      onClose();
    };
  
    return (
      <>
        <Button onPress={onOpen} color="danger">
          Login Required
        </Button>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
                <ModalHeader className="flex flex-col gap-1">
                  Please Log In to Continue
                </ModalHeader>
                <ModalBody>
                  <h1>Please log in to continue.</h1>
                  {/* Here we render the LoginModal directly */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="solid" onPress={onClose}>
                    Close
                  </Button>
                  <LoginModal onPress={handleLoginPress} />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  