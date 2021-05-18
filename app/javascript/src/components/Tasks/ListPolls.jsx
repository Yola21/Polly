import React from 'react';
import Table from './Table';

function ListPolls({ data, destroyPoll, updatePoll, showPoll }) {
  return (
    <Table 
      data={data} 
      destroyPoll={destroyPoll}
      updatePoll={updatePoll}
      showPoll={showPoll}
    />
  );
}

export default ListPolls;