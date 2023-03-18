import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type Props = {};

function AuthModal({}: Props) {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handelClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // modal closes after user state changes
  useEffect(() => {
    if (user) handelClose();
    console.log("user", user);
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color="gray.400" fontWeight={700}>
                    OR
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
