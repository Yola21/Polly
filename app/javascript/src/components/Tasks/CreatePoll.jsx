import React, { useState, useEffect } from "react";
import Container from "components/Container";
import PollForm from "components/Tasks/Form/PollForm";
import pollsApi from "apis/polls";
import usersApi from "apis/users";
import Logger from 'js-logger';
import PageLoader from '../PageLoader';

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({ poll: { title, user_id: userId } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      console.log("response", response);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    } catch (error) {
      Logger.error(error);
      console.log("error", error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    console.log("Inside useEffect");
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <PollForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;