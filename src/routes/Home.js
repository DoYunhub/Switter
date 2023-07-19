import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Sweet from "../components/Sweet";
import SweetFactory from "../components/SweetFactory";

const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);
  useEffect(() => {
    dbService.collection("sweets").onSnapshot((snapshot) => {
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); //onSnapshot은 db에서 무슨일이 일어났을때, 알림을 받음.
      setSweets(sweetArray); //실시간으로 트윗을 화면에 띄움
    });
  }, []);
  return (
    <div className="container">
      <SweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
