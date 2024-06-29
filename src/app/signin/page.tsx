"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (
      data.email === "test@example.com" &&
      data.password === "TestUserPassword"
    ) {
      router.push("/");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto" mt={10}>
      <Heading as="h1" mb={6} textAlign="center">
        Sign In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
