import { useState, useCallback } from "react"

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"

interface UseClaudeReturn {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  output: string
  isLoading: boolean
  streamResponse: () => Promise<void>
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  image: File | null
  clearImage: () => void
}

export const useClaude = (): UseClaudeReturn => {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const streamResponse = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setOutput("")

    const formData = new FormData()
    formData.append("prompt", input)
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/claude-stream`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("ReadableStream not supported.")
      }

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setOutput((prevOutput) => prevOutput + chunk)
      }
    } catch (error) {
      console.error("Error:", error)
      setOutput("Error occurred while streaming the response.")
    } finally {
      setIsLoading(false)
    }
  }, [input, image])

  const clearImage = (): void => {
    setImage(null)
  }

  return {
    input,
    setInput,
    output,
    isLoading,
    streamResponse,
    handleImageChange,
    image,
    clearImage,
  }
}
