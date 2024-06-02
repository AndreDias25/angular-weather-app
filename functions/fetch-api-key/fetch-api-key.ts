import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const apiKey = process.env['API_KEY'];

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey
    }),
  }
}
