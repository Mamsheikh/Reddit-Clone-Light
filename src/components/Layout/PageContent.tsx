import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: any;
  maxWidth?: string;
};

function PageContent({ children, maxWidth }: PageContentProps) {
  // console.log("jaja", children);
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children[0]}
        </Flex>

        {/* RHS */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children[1]}
        </Box>
      </Flex>
    </Flex>
  );
}

export default PageContent;
