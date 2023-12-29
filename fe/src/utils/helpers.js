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
  roundedNumber = Math.min(5, Math.max(0, roundedNumber))
  const stars = []
  for (let i = 0; i < +roundedNumber; i++)
    stars.push(<AiFillStar size={size} color="orange" />)
  for (let i = 5; i > +roundedNumber; i--)
    stars.push(<AiOutlineStar size={size} color="orange" />)
  return stars
}

export const validate = (payload, setInvalidFields) => {
  let invalids = 0
  const formatPayload = Object.entries(payload)
  for (let arr of formatPayload) {
    if (arr[1].trim() === '') invalids++
    setInvalidFields((prev) => [
      ...prev,
      { name: arr[0], mes: 'Required field!' }
    ])
  }

  return invalids
}

export const generateRange = (start, end) => {
  const length = end +1 - start
  return Array.from({length},(_,index)=> start+index)
}


export function getBase64(file) {
  if(!file) return
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
