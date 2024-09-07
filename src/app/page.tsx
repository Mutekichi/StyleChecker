"use client"

import { Box, Button, HStack, Select, Spacer, VStack } from "@chakra-ui/react"

export default function Home() {
  return (
    <div>
      <HStack>
        <Box w="60%" p={4}>
          <VStack spacing={4}>
            {/* TODO: ドロップゾーンを追加する */}
            <Select placeholder="シチュエーションを選択">
              <option>友達とお出かけ</option>
              <option>デート</option>
              <option>上司と会食</option>
            </Select>
            <HStack w="100%">
              <Spacer />
              <Button>チェックする</Button>
            </HStack>
          </VStack>
        </Box>
        <Box w="40%">
          {/* TODO: ここに身だしなみについてのコメントを表示していく */}
        </Box>
      </HStack>
    </div>
  )
}
