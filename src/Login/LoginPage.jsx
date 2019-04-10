
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
export const LoginPage = () => (
    <div>
     
   <Formik
            initialValues={{
                phoneNumber: ""
            }}
            validate={values => {
                let errors = {};
            
            if (!values.phoneNumber) {
                errors.phoneNumber = "Please, Enter Your Mobile Number";
                } else if (
                !/^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i.test(values.phoneNumber)
                ) {
                    errors.phoneNumber = "Invalid phonenumber";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, setStatus }) => {
                setTimeout(() => {
                 alert(values.phoneNumber)

                }, 400);
            }}
        >
            {({ isSubmitting, status }) => (
                <Form id="form-contact" noValidate>
                    <div className="comment-form row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="contact-label" htmlFor="phoneNumber">
                                    Phone Number:<span className="required">*</span>
                                </label>
                                <Field
                                    type="text"
                                    id="phoneNumber"
                                    className="form-control"
                                    name="phoneNumber"
                                    placeholder="Mobile Number"
                                />
                                <ErrorMessage className="required" name="phoneNumber" component="div" />
                            </div>
                         <button
                                className="btn contact-btn btn-success"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Login
              </button>
                            <div>{status ? status.success ? <div className="alert alert-success " role="alert">{status.success}</div>
                                : <div className="alert alert-danger " role="alert">{status.failed}</div> : ''}</div>

                        </div>
                        </div>
                    
                </Form>
            )}
        </Formik>
    </div>
);