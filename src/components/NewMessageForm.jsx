import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { addNewMessage } from 'serverAPI';

const NewMessageForm = () => (
  <div>
    <Formik
      initialValues={{ text: '' }}
      validate={({ text }) => {
        if (!text) {
          return { text: 'Required' };
        }
        return {};
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await addNewMessage(values.text, 'Vasya', 1);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="text" />
          <ErrorMessage name="text" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default NewMessageForm;
