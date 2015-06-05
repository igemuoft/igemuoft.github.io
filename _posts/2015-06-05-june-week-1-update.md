---
layout: post
title:  "June Week 1 Update"
date:   2015-06-05 16:47:30
categories: updates
---

The following is a summary of our progress this week.

## Database Querying Focus

## Species Reseach Focus

## MEAN Focus

The MEAN (MongoDB, Express, Angular, NodeJS) focus group completed an assignment
to become more familiar with the MEAN stack. The end product of this assignment
was a tool to convert a DNA sequence to an amino acid sequence and store the DNA
sequence and the amino acid sequence in a database.

How did we use MEAN stack to convert a DNA sequence to an amino acid sequence?

* We used Angular to make a webpage as a user interface where we got the DNA
  sequence from a user input
* We converted DNA sequence to an amino acid sequence using a Python script and
  used Express to send the amino acid sequence to our webpage
* We used MongoDB to store the protein sequence and the DNA sequence in a
  database

Why is this relevant to our project?

Similar to the assignment, we would use Angular to make a webpage as a user
interface where the user would select 

* the composition of the microbiome (the concerned species)
* the compound whose production they would like to maximize/minimize

We will use NodeJS/Express to send the user data to a Python program where flux
balance analysis will be carried out in order to calculate how the production of
the desired compound can be maximized or minimized. The calculations will make
use of the data stored in our MongoDB database.

We will use NodeJS/Express to send the calculated data to the webpage where a
metabolic network will be constructed showing reaction pathways in the selected
species.

## FBA Focus

On Monday we had an introduction to flux balance analysis by one of our grad
student advisors. 
