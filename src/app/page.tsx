"use client"

import { AppearanceCheckResultView } from "@/components/AppearanceCheck"
import { LeftPanel } from "@/components/LeftPanel"
import { parseAppearanceCheck } from "@/features/Parse"
import { AppearanceCheckProps } from "@/features/Parse/types"
import { Situation, situationToPrompt } from "@/features/Situation"
import { useClaude } from "@/hooks/useClaude"
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Select,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"
import { FaCameraRetro } from "react-icons/fa"

export default function Home() {
  const {
    streamResponse,
    image,
    setImage,
    handleImageChange,
    isLoading,
    output,
  } = useClaude()
  const toast = useToast()
  const [situation, setSituation] = useState<Situation | undefined>(undefined)

  const onChangeSituation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === "") {
      setSituation(undefined)
      return
    }
    setSituation(value as Situation)
  }

  const handleCheckButtonClick = useCallback(async () => {
    if (situation === undefined) {
      toast({
        description: "シチュエーションを選択してください。",
        status: "error",
        isClosable: true,
        position: "top",
      })
      return
    }

    const selectFile = (): Promise<File | null> => {
      return new Promise((resolve) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0] || null
          resolve(file)
        }
        input.click()
      })
    }

    try {
      const selectedFile = await selectFile()

      if (!selectedFile) {
        toast({
          description: "ファイルが選択されませんでした。",
          status: "warning",
          isClosable: true,
          position: "top",
        })
        return
      }

      setImage(selectedFile)

      const prompt = situationToPrompt(situation)

      await streamResponse(prompt)
    } catch (error) {
      console.error("Error during file selection or streaming:", error)
      toast({
        description: "エラーが発生しました。もう一度お試しください。",
        status: "error",
        isClosable: true,
        position: "top",
      })
    }
  }, [situation, streamResponse, setImage, toast])

  const checkResult = useMemo((): AppearanceCheckProps | undefined => {
    if (isLoading) {
      return undefined
    }
    console.log(parseAppearanceCheck(output))
    return parseAppearanceCheck(output)
  }, [isLoading, output])

  return (
    <Box
      bgGradient="linear(to-r, #89aaff, #8bfff8)"
      minHeight="100vh"
      width="100%"
      p={20}
      letterSpacing={5}
    >
      <VStack spacing={10}>
        <Text fontSize="xxx-large" fontWeight="bold" color="white">
          みだしなみチェッカー
        </Text>
        <Box w="50%">
          <Select
            borderRadius="full"
            placeholder="シチュエーションを選択"
            fontSize="x-large"
            fontWeight="normal"
            onChange={onChangeSituation}
            backgroundColor="white"
            textAlign="center"
            h={20}
            icon={<Icon as={ChevronDownIcon} color="gray.500" w={6} h={6} />}
            iconSize="24px"
            sx={{
              "& > option": {
                background: "white",
                color: "black",
              },
            }}
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
              setImage={setImage}
            />
          </Box>
          <Box w="40%">
            {checkResult ? (
              <AppearanceCheckResultView
                isLoading={isLoading}
                result={checkResult}
              />
            ) : (
              <Box
                bg="lightblue"
                borderRadius="64px"
                p="40px"
                width="480px"
                height="540px"
              >
                {isLoading && (
                  <Center w="100%" h="100%">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Center>
                )}
              </Box>
            )}
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
    </Box>
  )
}
