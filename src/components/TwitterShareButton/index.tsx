import React from "react"
import { FaTwitter } from "react-icons/fa"
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
      icon={<FaTwitter />}
      ariaLabel="Twitter (X)で共有"
      colorScheme="twitter"
    />
  )
}
