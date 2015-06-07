---
layout: post
title:  "June Week 1 Update"
date:   2015-06-07 17:28:30
categories: updates
---

This week we parsed some species genomic data into json, researched species
within the Athabasca River microbiome, completed a MEAN stack assignment,
and were introduced to the theory behind flux balance analysis. Next week we
will expand our database querying efforts, develop a more systematic method
of acquiring and storing data, develop a web application for manipulating
and browsing our data set, and dig deeper into FBA, solving a metabolic model
for a dataset which has previously been show to work for FBA. For more details
on each of these four focus areas, read on.

## Database Querying Focus

The python group focused on identifying model species that are present in
abundance in the Athabasca River microbiome. We identified major types taken
from a 16S rRNA sequencing experiment. Specific strains are identified and their
genomic data are collected from Ensembl database and NCBI. We are maintaining a
[spreadsheet](https://docs.google.com/spreadsheets/d/1jyenJ_42TZkCLB44hlNR8-eoMiNCK1yBLmHa-LXRVsg/edit#gid=0)
documenting this process. 

#### Why do we need a parser?

To facilitate the process of acquiring metabolic reaction data, transformation
of data is necessary for the ease of both records and queries. A python parser
is written to read genomic information in a fasta format and to store relevant
information in json format, which will be stored in a MongoDB database as
[BSON](https://en.wikipedia.org/wiki/BSON). A python script for parsing fasta
formatted files into json format is being developed [here](https://github.com/tt6746690/Fasta-Parser-Ensembl-). 

#### Why incorporating standard in/out?

The parser is written with one command line input that specifies the path to
directory that stores the fasta files. So that when in need of updating the
server or making large scale changes, the python program can be easily
incorporated into a server by calling a childprocess-- the process of updating
the database is much simplified.

### Next Steps

How can we design a [Schema](http://mongoosejs.com/docs/schematypes.html) for 
storing the information we collect from Ensembl and other databases? Can one
Schema encapsulate varying types of data formats? How can we rectify 
attributes which are not common to multiple documents? The python fasta parser
should be extended to meet these requirements.

## Species Reseach Focus

This week, the species richness group helped confirm and correct the Python
group’s choices of model species on the [iGEM Species Spreadsheet](https://docs.google.com/spreadsheets/d/1jyenJ_42TZkCLB44hlNR8-eoMiNCK1yBLmHa-LXRVsg/edit#gid=0). 
Group members confirmed that all species chosen were freshwater microorganisms,
and chose the best-studied naturally existing strain for each (i.e.,
lab/reference strains were excluded). If species were found to be inappropriate,
team members searched the literature for more suitable species and strains in
the same taxonomic class. In addition, group members updated the spreadsheet
with links to FASTA files containing the genetic code for each strain chosen. 
Furthermore, another spreadsheet for [microbiome species research](https://docs.google.com/spreadsheets/d/13ZK5UbOdFALAw7ANNXNdRlsdRPpSFNBesluS6aNZUpc/edit?pli=1#gid=0)
is being maintained.

#### Why do all species chosen need to survive in freshwater? Why are lab strains excluded?

The Athabasca River was targeted for bioremediation due to the fact that it has
been heavily polluted by the Athabasca Oil Sands. By ensuring that all species
chosen are capable of living in the Athabasca River, (which is a freshwater
river), and by ensuring that the strains chosen exist naturally, outside of the
lab environment, we will be able to use the genetic information gathered to
model metabolic activity in the Athabasca River microbiome. Perhaps we can even
optimize the metabolic network for specific bioremediation efforts!

### Next Steps

Continue validating the data the database querying team is  acquiring. We will
use this data to build our metabolic model of the community of species within
the Athabasca River microbiome.

## MEAN Focus

The MEAN (MongoDB, Express, Angular, NodeJS) focus group completed an [assignment](https://github.com/igemuoftATG/tutorials/raw/master/FBA-and-related-topics/fba-notes/fba-notes.pdf)
to become more familiar with the MEAN stack. A [tutorial](igemuoft.github.io/tutorials/2015/05/30/MEAN-stack-tutorial.html)
is available to aid the completion of this assignment, and ensure an
understanding of the tools used. The end product of this assignment was a web
tool for converting a DNA sequence to an amino acid sequence and storing the DNA
sequence and resultant amino acid sequence in a database.

How did we use the MEAN stack to convert a DNA sequence to an amino acid
sequence?

* We used Angular to make a webpage as a user interface where we got the DNA
  sequence from a user input
* We converted the DNA sequence to an amino acid sequence using a Python script
  and used Express to send the amino acid sequence to our webpage
* We used MongoDB to store the protein sequence and the DNA sequence in a
  database

Why is this relevant to our project?

Similar to the assignment, we would use Angular to make a webpage as a user
interface where the user would select 

* the composition of the microbiome (the concerned species)
* the objective function for their flux balance analysis model
* the compound whose production they would like to maximize/minimize
* other options..

We will use NodeJS/Express to send the user data to a Python program where flux
balance analysis will be carried out in order to calculate how the production of
the desired compound can be maximized or minimized. The calculations will make
use of the data stored in our MongoDB database.

The API we are developing will provide the calculated data to the webpage where
a metabolic network will be constructed showing reaction pathways in the
selected species.

### Next Steps

Develop a web application and API for managing and extending the data we have 
acquired so far within our [species research](https://docs.google.com/spreadsheets/d/13ZK5UbOdFALAw7ANNXNdRlsdRPpSFNBesluS6aNZUpc/edit?pli=1#gid=0)
and [species genomic data](https://docs.google.com/spreadsheets/d/1jyenJ_42TZkCLB44hlNR8-eoMiNCK1yBLmHa-LXRVsg/edit#gid=0)
spreadsheets. This should be done by the end of the week of June 8-12, at
latest before June 15. This will involve collaboration with the database querying
team with regards to development of our schema(s). Extensibility and dynamic
models are our priority. Ultimately we will move away from using spreadsheets
and begin developing our database and a web tool for browsing/adding/editing
information within it.

## FBA Focus

At the beginning of this week we had an introduction to flux balance analysis by
one of our grad student advisors. We discussed the theory behind the model and
it's solution. We learned of the use of an objective function and constraints to
minimize the solution space. We were introduced to various tools for computing
the solution to this model, including [COBRA](http://opencobra.github.io/) and 
[CPLEX](https://en.wikipedia.org/wiki/CPLEX). We have been reading [articles](https://github.com/igemuoftATG/drylabproposal2015/tree/master/articles) 
and taking [notes](https://github.com/igemuoftATG/tutorials/tree/master/FBA-and-related-topics).
Some of our recommended readings so far are:

```
Henson, Michael A., Hanly, Timothy J. Dynamic flux balance analysis for
synthetic microbial communities. The Institution of Engineering and 
Technology. 2014 (8): 214-229.
```

```
Zhuang, Kai., Izallalen, Mounir., Mouser, Paula., Richter, Hanno., Risso,
Carla., Mahedevan, Radhakrishnan., Lovley, Derek R. Genome-scale dynamic
modeling of the competition between Rhodoferax and Geobacter in anoxic
subsurface environments. The ISME Journal. 2011 (5): 305-316.
```

```
Harcombe, William R., Riehl, William J., Dukovski, Llija., Granger, Brian R.,
Betts, Alex., Lang, Alex H., Bonilla, Gracia., kar, Amrita., Leiby, Nicholas.,
Mehta, Pankaj., Marx, Christopher J., Segrè, Daniel. Metabolic resource
allocation in individual microbes determines ecosystem interactions and spatial
dynamics. NIH: Cell Rep. 2014 7(4): 1104-1115.
```

```
Khandelwal, Ruchir A., Olivier, Brett G., Rölling, Wilfred F.M., Teusink, Bas.
, Bruggeman, Frank J. Community Flux Balance Analysis for Microbial Consortia
at Balanced Growth. PLOS ONE. 2013 (8): 1-10.
```

Here is a YouTube video documenting a talk on metabolic flux analysis of 
biodiesel producing E. Coli: [EBI Seminar - Hector Garcia Martin](https://www.youtube.com/watch?v=a3OE0mkDJcE).
This video is highly recommended as well as the articles above.

Here is a list of Wikipedia pages I stumbled upon while looking up FBA and it's
related topics:

* [Linear programming](https://en.wikipedia.org/wiki/Linear_programming) 
* [LP-type problem](https://en.wikipedia.org/wiki/LP-type_problem)
* [Metabolic network](https://en.wikipedia.org/wiki/Metabolic_network)
* [Optimization problem](https://en.wikipedia.org/wiki/Optimization_problem)
* [Mathematical optimization](https://en.wikipedia.org/wiki/Mathematical_optimization)
* [Algorithm](https://en.wikipedia.org/wiki/Algorithm)
* [Cardinality](https://en.wikipedia.org/wiki/Cardinality)
* [Simplex algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm) (some
  good pseudo code here)
* [Randomized algorithm](https://en.wikipedia.org/wiki/Randomized_algorithm)


Some FBA questions:

* What is FBA? dFBA? cFBA?
* What pieces of information are required for building your metabolic model for
  FBA?

### Next Steps

Develop a metabolic model to be used in FBA from a dataset previously shown to 
work. Compute the solution to this model. [KBase](https://kbase.us/) has an
online narrative for learning FBA. 



  
