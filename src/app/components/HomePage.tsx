"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Input,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type ProposalData = {
  id: number;
  title: string;
  description: string;
};

const defaultData: ProposalData = {
  id: 0,
  title: "",
  description: "",
};

const IndexPage: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalData[]>(() => {
    const savedProposals = localStorage.getItem("proposals");
    return savedProposals ? JSON.parse(savedProposals) : [];
  });
  const { register, handleSubmit, reset } = useForm<ProposalData>();

  useEffect(() => {
    localStorage.setItem("proposals", JSON.stringify(proposals));
  }, [proposals]);

  const onSubmit = (data: ProposalData) => {
    if (data.id === 0) {
      data.id = proposals.length + 1;
      setProposals([...proposals, data]);
    } else {
      const updatedProposals = proposals.map((proposal) =>
        proposal.id === data.id
          ? { ...proposal, title: data.title, description: data.description }
          : proposal
      );
      setProposals(updatedProposals);
    }
    reset(defaultData);
  };

  const handleDelete = (id: number) => {
    const updatedProposals = proposals.filter((proposal) => proposal.id !== id);
    setProposals(updatedProposals);
  };

  const handleEdit = (proposal: ProposalData) => {
    reset(proposal);
  };

  return (
    <Box p={4}>
      <Heading mb={4} textAlign="center" size="2xl" color="teal">
        MY CRUD
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Input type="hidden" {...register("id")} />
          <Input
            type="text"
            {...register("title", { required: true })}
            placeholder="Title"
            size="lg"
            variant="filled"
            fontSize="xl"
            fontWeight="bold"
          />
          <Textarea
            {...register("description")}
            placeholder="Description"
            size="lg"
            variant="filled"
            resize="vertical"
            minHeight="80px"
            fontSize="xl"
            fontWeight="bold"
          />
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            fontSize="xl"
            _hover={{
              bg: "pink.300",
            }}
          >
            Submit
          </Button>
        </Stack>
      </form>
      <Stack mt={4} spacing={4}>
        {proposals.map((proposal) => (
          <Box
            key={proposal.id}
            borderWidth="1px"
            p={4}
            rounded="lg"
            _hover={{ bg: "pink.100" }}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontWeight="bold" fontSize="xl">
                  {proposal.title}
                </Text>
                <Text fontSize="xl">{proposal.description}</Text>
              </Box>
              <Stack direction="row">
                <Button
                  colorScheme="teal"
                  size="lg"
                  leftIcon={<EditIcon />}
                  fontSize="xl"
                  onClick={() => handleEdit(proposal)}
                >
                  Edit
                </Button>
                <Button
                  fontSize="xl"
                  colorScheme="pink"
                  size="lg"
                  leftIcon={<DeleteIcon />}
                  onClick={() => handleDelete(proposal.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default IndexPage;
