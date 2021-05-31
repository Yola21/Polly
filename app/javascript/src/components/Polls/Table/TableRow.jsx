import React from "react";
import PropTypes from "prop-types";
import Logger from 'js-logger';
import { useHistory } from "react-router-dom";

const TableRow = ({ data, showPoll, isLoggedIn }) => {
  Logger.info(data);  
  const history = useHistory();

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td 
            className="px-6 py-4 text-lg font-medium
            leading-5 text-purple-600 whitespace-no-wrap cursor-pointer"
            onClick={() => isLoggedIn ? showPoll(rowData.slug) : history.push("/login") }
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