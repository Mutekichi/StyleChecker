"use client"

import { Button, HStack, Select, Spacer, VStack } from "@chakra-ui/react"

export function LeftPanel() {
  return (
    <>
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
    </>
  )
}
