import { useState, useCallback } from "react"

interface UseCameraResult {
  capturedPhoto: File | null
  photoPreview: string | null
  takePhoto: () => Promise<File | null>
  retakePhoto: () => void
  isCaptureMode: boolean
}
export const useCamera = (): UseCameraResult => {
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isCaptureMode, setIsCaptureMode] = useState(true)

  const takePhoto = useCallback((): Promise<File | null> => {
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
  }, [])

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null)
    setPhotoPreview(null)
    setIsCaptureMode(true)
  }, [])

  return {
    capturedPhoto,
    photoPreview,
    takePhoto,
    retakePhoto,
    isCaptureMode,
  }
}
