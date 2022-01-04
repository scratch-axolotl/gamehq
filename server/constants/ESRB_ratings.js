const ESRBs = {
  'adults-only': 5,
  'mature': 4,
  'teen': 3,
  'everyone-10-plus': 2,
  'everyone': 1
}

export default ESRBs;

// In RAWG.io's API, each esrb_rating property has an id, a name, and an associated slug.
  // Reverse engineered ESRB Rating info from API:
  /* id       name            slug
     5        'Adults Only'   adults-only
     4        'Mature'        mature
     3        'Teen'          teen
     2        'Everyone 10+'  everyone-10-plus
     1        'Everyone'      everyone
  */