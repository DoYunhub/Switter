import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Sweet from "../components/Sweet";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "fbase";
import { ref, uploadString } from "@firebase/storage";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState(); //사진의 result값

  useEffect(() => {
    dbService.collection("sweets").onSnapshot((snapshot) => {
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); //onSnapshot은 db에서 무슨일이 일어났을때, 알림을 받음.
      setSweets(sweetArray); //실시간으로 트윗을 화면에 띄움
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url"); // data_url이 readAsDataURL을 나타냄
    console.log(response);
    // await dbService.collection("sweets").add({
    //   text: sweet,
    //   createdAt: Date.now(), //유저가 댓글쓴 시간을 나타냄
    //   creatorId: userObj.uid, //유저아이디 나타냄
    // }); //화면에 트윗하는걸 나타냄
    // setSweet("");
  };
  const onChange = (e) => {
    setSweet(e.target.value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0]; //파일을가지고 reader를 만듦
    const reader = new FileReader();
    reader.onloadend = (finshedEvent) => {
      setAttachment(finshedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile); //readAsDataURL를 이용해 파일을 읽음
  };
  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Sweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50" height="50" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
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
