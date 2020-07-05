import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { connect } from 'react-redux';
import i18next from 'i18next';

import serverAPI from 'serverAPI';
import AppContext from './AppContext';

const mapStateToProps = (state) => ({
  activeChannelId: state.activeChannel.id,
});

class NewMessageForm extends React.Component {
  render() {
    const { username } = this.context;
    const { activeChannelId } = this.props;
    return (
      <Formik
        initialValues={{ text: '' }}
        validate={({ text }) => {
          if (!text) {
            return { text: 'Required' };
          }
          return {};
        }}
        onSubmit={async (values, formikActions) => {
          const { setSubmitting, resetForm, setErrors } = formikActions;
          console.log(formikActions);
          try {
            await serverAPI.addNewMessage(values.text, username, activeChannelId);
            resetForm();
            setSubmitting(false);
          } catch (e) {
            setErrors({
              submit: i18next.t('errors.network'),
            });
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field type="text" name="text" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div>{errors.submit}</div>
          </Form>
        )}
      </Formik>
    );
  }
}

NewMessageForm.contextType = AppContext;

export default connect(mapStateToProps)(NewMessageForm);
