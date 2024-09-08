import { AppearanceCheckProps, RawAppearanceCheck } from "./types"

export function parseAppearanceCheck(
  rawData: string
): AppearanceCheckProps | undefined {
  try {
    const parsedData: RawAppearanceCheck = JSON.parse(
      rawData
    ) as RawAppearanceCheck

    return {
      dress: {
        OK: parsedData.dress.OK,
        comment: parsedData.dress.comment,
      },
      grooming: {
        OK: parsedData.grooming.OK,
        comment: parsedData.grooming.comment,
      },
      visual: {
        OK: parsedData.visual.OK,
        comment: parsedData.visual.comment,
      },
    }
  } catch (error) {
    // do nothing
  }
}
