---
layout: post
title:  "July Midterm Report Update"
date:   2015-07-21 24:00:00
categories: updates
---

Last Thursday, I gave a presentation on our progress so far at our weekly
meeting. A 'midterm report', if you will. Our current features at the time
were:

* a realtime graph with 10 000 nodes and 10 000 edges using [sigmajs](http://sigmajs.org/)
* solution to FBA for one specie using [cobrapy](https://github.com/opencobra/cobrapy)
* a realtime graph displaying FBA results using [D3](http://d3js.org)

Upon presenting these webpages, I was immediately met with a variety of
questions, not all of which I could immediately answer. The rest of this post
will be a summary of those questions, the issues they address, and how we can
work to create a tool which encompasses all of the needs addressed by our
grad student and professor advisers, and of course, by ourselves.

At the time of presentation, we were mainly concerned with finding the proper
web technology to efficiently display large datasets. After thorough comparisons
between D3 and sigmajs, we have now decided to pursue D3 + canvas rendering with
no DOM elements.

## Project Plan

* Model and modify how different species interact in a community
* FBA for single species modelling, cFBA for community FBA
* data is coming from SMBL formatted files which provide metabolic model for a
  specie
* users will be able to interact with the dataset, and view the results of their
  actions in realtime


## What does the visualization represent?

What do the nodes represent? What do colours mean? What does the length of
connections between nodes mean? Radius? What can be inferred from a group of
nodes in close proximity? All of these elements must be custom rendered by us,
and each item must have a direct meaning tying it to the data. *Everything*
must mean something which can be interpreted meaningfully by the user.

* Reaction node size: represents the flux of that reaction. Potential issues, 
  what if multiple reactions facilitated, how to differentiate?
* Metabolite node size: now it is static. Can be made to represent relative 
  concentration of metabolite in the system?
* Edges: edge thickness will be made to represent the flux of the reaction
  instead of reaction node size. This eliminates some ambiguity as to what
  is being represented.
* Colours: TBD. Can include node colours, node border colours, edge colours,
  etc.
* Proximity: How can we customize proximity of nodes in order to convey useful
  information? Perhaps a 'relatedness' value can be produced by comparing which 
  enzymes/metabolites are present in interconnected pathways. Does proximity 
  effectively organize itself? This is something we need to investigate.

## Potential Additions

* Integration with [ecocyc](http://ecocyc.org/)
* Use a hyperbolic lens for viewing the graph; need to be able to zoom in while
  keeping overall orientation

## An Analysis Tool for our Users

* How can we provide quantitative analysis? Visualization is nice, but provides
  no simple way to accurately compare results between different experiments.
* Goal: build a tool for FBA where the user does not have to learn a programming
  technology like COBRA or MATLAB, and can also submit their own models 
* Hypothesis generator: have an idea, insert a gene, observe the results
* Need a way to store and compare numerical results for a user from a variety of
  experiments
* Which genes need to be added/removed to get the community to achieve the
  desired goal?
* Workflow: model produces predictions, results should have correlation to lab
  data, how to integrate results into next round of modelling? Introduce
  additional data: allow user submitted modifications to model. For example, set
  lab data as new flux bounds. 

## Next Steps

* Formulate an efficient and effective visualization tool. All aspects of the
  visualization should tie back to the data and represent the data meaningfully.
* The visualization should be interactive, and again, the interactions *must*
  have a real meaning related to the data.
* Develop our cFBA models, how to solve cFBA model
* Integrate quantitative results into the webapp
* Integrate tools for comparing quantitative results across multiple experiments
* Ability to add new models, edit existing models in the experiment
* For example, I have a gene, and I would like to see it's effects compared when
  included in the metabolic models of a set of species, and how it can effect
  different communities
