import type { Situation } from "./types"

export * from "./types"

export function situationToPrompt(situation: Situation) {
  return `
  ギャルの口調で、以下のすべての内容を話してください。シチュエーションは${(() => {
    switch (situation) {
      case "boss": {
        return "会社の上司と食事に行く"
      }
      case "date": {
        return "恋人とデートに行く"
      }
      case "friend": {
        return "友達と遊ぶ"
      }
    }
  })()}です。
・服装
・身だしなみ
・びじゅ
出力フォーマットは以下のものに従ってください。出力フォーマットのみを回答してください。
コメントは簡潔に答えてください。
{
    "dress":{
        "OK":true or false,
        "comment":
    },
    "grooming":{
        "OK":true or false,
        "comment":
    },
    "visual":{
        "OK":true or false,
        "comment":
    }
}`
}
