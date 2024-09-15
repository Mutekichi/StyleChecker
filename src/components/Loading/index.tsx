import { Center, Spinner } from "@chakra-ui/react"
import { FC } from "react"

export const Loading: FC = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  )
}
