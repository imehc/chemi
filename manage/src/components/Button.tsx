import { Button, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

type Props = React.HTMLAttributes<HTMLButtonElement>;

export const CustomButton: React.FC<Props> = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
        Email
      </Button>
      <Button size="xl" variant="with-shadow">
        Welcome
      </Button>
      <Button
        isLoading
        loadingText="Submitting"
        // colorScheme="teal"
        variant="outline"
      >
        Submit
      </Button>
    </Stack>
  );
};
