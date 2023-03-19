#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import AI from './ai.js'

const program = new Command()

program.version('0.0.1').description('A CLI tool for suggesting movies')

program
  .command('movie <movie>')
  .description('Search for a movie')
  .action(async (movie) => {
    const promise = AI.searchMovie(movie)

    console.log(chalk.green(`Searching for 🍿 ${chalk.bold(movie)}...`))

    const response = JSON.parse(await promise)

    console.log(response)
  })

program.parse(process.argv)
