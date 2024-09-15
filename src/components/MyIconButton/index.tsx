import { IconButton } from "@chakra-ui/react"
import { FC, ReactElement, JSXElementConstructor } from "react"

interface MyIconButtonProps {
  onClick: () => void
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined
  ariaLabel: string
}
export const MyIconButton: FC<MyIconButtonProps> = (props) => {
  const { onClick, icon, ariaLabel } = props

  return (
    <IconButton
      aria-label={ariaLabel}
      icon={icon}
      borderRadius="full"
      boxSize="100px"
      fontSize="40px"
      onClick={onClick}
    />
  )
}
