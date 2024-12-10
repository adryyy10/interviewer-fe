import { FC } from "react";
import "./Explanation.css";
import { steps } from "../constants/explanationSteps";

const Explanation: FC = () => {
  return (
    <section className="explanation-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`explanation-step ${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="explanation-image">
            <img src={step.image} alt={step.altText} />
          </div>
          <div className="explanation-text">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Explanation;
