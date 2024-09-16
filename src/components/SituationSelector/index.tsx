import { FC } from "react"
import { Icon, Select } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

interface SituationSelectorProps {
  onChangeSituation: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SituationSelector: FC<SituationSelectorProps> = (props) => {
  const { onChangeSituation } = props

  return (
    <Select
      borderRadius="full"
      placeholder="今日はどこに行くのかな？🤔✨"
      fontSize={["lg", "xl", "2xl", "2xl"]}
      fontWeight="light"
      onChange={onChangeSituation}
      backgroundColor="white"
      textAlign="center"
      h={20}
      w="100%"
      icon={<Icon as={ChevronDownIcon} color="gray.500" w={4} h={4} />}
      iconSize="24px"
      sx={{
        "text-align-last": "center",
        "& > option": {
          background: "white",
          color: "black",
        },
      }}
    >
      <option value="friend">友達と楽しくお出かけ✨😊</option>
      <option value="date">これからデート❤️😍</option>
      <option value="boss">上司と会食💼🍽</option>
    </Select>
  )
}
