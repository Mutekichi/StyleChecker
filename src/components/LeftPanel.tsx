"use client"

import { Situation, situationToPrompt } from "@/features/Situation"
import { UseClaudeReturn } from "@/hooks/useClaude"
import {
  Button,
  HStack,
  Input,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback } from "react"

type LeftPanelInput = Pick<
  UseClaudeReturn,
  "streamResponse" | "image" | "handleImageChange"
> & {
  situation: Situation | undefined
}

export function LeftPanel({
  situation,
  streamResponse,
  image,
  handleImageChange,
}: LeftPanelInput) {
  return (
    <VStack spacing={4} justifyContent="flex-start">
      {/* TODO: ドロップゾーンを追加する */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        border={0}
      />
    </VStack>
  )
}
