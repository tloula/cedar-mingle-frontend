const sports = [
  "Basketball",
  "Biking",
  "Bouldering",
  "Bowling",
  "Fishing",
  "Football",
  "Golf",
  "Hiking",
  "Hockey",
  "Hunting",
  "Martial Arts",
  "Running",
  "Skiing",
  "Showboardig",
  "Soccer",
  "Surfing",
  "Swimming",
  "Tennis",
  "Volleyball",
  "Weight Training",
  "Yoga",
];
exports.sports = sports;

const activities = [
  "Blogging",
  "Board Games",
  "Engineering",
  "Music",
  "Painting/Drawing",
  "Photography",
  "Reading",
  "Writing",
  "Woodwork",
];
exports.activities = activities;

const travel = ["Backpacking", "Camping", "Cruises", "Mountains", "Ocean"];
exports.travel = travel;

const music = [
  "Blues",
  "CCM",
  "Classical",
  "Country",
  "EDM",
  "Electronica",
  "Indie/Alternative",
  "Jazz",
  "Metal",
  "Pop",
  "R&B",
  "Rap",
  "Rock",
  "Worship",
];
exports.music = music;

const food = [
  "Baking",
  "Coffee",
  "Cooking",
  "Healthy Eating",
  "Vegan",
  "Vegitarian",
];
exports.food = food;

exports.allInterests = sports
  .concat(activities)
  .concat(travel)
  .concat(music)
  .concat(food)
  .sort();
