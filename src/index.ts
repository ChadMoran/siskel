#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import AI from './ai.js'

const program = new Command()

program.version('0.1.0').description('A CLI tool for suggesting movies')

program
  .command('movies <movies>')
  .description('Search for similar movies')
  .action(async (movies) => {
    const promise = AI.searchMovies(movies)

    console.log(chalk.green(`Searching for 🍿 ${chalk.bold(movies)}...`))

    const response = JSON.parse(await promise)

    console.log(response)
  })

program
  .command('radarr <endpoint> <apiKey>')
  .description('Search for similar movies in Radarr')
  .action(async (endpoint, apiKey) => {
    const url = new URL(`/api/v3/movie`, endpoint)
    const fetchResult = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
    })
    const jsonResult = await fetchResult.json()
    const movies = jsonResult.map((movie: any) => movie.title)
    const movieSearch = movies.join(', ')

    const promise = AI.searchMovies(movieSearch)

    console.log(chalk.green(`Found ${movies.length} 🍿 movies, searching...`))

    const response = JSON.parse(await promise)

    console.log(response)
  })

program.parse(process.argv)
