const calculateAge = (strBirthday: string) => {
  const [day, month, year] = strBirthday.split(' ')
  const birthDate = new Date(`${year}-${month}-${day}`).getTime()
  const currentDate = new Date().getTime()
  const difference = currentDate - birthDate
  const age = Math.floor(difference / 31557600000)
  return age
}

export { calculateAge }
