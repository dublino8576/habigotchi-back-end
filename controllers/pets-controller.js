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

export function patchPet(req, res, next) {
  const user_name = req.params.user_name;
  const reqBody = req.body;

  changePet(reqBody, user_name).then((upDatedPet) => {
    res.status(200).send({ upDatedPet: upDatedPet });
  });
}
