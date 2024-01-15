export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const isvalid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  isvalid.test(email);
};
