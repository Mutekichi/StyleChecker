import { useState, useEffect } from "react"

export const useMediaDevices = () => {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null)

  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        )
        setHasCamera(videoDevices.length > 0)
      } catch (error) {
        console.error("Error checking camera availability:", error)
        setHasCamera(false)
      }
    }

    checkCameraAvailability()
  }, [])

  return { hasCamera }
}
