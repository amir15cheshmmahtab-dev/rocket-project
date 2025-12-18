import InnerLoginForm from "@/components/auth/innerLoginForm";
import { LoginFormValuesInterface } from "@/components/contracts/auth";
import validationError from "@/components/exceptions/validationError";
import callApi from "@/helper/callApi";
import { withFormik } from "formik";
import * as yup from "yup";


const loginFormValidationSchema = yup.object().shape({
    email : yup.string().required().email(),
    password : yup.string().required().min(8)
})

interface LoginFormProps {
    setCookie : any
}

const LoginForm = withFormik<LoginFormProps , LoginFormValuesInterface>({
    mapPropsToValues : props => ({
        email : '',
        password : ''
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
        const res = await callApi().post('/auth/login' , values)
        if(res.status === 200) {
            props.setCookie('shopy-token' , res.data.token , {
                'maxAge' : 3600 * 24 * 30,
                'domain' : 'localhost',
                'path' : '/',
                'sameSite' : 'lax'
            })
        }
        } catch(error){
            if (error instanceof validationError){
                console.log(error.message);
                // setFieldError("email","we have error")
                Object.entries(error.message).forEach(([key,value]) => setFieldError(key,value as string))
            }
        }
       

    }
})(InnerLoginForm)

export default LoginForm;