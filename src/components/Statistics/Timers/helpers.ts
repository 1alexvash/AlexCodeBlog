export function calculateAge(birthDate: Date) {
  const birthTime = birthDate.getTime();
  const now = Date.now();
  const ageInMillis = now - birthTime;

  const ageInSeconds = ageInMillis / 1000;
  const ageInYears = ageInSeconds / (60 * 60 * 24 * 365.25);

  const ageDecimalPart = ageInYears - Math.floor(ageInYears);

  const numberAfterDecimalPoint = 2;

  const ageFormatted = `${Math.floor(ageInYears)}.${(
    Number(ageDecimalPart.toFixed(numberAfterDecimalPoint)) *
    10 ** numberAfterDecimalPoint
  )
    .toFixed(0)
    .padStart(numberAfterDecimalPoint, "0")}`;

  return ageFormatted;
}

export function calculateMonthsAndDaysToTheDate(birthDate: Date) {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeDifference = Number(nextBirthday) - Number(today);
  const daysToNextBirthday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30);

  if (monthsToNextBirthday > 0) {
    return `${monthsToNextBirthday} months and ${daysToNextBirthday % 30} days`;
  } else {
    return `It is ${daysToNextBirthday} days to your next birthday.`;
  }
}

export const calculateDaysToTheDate = (birthDate: Date) => {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeDifference = Number(nextBirthday) - Number(today);
  const daysToNextBirthday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysToNextBirthday;
};
