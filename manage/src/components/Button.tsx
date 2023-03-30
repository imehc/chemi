import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon     } from '@chakra-ui/icons';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const CustomButton: React.FC<Props> = (props) => {
  return (
    <Stack direction="row" spacing={4}>
      <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
        Email
      </Button>
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="green"
        variant="outline"
        rounded={20}
      >
        Call us
      </Button>
      <Button
        isLoading
        loadingText="Submitting"
        colorScheme="teal"
        variant="outline"
      >
        Submit
      </Button>
    </Stack>
  );
};
