import { FC } from "react"
import { Text, Icon, VStack, HStack } from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"

export interface AppearanceCheckItemProps {
  ok: boolean
  title: string
  description: string
}

export const AppearanceCheckItem: FC<AppearanceCheckItemProps> = (props) => {
  const { ok, title, description } = props

  return (
    <HStack spacing={8} bgColor="transparent" alignItems="start" p={4}>
      <Icon
        as={ok ? CheckIcon : CloseIcon}
        color={ok ? "green.500" : "red.500"}
        boxSize={8}
        mt={2}
      />
      <VStack alignItems="start">
        <Text fontWeight="bold" fontSize="2rem" fontFamily={"Noto Sans Symbol"}>
          {title}
        </Text>
        <Text
          fontWeight="normal"
          fontSize="1.2Srem"
          color={ok ? "green.500" : "red.500"}
        >
          {description}
        </Text>
      </VStack>
    </HStack>
  )
}
