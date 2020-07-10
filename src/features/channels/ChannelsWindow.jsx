import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

import { useWindowDimensions } from 'utils';

import ChannelList from 'features/channels/ChannelList';
import NewChannelButton from 'features/channels/NewChannelButton';
import { getActiveChannelName } from 'features/channels/channelsSlice';

const mapStateToProps = (state) => ({
  activeChannelName: getActiveChannelName(state),
});

const ChannelsWindow = (props) => {
  const { width } = useWindowDimensions();
  const { activeChannelName } = props;
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
        <Dropdown.Toggle className="w-100" variant="success">{activeChannelName}</Dropdown.Toggle>
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

export default connect(mapStateToProps)(ChannelsWindow);
