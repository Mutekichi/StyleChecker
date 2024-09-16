import { downloadImageAsFile } from "@/utils/download"
import { useRef, useState } from "react"
import { CameraType } from "react-camera-pro"

interface UseCameraResult2 {
  takePhoto: () => Promise<File | null>
  retakePhoto: () => void
  capturedPhoto: File | null
  photoPreview: string | null
  cameraRef: React.RefObject<CameraType>
}

export const useCamera2 = (): UseCameraResult2 => {
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const camera = useRef<CameraType>(null)

  const takePhoto = async (): Promise<File | null> => {
    if (camera.current) {
      const image = camera.current.takePhoto()
      const imageUrl = image as string
      const imageFile = await downloadImageAsFile(imageUrl)
      setCapturedPhoto(imageFile)
      setPhotoPreview(imageUrl) // Set the photo preview
      return imageFile
    }
    return null
  }

  const retakePhoto = () => {
    setCapturedPhoto(null)
    setPhotoPreview(null)
  }

  return {
    takePhoto,
    retakePhoto,
    capturedPhoto,
    photoPreview,
    cameraRef: camera,
  }
}
