import React from "react";

const SubscriptionPlans: React.FC = () => {
  const plans = [
    {
      name: "STARTER",
      features: [
        "Email support",
        "Basic analytics",
        "100 messages/day",
        "1 user account",
      ],
      price: "$49",
      action: "START FREE",
      highlight: false,
    },
    {
      name: "GROWTH",
      features: [
        "Priority support",
        "Advanced analytics",
        "Unlimited messages",
        "Up to 10 user accounts",
      ],
      price: "$129",
      discount: "-15%",
      action: "UPGRADE NOW",
      highlight: true,
    },
    {
      name: "BUSINESS",
      features: [
        "Dedicated support",
        "Custom integrations",
        "Unlimited everything",
        "Unlimited user accounts",
      ],
      price: "Custom",
      action: "CONTACT SALES",
      highlight: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">PRICING PLANS</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg shadow-md p-6 flex flex-col ${
              plan.highlight ? "border-2 border-blue-500" : ""
            }`}
          >
            <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
            <ul className="mb-6 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">
                {plan.price}
                {plan.discount && (
                  <span className="text-sm font-normal text-red-500 ml-2">
                    {plan.discount}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 mb-4">per month</p>
              <button
                className={`px-4 py-2 rounded-full font-bold ${
                  plan.highlight
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {plan.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
