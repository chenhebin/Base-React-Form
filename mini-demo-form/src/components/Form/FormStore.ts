import { useRef } from 'react'

type Store = Record<string, any>
export type FieldEntity = {
    name: string;
    onStoreChange: () => void
}
export type FormInstance = {
    registerField: (field: FieldEntity) => () => void,
    getFieldValue: (name: string) => any;
    setFieldValue: (name: string, value: any) => void;
    getFieldsValue: () => Store;
    setCallbacks: (callbacks: { onFinish?: (values: Store) => void; onFinishFailed?: (errors: any[]) => void }) => void;
    submit: () => void;
}

export class FormStore {
    private store: Store = {}
    private fieldEntities: FieldEntity[] = []
    private callbacks: {
        onFinish?: (values: Store) => void;
        onFinishFailed?: (errors: any[]) => void;
    } = {}
    // 子item依赖收集
    registerField = (field: FieldEntity) => {
        this.fieldEntities.push(field)
        return () => {
            this.fieldEntities = this.fieldEntities.filter(f => f !== field)
        }
    }
    getFieldsValue = () => ({...this.store})
    // 根据name获取value
    getFieldValue = (name: string) => this.store[name]
    setFieldValue = (name: string, value: any) => {
        this.store[name] = value
        this.notifyField(name)
    }
    notifyField = (name: string) => {
        this.fieldEntities.forEach(field => {
            if (field.name === name) field.onStoreChange()
        })
    }
    // 设置回调
    setCallbacks = (callbacks: {
        onFinish?: (values: Store) => void,
        onFinishFailed?: (errors: any[]) => void
    }) => {
        this.callbacks = callbacks
    }

    validateFields = () => {
        const errors: { name: string, error: string }[] = []
        this.fieldEntities.forEach(({ name }) => {
            this.notifyField(name)
            if (!this.store[name]) {
                errors.push({ name, error: `${name} is required`})
            }
        })
        return errors
    }
    // 提交
    submit = () => {
        const errors = this.validateFields()
        if (errors.length === 0) {
            this.callbacks.onFinish?.(this.getFieldsValue())
        } else {
            this.callbacks.onFinishFailed?.(errors)
        }
        console.log('触发提交')
    }
    // 获取form方法
    getForm = (): FormInstance => ({
        registerField: this.registerField,
        setFieldValue: this.setFieldValue,
        getFieldValue: this.getFieldValue,
        setCallbacks: this.setCallbacks,
        getFieldsValue: this.getFieldsValue,
        submit: this.submit
    })
}

// set form实例，储存在ref中（change不会引起刷新）
export const useForm = (): [FormInstance] => {
    const formRef = useRef<FormInstance>()
    if (!formRef.current) {
        const store = new FormStore()
        formRef.current = store.getForm()
    }
    return [formRef.current]
}
