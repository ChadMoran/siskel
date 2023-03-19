#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import inquirer from 'inquirer'

const program = new Command()

program.version('0.0.1').description('A CLI tool for suggesting movies')

program
  .command('movie')
  .description('Search for a movie')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'movie',
          message: 'Enter a movie name',
        },
      ])
      .then((answers) => {
        console.log(chalk.green(`Searching for 🍿 ${answers.movie}...`))
      })
  })

program.parse(process.argv)
