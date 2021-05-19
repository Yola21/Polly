import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import Toastr from "components/Common/Toastr";
import Logger from 'js-logger';

const EditPoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
 
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({ slug, payload: { poll: { title } } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      setTitle(response.data.poll.title);
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
    <Container>
      <PollForm 
        type="update" 
        title={title} 
        setTitle={setTitle}  
        loading={loading} 
        handleSubmit={handleSubmit} 
      />
    </Container>
  );
};

export default EditPoll;