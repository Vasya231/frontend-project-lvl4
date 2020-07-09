import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { useWindowDimensions } from 'utils';

import ChannelList from 'features/channels/ChannelList';
import NewChannelButton from 'features/channels/NewChannelButton';
// import DropdownButton from 'react-bootstrap/DropdownButton';

const ChannelsWindow = () => {
  const { width } = useWindowDimensions();
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
      <Dropdown className="w-100 d-flex">
        <Dropdown.Toggle className="w-100" variant="success">Channels</Dropdown.Toggle>
        <Dropdown.Menu className="w-100 d-flex flex-column channels-dropdown">{content}</Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <div className="col-md-3 mh-100 d-flex flex-column justify-content-between channels-window mb-1">
      <ChannelList />
      <div className="">
        <NewChannelButton />
      </div>
    </div>
  );
};

export default ChannelsWindow;
