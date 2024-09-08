"use client"

import { AdvisorBubbleProps } from "./AdvisorBubble"
import { AppearanceCheck, AppearanceCheckProps } from "./AppearanceCheck"

export interface RightPanelProps {
  advisorBubblePropsList: AdvisorBubbleProps[]
}

const rawJson = `{
  "dress": {
    "OK": true,
    "comment": "マジやばくない？その服装、デートにはナシ～！"
  },
  "grooming": {
    "OK": false,
    "comment": "ちょーマズいんだけど！髪の毛ボサボサじゃん。"
  },
  "visual": {
    "OK": false,
    "comment": "全体的にダサすぎ！"
  }
}`

interface RawAppearanceCheck {
  dress: {
    OK: boolean
    comment: string
  }
  grooming: {
    OK: boolean
    comment: string
  }
  visual: {
    OK: boolean
    comment: string
  }
}

export function parseAppearanceCheck(rawData: string): AppearanceCheckProps {
  try {
    const parsedData: RawAppearanceCheck = JSON.parse(rawData)

    return {
      dress: {
        OK: parsedData.dress.OK,
        comment: parsedData.dress.comment,
      },
      grooming: {
        OK: parsedData.grooming.OK,
        comment: parsedData.grooming.comment,
      },
      visual: {
        OK: parsedData.visual.OK,
        comment: parsedData.visual.comment,
      },
    }
  } catch (error) {
    console.error("Error parsing appearance check data:", error)
    throw new Error("Failed to parse appearance check data")
  }
}

export function RightPanel(props: RightPanelProps) {
  return (
    <>
      <AppearanceCheck {...parseAppearanceCheck(rawJson)} />
    </>
  )
}
