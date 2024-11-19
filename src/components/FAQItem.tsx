import { FC, useState } from "react";
import { FAQItemProps } from "../types/FAQ/FAQItemProps";
import './FAQItem.css';

const FAQItem: FC<FAQItemProps> = ({
  faqItem,
  index
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div key={index} className="faq-item">
      <button className="faq-item-question" onClick={() => toggleFAQ(index)}>
        {faqItem.question}
        <span className="faq-item-icon">{activeIndex === index ? '-' : '+'}</span>
      </button>
      <div className={`faq-item-answer ${activeIndex === index ? 'open' : ''}`}>
        <p>{faqItem.answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;
