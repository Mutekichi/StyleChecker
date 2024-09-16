import { Text } from "@chakra-ui/react"
import { FC } from "react"

export const Title: FC = () => {
  return (
    <Text
      fontSize={["xl", "2xl", "3xl", "4xl"]}
      fontWeight="bold"
      color="white"
      letterSpacing={4}
    >
      みだしなみチェッカー
    </Text>
  )
}
