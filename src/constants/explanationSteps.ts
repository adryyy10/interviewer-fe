import { ExplanationStep } from "../types/explanation/ExplanationStep";

export const steps: ExplanationStep[] = [
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