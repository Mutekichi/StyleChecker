"use client"

import { LeftPanel } from "@/components/LeftPanel"
import { RightPanel, RightPanelProps } from "@/components/RightPanel"
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
import { useCallback, useState } from "react"
import { FaCameraRetro } from "react-icons/fa"

const rightPanelProps: RightPanelProps = {
  advisorBubblePropsList: [
    { emotion: "happy", text: "Hello!", isSpeaking: true },
    { emotion: "angry", text: "Go away!" },
    {
      emotion: "neutral",
      text: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。",
    },
  ],
}

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
          <RightPanel {...rightPanelProps} />
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
