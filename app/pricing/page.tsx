"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Circle, Rocket, Zap } from "lucide-react";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// ================== PRICING TYPES & COMPONENTS ==================

interface PricingFeature {
  text: string;
  disabled?: boolean;
  tooltip?: React.ReactNode;
}

interface PricingPlan {
  name: string;
  description: string;
  icon: React.ReactNode;
  ctaLink?: string;

  // We'll directly store the main price text and subtext for each plan.
  priceHeading: React.ReactNode;
  priceSubtext: string;

  isPopular?: boolean;
  features: PricingFeature[];
}

interface PricingCardProps {
  plan: PricingPlan;
}

// A small component to display each feature row.
// If there's a tooltip, we handle open/close with React state
function FeatureItem({ feature }: { feature: PricingFeature }) {
  const { text, disabled, tooltip } = feature;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Checkmark or X */}
      {disabled ? (
        <div className="h-5 w-5 flex-shrink-0 text-red-500">✕</div>
      ) : (
        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
      )}

      {/* Text + optional "?" tooltip */}
      <div className="inline-flex items-center text-sm whitespace-nowrap relative">
        <span className={disabled ? "text-gray-400" : "text-gray-700"}>{text}</span>

        {tooltip && (
          <div
            className="ml-1 relative text-[10px] text-gray-600 font-medium cursor-help hover:text-gray-800"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            ?
            {isOpen && (
              <div
                className="
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  mb-2 min-w-[18rem] max-w-xl p-3 rounded-md shadow-xl border border-gray-200
                  bg-white text-gray-700 text-xs z-[9999]
                  whitespace-normal break-words text-left leading-snug
                "
              >
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-white" />
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PricingCard({ plan }: PricingCardProps) {
  const { isPopular } = plan;

  return (
    <div
      className={`
        relative bg-white rounded-lg
        ${isPopular
          ? "border-[3px] border-green-500 shadow-lg -mt-2"
          : "border border-gray-200"
        }
        overflow-visible
      `}
    >
      {isPopular && (
        <div className="absolute right-0 top-0">
          <div className="bg-green-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div
            className={`flex items-center justify-center ${
              isPopular ? "text-green-500" : "text-gray-700"
            }`}
          >
            {plan.icon}
          </div>
        </div>

        {/* Plan Title & Description */}
        <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm text-center mb-6">{plan.description}</p>

        {/* Price Display */}
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold leading-none">{plan.priceHeading}</div>
          <p className="text-gray-500 text-sm mt-1">{plan.priceSubtext}</p>
        </div>

        {/* CTA Button */}
        <Link
          href={plan.ctaLink || "#"}
          className="block w-full py-3 px-4 rounded font-bold text-center bg-green-500 text-white hover:bg-green-600 mb-6"
        >
          Start Free
        </Link>

        {/* Feature List */}
        <div className="space-y-3">
          {plan.features.map((feature, i) => (
            <FeatureItem key={i} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ================== FAQ CONTENT ==================
const PRICING_FAQ_ITEMS = [
  {
    question: "Will SpeakerDrive really work for me?",
    answer: "Absolutely. SpeakerDrive works because it transforms prospecting from a guessing game into a systematic process. We've used this exact approach to book countless engagements, including 4 and 5-figure gigs and keynote presentations at Fortune 500 companies. The platform isn't magic – it's a proven system that puts you in front of the right people with the right messaging. But here's the key: Members who commit to consistent daily outreach typically see their first responses within a week and are well on their way to booking their first engagement within 30-60 days.\n\nSuccess comes down to one simple shift: treating prospecting like any other professional habit. Just as you prepare for speeches or update your content regularly, SpeakerDrive makes outreach a predictable part of your business routine. As your pipeline grows, opportunities compound – today's connection becomes tomorrow's keynote, next quarter's workshop series, and referrals to their entire network. Show up consistently, and watch your calendar transform."
  },
   {
    question: "Is SpeakerDrive in Beta?",
    answer:
      "Yes, SpeakerDrive is currently in beta. Early adopters lock in our special introductory rates which will increase after official launch. Beta users also help shape our roadmap, receive priority support, and get access to new features as they're released."
  },
  {
    question: "What is a Lead Cool-Off Period?",
    answer:
      "We've built in an automatic rest period for contacts, temporarily removing them from the SpeakerDrive pool to prevent over-exposure to outreach attempts. This protects both the recipients' experience and ensures your messages maintain their impact and effectiveness."
  },
  {
    question: "How does the Refund Credit For Invalid Info work?",
    answer:
      'If you discover a lead has invalid contact information or substantially inaccurate data, simply rate it as "Poor" with the specific reason. We\'ll automatically refund your credit. Subject to our fair use policy to prevent abuse while maintaining data quality for all users.'
  },
  {
    question: "What is First-Access To Newest Leads?",
    answer:
      "These are newly added opportunities to the SpeakerDrive database. This feature is designed to give premium users exclusive access to the freshest opportunities for a short period of time."
  },
  {
    question: "What integrations do you offer?",
    answer:
      "SpeakerDrive provides webhook functionality that allows you to push leads to most CRMs, email tools or marketing automation platforms. If you have specific integration questions, please reach out to our support team."
  }
];

// ================== PAGE COMPONENT ==================

export default function PricingPage() {
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "Try it risk free",
      icon: <Circle className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      priceHeading: "7 Days Free",
      priceSubtext: "No credit card required",
      features: [
        { text: "5 Unlocks" },
        { text: "Connect To Gmail" },
        {
          text: "Lead Cool-Off",
          tooltip:
            "Temporarily removes unlocked contacts to prevent recipient fatigue and maintain message impact."
        },
        {
          text: "Refund Credit For Invalid Info",
          tooltip:
            "Ability to rate leads as invalid or inaccurate to receive automatic credit refund. Subject to fair use policy."
        },
        {
          text: "First-Access To Newest Leads ",
          disabled: true,
          tooltip: "Immediate access to the freshest leads as they are added into SpeakerDrive"
        },
        {
          text: "Integrations / CRM Export",
          disabled: true,
          tooltip:
            "Automatically push leads to your existing tools via webhooks. Connect seamlessly with CRMs, email platforms and more"
        },
        {
          text: "Integrations Setup 1:1 Session",
          disabled: true,
          tooltip:
            "Live one-on-one session to walk through connecting SpeakerDrive to your tools"
        }
      ]
    },
    {
      name: "Starter",
      description: "Limited Time Beta Pricing",
      icon: <Rocket className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      priceHeading: (
        <>
          $99/m <span className="text-lg text-gray-400 line-through ml-1">$149/m</span>
        </>
      ),
      priceSubtext: "Cancel / upgrade anytime",
      isPopular: true,
      features: [
        { text: "200 Unlocked Leads / mth" },
        { text: "Connect To Gmail" },
        {
          text: "Lead Cool-Off",
          tooltip:
            "Temporarily removes unlocked contacts to prevent recipient fatigue and maintain message impact."
        },
        {
          text: "Refund Credit For Invalid Info",
          tooltip:
            "Ability to rate leads as invalid or inaccurate to receive automatic credit refund. Subject to fair use policy."
        },
        {
          text: "First-Access To Newest Leads ",
          disabled: true,
          tooltip: "Immediate access to the freshest leads as they are added into SpeakerDrive"
        },
        {
          text: "Integrations / CRM Export",
          disabled: true,
          tooltip:
            "Automatically push leads to your existing tools via webhooks. Connect seamlessly with CRMs, email platforms and more"
        },
        {
          text: "Integrations Setup 1:1 Session",
          disabled: true,
          tooltip:
            "Live one-on-one session to walk through connecting SpeakerDrive to your tools"
        }
      ]
    },
    {
      name: "Premium",
      description: "Limited Time Beta Pricing",
      icon: <Zap className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      priceHeading: (
        <>
          $249/m <span className="text-lg text-gray-400 line-through ml-1">$399/m</span>
        </>
      ),
      priceSubtext: "Cancel / upgrade anytime",
      features: [
        { text: "750 Unlocked Leads / mth" },
        { text: "Connect To Gmail" },
        {
          text: "Lead Cool-Off",
          tooltip:
            "Temporarily removes unlocked contacts to prevent recipient fatigue and maintain message impact."
        },
        {
          text: "Refund Credit For Invalid Info",
          tooltip:
            "Ability to rate leads as invalid or inaccurate to receive automatic credit refund. Subject to fair use policy."
        },
        {
          text: "First-Access To Newest Leads ",
          tooltip: "Immediate access to the freshest leads as they are added into SpeakerDrive"
        },
        {
          text: "Integrations / CRM Export",
          tooltip:
            "Automatically push leads to your existing tools via webhooks. Connect seamlessly with CRMs, email platforms and more"
        },
        {
          text: "Integrations Setup 1:1 Session",
          tooltip:
            "Live one-on-one session to walk through connecting SpeakerDrive to your tools"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        {/* Header */}
        <HeaderFinal
          companyName="SpeakerDrive"
          logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        />

        <main className="pt-16">
          {/* Heading + small container for hero text */}
          <section className="py-8 md:py-12 text-center">
            <div className="mx-auto max-w-3xl px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-md md:text-lg text-gray-600 mb-8">
                Choose a plan that fits your needs.
                You don&apos;t even need a credit card.
              </p>
            </div>

            {/* Pricing cards in a wider container */}
            <div className="mx-auto max-w-5xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <PricingCard key={index} plan={plan} />
                ))}
              </div>

              <p className="text-sm text-gray-700 mt-6">
                SpeakerDrive is currently in beta – early adopters lock in our best rates before prices increase.
              </p>
              <div className="mt-6">
                <p className="text-gray-500 text-sm">
                  Agency, Company Or Referral Partner?{" "}
                  <a
                    href="https://www.speakerdrive.com/contact"
                    className="text-brand-blue font-medium"
                  >
                    Let&apos;s Talk
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-white pt-12 pb-8 overflow-hidden">
            <div className="max-w-xl mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-blue-100/30 to-blue-50/20 blur-3xl -z-10 opacity-70"></div>
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    Common questions about using SpeakerDrive
                  </p>
                </div>
              </div>

              {/* Accordion */}
              <div className="w-full">
                <Accordion type="single" className="space-y-3">
                  {PRICING_FAQ_ITEMS.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
                    >
                      <AccordionTrigger className="w-full">
                        <div className="flex items-center justify-between w-full text-left">
                          <div className="flex items-center gap-3 px-5 py-4 w-full hover:bg-gray-50/80 transition-colors">
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-6">
                                {item.question}
                              </span>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <svg
                                  className="w-4 h-4 text-gray-500 transform transition-transform group-data-[state=open]:rotate-180"
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent rounded-lg blur-md opacity-0 group-data-[state=open]:opacity-100 transition-opacity"></div>
                          <p className="relative text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                            {item.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <p className="text-lg text-gray-700 mb-8">
                  Still have questions? We&apos;re here to help.
                </p>
                <a
                  href="https://speakerdrive.com/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-base font-medium gap-2 shadow-sm hover:shadow"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer5 />
      </div>
    </div>
  );
}