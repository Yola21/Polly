import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import Logger from 'js-logger';
import votesApi from "../../apis/votes";

const ShowPoll = ({ history }) => {
  const { slug } = useParams();
  const [pollDetails, setPollDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      setPollDetails(response.data.poll);
      console.log("Poll details", response);
    } catch (error) {
      Logger.error(error);
    }finally{
      setPageLoading(false);
    }
  };
  
  const destroyPoll = async () => {
    try {
      await pollsApi.destroy(pollDetails?.slug);
      await fetchPollDetails();
      history.push('/');
    } catch (error) {
      Logger.error(error);
    }
  };

  const updatePoll = () => {
    history.push(`/polls/${pollDetails?.slug}/edit`);
  };

  const handleVotes = async e => {
    e.preventDefault();
    var option = e.target.innerText;
    console.log(option);
    console.log([pollDetails?.option1, pollDetails?.option2, pollDetails?.option3, pollDetails?.option4].includes(option));
    try{
      await votesApi.create({ vote: { poll_id: pollDetails?.id, user_id: pollDetails?.user_id, option } });
      setPageLoading(false);
      fetchPollDetails();
    } catch(error){
      Logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between text-bb-gray-600 mt-10">
        <div className="flex-1">
          <h1 className="pb-3 pl-3 mt-3 mb-3 text-xl leading-5 text-purple-400 border-b border-bb-gray">
            {pollDetails?.title}
          </h1>
          <button
            className="my-4 p-2 w-3/4 text-l text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleVotes}
          >
            {pollDetails?.option1}
          </button>
          <button 
            className="my-4 p-2 w-3/4 text-l text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleVotes}
          >
            {pollDetails?.option2}
          </button>
          <button 
            className="my-4 p-2 w-3/4 text-l text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleVotes}
          >
            {pollDetails?.option3}
          </button>
          <button 
            className="my-4 p-2 w-3/4 text-l text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleVotes}
          >
            {pollDetails?.option4}
          </button>
        </div>
        <div className="h-10 bg-bb-env px-2 mt-2 mb-4 ml-2 rounded">
          <i
            className="text-2xl text-center transition duration-300
              ease-in-out ri-delete-bin-5-line hover:text-bb-red mr-2 cursor-pointer"
            onClick={destroyPoll}
          ></i>
          <i
            className="text-2xl text-center transition duration-300
              ease-in-out ri-edit-line hover:text-bb-yellow cursor-pointer"
            onClick={updatePoll}
          ></i>
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;