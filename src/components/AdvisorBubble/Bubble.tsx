import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { TriangleDownIcon } from "@chakra-ui/icons"

interface BubbleProps {
  content: string
}
export const Bubble: FC<BubbleProps> = (props) => {
  const { content } = props

  const bgColor = "blue.300"
  const textColor = "white"

  return (
    <Box position="relative" maxWidth="xs" ml="4" mr="0">
      <Box bg={bgColor} borderRadius="lg" p={4} boxShadow="md">
        <Text color={textColor} fontSize={20}>
          {content}
        </Text>
      </Box>
      <Box
        position="absolute"
        // calc min(30%, 10px) to prevent the triangle from being too big
        top="calc(min(30%, 30px))"
        left="-10px"
        transform="translateY(-50%) rotate(90deg)"
      >
        <TriangleDownIcon color={bgColor} boxSize={5} />
      </Box>
    </Box>
  )
}
