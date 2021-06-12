import React from 'react';
import Table from './Table';

function ListPolls({ data, showPoll, isLoggedIn }) {
  return (
    <Table 
      data={data} 
      showPoll={showPoll}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default ListPolls;