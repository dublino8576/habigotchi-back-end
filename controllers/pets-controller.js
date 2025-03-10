import { createPets, fetchPet, changePet } from "../models/pets-model.js";

export function postPet(req, res, next) {
  const pet_name = req.body.pet_name;
  const pet_status = req.body.pet_status;
  const coins = req.body.current_coin;

  return createPets(pet_name, pet_status, coins)
    .then((addedPet) => {
      res.status(202).send({ addedPet: addedPet });
    })
    .catch((err) => {
      next(err);
    });
}

export function getPet(req, res, next) {
  const user_name = req.params.user_name;
  return fetchPet(user_name)
    .then((petData) => {
      res.status(200).send(petData[0]);
    })
    .catch((err) => {
      next(err);
    });
}

export function patchPet(req,res,next) {
  const user_name = req.params.user_name
  const pet_name = req.body.pet_name
  const pet_health = req.body.pet_health
  const pet_happiness = req.body.pet_happiness

  console.log(user_name)
  return changePet(pet_name,pet_health,pet_happiness,user_name)
  .then((upDatedPet) => {
      res.status(204).send(upDatedPet.rows)
  })
 
}