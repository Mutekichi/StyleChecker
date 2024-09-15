import { AppearanceCheckProps } from "../Parse/types"

export function generateShareText(result: AppearanceCheckProps): string {
  const totalChecks = 3
  const okChecks = [
    result.dress.OK,
    result.grooming.OK,
    result.visual.OK,
  ].filter(Boolean).length
  const emoji = okChecks === totalChecks ? "🌟" : okChecks >= 2 ? "👍" : "💪"

  let text = `みだしなみチェッカーで身だしなみをチェックしました！${emoji}\n`
  text += `結果: ${okChecks}/${totalChecks} OK\n`

  if (result.dress.OK) text += "服装OK✨ "
  if (result.grooming.OK) text += "身だしなみOK✨ "
  if (result.visual.OK) text += "全体的な印象OK✨ "

  text += "\n#みだしなみチェッカー"

  return text
}
