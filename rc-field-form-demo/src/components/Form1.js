/*
 * @Author: chb
 * @Date: 2024-11-14 17:36:14
 * @Description: form1
 */
import { Button, Input } from 'antd'
import Form, { Field } from 'rc-field-form'
export default function Form1 () {
    return <>
        hello Form1<br/>
        <Form
            onFinish={values => {
                console.log('finish:', values)
            }}
        >
            <Field name="username">
                <Input placeholder='请输入东西' style={{ width: '200px' }} />
            </Field>
            <br/>
            <Field name="password">
                <Input placeholder='请输入password' style={{ width: '200px' }} />
            </Field>
            <br/>
            <Button>Submit</Button>
        </Form>
    </>
}