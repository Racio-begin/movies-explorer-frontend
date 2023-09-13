// import { useCallback, useState } from 'react';

// import { REGEX_EMAIL, REGEX_NAME } from '../utils/regex';

// const useFormWithValidation = () => {
//   const [values, setValues] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   function isValidEmail(value) {
//     const regexp = new RegExp(REGEX_EMAIL);
//     return regexp.test(value);
//   }

//   function isValidName(value) {
//     const regexp = new RegExp(REGEX_NAME);
//     return regexp.test(value);
//   }

//   const handleChange = (event) => {
//     const target = event.target;
//     const name = event.target.name;
//     const value = event.target.value;

//     if (name === 'email') {
//       if (!isValidEmail(value)) {
//         target.setCustomValidity("Укажите ваш e-mail в формате name@domain.zone");
//       } else {
//         target.setCustomValidity("");
//       }
//     }

//     if (name === 'name') {
//       if (!isValidName(value)) {
//         target.setCustomValidity("Имя может содержать только латиницу, кириллицу, пробел или дефис и быть длинной от 2 до 30 символов");
//       } else {
//         target.setCustomValidity("");
//       }
//     }

//     setValues({ ...values, [name]: value });
//     setErrors({ ...errors, [name]: event.target.validationMessage });
//     setIsValid(event.target.closest('form').checkValidity());
//   };

//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsValid = false) => {
//       setValues(newValues);
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     [setValues, setErrors, setIsValid]
//   );

//   return { values, handleChange, errors, isValid, resetForm, setIsValid, setValues };
// };

// export default useFormWithValidation;

import { useCallback, useState } from 'react';

const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setIsValid, setValues };
};

export default useFormWithValidation;