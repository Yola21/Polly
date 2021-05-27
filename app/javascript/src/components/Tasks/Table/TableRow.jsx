import React from "react";
import PropTypes from "prop-types";
import Logger from 'js-logger';
import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const TableRow = ({ data, showPoll, isLoggedIn }) => {
  Logger.info(data);  
  // var history = useHistory();
  
  // const handleShowPoll = slug => {
  //   // let history = useHistory();
  //   console.log("logged", isLoggedIn);
  //   isLoggedIn ? showPoll(slug) : <Link to="/login"/>;
  // };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td 
            className="px-6 py-4 text-lg font-medium
            leading-5 text-purple-600 whitespace-no-wrap cursor-pointer"
            onClick={() => isLoggedIn ? showPoll(rowData.slug) : <Redirect to="/login"/> }
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