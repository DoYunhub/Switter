import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //수정모드인지 아닌지 true false로 알수있음
  const [newSweet, setNewSweet] = useState(sweetObj.text); //input에 입력된 text를 업데이트
  const deleteOnClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await dbService.doc(`sweets/${sweetObj.id}`).delete();
      await storageService.refFromURL(sweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`sweets/${sweetObj.id}`).update({
      text: newSweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    setNewSweet(e.target.value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit you sweet"
              value={newSweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && (
            <img src={sweetObj.attachmentUrl} width="150" height="150" />
          )}
          {isOwner && (
            <>
              <button onClick={deleteOnClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div> //isOwner(작성자)일경우 button이 보인다.
  );
};

export default Sweet;
