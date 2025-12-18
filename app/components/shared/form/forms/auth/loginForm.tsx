import { Form, FormikProps, withFormik } from "formik";
import Input from "@/components/shared/form/input";
import * as yup from "yup";

interface LoginFormValues {
    email: string,
    password: string
}

const InnerLoginForm = (props : FormikProps<LoginFormValues>) => {
    return (
        <Form className="space-y-6">
            <div>
                <Input name='email' type='email' label="Email Address"/>
            </div>

            <div>
                <Input name='password' type='password' label="Password"/>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Login
                </button>
            </div>
        </Form>
    )
}

interface LoginFormProps {
}

const loginFormValidationSchema = yup.object().shape({
    email : yup.string().required().email(),
    password : yup.string().required().min(8)
})

const LoginForm = withFormik<LoginFormProps , LoginFormValues>({
    mapPropsToValues : props => ({
        email : '',
        password : ''
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit : (values) => {
        console.log(values);
    }
})(InnerLoginForm)

export default LoginForm;