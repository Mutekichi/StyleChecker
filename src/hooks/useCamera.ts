import { useRef, useState, useEffect, useCallback } from "react"
import { CameraType } from "react-camera-pro"
import { downloadImageAsFile } from "@/utils/download"

interface useCameraResult {
  takePhoto: () => Promise<File | null>
  retakePhoto: () => void
  capturedPhoto: File | null
  photoPreview: string | null
  cameraRef: React.RefObject<CameraType>
  isCaptureMode: boolean
  hasCamera: boolean | null
}

export const useCamera = (): useCameraResult => {
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isCaptureMode, setIsCaptureMode] = useState(true)
  const [hasCamera, setHasCamera] = useState<boolean | null>(null)
  const cameraRef = useRef<CameraType>(null)

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

  const takePhoto = useCallback(async (): Promise<File | null> => {
    if (hasCamera) {
      if (cameraRef.current) {
        const image = cameraRef.current.takePhoto()
        const imageUrl = image as string
        const imageFile = await downloadImageAsFile(imageUrl)

        setCapturedPhoto(imageFile)
        setPhotoPreview(imageUrl)
        setIsCaptureMode(false)

        return imageFile
      }
    } else {
      return new Promise((resolve) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.capture = "environment"

        const handleChange = (e: Event) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            setCapturedPhoto(file)
            setIsCaptureMode(false)

            const reader = new FileReader()
            reader.onload = (event) => {
              setPhotoPreview(event.target?.result as string)
              resolve(file)
            }
            reader.onerror = () => {
              resolve(null)
            }
            reader.readAsDataURL(file)
          } else {
            resolve(null)
          }
        }

        input.addEventListener("change", handleChange)

        const timeoutId = setTimeout(() => {
          resolve(null)
        }, 60000)

        input.click()

        return () => {
          clearTimeout(timeoutId)
          input.removeEventListener("change", handleChange)
        }
      })
    }
    return null
  }, [hasCamera])

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null)
    setPhotoPreview(null)
    setIsCaptureMode(true)
  }, [])

  return {
    takePhoto,
    retakePhoto,
    capturedPhoto,
    photoPreview,
    cameraRef,
    isCaptureMode,
    hasCamera,
  }
}
