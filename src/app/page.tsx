"use client"

import { AppearanceCheckResultView } from "@/components/AppearanceCheck"
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
import { useCallback, useMemo, useRef, useState } from "react"
import { FaCameraRetro } from "react-icons/fa"
import { Camera, CameraType } from "react-camera-pro"
import { downloadImageAsFile } from "@/utils/download"

export default function Home() {
  const { streamResponse, isLoading, output } = useClaude()
  const toast = useToast()
  const camera = useRef<CameraType>(null)
  const [situation, setSituation] = useState<Situation | undefined>(undefined)

  const [takenPicture, setTakenPicture] = useState<File | undefined>(undefined)
  const pictureUrl = useMemo(() => {
    if (takenPicture === undefined) {
      return undefined
    }
    return URL.createObjectURL(takenPicture)
  }, [takenPicture])

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

    if (camera.current) {
      const image = camera.current.takePhoto()
      const imageUrl = image as string
      const imageFile = await downloadImageAsFile(imageUrl)
      setTakenPicture(imageFile)

      console.log(
        imageFile === undefined ? "undefined image" : "defined Image!"
      )
      try {
        // const selectedFile = await selectFile()

        if (!imageFile) {
          toast({
            description: "ファイルが選択されませんでした。",
            status: "warning",
            isClosable: true,
            position: "top",
          })
          return
        }

        const prompt = situationToPrompt(situation)

        await streamResponse(prompt, imageFile)
      } catch (error) {
        console.error("Error during file selection or streaming:", error)
        toast({
          description: "エラーが発生しました。もう一度お試しください。",
          status: "error",
          isClosable: true,
          position: "top",
        })
      }
    }
  }, [situation, streamResponse, toast])

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

        <HStack alignItems="center" justifyContent="center" w="100%">
          <Box w="600px" p={4} display="flex" alignItems="center">
            <div style={{ width: "100%", height: "100%" }}>
              {pictureUrl !== undefined ? (
                <img
                  src={pictureUrl}
                  style={
                    // 左右反転
                    { transform: "scaleX(-1)" }
                  }
                />
              ) : (
                <Camera ref={camera} errorMessages={{}} aspectRatio={4 / 3} />
              )}
            </div>
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
