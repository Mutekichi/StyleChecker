"use client"

import { AppearanceCheckResultView } from "@/components/AppearanceCheck"
import { parseAppearanceCheck } from "@/features/Parse"
import { AppearanceCheckProps } from "@/features/Parse/types"
import { Situation, situationToPrompt } from "@/features/Situation"
import { useChatGPT, useMockChatGPT } from "@/hooks/useChatGPT"
import {
  Box,
  Flex,
  HStack,
  Image,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"
import { FaCameraRetro, FaRedo } from "react-icons/fa"
import { Camera } from "react-camera-pro"
import { Title } from "@/components/Title"
import { SituationSelector } from "@/components/SituationSelector"
import { Loading } from "@/components/Loading"
import { MyIconButton } from "@/components/MyIconButton"
import { TwitterShareButton } from "@/components/TwitterShareButton"
import { generateShareText } from "@/features/Tweet"
import { useCamera } from "@/hooks/useCamera"

export default function Home() {
  const { streamResponse, isLoading, output, reset } = useChatGPT()
  // for local development especially on real mobile devices
  // const { streamResponse, isLoading, output, reset } = useMockChatGPT()
  const toast = useToast()
  const [situation, setSituation] = useState<Situation | undefined>(undefined)

  const {
    takePhoto,
    retakePhoto,
    capturedPhoto,
    photoPreview,
    cameraRef,
    hasCamera,
  } = useCamera()

  const [isMobile] = useMediaQuery("(min-width: 768px)")

  const prompt = useMemo(() => {
    if (situation === undefined) {
      return ""
    }
    return situationToPrompt(situation)
  }, [situation])

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
    try {
      const photoFile = await takePhoto()

      if (photoFile) {
        await streamResponse(prompt, photoFile)
      } else {
        toast({
          description: "写真の撮影に失敗しました。もう一度お試しください。",
          status: "warning",
          isClosable: true,
          position: "top",
        })
      }
    } catch (error) {
      console.error("Error during photo capture or streaming:", error)
      toast({
        description: "エラーが発生しました。もう一度お試しください。",
        status: "error",
        isClosable: true,
        position: "top",
      })
    }
  }, [situation, takePhoto, streamResponse, prompt, toast])

  const handleRetryButtonClick = useCallback(() => {
    retakePhoto()
    reset()
  }, [retakePhoto, reset])

  const checkResult = useMemo((): AppearanceCheckProps | undefined => {
    if (isLoading) {
      return undefined
    }
    return parseAppearanceCheck(output)
  }, [isLoading, output])

  return (
    <Box
      bgGradient="linear(to-r, #89aaff, #8bfff8)"
      minH="100dvh"
      width="100%"
      pt={6}
      pb={12}
      px={[4, 6]}
    >
      <VStack spacing={10} w="90%" margin="0 auto">
        <Title />
        <Box w="100%" minW="300px">
          <SituationSelector onChangeSituation={onChangeSituation} />
        </Box>
        <Flex
          w="100%"
          direction={isMobile ? "row" : "column"}
          gap={4}
          alignItems={isMobile ? undefined : "center"}
          justifyContent="center"
        >
          <Box w={isMobile ? "58%" : "100%"}>
            {photoPreview ? (
              <Box borderRadius="32px" overflow="hidden">
                <Image
                  src={photoPreview}
                  alt="Captured"
                  style={{
                    transform: hasCamera ? "scaleX(-1)" : "none",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            ) : hasCamera ? (
              <Box borderRadius="32px" overflow="hidden">
                <Camera
                  ref={cameraRef}
                  errorMessages={{
                    noCameraAccessible: "カメラが使えないみたい🥺",
                    permissionDenied: "カメラが使えないみたい🥺",
                    switchCamera: "カメラが使えないみたい🥺",
                    canvas: "カメラが表示できないみたい🥺",
                  }}
                  aspectRatio={4 / 3}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          {(isMobile || output) && (
            <Flex
              w={isMobile ? "40%" : "100%"}
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
          )}
        </Flex>
        {capturedPhoto ? (
          <HStack spacing={8}>
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
