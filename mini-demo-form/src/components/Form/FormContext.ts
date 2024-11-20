import { createContext } from 'react'
import { FormInstance } from './FormStore'
// 设置初始form实例上下文
const FormContext = createContext<FormInstance | null>(null)

export default FormContext
