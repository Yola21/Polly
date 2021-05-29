import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import Logger from 'js-logger';
import votesApi from "../../apis/votes";
import { getFromLocalStorage } from "../../helpers/storage";

const ShowPoll = ({ isLoggedIn }) => {
  const { slug } = useParams();
  const [pollDetails, setPollDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [votes, setVotes] = useState([]);
  const userID = getFromLocalStorage('authUserId');
  const [isVoted, setIsVoted] = useState(false);
  const [votedOption, setVotedOption] = useState();
  const history = useHistory();

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(slug);
      setPollDetails(response.data.poll);
      setVotes(response.data.votes);
      const userVoted = response.data.votes.find(v => v.user_id == userID);
      if(userVoted){
        setVotedOption(userVoted.option); 
        setIsVoted(true);
      }
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
    setVotedOption(e.target.innerText);
    console.log(votedOption);
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

  const calculateVotes = selectedOption => {
    const selectedVote = votes.filter(v => v.option == selectedOption);
    const votePercentage = (selectedVote.length / votes.length) * 100;
    return votePercentage % 1 ? votePercentage.toFixed(2) : votePercentage;
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  console.log(votedOption);
  return (
    <Container isLoggedIn={isLoggedIn}>
      <div className="flex justify-between text-bb-gray-600 mt-10">
        <div className="flex-1">
          <div>
            <h1 className="pb-3 pl-3 mt-3 mb-3 text-xl leading-5 text-purple-400 border-b border-bb-gray">
              {pollDetails?.title}
            </h1>
            <button
              className={`my-4 p-2 w-3/4 text-l font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${pollDetails.option1 == votedOption ? "bg-purple-600 text-white" : ""}`}
              onClick={handleVotes}
              disabled={isVoted}
            >
              {pollDetails?.option1}
            </button>
            {
              isVoted && <span className="ml-4">{calculateVotes(pollDetails?.option1)}%</span>
            }
            <button 
              className={`my-4 p-2 w-3/4 text-l font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${pollDetails.option2 == votedOption ? "bg-purple-600 text-white" : ""}`}
              onClick={handleVotes}
              disabled={isVoted}
            >
              {pollDetails?.option2}
            </button>
            {
              isVoted && <span className="ml-4">{calculateVotes(pollDetails?.option2)}%</span>
            }
            <button 
              className={`my-4 p-2 w-3/4 text-l font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${pollDetails.option3 == votedOption ? "bg-purple-600 text-white" : ""}`}
              onClick={handleVotes}
              disabled={isVoted}
            >
              {pollDetails?.option3}
            </button>
            {
              isVoted && <span className="ml-4">{calculateVotes(pollDetails?.option3)}%</span>
            }
            <button 
              className={`my-4 p-2 w-3/4 text-l font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${pollDetails.option4 == votedOption ? "bg-purple-600 text-white" : ""}`}
              onClick={handleVotes}
              disabled={isVoted}
            >
              {pollDetails?.option4}
            </button>
            {
              isVoted && <span className="ml-4">{calculateVotes(pollDetails?.option4)}%</span>
            }
          </div>
          <div>
            {
              isVoted && <h2>You have voted on this Poll!✔</h2>
            }
            <Link to="/">
              <button className="mr-12 my-12 p-2 w-1/4 text-l text-white bg-blue-400 font-semibold rounded-full border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1">Back</button>
            </Link>
          </div>
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