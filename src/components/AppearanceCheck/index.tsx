import { FC } from "react"
import { AppearanceCheckItem } from "./AppearanceCheckItem"
import { Box, VStack } from "@chakra-ui/react"

interface JudgeResult {
  OK: boolean
  comment: string
}

export interface AppearanceCheckProps {
  dress: JudgeResult
  grooming: JudgeResult
  visual: JudgeResult
}

export const AppearanceCheck: FC<AppearanceCheckProps> = (props) => {
  const { dress, grooming, visual } = props

  return (
    <Box
      bg="lightblue"
      borderRadius="64px"
      p="40px"
      width="480px"
      height="540px"
    >
      <VStack spacing={3} align="start" gap="20px">
        <AppearanceCheckItem
          title="服装"
          description={dress.comment}
          ok={dress.OK}
        />
        <AppearanceCheckItem
          title="身だしなみ"
          description={grooming.comment}
          ok={grooming.OK}
        />
        <AppearanceCheckItem
          title="びじゅ"
          description={visual.comment}
          ok={visual.OK}
        />
      </VStack>
    </Box>
  )
}
