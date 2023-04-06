import SlackNotify from 'slack-notify'
import config from '../../../config'

const slack = SlackNotify(config.slackWebHookUrl)

export const slackNotif = (event: string, data: any) => {
      slack.send(`Event: ${event}\nData: ${JSON.stringify(data, null, 2)}`)
            .then(() => {
                  console.log('Slack notification sent!')
            })
            .catch((err) => {
                  console.error('Error sending Slack notification:', err)
            })
}
