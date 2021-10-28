import React from 'react';
import { Field, Form, Formik } from 'formik';
import MyInput from '../MyInput/MyInput';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { clearCart } from '../../store/reducer';
import * as yup from 'yup';

const FIELD_REQUIRED = 'Обязательное поле не заполнено'
const schema = yup.object().shape({
    firstName: yup
        .string()
        .required(FIELD_REQUIRED),
    lastName: yup
        .string()
        .required(FIELD_REQUIRED),
    age: yup
        .number()
        .typeError('Это должно быть число')
        .required(FIELD_REQUIRED)
        .integer('Введите целое число')
        .positive('Введите число больше нуля'),
    adress: yup
        .string()
        .required(FIELD_REQUIRED),
    phone: yup
        .string()
        .required(FIELD_REQUIRED)
        .matches(/^((\+38))?([ ])?((\(\d{3}\))|(\d{3}))?([ ])?(\d{3}[- ]?\d{2}[- ]?\d{2})$/ , 'Некорректный формат телефона'),
});


const FormCheckout = (props) => {
    
    const {summPriceInCart , prodInCart , clearCart} = props;

    const handleSubmit = (values, formProps) => {
        console.log("товары в корзине", JSON.stringify(prodInCart, null ,2) );
        console.log( "доставка: ", JSON.stringify(values, null, 2));
        console.log("сумма доставки", summPriceInCart);
        formProps.resetForm();
        clearCart();
    }


    return (

        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                age: '',
                adress: '',
                phone: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >

            {(formikProps) => {

                return (
                    <>
                        <div className="form-checkout-wrapper">
                            <div className="form-checkout">

                                <Form className="form-checkout-flex" noValidate>
                                    <Field component={MyInput} label='Имя ' type='text' placeholder='' name='firstName' />
                                    <Field component={MyInput} label='Фамилия ' type='text' placeholder='' name='lastName' />
                                    <Field component={MyInput} label='Возраст ' type='text' placeholder='' name='age' />
                                    <Field component={MyInput} label='Адрес ' type='text' placeholder='' name='adress' />
                                    <Field component={MyInput} label='Телефон ' type='text' placeholder='' name='phone' />
                                    <div className="submit-button">
                                        <Button text="Оформить заказ" className="btn-card" backgroundColor="#288040" type="submit"/>
                                    </div>
                                </Form>

                            </div>
                        </div>
                    </>
                )
            }
            }

        </Formik>

    )

}

const mapDispatchToProps = (dispatch) => ({
    clearCart: () => dispatch(clearCart()),
  })

export default connect(null, mapDispatchToProps)(FormCheckout);