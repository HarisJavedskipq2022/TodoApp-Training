export interface Others {
  commander: string
  slackWebHookUrl: string
}

export const others: Others = {
  commander: process.env.COMMANDER || '',
  slackWebHookUrl: process.env.SLACK_WEBHOOK_URL || '',
}
