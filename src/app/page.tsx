"use client"

import { LeftPanel } from "@/components/LeftPanel"
import { RightPanel } from "@/components/RightPanel"
import { Box, HStack } from "@chakra-ui/react"

export default function Home() {
  return (
    <div>
      <HStack>
        <Box w="60%" p={4}>
          <LeftPanel />
        </Box>
        <Box w="40%">
          <RightPanel />
        </Box>
      </HStack>
    </div>
  )
}
