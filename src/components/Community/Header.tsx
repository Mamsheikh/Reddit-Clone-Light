import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import useCommunityData from "@/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

function Header({ communityData }: HeaderProps) {
  const { communityStateValue, joinCommunity, leaveCommunity, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(item => item.communityId === communityData.id);
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image
              //   borderRadius="full"
              boxSize="66px"
              //   src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}

          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
