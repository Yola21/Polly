import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button";

const TableRow = ({ data, destroyPoll, updatePoll }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.title}>
          <td className="px-6 py-4 text-sm font-medium
            leading-5 text-bb-gray whitespace-no-wrap">
            {rowData.title}
          </td>
          <td className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer">
            <a className="text-bb-purple text-opacity-50
              hover:text-opacity-100">
              <Button
                buttonText="Edit"
              />
            </a>
          </td>
          <td className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer">
            <a className=" hover:text-bb-red">
              <Button
                buttonText="Delete"
              />
            </a>
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