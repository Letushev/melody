export const isPasswordCorrect = password => {
  // одна цифра
  // одна маленька літера
  // одна велика літера
  // мінімальна довжина - 8
  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return password.match(reg);
}
