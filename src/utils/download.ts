/**
 * 画像URLからFileオブジェクトを作成する関数
 * @param imageUrl ダウンロードする画像のURL
 * @param fileName 保存するファイル名（オプション）
 * @returns Promise<File> Fileオブジェクトを返すPromise
 */
export async function downloadImageAsFile(
  imageUrl: string,
  fileName?: string
): Promise<File> {
  try {
    // 画像をフェッチ
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // レスポンスをBlobとして取得
    const blob = await response.blob()

    // Content-Typeヘッダーから画像の種類を取得
    const contentType = response.headers.get("Content-Type") || "image/jpeg"

    // ファイル名が指定されていない場合、URLから生成
    if (!fileName) {
      const urlParts = imageUrl.split("/")
      fileName = urlParts[urlParts.length - 1]
      // ファイル名に拡張子がない場合、Content-Typeから推測して追加
      if (!fileName.includes(".")) {
        const extension = contentType.split("/")[1]
        fileName += `.${extension}`
      }
    }

    // BlobからFileオブジェクトを作成
    const file = new File([blob], fileName, { type: contentType })

    return file
  } catch (error) {
    console.error("Image download failed:", error)
    throw error
  }
}
