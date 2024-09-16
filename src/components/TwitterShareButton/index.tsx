import React from "react"
import { FaXTwitter } from "react-icons/fa6"
import { MyIconButton } from "../MyIconButton"

interface TwitterShareButtonProps {
  url: string
  text: string
}

export const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  url,
  text,
}) => {
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank")
  }

  return (
    <MyIconButton
      onClick={handleShare}
      icon={<FaXTwitter />}
      ariaLabel="Xで共有"
      bg="black"
      color="white"
      _hover={{ bg: "gray.700" }}
    />
  )
}
