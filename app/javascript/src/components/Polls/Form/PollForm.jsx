import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
  option1,
  option2,
  option3,
  option4,
  setOption1,
  setOption2,
  setOption3,
  setOption4
}) => {
  return (
    <form className="max-w-lg mx-auto p-8 bg-purple-300 bg-opacity-50 text-left text-purple-600" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Docs Revamp"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        label="Option 1"
        placeholder="Option 1"
        value={option1}
        onChange={e => setOption1(e.target.value)}
      />
      <Input
        label="Option 2"
        placeholder="Option 2"
        value={option2}
        onChange={e => setOption2(e.target.value)}
      />
      <Input
        label="Option 3"
        placeholder="Option 3"
        value={option3}
        onChange={e => setOption3(e.target.value)}
      />
      <Input
        label="Option 4"
        placeholder="Option 4"
        value={option4}
        onChange={e => setOption4(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;