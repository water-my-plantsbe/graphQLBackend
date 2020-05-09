const express = require('express');
const router = express.Router();
const plantDb= require('../data/plantsModel.js');
const {validUser ,validUserId, authenticate, checkForPlantOwner, validPlantId} = require('../auth/auth.js');

//getting plant suggestion 
router.get('/',async (req, res)=>{
    try{
        await plantDb.findPlants()
            .then(plant => {
                res.status(200).json(plant) })

    }catch (err){
         res.status(500).json({Error: 'An uexpected error happened', err});
    }
})
// create a plant
router.post('/:id/plant', authenticate, validUserId, validUser, async (req, res) => {
  try { 
    const {id}  = req.params;
    const plant = req.body;
    if (!plant.name) {
      res.status(404).json({ error: 'Please provide the name of your plant' });
    } else {
      const newPlant = await plantDb.addPlant(id, plant);
      res.status(200).json(newPlant);
    }
  } catch (err) {
    res.status(500).json({ planterror: `${err}` });
  }
}
);
// get a user's  all plants
router.get('/:id/plants', authenticate, validUserId, validUser, async (req, res) => {
  try {
    const { id } = req.params;
    const plantList = await plantDb.findPlant(id);
    for (let i = 0; i < plantList.length; i++) {
      plantList[i].schedule = await plantDb.getWateringSchedule(plantList[i].id);
    }
    res.status(200).json(plantList);
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error accessing the db: ${err}` });
  }
}
);
//get a plant by id
router.get('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const plant = await plantDb.findById(req.params.id);
        res.status(200).json(plant);
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});
// Delete a plant by id
router.delete('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const plant = await plantDb.deletePlantById(req.params.id);
        res.status(200).json({message: `This ${plant} has deleted `} );
    }catch (err){
        res.status(500).json({ error: `there was an error: ${err}` });
    }
});

// update a plant by id
router.put('/:id', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {
        const {name, description, last_water, schedule} = req.body;
        const {id} =req.params;
        if (!name ) {
          res.status(400).json({ message: "Please provide all the required information of the plant." })
       }
        const count = await plantDb.updatePlant(id, req.body)
        .then(user=>{
          if (user) {
            res.status(200).json(req.body)
          } else {   
            res.status(404).json({ message: "The plant with the specified ID does not exist." })
            }
          })    
    } catch (err) {
      res.status(500).json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);
// add a watering time
// expects an array of times
// returns the updated schedule
router.post('/:id', authenticate, validPlantId, checkForPlantOwner,(req, res)=>{
    try {    
        const { id } = req.params;
        const times = [...req.body.times];
        console.log(times)
        for (let i = 0; i < times.length; i++) {
          const wateringId = plantDb.addWatering(id, times[i]);
          console.log(id)
          const [notification] =  notifications.addNotification(wateringId);
          notifier(notification);
          console.log('notification',notification)
        }
        const schedule =  plantDb.getWateringSchedule(id);
        res.status(200).json({post: schedule});
    } catch (err) {
        res.status(500).json(err);
    }
    
});
// Get a plant's watering schedule
router.get('/:id/schedule', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {
            const schedule = await plantDb.getWateringSchedule(req.params.id);
            if (schedule.length) {
              res.status(200).json(schedule);
              console.log(schedule);
            } else {
              res.status(400).json({error:'there is no schedule'
              });
            }
    } catch (err) {
            res.status(500).json({ error: `there was an error accessing the db: ${err}` });
    }
});

// deletes plant's entire watering schedule
router.delete('/:id/schedule', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try{
        const response = await plantDb.deleteWateringById(req.params.id);
        console.log(response);
        res.status(200).json({ message: 'the schedule is deleted' });
    } catch (err) {
        res.status(500).json({ error: `there was an error deleting the schedule: ${err}` });
    }
});
// delete a specific watering time
// returns the modified watering schedule
router.delete('/:id/schedule/:waterId', authenticate, validPlantId, checkForPlantOwner, async(req, res)=>{
    try {
        const count = await plantDb.deleteWateringTime(req.params.waterId);
        if (count) {
          const schedule = await plantDb.getWateringSchedule(req.params.id);
          res.status(200).json(schedule);
        }
      } catch (err) {
        res.status(500).json({
          error: `there was an error deleting the watering time: ${err}`
        });
      }
});

module.exports = router;

