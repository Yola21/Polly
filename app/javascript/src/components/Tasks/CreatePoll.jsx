import React, { useState, useEffect } from "react";
import Container from "components/Container";
import PollForm from "components/Tasks/Form/PollForm";
import pollsApi from "apis/polls";
import usersApi from "apis/users";
import Logger from 'js-logger';
import PageLoader from '../PageLoader';
import { useHistory } from "react-router";

const CreatePoll = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({ poll: { title, option1, option2, option3, option4, user_id: userId } });
      setLoading(false);
      history.push("/");
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
    <Container isLoggedIn={isLoggedIn} >
      <PollForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
        setOption1={setOption1}
        setOption2={setOption2}
        setOption3={setOption3}
        setOption4={setOption4}
      />
    </Container>
  );
};

export default CreatePoll;