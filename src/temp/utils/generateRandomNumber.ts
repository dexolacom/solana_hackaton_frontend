export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const formattedNumber = randomNumber.toString().padStart(4, '0');
  return formattedNumber;
}