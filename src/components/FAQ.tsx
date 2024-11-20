import { FC, useState } from "react";
import faqData from "../constants/faqData";
import './FAQ.css';
import FAQItem from "./FAQItem";

const FAQ: FC = () => {
  return (
    <section className="faq-section">
      <article className="faq-section-content">
        {faqData.map((item, index) => (
          <FAQItem faqItem={item} key={index} index={index} />
        ))}
      </article>
    </section>
  );
}

export default FAQ;