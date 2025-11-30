'use client';

import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is MenuFight?",
            answer: "MenuFight is a data-driven platform that helps restaurants validate menu changes before investing in ingredients. Create 1-vs-1 polls to let your customers vote on new menu items, seasonal specials, or recipe variations."
        },
        {
            question: "How does the voting system work?",
            answer: "You create a battle between two menu items with photos and descriptions. Share the unique link with your customers via social media, email, or QR codes. Customers vote for their favorite, and you get real-time results showing percentages, demographic insights, and total votes."
        },
        {
            question: "How long does a battle last?",
            answer: "You decide! When creating a battle, you can set the duration from 1 hour to 30 days. Most restaurants run battles for 24-72 hours to gather enough votes while maintaining momentum."
        },
        {
            question: "Can I customize my poll?",
            answer: "Yes! You can upload custom images for each menu item, write compelling descriptions, set your own battle duration, and customize the poll title. Your restaurant branding and information are displayed on the results page."
        },
        {
            question: "How do I share my battle?",
            answer: "Each battle gets a unique shareable link. You can share it on social media (Instagram, Facebook, Twitter), send it via email to your customer list, display a QR code in your restaurant, or embed it on your website."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Everything you need to know about MenuFight
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-brand-yellow/30 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold text-brand-black text-lg pr-8">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-brand-yellow shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Beautiful Closing Section */}
                <div className="mt-24 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-brand-yellow/10 font-serif font-bold z-0">"</div>
                    <p className="text-3xl md:text-5xl font-bold text-brand-black max-w-3xl mx-auto relative z-10 tracking-tight">
                        Validate your menu. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-black">Grow your business.</span>
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6 font-medium">
                        Still have questions? We're here to help!
                    </p>
                    <a
                        href="mailto:support@menufight.com"
                        className="inline-block bg-brand-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Contact Support
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQ;