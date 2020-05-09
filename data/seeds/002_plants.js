const plants = [
      'Amaryllis',
      'Aster',
      'Anemone',
      'Azalea',
      'Belly',
      'Zoba',
      'Begonia',
      'Bluebell',
      'Babys Breath',
      'Chrysanthemum',
      'Clover',
      'Crocus',
      'Freesia',
      'Gladiola',
      'Lily',
      'Daisy',
      'Bee Balm',
      'Bergamot',
      'Bell Flower',
      'Bird of Paradise',
      'Bottlebrush',
      'Calla Lily',
      'Columbine',
      'Orchid',
      'Daffodil',
      'Primrose',
      'Foxglove',
      'Iris',
      'Lilac',
      'Marjoram',
      'Orange Blossom',
      'Peach Blossom',
      'Petunia',
      'Rosemary',
      'Sage',
      'Thyme',
      'Thistle',
      'Hyacinth',
      "Lady's Slipper",
      'Amaranthus',
      'Marigold',
      'Mimosa',
      'Peony',
      'Rose',
      'Holly',
      'Lavender',
      'Snapdragon',
      'Carnation',
      'Sunflower',
      'Tansy',
      'Tulip',
      'Buttercup',
      'Zinnia'
];
    
const getRandomPlantName = () => {
  return plants[Math.floor(Math.random() * plants.length)];
};
    

const seeds = [];
for (let i = 0; i < 100; i++) {
  seeds.push({
    plant_name: getRandomPlantName(),
  });
}
 
exports.seed = function(knex, Promise) {
      return knex('plantbook')
      .then(function(){
      return knex('plantbook').insert([...seeds]);
      })
};

    