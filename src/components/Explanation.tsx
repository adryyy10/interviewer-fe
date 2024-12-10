import { FC } from "react";
import "./Explanation.css";

interface ExplanationStep {
  image: string; // Image URL or path
  altText: string; // Alt text for accessibility
  title: string; // Title of the step
  description: string; // Description of the step
}

const steps: ExplanationStep[] = [
  {
    image: "/categories.png",
    altText: "Choose a category",
    title: "Step 1: Choose a category",
    description: "Browse our range of categories and select the one you want to attempt.",
  },
  {
    image: "/quiz2.png",
    altText: "Quiz attempt",
    title: "Step 2: Answer Questions",
    description: "Answer the quiz questions to the best of your ability.",
  },
  {
    image: "/score2.png",
    altText: "Score result",
    title: "Step 3: Review Your Results",
    description: "Once you finish the quiz, review your results and see detailed explanations.",
  },
];

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
