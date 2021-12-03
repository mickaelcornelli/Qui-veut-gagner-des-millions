import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  
  return (
    <div className="loadingGame">
      <div className="intro">
      <iframe src='https://www.youtube.com/embed/KFR_xeSMi74?autoplay=1&'
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
      />
      </div>
      <div className="start">
        <input
          className="startInput"
          placeholder="Entrez votre pseudo"
          ref={inputRef}
        />
        <button className="startButton" onClick={handleClick}>
          Démarrer la partie
        </button>
      </div>
    </div>
  );
}
