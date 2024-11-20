import React, { useContext, useEffect, useState } from "react";
import FormContext from "./FormContext";

type FieldProps = {
    name: string,
    children: ( control: {
        value: any;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }) => React.ReactNode
}

const Field: React.FC<FieldProps> = ({ name, children }) => {
    const form = useContext(FormContext)
    const [value, setValue] = useState(() => form?.getFieldValue(name) ?? '')
    const [error, setError] = useState('')

    const validate = () => {
        const fieldValue = form?.getFieldValue(name)
        setError(!fieldValue ? `${name} is required` : '')
    }

    useEffect(() => {
        console.log('trigger effect change')
        const unregister = form?.registerField({
            name,
            onStoreChange: () => {
                setValue(form?.getFieldValue(name) ?? '')
                validate()
            }
        })
        return () => unregister?.()
    // eslint-disable-next-line
    }, [form, name]);

    // 数据change劫持，更新仓库value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        form?.setFieldValue(name, newValue)
        setValue(newValue)
    }
    return (
        <div style={{ marginBottom: '1rem' }}>
            {children({ value, onChange: handleChange})}
            {error && <div style={{ color: 'red', marginTop: '0.5rem'}}>{error}</div>}
        </div>
    )
}

export default Field
