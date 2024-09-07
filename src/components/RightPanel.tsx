"use client"

import { AdvisorBubble, AdvisorBubbleProps } from "./AdvisorBubble"

export interface RightPanelProps {
  advisorBubblePropsList: AdvisorBubbleProps[]
}

export function RightPanel(props: RightPanelProps) {
  const { advisorBubblePropsList } = props

  return (
    <>
      {advisorBubblePropsList.map((props, index) => (
        <AdvisorBubble key={index} {...props} />
      ))}
    </>
  )
}
