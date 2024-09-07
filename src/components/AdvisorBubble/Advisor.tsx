import { FC } from "react"
import Image from "next/image"

interface AdvisorProps {
  emotion: "happy" | "angry" | "neutral"
}

export const Advisor: FC<AdvisorProps> = (props) => {
  const { emotion } = props

  return (
    <div>
      <Image
        src={`/images/${emotion}.png`}
        alt={emotion}
        width={200}
        height={200}
      />
    </div>
  )
}
