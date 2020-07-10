import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Formik, Form, Field,
} from 'formik';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';
import AppContext from 'AppContext';
import { validateMessageText } from 'utils';


const mapStateToProps = (state) => ({
  activeChannelId: state.activeChannel.id,
});

const actions = { openModal: showModal };

const NewMessageForm = (props) => {
  const { username } = useContext(AppContext);
  const { t } = useTranslation();
  const { activeChannelId, openModal } = props;
  return (
    <Formik
      initialValues={{ text: '' }}
      validate={validateMessageText}
      onSubmit={async (values, formikActions) => {
        const { setSubmitting, resetForm } = formikActions;
        try {
          await serverAPI.addNewMessage(values.text, username, activeChannelId);
          resetForm();
          setSubmitting(false);
        } catch (error) {
          openModal({
            type: 'errorMessage',
            modalProps: {
              errorMessage: t('errors.network'),
            },
          });
        }
      }}
    >
      {({
        isSubmitting, errors, isValid, dirty,
      }) => (
        <Form>
          <div className="input-group mw-100">
            <Field type="text" name="text" autoComplete="off" className="form-control" />
            <Button type="submit" disabled={isSubmitting || !dirty || !isValid} variant="primary" className="ml-1 btn-send">
              {t('chatWindow.submit')}
            </Button>
            <div>{errors.submit}</div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(mapStateToProps, actions)(NewMessageForm);
