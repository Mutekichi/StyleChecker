import { Box, HStack } from "@chakra-ui/react"
import { FC } from "react"
import { Bubble } from "./Bubble"
import { Advisor } from "./Advisor"

export interface AdvisorBubbleProps {
  emotion: "happy" | "angry" | "neutral"
  text: string
}

export const AdvisorBubble: FC<AdvisorBubbleProps> = (props) => {
  const { emotion, text } = props

  return (
    <HStack alignItems="start" p={4}>
      <Box w="30%">
        <Advisor emotion={emotion} />
      </Box>
      <Box w="70%" p={2}>
        <Bubble content={text} />
      </Box>
    </HStack>
  )
}
