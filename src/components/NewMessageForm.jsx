import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { addNewMessage } from 'serverAPI';
import AppContext from './AppContext';

class NewMessageForm extends React.Component {
  render() {
    const { username } = this.context;
    return (
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
            await addNewMessage(values.text, username, 1);
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
  }
}

NewMessageForm.contextType = AppContext;

export default NewMessageForm;
