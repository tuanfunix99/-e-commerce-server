
import { object, string } from 'yup';

export const createProductSchema = object({
  body: object({
      title: string().required('Title is required'),
      desc: string().required('Description is required'),
      img: string().required('Image is required'),
      price: string().required('Price is required'),
  })  
})