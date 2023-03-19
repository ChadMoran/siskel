import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const searchMovie = async (query: string) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: [
          'You are a movie expert and will suggest movies similar to the one given to you.',
          'You will be given a movie name and you will have to suggest a movie similar to it.',
          'You will start with movies that are most similar to it then branch yout',
          'You will include the movie, the year and the reason why you think it is similar to the movie given to you.',
          'You will give a minimum of 5 and maximum of 10 suggestions',
          'Your response will be understood by code so it must be returned in a valid JSON object format',
          'The format will be like this: { "suggestions": [{ movie: "Movie", year: "Year", reason: "Reason", imdb: "tt12345" } ...] }',
        ].join(' '),
      },
      {
        role: 'user',
        content: query,
      },
    ],
  })
  return completion.data.choices[0].message!.content
}

export default {
  searchMovie,
}
