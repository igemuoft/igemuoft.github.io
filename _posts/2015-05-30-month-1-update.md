---
layout: post
title:  "Month 1 Update"
date:   2015-05-30 12:12:17
categories: updates
---

Hi everyone, it has been a great month working with all of you! I am very 
pleased with the level of learning which has occured these past few weeks. Some
of you joined with zero programming experience and have since learned the
basics of Python and just this last week, SQL. You have completed a variety
of Python assignments, among them the translation of DNA into RNA and
transcription into a polypeptide sequence! Others have learned a new language,
JavaScript, and have had a basic introduction to full-stack web development with
a form of the HAT stack (HTML5, Angular, Thin servers) with the MEAN stack. You
understand that Express is a framework for NodeJS, that mongoose is an API
for interacting with MongoDB, and that AngularJS is a JavaScript framework
for building modular and testable single page applications. These are the core
tools we will use over the **next three months** to develop our **community flux
balance analysis (CFBA) web application**. At this point, I will take a quick
note of the resources available for getting up to speed with these tools:

* Our main tutorials repo: [https://github.com/igemuoftATG/tutorials](https://github.com/igemuoftATG/tutorials)
* [Python Codecademy](http://www.codecademy.com/tracks/python)
* [MySQL tutorials (1-12)](https://www.youtube.com/watch?v=KgiCxe-ZW8o&list=PL32BC9C878BA72085), [SQL on w3schools](http://www.w3schools.com/sql/)
* [javascripting](https://github.com/sethvincent/javascripting) and [learnyounode](https://github.com/workshopper/learnyounode)
* A MEAN stack tutorial I wrote: [https://github.com/thejmazz/naivednageneration](https://github.com/thejmazz/naivednageneration)
* [AngularJS homepage](https://angularjs.org/) and [codeschool](http://campus.codeschool.com/courses/shaping-up-with-angular-js/intro)

Finally, a reminder that my [MEAN Central Dogma assignment](https://github.com/igemuoftATG/tutorials/raw/master/MEANCentralDogma/a1.pdf) is due Monday, through upload to your own GitHub account. (Note the assignment pdf has been updated dramatically since it was first released).


## Next Steps

So, what now? In order to tackle this project, we will be spending each week
splitting the team into *focus groups*. These groups will be self-sign up, you
can join as many as you like, and within them you will develop a stronger
understanding of your specific topic while also relaying what you have learned
and are working on to the rest of the team. It is imperative each member of the
team has a basic understanding of all aspects of the project, yet it is also 
important that we have knowledgeable experts in niche topics. In order to enforce
this dogma, at the end of each week we will have a roundtable (literally,
circular shaped raised flat surface device) meeting at WB242 where each group
can discuss that week's progress, challenges, next steps. Additionally, each 
group will be responsible for putting together two simple questions each week,
and a collective assignment for all the groups will be posted each weekend. This
assignment is meant to be short and simple, just to make sure you are staying
up to date on the team's progress. These will be our focus groups for next
week (June 1-5):

### Python/SQL DB querying
Getting reaction data for all species involved in the metabolics of all
bacterial species within the Athabasca river is a priority. We will be using KEGG, Reactome and MetaCyc to get our data. 

### Species Research

We will be looking into literature for species of significance to researchers and curating their genomic as well as their metabolomic data.

### Express/mongoose 

For porting pulled data with Python to MongoDB. If you enjoyed the ChildProcess
aspect of the MEAN stack tutorial, this group is for you. Once we have Python
scripts capable of pulling data off of SQl bio-databases, we will call and 
organize those scripts through NodeJS/Express. Alternatively, we may use 
[PyMongo](http://api.mongodb.org/python/current/) instead of [mongoose](http://mongoosejs.com) if there are performance issues.

### AngularJS

For making webapp to view our MongoDB database online. This will be important
as it will provide a means of visually interacting with our collecting data
as we collect it. If you enjoyed the AngularJS portion of the MEAN stack 
tutorial, or want to learn more Angular rather than NodeJS/Express, this group 
is for you. First required readings will be the docs for 
[$http](https://docs.angularjs.org/api/ng/service/$http) and [$q](https://docs.angularjs.org/api/ng/service/$q).

### FBA

FBA, then DFBA is an extension of that, then CFBA, and how to solve linear
programs, what is an objective function, what is an optimization algorithm, etc.
This will involve a bunch of linear algebra, and the solving of a LP-type
problem with a [linear program](https://en.wikipedia.org/wiki/Linear_programming). If you took CSC165
and are looking to get a sneak peek at the sorts of problems which may be
tackled in CSC263 or CSC373, then this group is for you. If you took linear
algebra, then this group is for you. First required reading will be:

```
Henson, Michael A., Hanly, Timothy J. Dynamic flux balance analysis for
synthetic microbial communities. The Institution of Engineering and 
Technology. 2014 (8): 214-229.
```

Which can be found on our [dry lab proposal](https://github.com/igemuoftATG/drylabproposal2015) repository.

#### Trello

To sign up for a focus group, join [Trello](https://trello.com) and send me your account name.
I will add you to our `Dry Lab` board, where you can add yourself to the card
for the group you would like to work on.
