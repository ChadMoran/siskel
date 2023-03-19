import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const searchMovies = async (
  query: string,
  minResults: number = 10,
  maxResults: number = 20,
) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: [
          'You are a movie expert and will suggest movies similar to the one given to you.',
          'You will be given a list of movies and you will have to suggest a movie similar to it.',
          'You will start with movies that are most similar to it then branch yout',
          'You will include the movie, the year and the reason why you think it is similar to the movie given to you.',
          `You will give a minimum of ${minResults} and maximum of ${maxResults} suggestions`,
          'None of your suggestions can be in the provided list of movies',
          'The provided list will be either a single movie or a comma separated list of movies',
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
  searchMovies,
}
