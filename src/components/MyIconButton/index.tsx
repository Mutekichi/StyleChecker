import { IconButton, IconButtonProps } from "@chakra-ui/react"
import { FC, ReactElement, JSXElementConstructor } from "react"

interface MyIconButtonProps extends Omit<IconButtonProps, "aria-label"> {
  onClick: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined
  ariaLabel: string
}

export const MyIconButton: FC<MyIconButtonProps> = (props) => {
  const { onClick, icon, ariaLabel, ...rest } = props

  return (
    <IconButton
      aria-label={ariaLabel}
      icon={icon}
      borderRadius="full"
      boxSize="100px"
      fontSize="40px"
      onClick={onClick}
      {...rest}
    />
  )
}
