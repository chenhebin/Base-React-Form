import React, { ReactNode } from 'react'
import { FormInstance, useForm } from './FormStore'
import FormContext from './FormContext'

type FormProps = {
    form?: FormInstance;
    onFinish?: (values: any) => void; // 表单提交成功回调
    onFinishFailed?: (errors: any[]) => void; // 表单提交校验失败回调
    children: ReactNode
}

// FormProps限制form的props入参结构
const Form: React.FC<FormProps> = ({
    form,
    children,
    onFinish,
    onFinishFailed
}) => {
    const [ internalForm ] = useForm() // 仓库实例获取
    const formInstance = form || internalForm // 外部form优先 > 仓库实例

    formInstance.setCallbacks({ onFinish, onFinishFailed })

    // 处理提交
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        formInstance.submit()
    }
    return (
        <FormContext.Provider value={formInstance}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    )
}

export default Form
