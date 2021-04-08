import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Input,
  InputRightElement,
  InputRightAddon,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { useHomeState, useHomeStateAction } from "module/home";

export const Main = React.memo(() => {
  const url = useHomeState((state) => state.url);
  const shortenedURL = useHomeState((state) => state.shortenedURL);
  const isCopied = useHomeState((state) => state.copied);

  const { updateURL, getShortenedURL, copyToClipboard } = useHomeStateAction();

  return (
    <Container maxW="4xl">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        py={12}
      >
        <Heading mb={2}>{"<Jamyth/>"}</Heading>
        <Heading>Shorten Your URL </Heading>
      </Flex>
      <Flex alignItems="center">
        <Box w="50%">
          <Text fontSize="xl">Make your message cleaner by shorten url</Text>
          <InputGroup size="md">
            <Input value={url} onChange={(e) => updateURL(e.target.value)} />
            {isCopied ? (
              <InputRightAddon children="Copied !" />
            ) : (
              <InputRightElement w="auto">
                <Button onClick={getShortenedURL}>Shorten !</Button>
              </InputRightElement>
            )}
          </InputGroup>
          {shortenedURL !== null && (
            <Button
              variant="link"
              onClick={() => copyToClipboard(shortenedURL)}
            >
              {shortenedURL}
            </Button>
          )}
        </Box>
        <Image maxW="50%" src={require("./asset/banner.svg")} />
      </Flex>
    </Container>
  );
});
