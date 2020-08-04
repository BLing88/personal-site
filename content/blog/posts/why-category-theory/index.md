---
title: Why category theory?
date: "2020-08-01"
description: "Why should I care about category theory?"
tags:
  - category theory
  - programming
---

I don’t remember exactly when or where I first heard about category theory, but it has piqued my interest because there’s a big push towards declarative programming, in React, for example.

What is declarative programming? Quoting [Wikipedia][declarative programming]:

> _Declarative programming is a non-imperative style of programming in which programs describe their desired results without explicitly listing commands or steps that must be performed._

In other words, say _what_ you want to happen instead of _how_ you want it to happen.[^1]

So where does category theory come into the picture? Well, in programming, we break down problems we want to solve into easier subproblems (and break down _those_ subproblems into sub&ndash;subproblems, if necessary) and combine their solutions together to get a solution to the original problem.

We call this act of combination _composition_. And as [Bartosz Milewski][ctp] says, &ldquo;Composition is at the very root of category theory — it’s part of the definition of the category itself.&rdquo; A declarative style of programming makes composition more obvious (think of chaining `map`, `filter`, and `reduce`, for example).

Category theory gives us a formal language for talking about abstractions and composable structure. Moreover, it doesn&rsquo;t care about the internal structure of things &mdash; it only cares about how they _relate_ to one another. This brings to mind the phrase &ldquo;Code to an interface, not an implementation.&rdquo;

Given its generality, category theory has been applied to a wide range of fields, including [physics][physics category theory], [linguistics][linguistics category theory], [functional programming][monads], and [database theory][databases category theory].

## So what?

The main question still stuck in my head is: So what? OK, great, we can do all these formal manipulations and make all these analogies with category theory, but what exactly do we gain from the effort? More specifically from a programmer point of view, how does it help us write better code?

<!-- What I would love to see is a direct application of category theory to programming, for example, a direct application of a theorem or concept that leads us to something new that would have been difficult to come up with otherwise. I suppose [monads][monads] count as an application, but I’d like to see more. -->

I suspect that the major benefit of category theory is becoming more adept with abstract thinking and better able to identify related structures in seemingly unrelated things. In particular for programming, it seems likely that it will influence the design and development of your software, rather than appear as some concrete application. For example, the well-known (if not well-understood in general) concept of a [monad][monads] is apparently a design pattern.

## The plan

To figure this out, I’ve decided to learn category theory. My main reference will be Bartosz Milewski’s
[_Category Theory for Programmers_][ctp], along with Fong and Spivak’s [_Seven Sketches in Compositionality: An Invitation to Applied Category Theory_][seven sketches], Fong, Milewski, and Spivak’s (draft) [_Programming with Categories_][pwc], and Saunder Mac Lane’s classic _Categories for the Working Mathematician_.

I’ll attempt to explain key concepts in plain language as I learn them in future blog posts. I’ll also be writing my solutions to the programming exercises in Milewski’s book [here][ctfp-repo].

[^1]: Of course, at some point we have to imperatively tell the computer what to do, but we hide that behind an abstraction layer.

[declarative programming]: https://en.wikipedia.org/wiki/Declarative_programming
[ctp]: https://github.com/hmemcpy/milewski-ctfp-pdf
[seven sketches]: https://arxiv.org/abs/1803.05316
[physics category theory]: https://arxiv.org/abs/0905.3010 "Categories for the practicing physicist"
[linguistics category theory]: https://arxiv.org/abs/1003.4394 "Mathematical Foundations for a Compositional Distributional Model of Meaning"
[monads]: https://en.wikipedia.org/wiki/Monad_(functional_programming)
[databases category theory]: https://arxiv.org/abs/1903.10579 "Categorical Data Integration for Computational Science"
[pwc]: http://brendanfong.com/programmingcats.html
[ctfp-repo]: https://github.com/BLing88/category-theory-for-programmers
