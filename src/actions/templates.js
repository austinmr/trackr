import { v4 } from 'node-uuid'

const createDate = () => {
  let now = new Date(); 
  return now; 
}

export const createTemplate = (username) => {
  return {
    type: 'CREATE_TEMPLATE',
    id: v4(),
    active: true, 
    date: createDate(),
    username,
  }
}
