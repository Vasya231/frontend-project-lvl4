import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { connect } from 'react-redux';

import { addNewMessage } from 'serverAPI';
import AppContext from './AppContext';

const mapStateToProps = (state) => ({
  activeChannelId: state.activeChannel.id,
});

class NewMessageForm extends React.Component {
  render() {
    const { username } = this.context;
    const { activeChannelId } = this.props;
    return (
      <div className="mt-auto">
        <Formik
          initialValues={{ text: '' }}
          validate={({ text }) => {
            if (!text) {
              return { text: 'Required' };
            }
            return {};
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await addNewMessage(values.text, username, activeChannelId);
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

export default connect(mapStateToProps)(NewMessageForm);
