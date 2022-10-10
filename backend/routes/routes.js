const router = require("express").Router();
const {
  addNewCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
  updateCarWithPatch,
  searchCar
} = require("../controllers/CarroController");

router.get("/", getCars);
router.get('/veiculos/find/', searchCar)
router.get('/veiculos/:id', getCarById)
router.post('/veiculos', addNewCar)
router.put('/veiculos/:id', updateCar)
router.patch('/veiculos/:id', updateCarWithPatch)
router.delete('/veiculos/:id', deleteCar)


module.exports = router