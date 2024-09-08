"use client"

import { Situation, situationToPrompt } from "@/features/Situation"
import { UseClaudeReturn } from "@/hooks/useClaude"
import {
  Button,
  HStack,
  Input,
  Select,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useState } from "react"

type LeftPanelInput = Pick<
  UseClaudeReturn,
  "streamResponse" | "image" | "handleImageChange"
>

export function LeftPanel({
  streamResponse,
  image,
  handleImageChange,
}: LeftPanelInput) {
  const toast = useToast()
  const [situation, setSituation] = useState<Situation | undefined>(undefined)

  const onChangeSituation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === "") {
      // 未選択の状態に戻ったケース
      setSituation(undefined)
      return
    }
    setSituation(value as Situation)
  }

  const handleCheckButtonClick = useCallback(async () => {
    // validation
    if (image == null) {
      toast({
        description: "画像を選択してください。",
        status: "error",
        isClosable: true,
        position: "top",
      })
      return
    }
    if (situation === undefined) {
      toast({
        description: "シチュエーションを選択してください。",
        status: "error",
        isClosable: true,
        position: "top",
      })
      return
    }

    const prompt = situationToPrompt(situation)
    streamResponse(prompt)
  }, [image, situation, streamResponse, toast])

  return (
    <VStack spacing={4} justifyContent="flex-start">
      {/* TODO: ドロップゾーンを追加する */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        border={0}
      />
      <Select placeholder="シチュエーションを選択" onChange={onChangeSituation}>
        <option value="friend">友達とお出かけ</option>
        <option value="date">デート</option>
        <option value="boss">上司と会食</option>
      </Select>
      <HStack w="100%">
        <Spacer />
        <Button onClick={handleCheckButtonClick}>チェックする</Button>
      </HStack>
    </VStack>
  )
}
