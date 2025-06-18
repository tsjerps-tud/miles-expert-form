# Evaluation Form: Evaluating Music Improvisation Algorithms with a Modular Trading Fours System

This repository contains the code for the evaluation form used in the Master's thesis ['Evaluating Music Improvisation Algorithms with a Modular Trading Fours System'](https://resolver.tudelft.nl/uuid:822728ff-9769-429f-9a88-0f2e960a26e4).

The evaluation form can be configured to support rating and ordering of performances.
The `peer_form` branch contains the configuration that was used for the second experiment outlined in the thesis.

For this thesis, we used Netlify for deployment, which we recommend to anyone who wants to carry out additional experiments.

## Contents

### app/
This folder contains all TSX files that lay out a page and all of the possible question sheets.

### public/
This folder contains all the images and video recordings that the evaluation form needs.

### util/
This folder contains utility code.

### form.config.ts
This file contains the configuration of the form, and can be altered to support many types of configurations.
