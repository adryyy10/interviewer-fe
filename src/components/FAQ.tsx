import { FC, useState } from "react";
import faqData from "../constants/faqData";
import './FAQ.css';
import FAQItem from "./FAQItem";

const FAQ: FC = () => {
  return (
    <section className="faq-section">
      <h2 className="faq-section-title">Frequently Asked Questions</h2>
      <article className="faq-section-content">
        {faqData.map((item, index) => (
          <FAQItem faqItem={item} index={index} />
        ))}
      </article>
    </section>
  );
}

export default FAQ;