"use client";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "teal.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <Link href="/">
            <Text
              cursor="pointer"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link href="/signin">
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={useBreakpointValue({ base: "sm", md: "md" })}
              fontWeight={600}
              color={"white"}
              bg={"teal"}
              _hover={{
                bg: "pink.300",
              }}
              px={useBreakpointValue({ base: 4, md: 6 })}
              py={useBreakpointValue({ base: 2, md: 3 })}
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={useBreakpointValue({ base: "sm", md: "md" })}
              fontWeight={600}
              color={"white"}
              bg={"teal"}
              _hover={{
                bg: "pink.300",
              }}
              px={useBreakpointValue({ base: 4, md: 6 })}
              py={useBreakpointValue({ base: 2, md: 3 })}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
