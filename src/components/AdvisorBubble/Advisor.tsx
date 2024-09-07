import { FC } from "react"
import Image from "next/image"
import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react"

interface AdvisorProps {
  emotion: "happy" | "angry" | "neutral"
  isSpeaking?: boolean
}

const speakAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

export const Advisor: FC<AdvisorProps> = (props) => {
  const { emotion, isSpeaking = false } = props
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${speakAnimation} 0.5s ease-in-out infinite`

  return (
    <Box animation={isSpeaking ? animation : undefined} display="inline-block">
      <Image
        src={`/images/${emotion}.png`}
        alt={emotion}
        width={200}
        height={200}
      />
    </Box>
  )
}
