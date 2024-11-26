
import FieldForm from './Form';
import Field from './Field';
import { useForm } from './hook/useForm'

const Form = FieldForm as any;
Form.Field = Field as any;
Form.useForm = useForm;

export { Field, useForm };
export default Form;
