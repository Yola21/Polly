import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button";
import Logger from 'js-logger';

const TableRow = ({ data, showPoll }) => {
  Logger.info(data);  
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td 
            className="px-6 py-4 text-lg font-medium
            leading-5 text-purple-600 whitespace-no-wrap cursor-pointer"
            onClick={() => showPoll(rowData.slug)}
          >
            {rowData.title}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPoll: PropTypes.func,
  updatePoll: PropTypes.func,
};

export default TableRow;