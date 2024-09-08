"use client"

import { Situation, situationToPrompt } from "@/features/Situation"
import { UseClaudeReturn } from "@/hooks/useClaude"
import {
  Box,
  Button,
  HStack,
  Input,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"

type LeftPanelInput = Pick<
  UseClaudeReturn,
  "streamResponse" | "image" | "handleImageChange" | "setImage"
> & {
  situation: Situation | undefined
}

export function LeftPanel({ image }: LeftPanelInput) {
  return (
    <VStack spacing={4} justifyContent="flex-start" w="100%" height="500px">
      {/* TODO: ドロップゾーンを追加する */}
      <Box>
        <Image
          src={image ? URL.createObjectURL(image) : "/images/happy.png"}
          alt="portrait"
          width="100%"
          height="auto"
          borderRadius="16px"
        />
      </Box>
    </VStack>
  )
}
