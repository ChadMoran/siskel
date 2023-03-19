# Siskel

A CLI tool for integrating Radarr and Sonarr with OpenAI to recommend new movies.

# Installation

`npm install -g siskel`

# Usage

You will need an OpenAI API Key and have it set as `OPENAI_API_KEY`.

## Movies

```bash
siskel movie "Too Big to Fail, The Big Short"
```

## Radarr

```bash
siskel radarr "http://localhost:7878" "API_KEY"
```
