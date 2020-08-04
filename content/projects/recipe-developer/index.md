---
title: Recipe Developer
date: 2020-06-02
github_url: "https://github.com/BLing88/recipe-developer"
image_url: "./recipe-developer.jpg"
description: Easily create your own recipes and experiment with ones you like already.
---

> Tl;dr &mdash; This app is written in Typescript and React, with a full GraphQL AWS Lambda serverless back end using Apollo server and an AWS DynamoDB database, and login and authentication handled with Auth0. I deployed the front end with Vercel (formerly Zeit) and back end with Serverless. Integration and unit tests are written in Jest. For more details about how the app works and to see the source code, check out the [Github repository][gitrepo].

### Concept

I love to cook and often find myself modifying recipes or creating my own recipes, so I made an app to help me do that.

The app lets you easily create and modify the ingredients, instructions, and notes of any of your recipes. Responsive design was incorporated to make using the app on mobile or tablet easy.

### Some Thoughts

#### Converting to Typescript

I originally wrote most of this app in plain Javascript, but after having written That Looks Good in Typescript, I decided to get more practice with it by converting this app to it as well. I thought it was going to take a while to type everything on both the front end as well as the back end and make sure everything was still functional, but it only took a little over a day. The only things that I have not converted are a lot of the Jest tests.

#### GraphQL + Serverless

This was my first time using GraphQL. I chose to use [Apollo Server][apollo server] and [Apollo Client][apollo client] to implement the server and make requests from the front end.

The idea of only exposing a single endpoint that returns only the data needed for a given request was more appealing than that of having several predefined endpoints with a traditional REST API.

Luckily creating a GraphQL schema wasn’t difficult because the main object, a recipe, lends itself to an intuitive schema (a recipe is made up of a name, ingredients, instructions, etc. and you can update any of those parts).

Deploying the backend on AWS Lambda using Serverless was quick and easy. After setting up permissions and whatnot all I had to do was run `serverless deploy`.

#### Jest + Test-driven development

This was my first experience with test-driven development. I tried to follow as much as possible the basic flow of first writing failing tests, then implementing code to pass the tests, and then refactoring the code.

Jest made this experience pretty enjoyable, as its test error messages are very user-friendly, and it emphasizes testing features rather than [testing implementation details][testing].

[gitrepo]: https://github.com/BLing88/recipe-developer
[apollo server]: https://www.apollographql.com/docs/apollo-server/
[apollo client]: https://www.apollographql.com/docs/react/
[testing]: https://kentcdodds.com/blog/testing-implementation-details
