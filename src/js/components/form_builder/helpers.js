// Shared functionalities for Input

const buildInputClass = (valid, touched, inputClass) => {
  let className = inputClass ? [inputClass] : [];
  if (!valid && touched) className.push("error is-invalid");
  if (valid && touched) className.push("is-valid");
  return className.join(" ");
};

export {buildInputClass};