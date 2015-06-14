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
7. the option to connect nodes (metabolite) through left-click dragging
8. ability to pan and drag screen by ctrl-left-clicking

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
As of now, the hardest part for the back end was deciding how we would strucutre our data in order to retrieve results as quickly as possible, as well as save as much space on the database at the same time.  To accomplish that, we decided that the best solution would be to have each column (domain, class, phylum etc...) have their own mongoose schema.  Each of those schemas has a parent object, which is a reference to the schema's parent.  For example, if we had x belonged to domain column, and y belonged to the phylum column, the schema under the phylum column being element y would have an element that stores the objectid of the parent's schema, being x, and x would have a refernece to it's members, being y.  The reason for this was to optimize how our data is stored efficently, and allowing us to search at incredible speeds.  Because you can have multiple members for each schema, and each schema only has one parent, that allows us to shrink the amount of data for each column by the absolute max, allowing us to never have any duplicates.

With that being said, the search algorithm, if you're searching for say a specific species, would take big O(lgn)(base two) number of steps, which is the fastest you can get for searching.  Not only that, but if you wanted to search for everything that was in domain column bacteria for example, all we would need to do is look at the members of that bacteria model, and iterate through them to populate, and that's once again the most efficent way to retrieve the data.  The runtime for that varies as you go deeper into the columns, something like lgn for the species column, since there are no duplicates.

[@anyone else, please add anything you think helps describe what
we did this week, and it's relationship to what our next steps are]
