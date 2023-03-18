import { auth, firestore } from "@/firebase/clientApp";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Radio,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({
  open,
  handleClose,
}: CreateCommunityModalProps) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);

    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // validate the community
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers and underscores"
      );
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // check if community exists in db
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken.`);
        }
        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // create communitySnipper on user
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityId: communityName,
          isModerator: true,
        })
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontWeight={600} fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>
            <Text
              position="relative"
              top="28px"
              left="10px"
              width="20px"
              color="gray.400"
            >
              r/
            </Text>

            <Input
              position="relative"
              value={communityName}
              size="sm"
              pl="22px"
              onChange={handleChange}
            />
            <Text
              fontSize={9}
              color={charsRemaining === 0 ? "red" : "gray.500"}
            >
              {charsRemaining} Characters remaining
            </Text>
            <Text fontSize="9pt" color="red" pt={1}>
              {error}
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community type
              </Text>
            </Box>
            {/* checkbox */}
            <Stack spacing={2}>
              <Radio
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="left" flexDirection="column">
                  <Flex alignItems="center">
                    <Icon as={BsFillPersonFill} color="gray.500" mr={1} />
                    <Text fontSize="10pt" mr="1">
                      Public
                    </Text>
                  </Flex>
                  <Text fontSize="8pt" color="gray.500">
                    Anyone can view, post, and comment to this community
                  </Text>
                </Flex>
              </Radio>
              <Radio
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="left" flexDirection="column">
                  <Flex alignItems="center">
                    <Icon as={BsFillEyeFill} color="gray.500" mr={1} />
                    <Text fontSize="10pt" mr="1">
                      Restricted
                    </Text>
                  </Flex>
                  <Text fontSize="8pt" color="gray.500">
                    Anyone can view this community, but only approved users can
                    post
                  </Text>
                </Flex>
              </Radio>
              <Radio
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="left" flexDirection="column">
                  <Flex alignItems="center">
                    <Icon as={HiLockClosed} color="gray.500" mr={1} />
                    <Text fontSize="10pt" mr="1">
                      Private
                    </Text>
                  </Flex>
                  <Text fontSize="8pt" color="gray.500">
                    Only approved users can view and submit to this community
                  </Text>
                </Flex>
              </Radio>
            </Stack>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px" mt={4}>
            <Button colorScheme="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateCommunity} isLoading={loading}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
