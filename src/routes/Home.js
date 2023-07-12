import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    dbService.collection("sweets").onSnapshot((snapshot) => {
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArray); //실시간으로 트윗을 화면에 띄움
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("sweets").add({
      text: sweet,
      createdAt: Date.now(), //유저가 댓글쓴 시간을 나타냄
      creatorId: userObj.uid, //유저아이디 나타냄
    }); //화면에 트윗하는걸 나타냄
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
        <input type="submit" value="sweet" />
      </form>
      <div>
        {sweets.map((sweet) => (
          <div key={sweet.id}>
            <h4>{sweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
