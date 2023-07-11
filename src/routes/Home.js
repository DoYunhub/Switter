import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [sweet, setSweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("sweets").add({
      sweet,
      createdAt: Date.now(),
    });
    setSweet("");
  };
  const onChange = (e) => {
    setSweet(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="siweet" />
      </form>
    </div>
  );
};
export default Home;
