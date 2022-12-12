const Validator = require("validator");
const isEmpty = require("./isEmpty.jsx");

const validateRegisterInput = (data) => {
  let errors = {};
  if (isEmpty(data.firstname)) {
    errors.firstname = "Le champ prénom ne peux etre vide.";
  }
  if (isEmpty(data.lastname)) {
    errors.lastname = "Le champ nom ne peux etre vide.";
  }
  if (isEmpty(data.dateofbirth)) {
    errors.dateofbirth = "Le champ date de naissance ne peux etre vide.";
  }
  if (isEmpty(data.email)) {
    errors.email = "Le champ mail ne peux etre vide.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Veuillez entrer un email valide.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Le champ password ne peux etre vide.";
  } else if (!Validator.isLength(data.password, { min: 3, max: 150 })) {
    errors.password =
      "Le mot de passe doit contenir entre 3 et 150 caractères.";
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword =
      "Le champ confirmez votre mot de passe ne peux etre vide.";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Les mots de passe doivent être identiques.";
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
