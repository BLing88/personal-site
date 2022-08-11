---
title: That Looks Good
date: 2020-06-03
image_url: "./that-looks-good.jpg"
project_url: "https://that-looks-good.vercel.app"
description: A Tinder-inspired app to help when you're hungry but can't decide what to eat.
github_url: "https://github.com/BLing88/that-looks-good"
---

> Tl;dr &mdash; This demo app helps you decide when you're hungry but can't decide on what to eat. Inspired by Tinder, on your phone you swipe right on dishes that look good, and swipe left on dishes that don't. It’s written in Typescript and React, with a full GraphQL AWS Lambda serverless backend using Apollo server, and login and authentication handled with Auth0. I deployed the front end with Vercel (formerly Zeit) and back end with Serverless. Integration and unit tests are written in Jest. The photos are sourced from Unsplash. See the code and more details about how it works [here][github repo].

## Thoughts

This was a fun app to write, and it was my first app written in Typescript. I had wanted to start learning Typescript, and after reading some basic documentation, I figured the best way to learn would be to actually use it.

I thought the Tinder-like swipe functionality was going to be difficult to implement, but after I figured out how to implement basic dragging (which I wrote a custom React hook `useDrag` to do), the rotation was basically just one extra line of math:

```jsx{6-7}
// DishCard.tsx
transform: `
    translate(${deltaX + transition.vx}px,
              ${deltaY + transition.vy}px)
    rotate(${
      maxAngle * Math.tanh((deltaX + transition.vx)
                           / (window.innerWidth / 2))
      }deg)`,
```

There’s a lot going on in that one line, so let’s unpack it. The amount of rotation depends on how much you’ve dragged the image card horizontally, and in particular the rotation angle is calculated using the [hyperbolic tangent][tanh] function _tanh_ (read as “tanch” [IPA: tæntʃ] which rhymes with “blanch”).

The total amount you’ve dragged is given by `deltaX + transition.vx`, where `deltaX` is the amount you actually drag, and `transition.vx` is an amount related to the swiping animation when you like or dislike a dish (and not particularly important for this discussion).

I wanted the rotation to saturate when you swipe a distance of half the screen width, so I divided `deltaX + transition.vx` by `window.innerWidth / 2`. This works because tanh(1) is approximately equal to 0.76, so that when `deltaX + transition.vx` equals `window.innerWidth / 2`, the amount of rotation is 76% of the max rotation angle (discussed below).

Moreover, for small values of its argument, tanh changes quickly, while at larger values it changes more slowly (take a look at the graph of tanh at the link above), which is exactly what I wanted.

Finally, I multiply the whole thing by `maxAngle` since tanh approaches 1 for large values of its argument (and -1 for large, negative values). I set `maxAngle` to be 30 degrees.

[github repo]: https://github.com/BLing88/that-looks-good
[tanh]: https://mathworld.wolfram.com/HyperbolicTangent.html
