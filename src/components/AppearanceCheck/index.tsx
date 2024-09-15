import { FC } from "react"
import { AppearanceCheckItem } from "@/components/AppearanceCheck/AppearanceCheckItem"
import { VStack } from "@chakra-ui/react"
import { AppearanceCheckProps } from "@/features/Parse/types"

type AppearanceCheckResultViewProps = {
  isLoading: boolean
  result: AppearanceCheckProps | undefined
}

export const AppearanceCheckResultView: FC<AppearanceCheckResultViewProps> = ({
  result,
}: AppearanceCheckResultViewProps) => {
  if (result === undefined) {
    return null
  }
  const { dress, grooming, visual } = result

  return (
    <VStack spacing={3} align="start" gap="20px" h="100%">
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
  )
}
