import icons from './icons'

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('-')
export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString()

const { AiFillStar, AiOutlineStar } = icons
export const renderStars = (number, size = 16) => {
  let roundedNumber = Math.round(number)
  roundedNumber = Math.min(5, Math.max(1, roundedNumber))
  if (!Number(roundedNumber)) return
  const stars = []
  for (let i = 0; i < +roundedNumber; i++)
    stars.push(<AiFillStar size={size} color="orange" />)
  for (let i = 5; i > +roundedNumber; i--)
    stars.push(<AiOutlineStar size={size} color="orange" />)

  return stars
}
