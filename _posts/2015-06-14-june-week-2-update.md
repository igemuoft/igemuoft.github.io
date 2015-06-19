---
layout: post
title:  "June Week 2 Update"
date:   2015-06-14 24:00:00
categories: updates
---

This week we completed the species spreadsheet, starting building our webapp's
user interface with d3, dived deeper into the world of FBA and solving a simple
example model, and started development of our NodeJS (Express) API which will
be used for retrieving and manipulating data and providing the results of FBA
at endpoints. Next week we will continue to expand upon and refine these topics. 

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
The front-end group worked on making a **prototype of the user tool** that will
eventually serve as a platform for the users to visualize **bacterial metabolic
networks** and the **changes in flux** that result from adding or removing
metabolites to these networks. The tool will include the following components:

* metabolites represented by large circles or “nodes”
* reactions represented by small circles
* arrows indicating direction of reaction
* a self-arrow that accompanies an isolated node
* a search box where the user would be able to type the name of the concerned bacterial species
* an “Add Node” button to add metabolites to the network
* the option to remove reactions and nodes by right-clicking
* the option to connect nodes (metabolite) through left-click dragging
* ability to pan and drag screen by ctrl-left-clicking

Upon selecting a bacterial species from the search results, the user would
perceive an immediate appearance of a set of nodes connected with arrows,
representing the metabolic network of that species. Should the user choose to
simultaneously view the metabolic networks of two bacteria, the two metabolic
networks will be merged in order to construct a network with no node duplicates,
in other words, if metabolite X is present in both species A and species B, the
metabolic network of species A and B will only have only one circle labeled “X”. 

**D3.js** (Data Driven Documents) is a Javascript library that breathes life
into data via HTML, CSS, and SVG (Scalar Vector Graphics), and will be used to
create the platform for the visualization of this FBA data. With D3, we will be
able to bind the FBA data to the DOM (Document Object Model) of our web app, and
then utilize D3's inherent ability to apply data-driven transformations to the
document. D3 is extremely fast and flexible, and with **efficient manipulation
of documents with given data** and its **dynamic properties** that will allow us
to change an existing document in respsonse to animation over time or user
interaction, it is the best tool we can use to build the user-interface. 

To find out more about D3.js and see awesome examples, [click
here](http://d3js.org/)!

We will mostly be using a class of D3 called the force layout. The force layout
refers to registered nodes and links so that it can be used with a single
dataset. This is how we'll be tailoring the visual animations of the data to the
users.
To see an example of the force layout with D3, [click here]
(http://bl.ocks.org/mbostock/4062045)!


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
will be convenient for storing data in MongoDB later. For more information
related to cobrapy, [click here](cobrapy.readthedocs.org/).  The most urgent
task to the FBA group is to settle down a preliminary model that describes a
community. All our future endeavor, from web interface design to database schema
structure, depends on how community FBA is used. 

### How did the computer calculate the fluxes? --Progress of research on the mathematics
This week we found an [amazing
document](http://wwwf.imperial.ac.uk/~nsjones/lec-fba.pdf) that teaches the
fundamental mathematics about flux balance analysis.

Recall that all FBA problems contain three essential parts (or steps):

1. Define the reaction coefficients in the form of a matrix, and put it in Av=0 (the "equality contraint")
2. Define the boundaries for the fluxes (the "inequality contraint")
3. Define what we want to optimize (the "objective fuction")

This way, we have framed a problem that happens to have the same structure of
what mathematicians call a "continuous [optimization
problem](https://en.wikipedia.org/wiki/Optimization_problem)". The algorithm of
this has been well studied in the mathematical literature. There are many ways
to solve this problem, each optimized for a different kind of scenario, and
these algorithms have been implemented in many languages too.

For instance, matlab does the trick with a function called [linprog](http://www.mathworks.com/help/optim/ug/linprog.html):

```
x = linprog(f,A,b,Aeq,beq,lb,ub)
```

It does the job with the function `solveLP`

```
IN> x = numeric.solveLP([1,1],                   % minimize [1,1]*x                
                        [[-1,0],[0,-1],[-1,-2]], % matrix of inequalities          
                        [0,0,-3]                 % right-hand-side of inequalities 
                        );       
    numeric.trunc(x.solution,1e-12);
OUT> [0,1.5]
```

Another software package we looked into is the Javascript library
[numeric.js](https://github.com/sloisel/numeric/). Part of the reason why we
looked into numeric.js is because we hoped to be able to implement this
algorithm both frontend and backend. Unfortunately, numeric.solveLP only
supports one-sided contraint, but we need two.

In conclusion, the best approach we have found for now is as described in the
"FBA research" session, using the COBRApy integrated function `model.optimize()`.
The next step is to identify a way to support community FBA calculations, which
COBRApy is not currently supporting (to our best knowledge).

### NodeJS API
As of now, the hardest part for the back end was deciding how we would strucutre
our data in order to retrieve results as quickly as possible, as well as save as
much space on the database at the same time. To accomplish that, we decided that
the best solution would be to have each column (domain, class, phylum, etc...)
have their own [mongoose](http://mongoosejs.com/) schema. Each of those schemas
has a parent object, which is a reference to the schema's parent. For example,
if we had x belonged to domain column, and y belonged to the phylum column, the
schema under the phylum column being element y would have an element that stores
the ObjectId of the parent's schema, being x, and x would have a reference to
it's members, being y.  The reason for this was to optimize how our data is
stored efficently, and allowing us to search at incredible speeds. Because you
can have multiple members for each schema, and each schema only has one parent,
that allows us to shrink the amount of data for each column by the absolute max,
allowing us to never have any duplicates.  With that being said, the search
algorithm, if you're searching for say a specific species, would take big
O(lg n) number of steps, which is the fastest you can get for
searching. Not only that, but if you wanted to search for everything that was in
domain column bacteria for example, all we would need to do is look at the
members of that bacteria model, and iterate through them to populate, and that's
once again the most efficent way to retrieve the data. The runtime for that
varies as you go deeper into the columns, something like lg(n) for the species
column, since there are no duplicates.
