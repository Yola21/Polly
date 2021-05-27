import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListPolls from "components/Tasks/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import Logger from 'js-logger';
import TableHeader from "../Tasks/Table/TableHeader";
import { useHistory } from "react-router";

const Dashboard = ({ isLoggedIn }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { isLoggedIn } = props;
  var history = useHistory();

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const showPoll = slug => {
    history.push(`/polls/${slug}/show`);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Container isLoggedIn={isLoggedIn} >
        <ListPolls 
          data={polls} 
          showPoll={showPoll}
          isLoggedIn={isLoggedIn}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col mt-10 ">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader />
                <h1 className="m-6 text-xl leading-5 text-center">
                  No Polls have been created 😔
                </h1>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;