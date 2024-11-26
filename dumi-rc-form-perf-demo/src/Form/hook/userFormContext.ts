import { createContext } from 'react'
import { FormInstance } from './useForm'
// 设置初始form实例上下文
const FormContext = createContext<FormInstance | null>(null)

export default FormContext
