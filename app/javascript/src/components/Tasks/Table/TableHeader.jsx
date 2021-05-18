import React from "react";
import { compose, head, join, juxt, tail, toUpper } from "ramda";
import Button from "../../Button";
import { useHistory } from "react-router";

const TableHeader = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/polls/create");
  };

  return (
    <thead>
      <tr>
        <th className="px-6 py-3 text-lg font-bold leading-4 tracking-wider
        text-left text-opacity-50 bg-gray-50">
          Polls Available
        </th>
        <th></th>
        <th className="px-9 py-3 text-sm font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 bg-gray-50">
          <Button
            buttonText="Create a Poll"
            onClick={handleClick}
          />
        </th>
        {/* <th className="px-6 py-3 bg-gray-50"></th> */}
      </tr>
    </thead>
  );
};

export default TableHeader;