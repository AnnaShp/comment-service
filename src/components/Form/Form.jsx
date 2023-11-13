import "./Form.css";
import { useState, useRef } from "react";

export default function Form() {
  const [state, setState] = useState({
    radio: null,
    userName: "",
    userLink: "",
    userText: "",
  });

  const refName = useRef();
  const refLink = useRef();
  const refText = useRef();

  const [getName, setGetName] = useState("");
  const [getLink, setGetLink] = useState("");
  const [getText, setGetText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.name === "radio" ? e.target.checked : e.target.value;
    setState({ [e.target.name]: value });
  };

  let textArr = [];

  const checkSpam = () => {
    let value = refText.current.value;
    if (value === "xxx" || value === "viagra") return "***";
    textArr.push(value);
    console.log(textArr);
  };

  const sendInfo = () => {
    setGetName(refName.current.value);
    setGetLink(refLink.current.value);
    setGetText(checkSpam());
  };

  return (
    <form className="form">
      <h2 className="title">Оставьте ваш комментарий</h2>
      <div className="input">
        <div className="check">
          <label>Показывать ваше имя?</label>
          <label>
            Yes
            <input
              className="check_radio"
              type="radio"
              name="radio"
              value="yes"
              defaultChecked={true}
              onChange={handleChange}
            />
          </label>
          <label>
            No
            <input
              className="check_radio"
              type="radio"
              name="radio"
              value="no"
              onChange={handleChange}
            />
          </label>
        </div>
        <div id="div_user_name">
          <label>Введите ваше имя:</label>
          <input
            type="text"
            name="userName"
            defaultValue={state.userName}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            ref={refName}
          />
        </div>
        <label>Введите ссылку вашего аватара:</label>
        <input
          type="link"
          name="userLink"
          defaultValue={state.userLink}
          onChange={handleChange}
          placeholder="Введите ссылку"
          ref={refLink}
        />
        <label>Оставьте комментарий:</label>
        <textarea
          name="userText"
          defaultValue={state.userText}
          onChange={handleChange}
          placeholder="Оставьте комментарий"
          ref={refText}
        ></textarea>
      </div>
      <button className="user_button" type="button" onClick={sendInfo}>
        Отправить
      </button>
      <div className="result">
        <h2 className="chat">Чат</h2>
        <div className="user_info">
          <div className="user">
            <img
              src={getLink}
              id="resultLink"
              alt="avatar"
              name="getLink"
            ></img>
            <span id="resultName" name="getName">
              {getName}
            </span>
          </div>

          <span id="resultText" name="getText">
            {getText}
          </span>
        </div>
      </div>
    </form>
  );
}
