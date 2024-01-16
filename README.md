# Typescript-Redux-Auth0-PKCE

Welcome to this project! It's a straightforward implementation of Auth0 with TypeScript and Redux, focusing on the PKCE (Proof Key for Code Exchange) method. Designed for both learning and practical use, this repository demonstrates how to enhance security in client applications using PKCE in a React frontend environment. Dive in to see how TypeScript, Redux, and Auth0 can work together to create a more secure authentication process!

## Features

- TypeScript implementation for type safety and developer efficiency.
- State management using Redux.
- Integration with Auth0 for authentication using PKCE.
- Implementation of Redux-Persist for state persistence.
- Axios setup for API calls with automated token handling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12 or above).
- Yarn or npm for package management.
- An Auth0 account and an application set up for PKCE flow.

## Setting Up

To set up the project, follow these steps:
1. Clone the repository:
  ```
  https://github.com/FadiBadarni/Typescript-Redux-Auth0-PKCE.git
  ```
2. Navigate to the project directory:
  ```
  cd Typescript-Redux-Auth0-PKCE
  ```
3.Install the dependencies:
  ```
  npm install
  ```
4.Environment Configuration
Set up the following environment variables in a .env file:
  ```
  # Auth0 Configuration
  REACT_APP_AUTH0_DOMAIN=your_auth0_domain
  REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
  REACT_APP_AUTH0_AUDIENCE=your_auth0_audience
  REACT_APP_AUTH0_REDIRECT_URI=your_auth0_redirect_uri
  
  # Backend API Configuration
  REACT_APP_API_URL=your_api_url
  ```
