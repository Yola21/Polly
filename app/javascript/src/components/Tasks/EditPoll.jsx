import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import Logger from 'js-logger';

const EditPoll = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const [userId, setUserId] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({ slug, payload: { poll: { title, option1, option2, option3, option4, user_id: userId, authorize_owner: true } } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      setTitle(response.data.poll.title);
      setUserId(response.data.poll.user_id);
      setOption1(response.data.poll.option1);
      setOption2(response.data.poll.option2);
      setOption3(response.data.poll.option3);
      setOption4(response.data.poll.option4);
    } catch (error) {
      Logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container isLoggedIn={isLoggedIn} >
      <PollForm 
        type="update" 
        title={title} 
        setTitle={setTitle}  
        loading={loading} 
        handleSubmit={handleSubmit}
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        setOption1={setOption1}
        setOption2={setOption2}
        setOption3={setOption3}
        setOption4={setOption4} 
      />
    </Container>
  );
};

export default EditPoll;