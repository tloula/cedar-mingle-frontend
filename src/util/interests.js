const sports = [
  "Archery",
  "Baseball",
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
  "Snowboarding",
  "Spikeball",
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
  "Dancing",
  "Drawing",
  "Engineering",
  "Journaling",
  "Music",
  "Painting",
  "Photography",
  "Reading",
  "Writing",
  "Woodwork",
  "Yoga",
  "Video Games",
];
exports.activities = activities;

const travel = [
  "Backpacking",
  "Camping",
  "Climbing",
  "Cruises",
  "Mountains",
  "Ocean",
  "Theater",
  "Traveling",
];
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
  "Guitar",
  "Piano",
  "Drums",
  "Bass",
  "Electric Guitar",
  "Violin",
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
