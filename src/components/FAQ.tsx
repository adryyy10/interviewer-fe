import { FC, useState } from "react";
import faqData from "../constants/faqData";
import './FAQ.css';

const FAQ: FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-container">
            {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                    <button className="faq-question" onClick={() => toggleFAQ(index)}>
                        {item.question}
                        <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                    </button>
                    {activeIndex === index && (
                        <div className="faq-answer">
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
}

export default FAQ;