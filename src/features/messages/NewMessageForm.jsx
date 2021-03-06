import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import serverAPI from 'serverAPI';
import AppContext from 'AppContext';
import connect from 'connect';
import { messageTextSchema } from 'utils';
import { getCurrentChannelId } from 'features/channels/channelsSlice';


const NewMessageForm = (props) => {
  const { username } = useContext(AppContext);
  const { t } = useTranslation();
  const { openModal } = props;
  const currentChannelId = useSelector(getCurrentChannelId);
  const formik = useFormik({
    initialValues: { text: '' },
    validationSchema: messageTextSchema,
    onSubmit: async (values, formikActions) => {
      const { setSubmitting, resetForm } = formikActions;
      try {
        await serverAPI.addNewMessage(values.text, username, currentChannelId);
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
    },
  });
  const {
    values, dirty, isValid, isSubmitting, handleChange, errors, handleSubmit,
  } = formik;
  return (
    <form className="input-group mw-100" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        autoComplete="off"
        className="form-control"
        onChange={handleChange}
        value={values.text}
      />
      <Button type="submit" disabled={isSubmitting || !dirty || !isValid} variant="primary" className="ml-1 d-none d-md-block">
        {t('chatWindow.submit')}
      </Button>
      <div>{errors.submit}</div>
    </form>
  );
};

export default connect(NewMessageForm);
