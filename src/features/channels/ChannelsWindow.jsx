import React from 'react';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

import { useWindowDimensions } from 'utils';

import ChannelList from 'features/channels/ChannelList';
import NewChannelButton from 'features/channels/NewChannelButton';
import { getCurrentChannelName } from 'features/channels/channelsSlice';
import { mobileWidthBreakpoint } from 'constants';

const ChannelsWindow = () => {
  const { width } = useWindowDimensions();
  const currentChannelName = useSelector(getCurrentChannelName);
  const content = (
    <>
      <ChannelList />
      <div className="">
        <NewChannelButton />
      </div>
    </>
  );

  if (width < mobileWidthBreakpoint) {
    return (
      <Dropdown className="w-100 d-flex mb-1">
        <Dropdown.Toggle className="w-100" variant="success">{currentChannelName}</Dropdown.Toggle>
        <Dropdown.Menu className="w-100 d-flex flex-column vh-100">
          <div className="d-flex flex-column h-75">
            {content}
          </div>
        </Dropdown.Menu>
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
