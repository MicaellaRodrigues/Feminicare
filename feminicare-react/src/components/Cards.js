import React from "react";
import { Link } from "react-router-dom";
import "../styles/saudemulher.css";

const Card = ({ image, title, age, path }) => {
  return (
    <div className="card">
      <div
        className="card__img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{age}</p>
        <Link to={path} className="card__btn">
          Saiba mais
        </Link>
      </div>
    </div>
  );
};

export default Card;
