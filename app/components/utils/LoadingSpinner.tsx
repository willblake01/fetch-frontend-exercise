import { JSX } from 'react'
import { Style } from 'react-loader-spinner'
import { FidgetSpinner } from 'react-loader-spinner'

export interface LoadingSpinnerProps {
  ariaLabel?: string
  backgroundColor?: string
  ballColors?: [string, string, string]
  height?: string
  width?: string
  visible: boolean
  wrapperStyle?: Style
}

export const LoadingSpinner = ({
    height,
    width,
    ariaLabel,
    wrapperStyle,
    ballColors,
    backgroundColor,
    visible,
}: LoadingSpinnerProps): JSX.Element => {
  return (
    <FidgetSpinner
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      wrapperStyle={wrapperStyle}
      ballColors={ballColors}
      backgroundColor={backgroundColor}
      visible={visible}
    />
  )
}

export default LoadingSpinner
