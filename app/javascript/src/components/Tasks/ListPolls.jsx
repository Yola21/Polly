import React from 'react';
import Table from './Table';

function ListPolls({ data, showPoll }) {
  return (
    <Table 
      data={data} 
      showPoll={showPoll}
    />
  );
}

export default ListPolls;