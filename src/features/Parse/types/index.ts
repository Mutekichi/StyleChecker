export type RawAppearanceCheck = {
  dress: {
    OK: boolean
    comment: string
  }
  grooming: {
    OK: boolean
    comment: string
  }
  visual: {
    OK: boolean
    comment: string
  }
}

export interface JudgeResult {
  OK: boolean
  comment: string
}

export interface AppearanceCheckProps {
  dress: JudgeResult
  grooming: JudgeResult
  visual: JudgeResult
}
