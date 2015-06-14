---
layout: post
title:  "June Week 2 Update"
date:   2015-06-14 24:00:00
categories: updates
---

Week 2 Update

### Progress on Species Spreadsheet
This week, we completed our species spreadsheet! We narrowed down 28 species
(from 16 classes) from the 41 we had gathered initially, but may choose to
reincorporate some of these excluded microorganisms at a later time. All 28
species now have links to their complete protein sequences and meet the criteria
discussed last week. Further, we were able to find full metabolic networks (from
existing literature on flux balance analysis) for seven species, and one other
partial network. Moving forward, we will begin gathering the metabolic reaction
data we need for our model.

### User Interface Construction
The front-end group worked on making a **prototype of the user tool** that will eventually serve as a platform for the users to visualize **bacterial metabolic networks** and the **changes in flux** that result from adding or removing metabolites to these networks.
The tool will include the following components:
* metabolites represented by large circles or “nodes”
* reactions represented by small circles
3. arrows indicating direction of reaction
4. a search box where the user would be able to type the name of the concerned bacterial species
5. an “Add Node” button to add metabolites to the network
6. the option to remove reactions and nodes by right-clicking
7. the option to connect nodes (metabolite) through dragging

Upon selecting a bacterial species from the search results, the user would perceive an immediate appearance of a set of nodes connected with arrows, representing the metabolic network of that species. Should the user choose to simultaneously view the metabolic networks of two bacteria, the two metabolic networks will be merged in order to construct a network with no node duplicates, in other words, if metabolite X is present in both species A and species B, the metabolic network of species A and B will only have only one circle labeled “X”. 

[@joller can you talk about the FBA you solved, link to lecture pdf on tutorials repo,
and post those lines of MATLAB code here, just use

```
code
    formatted
```

for now] 

### FBA research
The FBA focus group researched on ways to solve flux balance analysis this week.
We identified **cobrapy** as an alternative to MATlab COBRA, a constraint based
reconstruction and analysis tool. Cobrapy takes in **sbml** format metabolic
network model and calculates fluxes of all the reactions when biomass is set as
objective function:

```
model.optimize()
```
Cobrapy is also able to take json object file as both input and output, which
will be convenient for storing data in mongodb later. For more information
related to cobrapy, [click here](cobrapy.readthedocs.org/).  The most urgent
task to the FBA group is to settle down a preliminary model that describes a
community. All our future endeavor, from web interface design to database schema
structure, depends on how community FBA is used. 


### Node Backe-end
[@albert can you talk about what you did on the backend this week.
Doesn't even have to include a lot of bio info..talk about what data
structures you used to solve what problem, what the runtime is,
advantages of MongoDB that were used (i.e. ref, populate). think of 
it like a half-assed CSC263 assignment answer.]

[@anyone else, please add anything you think helps describe what
we did this week, and it's relationship to what our next steps are]
