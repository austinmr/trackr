import { v4 } from 'uuid'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

export const createTemplate = (username) => {
  return {
    type: 'CREATE_TEMPLATE',
    id: v4(),
    date: createDate(),
    username,
  }
}
