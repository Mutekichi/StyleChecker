import { FC } from "react"
import { AppearanceCheckItem } from "@/components/AppearanceCheck/AppearanceCheckItem"
import { Box, Center, Spinner, VStack } from "@chakra-ui/react"
import { AppearanceCheckProps } from "@/features/Parse/types"

type AppearanceCheckResultViewProps = {
  isLoading: boolean
  result: AppearanceCheckProps | undefined
}

export const AppearanceCheckResultView: FC<AppearanceCheckResultViewProps> = ({
  isLoading,
  result,
}: AppearanceCheckResultViewProps) => {
  if (result === undefined) {
    return (
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
    )
  }
  const { dress, grooming, visual } = result

  return (
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
  )
}
