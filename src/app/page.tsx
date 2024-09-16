"use client"

import { AppearanceCheckResultView } from "@/components/AppearanceCheck"
import { parseAppearanceCheck } from "@/features/Parse"
import { AppearanceCheckProps } from "@/features/Parse/types"
import { Situation, situationToPrompt } from "@/features/Situation"
import { useChatGPT } from "@/hooks/useChatGPT"
import {
  Box,
  Flex,
  HStack,
  Image,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useMemo, useRef, useState } from "react"
import { FaCameraRetro, FaRedo } from "react-icons/fa"
import { Camera, CameraType } from "react-camera-pro"
import { downloadImageAsFile } from "@/utils/download"
import { Title } from "@/components/Title"
import { SituationSelector } from "@/components/SituationSelector"
import { Loading } from "@/components/Loading"
import { MyIconButton } from "@/components/MyIconButton"
import { TwitterShareButton } from "@/components/TwitterShareButton"
import { generateShareText } from "@/features/Tweet"

export default function Home() {
  const { streamResponse, isLoading, output, reset } = useChatGPT()
  const toast = useToast()
  const camera = useRef<CameraType>(null)
  const [situation, setSituation] = useState<Situation | undefined>(undefined)
  const [takenPicture, setTakenPicture] = useState<File | undefined>(undefined)

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

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

      try {
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

  const handleRetryButtonClick = useCallback(() => {
    setTakenPicture(undefined)
    reset()
  }, [reset])

  const checkResult = useMemo((): AppearanceCheckProps | undefined => {
    if (isLoading) {
      return undefined
    }
    return parseAppearanceCheck(output)
  }, [isLoading, output])
  return (
    <Box
      bgGradient="linear(to-r, #89aaff, #8bfff8)"
      minHeight="100vh"
      width="100%"
      p={4}
      pl={20}
      pr={20}
    >
      <VStack spacing={10}>
        <Title />
        <Box w={isLargerThan768 ? "50%" : "90%"} minW="300px">
          <SituationSelector onChangeSituation={onChangeSituation} />
        </Box>
        <Flex w="100%" direction={isLargerThan768 ? "row" : "column"} gap={4}>
          <Box w={isLargerThan768 ? "60%" : "100%"}>
            {pictureUrl !== undefined ? (
              <Box borderRadius="32px" overflow="hidden">
                <Image
                  src={pictureUrl}
                  alt="Uploaded"
                  style={{
                    transform: "scaleX(-1)",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            ) : (
              <Box borderRadius="32px" overflow="hidden">
                <Camera
                  ref={camera}
                  errorMessages={{
                    noCameraAccessible: "カメラが使えないみたい🥺",
                    permissionDenied: "カメラが使えないみたい🥺",
                    switchCamera: "カメラが使えないみたい🥺",
                    canvas: "カメラが表示できないみたい🥺",
                  }}
                  aspectRatio={4 / 3}
                />
              </Box>
            )}
          </Box>
          <Flex
            w={isLargerThan768 ? "38%" : "100%"}
            direction="column"
            bg="white"
            borderRadius="32px"
            p="32px"
            overflow="auto"
          >
            {isLoading ? (
              <Loading />
            ) : checkResult ? (
              <AppearanceCheckResultView
                result={checkResult}
                isLoading={isLoading}
              />
            ) : (
              <Box flex="1" />
            )}
          </Flex>
        </Flex>
        {takenPicture ? (
          <HStack>
            <MyIconButton
              onClick={handleRetryButtonClick}
              icon={<FaRedo />}
              ariaLabel="Retry"
            />
            {checkResult && (
              <TwitterShareButton
                url={window.location.href}
                text={generateShareText(checkResult)}
              />
            )}
          </HStack>
        ) : (
          <MyIconButton
            onClick={handleCheckButtonClick}
            icon={<FaCameraRetro />}
            ariaLabel="Check"
          />
        )}
      </VStack>
    </Box>
  )
}
