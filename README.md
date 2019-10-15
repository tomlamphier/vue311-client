# nyc-neighborhood-client
Client front end for NYC Neighborhood project

Created by Tom Lamphier, thomaslamphier@gmail.com

## About NYC Neighborhood

NYC Neighborhood is a web application that uses the data from 311 calls to explore how
different complaints (e.g. noise) are distributed across the city by neighborhood.  There
are three parts to the project:

1. A Mongo db (github repo nyc-neighborhood-database)
2. Vue front end (this repo)
3. Spring Boot server (github repo nyc-neighborhood-server)

The URL for the live app is

The NYC Neighborhood Project was built on a Mac OSX computer. It should work without modification on any Linux-based OS.  Windows, maybe with some minor changes.

## Software Requirements
1. npm 6.4.1
2. http server (npm install -g serve)

## Development Install (Linux or Mac OSX)

1. Clone this repo to your development machine.
2. In project directory:
>```
>npm install
>```

## Running the Client
1. Build the back end database--see repo nyc-neighborhood-database.
2. Install the server component--see repo nyc-neighborhood-server.
3. Start server component.
4. Start client:
>```
>npm run dev # brings it up on port 80
>```
5. In a browser, go to address "http://localhost".

## About the Client

The NYC Neighborhood front end uses the Vue, an open source framework that is part of the node / npm ecosystem.  These are the components that make up the app:

>| Component        | Description                                |
>|------------------|--------------------------------------------|
>| App              | Home page.                                 |
>| Home             | Welcome                                    |
>| ComplaintList    | Data table for selecting complaint types   |
>|                  | of interest.                               |
>| NeighborhoodList | Data table for selecting neighborhoods.    |
>| DisplayMap       | Map that displays a color-coded            |
>|                  | (choropleth) comparison of neighborhoods.  |
>| ColorControl     | Map styling options.                       |

## Deploying to a Server

1. Package the client app:
>```
>npm run build
>```
2. Copy directory dist to target machine.
3. Run mini-http server:
>```
>serve -l 80 -s dist
>```
