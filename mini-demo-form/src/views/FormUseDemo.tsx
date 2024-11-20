import React from "react";
import Form from '../components/Form/Form'
import Field from '../components/Form/FormField'
import { useForm } from "../components/Form/FormStore";

const FormUseDemo = function () {
    const [form] = useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errors: any[]) => {
        console.log('Failed:', errors);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Custom Form Example</h1>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Field name="username">
                    {({ value, onChange }) => <input placeholder="Username" value={value} onChange={onChange} />}
                </Field>
                <Field name="password">
                    {({ value, onChange }) => <input type="password" placeholder="Password" value={value} onChange={onChange} />}
                </Field>
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
}
export default FormUseDemo
