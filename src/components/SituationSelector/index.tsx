import { FC } from "react"
import { Box, Icon, Select } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

interface SituationSelectorProps {
  onChangeSituation: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SituationSelector: FC<SituationSelectorProps> = (props) => {
  const { onChangeSituation } = props

  return (
    <Box>
      <Select
        borderRadius="full"
        placeholder="今日はどこに行くのかな？🤔✨"
        fontSize="x-large"
        fontWeight="normal"
        onChange={onChangeSituation}
        backgroundColor="white"
        textAlign="center"
        h={20}
        icon={<Icon as={ChevronDownIcon} color="gray.500" w={6} h={6} />}
        iconSize="24px"
        sx={{
          "& > option": {
            background: "white",
            color: "black",
          },
        }}
      >
        <option value="friend">今日は友達と楽しくお出かけ✨😊</option>
        <option value="date">今日はこれからデート❤️😍</option>
        <option value="boss">今日は上司と会食💼🍽</option>
      </Select>
    </Box>
  )
}
