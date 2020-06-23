---
title: Why category theory?
date: "2020-06-22"
description: "Why should I care about category theory?"
tags:
  - category theory
  - programming
---

I don&rsquo;t remember exactly where or when I first heard about category theory, but I&rsquo;ve become curious about it given the push towards declarative programming, in React, for example.

## The claims about category theory

What is declarative programming? To quote [Wikipedia][declarative programming]:

> Declarative programming is a non-imperative style of programming in which programs describe their desired results without explicitly listing commands or steps that must be performed.

In other words, say _what_ you want to happen instead of _how_ you want it to happen.

So where does category theory come into the picture? Well, in programming, we break down problems into easier subproblems (and break down those subproblems into sub&ndash;subproblems, if necessary) and combine their solutions together to get a solution to the original problem. We call this act of combination _composition_. And as Bartosz Milewski says, &ldquo;Composition is at the very root of category theory — it’s part of the definition of the category itself.&rdquo;

Category theory gives us a formal language for talking about abstractions and (composable) structure, and moreover, it doesn&rsquo;t care about the internal structure of things &mdash; it only cares about how they _relate_ to one another. This is reminiscent of the phrase &ldquo;Code to an interface, not an implementation.&rdquo;

Given it’s generality and abstractness, category theory has been applied to a wide range of fields, including [physics][physics category theory], [linguistics][linguistics category theory], [functional programming][monads], and [database theory][databases category theory].

## So what?

The main question still stuck in my head is: So what? OK, great, we can do all these formal manipulations and make all these relationships with category theory, but what exactly do we gain from the effort? More specifically, how exactly does it help us write better code?

What I want to see is a direct application of category theory to programming, for example, a direct application of a theorem or concept that leads us to something new that would have been difficult to come up with otherwise. I suppose [monads][monads] count as an application, but I’d like to see one a bit more general.

## The plan

I’ve decided to learn category theory. My main reference will be Bartosz Milewski’s
[_Category Theory for Programmers_][ctp], along with Fong and Spivak’s [_Seven Sketches in Compositionality: An Invitation to Applied Category Theory_][seven sketches] and Saunder Mac Lane’s classic _Categories for the Working Mathematician_.

I’ll be attempting to explain key concepts as I learn them in plain language in future blog posts. I’ll also be writing my solutions to the programming exercises in Milewski’s book here.

[declarative programming]: https://en.wikipedia.org/wiki/Declarative_programming
[ctp]: https://github.com/hmemcpy/milewski-ctfp-pdf
[seven sketches]: https://arxiv.org/abs/1803.05316
[physics category theory]: https://arxiv.org/abs/0905.3010 "Categories for the practicing physicist"
[linguistics category theory]: https://arxiv.org/abs/1003.4394 "Mathematical Foundations for a Compositional Distributional Model of Meaning"
[monads]: https://en.wikipedia.org/wiki/Monad_(functional_programming)
[databases category theory]: https://arxiv.org/abs/1903.10579 "Categorical Data Integration for Computational Science"
