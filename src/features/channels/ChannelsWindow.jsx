import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

import { useWindowDimensions } from 'utils';

import ChannelList from 'features/channels/ChannelList';
import NewChannelButton from 'features/channels/NewChannelButton';

const ChannelsWindow = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const content = (
    <>
      <ChannelList />
      <div className="">
        <NewChannelButton />
      </div>
    </>
  );
  const showDropdown = (width < 768);

  if (showDropdown) {
    return (
      <Dropdown className="w-100 d-flex mb-1">
        <Dropdown.Toggle className="w-100" variant="success">{t('channelsWindow.title')}</Dropdown.Toggle>
        <Dropdown.Menu className="w-100 d-flex flex-column channels-dropdown">{content}</Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <div className="col-md-4 mh-100 d-flex flex-column justify-content-between channels-window mb-1">
      {content}
    </div>
  );
};

export default ChannelsWindow;
