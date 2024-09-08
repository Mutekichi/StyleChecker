"use client"

import { AppearanceCheckResultView } from "@/components/AppearanceCheck"
import { LeftPanel } from "@/components/LeftPanel"
import { parseAppearanceCheck } from "@/features/Parse"
import { AppearanceCheckProps } from "@/features/Parse/types"
import { Situation, situationToPrompt } from "@/features/Situation"
import { useClaude } from "@/hooks/useClaude"
import {
  Box,
  HStack,
  IconButton,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"
import { FaCameraRetro } from "react-icons/fa"

export default function Home() {
  const {
    output,
    isLoading,
    streamResponse,
    image,
    handleImageChange,
    clearImage,
  } = useClaude()
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

  // Loading中はundefined, 生成後はパース結果となる
  const checkResult = useMemo((): AppearanceCheckProps | undefined => {
    if (isLoading) {
      return undefined
    }
    return parseAppearanceCheck(output)
  }, [isLoading, output])

  return (
    <VStack>
      <Text fontSize="xxx-large" fontWeight="bold">
        みだしなみチェッカー
      </Text>
      <Box w="50%">
        <Select
          borderRadius="full"
          placeholder="シチュエーションを選択"
          onChange={onChangeSituation}
        >
          <option value="friend">友達とお出かけ</option>
          <option value="date">今日はこれからデート❤️😍</option>
          <option value="boss">上司と会食</option>
        </Select>
      </Box>

      <HStack alignItems="flex-start">
        <Box w="60%" p={4}>
          <LeftPanel
            situation={situation}
            streamResponse={streamResponse}
            image={image}
            handleImageChange={handleImageChange}
          />
        </Box>
        <Box w="40%">
          <AppearanceCheckResultView
            isLoading={isLoading}
            result={checkResult}
          />
        </Box>
      </HStack>
      <IconButton
        aria-label="Picture"
        icon={<FaCameraRetro />}
        borderRadius="full"
        boxSize="100px"
        fontSize="40px"
        onClick={handleCheckButtonClick}
      />
    </VStack>
  )
}
