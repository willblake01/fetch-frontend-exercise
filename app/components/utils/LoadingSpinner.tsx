import { FC } from 'react'
import { Style } from 'react-loader-spinner'
import { FidgetSpinner } from 'react-loader-spinner'

interface LoadingSpinnerProps {
  ariaLabel?: string
  backgroundColor?: string
  ballColors?: [string, string, string]
  height?: string
  width?: string
  visible: boolean
  wrapperClass?: string
  wrapperStyle?: Style
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ ariaLabel, backgroundColor, ballColors, height, visible, width, wrapperClass, wrapperStyle }) => {
  return (
    <FidgetSpinner
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      wrapperStyle={wrapperStyle}
      wrapperClass={wrapperClass}
      ballColors={ballColors}
      backgroundColor={backgroundColor}
      visible={visible}
    />
  );
}

export default LoadingSpinner;
