"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { FormErrorMessage } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data));
    router.push("/"); // Redirect to the main page after SignUp
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    Object.keys(formData).forEach((key) => {
      setValue(key as keyof FormData, formData[key]);
    });
  }, [setValue]);

  return (
    <Flex
      minW="100%"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box flex={1}>
                  <FormControl
                    id="firstName"
                    isInvalid={!!errors.firstName}
                    isRequired
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      _focus={{
                        borderColor: "teal.400",
                      }}
                    />
                    <FormErrorMessage>
                      {errors.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box flex={1}>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      {...register("lastName")}
                      _focus={{
                        borderColor: "teal.400",
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isInvalid={!!errors.email} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  _focus={{
                    borderColor: "teal.400",
                  }}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={!!errors.password}
                isRequired
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    _focus={{
                      borderColor: "teal.400",
                    }}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isLoading={false}
                  loadingText="Submitting"
                  size="lg"
                  bg="teal.400"
                  color="white"
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align="center">
              Already a user?{" "}
              <Link href="/signin" color="teal.400">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
