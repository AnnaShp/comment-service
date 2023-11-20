import "./Form.css";
import { useState, useRef } from "react";

export default function Form() {
  const [state, setState] = useState({
    radio: "yes",
    userName: "",
    userLink: "",
    userText: "",
  });

  const [comments, setComments] = useState([]);

  const refName = useRef();
  const refLink = useRef();
  const refText = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.name === "radio" ? e.target.value : e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const checkSpam = (text) => {
    return text === "xxx" || text === "viagra" ? "***" : text;
  };

  const sendInfo = () => {
    const newComment = {
      userName: state.radio === "yes" ? refName.current.value : "Аноним",
      userLink: refLink.current.value,
      userText: checkSpam(refText.current.value),
    };
    setComments([...comments, newComment]);
    state.userName = "";
    state.userLink = "";
    state.userText = "";
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
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
              checked={state.radio === "yes"}
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
              checked={state.radio === "no"}
              onChange={handleChange}
            />
          </label>
        </div>
        {state.radio === "yes" && (
          <div id="div_user_name">
            <label>Введите ваше имя:</label>
            <input
              type="text"
              name="userName"
              value={state.userName}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              ref={refName}
            />
          </div>
        )}
        <label>Введите ссылку вашего аватара:</label>
        <input
          type="link"
          name="userLink"
          value={state.userLink}
          onChange={handleChange}
          placeholder="Введите ссылку"
          ref={refLink}
        />
        <label>Оставьте комментарий:</label>
        <textarea
          name="userText"
          value={state.userText}
          onChange={handleChange}
          placeholder="Оставьте комментарий"
          ref={refText}
        />
      </div>
      <button className="user_button" type="button" onClick={sendInfo}>
        Отправить
      </button>
      <div className="result">
        <h2 className="chat">Чат</h2>
        {comments.map((comment, index) => {
          return (
            <div key={index} className="user_info" id="result">
              <div className="user">
                <img src={comment.userLink} alt="avatar" />
                <span>{comment.userName}</span>
              </div>
              <div id="resultText">{comment.userText}</div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
