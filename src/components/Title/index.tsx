import { Text } from "@chakra-ui/react"
import { FC } from "react"

export const Title: FC = () => {
  return (
    <Text
      fontSize={["2xl", "3xl", "4xl", "5xl"]}
      fontWeight="bold"
      color="white"
      letterSpacing={[2, 4]}
    >
      みだしなみチェッカー
    </Text>
  )
}
