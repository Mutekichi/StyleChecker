import React from "react"
import { useClaude } from "@/hooks/useClaude"
import {
  Box,
  Button,
  Textarea,
  VStack,
  Text,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react"

export const ClaudeUI: React.FC = () => {
  const {
    input,
    setInput,
    output,
    isLoading,
    streamResponse,
    handleImageChange,
    image,
    clearImage,
  } = useClaude()

  return (
    <VStack
      spacing={4}
      align="stretch"
      width="100%"
      maxWidth="800px"
      margin="auto"
    >
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt here..."
        size="lg"
      />
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <Box>
          <Image
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            maxHeight="200px"
          />
          <Button onClick={clearImage} size="sm" mt={2}>
            Clear Image
          </Button>
        </Box>
      )}
      <Button
        onClick={streamResponse}
        isLoading={isLoading}
        loadingText="Processing..."
        colorScheme="blue"
      >
        Get Response
      </Button>
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={4}
        minHeight="200px"
        position="relative"
      >
        {isLoading && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Spinner size="xl" />
          </Box>
        )}
        <Text whiteSpace="pre-wrap">{output}</Text>
      </Box>
    </VStack>
  )
}
