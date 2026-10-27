import type { daPages } from "./da-pages";

export const enPages: typeof daPages = {
  info: {
    title: "Information",
    items: {
      howToBuy: "How to buy",
      warranty: "Warranty and service",
      delivery: "Delivery",
      faq: "Questions and answers",
      reviews: "Reviews",
      local: "Car dealer in Horsens",
    },
  },

  trust: {
    title: "A safe car purchase",
    items: [
      { title: "3 months' warranty", text: "The terms are in the sales agreement, so you know what applies.", path: "/garanti-og-service" },
      { title: "Finance", text: "Calculate the payment and get a firm offer.", path: "/finansiering" },
      { title: "Delivery", text: "We can arrange delivery, so you do not have to collect the car.", path: "/levering" },
    ],
  },

  areas: {
    title: "We sell cars across East Jutland",
    text: "Our showroom is in Horsens. Many of our customers come from Aarhus, Vejle, Silkeborg, Skanderborg and the rest of Central Jutland, and we can arrange delivery from elsewhere.",
    list: ["Horsens", "Aarhus", "Vejle", "Skanderborg", "Silkeborg", "Hedensted", "Odder", "Juelsminde"],
    link: "Read more about GD Biler in Horsens",
  },

  homeFaq: { title: "Frequently asked questions", more: "See all questions" },

  faq: {
    metaTitle: "Questions and answers about buying a car",
    metaDescription: "Answers to the most common questions about buying and selling a used car at GD Biler in Horsens: warranty, finance, delivery, payment and paperwork.",
    title: "Questions and answers",
    lead: "Here are answers to what we are asked most often. If something is missing, call or write to us.",
    groups: [
      {
        title: "Buying a car",
        items: [
          {
            q: "Can I test drive the car?",
            a: "Yes. Call or write to us and we will agree a time. You can also just visit the showroom during opening hours.",
          },
          {
            q: "What do I need to bring when I buy a car?",
            a: "Bring a valid driving licence or other photo ID. You must have insurance on the car before it can be registered in your name. We help you with the rest of the paperwork.",
          },
          {
            q: "How can I pay?",
            a: "You can pay in cash, by bank transfer or through finance. We agree the payment before you get the keys.",
          },
          {
            q: "Are the cars inspected?",
            a: "Yes. We inspect and prepare the cars, so they are ready to drive when you collect them. Ask us if you want to know more about a specific car.",
          },
          {
            q: "Can the car be delivered to me?",
            a: "Yes, we can arrange delivery. Write or call and we will find out what it takes, depending on where you live.",
          },
        ],
      },
      {
        title: "Warranty and complaints",
        items: [
          {
            q: "What warranty comes with the car?",
            a: "Our cars come with a 3-month warranty. The terms and scope are in the sales agreement. The warranty is in addition to your statutory rights.",
          },
          {
            q: "What is the right to complain about a defect?",
            a: "As a consumer you have, under the Danish Sale of Goods Act, a 2-year right to complain as a starting point. For used cars it can be agreed that the period is shorter, but at least 1 year. It must be stated clearly in the sales agreement.",
          },
          {
            q: "What do I do if something is wrong with the car?",
            a: "Contact us as soon as you discover the defect. Describe what is wrong and send photos if you can. Read more on the page about complaints and withdrawal.",
          },
        ],
      },
      {
        title: "Finance and trade-in",
        items: [
          {
            q: "Can I finance the car?",
            a: "Yes. Use the calculator on the Finance page and send us your calculation, and we will make a firm offer. The calculator is a guide.",
          },
          {
            q: "Can I trade in my old car?",
            a: "Yes. Fill in the form on the Sell your car page and you will get a price. We can deduct the amount from the price of the new car.",
          },
          {
            q: "Do you also buy cars with faults?",
            a: "Yes. Describe the faults in the form and we will give you a price based on the condition of the car.",
          },
        ],
      },
      {
        title: "About GD Biler",
        items: [
          {
            q: "Where is GD Biler located?",
            a: "We are at {address}. The showroom is open every day of the week. See the opening hours on the contact page.",
          },
          {
            q: "How do I contact you?",
            a: "Call {phone}, write to {email}, or use the contact form. We usually reply the same day.",
          },
        ],
      },
    ],
  },

  howToBuy: {
    metaTitle: "How to buy a used car",
    metaDescription: "See how to buy a used car from GD Biler in Horsens: from choosing a car and a test drive to payment, paperwork and handover.",
    title: "How to buy a car from us",
    lead: "From the first look to driving away. This is how it works and what to bring.",
    stepsTitle: "From car to keys",
    steps: [
      { title: "Find a car", text: "Browse our cars on the site. Use the filters to find make, price and year." },
      { title: "Contact us", text: "Write or call if you have questions about the car. You get answers on equipment, condition and history." },
      { title: "Try the car", text: "Visit the showroom and take a test drive. Bring someone you trust." },
      { title: "Agree price and payment", text: "We go through the car and the sales agreement together. You choose whether to pay in cash or finance." },
      { title: "Paperwork and insurance", text: "We help with the paperwork. You must have insurance before the car can be registered." },
      { title: "Get the keys", text: "The car is prepared and you drive away. Or we deliver it to you." },
    ],
    bring: {
      title: "What to bring",
      items: [
        "A valid driving licence or other photo ID",
        "Details of your insurance, or contact your insurer before you collect the car",
        "A means of payment or an agreement for finance",
        "Your old car and its papers, if you trade in",
      ],
    },
    after: {
      title: "After the purchase",
      text: "You have a 3-month warranty and your rights under the law. Contact us if you need help.",
    },
  },

  warranty: {
    metaTitle: "Warranty and service",
    metaDescription: "Read about the warranty on used cars at GD Biler in Horsens: 3-month warranty, your right to complain and what to do if something is wrong.",
    title: "Warranty and service",
    lead: "You should be able to trust the car. Here is what comes with it.",
    sections: [
      {
        h: "3-month warranty",
        p: [
          "Cars from GD Biler come with a 3-month warranty. The scope and terms are in the sales agreement, so you can read them before you sign.",
          "The warranty is in addition to your rights under the law. It does not remove them.",
        ],
      },
      {
        h: "Your statutory rights",
        p: [
          "As a consumer you have a right to complain under the Danish Sale of Goods Act. As a starting point it is 2 years. For used cars it can be agreed that the period is shorter, but at least 1 year, if this is stated clearly in the sales agreement.",
          "You must complain within a reasonable time after you discover the defect. As a starting point it is in time if you do so within 2 months.",
        ],
      },
      {
        h: "Inspection before sale",
        p: ["We inspect and prepare the cars before they are advertised. If a car has known faults or damage, we tell you before you buy."],
      },
      {
        h: "If something is wrong",
        p: ["Contact us by phone or email. Write what is wrong and send photos if you can. We reply as soon as possible and agree how to look at the car."],
      },
    ],
    cta: "Read more about complaints and withdrawal",
  },

  delivery: {
    metaTitle: "Car delivery",
    metaDescription: "GD Biler can deliver your car across East Jutland and beyond. See how delivery works and what to agree with us.",
    title: "Car delivery",
    lead: "Live far from Horsens? We can arrange delivery.",
    sections: [
      {
        h: "How it works",
        p: [
          "You agree the car and the price with us as usual. Then we agree the time and place of delivery. We prepare the paperwork so it is ready when the car arrives.",
          "The price of delivery depends on how far the car has to travel. Ask us and you get a price before you decide.",
        ],
      },
      {
        h: "Payment",
        p: ["We agree the payment before the car is sent."],
      },
      {
        h: "You can still visit",
        p: ["You are always welcome to see and try the car in our showroom in Horsens before you decide."],
      },
    ],
  },

  reviews: {
    metaTitle: "Reviews and customer feedback",
    metaDescription: "Read what customers say about buying a car from GD Biler in Horsens.",
    title: "What our customers say",
    lead: "Here are some of the words we have received from customers who bought a car from us.",
  },

  local: {
    metaTitle: "Used car in Horsens – car dealer GD Biler",
    metaDescription: "GD Biler is a local car dealer in Horsens with carefully selected used cars. See cars for sale, finance and opening hours at Langmarksvej 36A.",
    title: "Car dealer in Horsens",
    lead: "GD Biler sells carefully selected used cars from a showroom in Horsens.",
    sections: [
      {
        h: "Used cars in Horsens",
        p: [
          "At GD Biler you find used cars from well-known makes such as Audi, BMW and Lexus. We choose the cars with care, inspect them and prepare them so they are ready to drive.",
          "You can see all cars on our website and visit the showroom to try them.",
        ],
      },
      {
        h: "Finance and trade-in",
        p: ["We help with finance, and you can get a price on your old car. Use the calculator or the form on the finance and sell pages."],
      },
      {
        h: "Visit us",
        p: ["The showroom is at {address}. Call {phone} if you want to agree a time. We are open every day of the week; see the times below."],
      },
    ],
    cta: "View all cars",
  },

  brand: {
    metaTitle: (brand: string) => `Used ${brand} for sale in Horsens`,
    metaDescription: (brand: string, n: number) =>
      `See ${n} used ${brand} for sale at GD Biler in Horsens. Prices, year, mileage and finance.`,
    title: (brand: string) => `Used ${brand} for sale`,
    lead: (brand: string) => `Here are all the ${brand} we have in stock right now. The list is updated when we get new cars.`,
    otherBrands: "Other makes",
    intro: (brand: string) =>
      `Looking for a used ${brand}? GD Biler in Horsens inspects and prepares the cars so they are ready to drive. You can finance the car, trade in your old car and have it delivered.`,
  },

  crumbs: { cars: "Cars", brand: "Makes" },

  carExtra: {
    features: "Equipment",
    safe: "A safe purchase",
    next: "What happens next",
    nextSteps: ["Write or call if you have questions", "Visit and try the car", "Agree the purchase and payment", "Get the keys or arrange delivery"],
    share: "Share the car",
    copied: "Link copied",
    copy: "Copy link",
  },

  mobileBar: { call: "Call", write: "Write", cars: "Cars" },

  returns: {
    slug: "reklamation-og-fortrydelse",
    title: "Complaints and withdrawal",
    description: "How to complain about a defect, and when you can withdraw from a purchase at GD Biler.",
    updated: "27 October 2026",
    sections: [
      {
        h: "1. Complaints",
        p: [
          "As a consumer you have a right to complain under the Danish Sale of Goods Act. The period is as a starting point 2 years from when you receive the car. For used cars a shorter period of at least 1 year can be agreed, if it is stated clearly in the sales agreement.",
          "If the car has a defect, you can as a starting point demand that we repair it or deliver a new car. If that is not possible, you can demand a proportionate reduction in price or, in some cases, cancel the purchase.",
        ],
      },
      {
        h: "2. How to complain",
        p: [
          "You must tell us within a reasonable time after you discover the defect. It is in time if you do so within 2 months.",
          "Contact us at {phone} or {email}. Describe the defect and send photos if you can. We agree how we examine the car.",
        ],
      },
      {
        h: "3. Warranty",
        p: ["Our 3-month warranty applies in addition to your statutory rights. The terms are in the sales agreement."],
      },
      {
        h: "4. Right of withdrawal for distance purchases",
        p: [
          "If you buy the car without being physically present, for example only by phone or email, you as a consumer have as a starting point a 14-day right of withdrawal from the day you receive the car. You must give us a clear notice that you withdraw.",
          "If you buy the car by signing in our showroom, you do not automatically have a right of withdrawal. We tell you this before you buy.",
        ],
      },
      {
        h: "5. Complaints procedure",
        p: [
          "Please contact us first and we will try to solve it. You can also complain to the Danish Center for Complaint Resolution (Center for Klageløsning), Nævnenes Hus, Toldboden 2, 8800 Viborg, naevneneshus.dk.",
        ],
      },
    ],
  },

  company: {
    title: "Company details",
    text: "{company}, CVR {cvr}, {address}. Phone {phone}, email {email}.",
  },

  contactExtra: {
    helpTitle: "What we can help with",
    helpItems: [
      "Questions about a car in stock",
      "Agreeing a test drive or viewing",
      "Finance and offers",
      "A price on your old car",
      "Complaints and help after the purchase",
    ],
    replyTitle: "Reply time",
    replyText: "We usually reply the same day. If it is urgent, call us.",
  },

  sellExtra: {
    whyTitle: "Why sell to GD Biler",
    why: [
      { title: "A price with no obligation", text: "You get a price and decide for yourself whether to sell." },
      { title: "We also buy cars with faults", text: "Describe the faults and we assess the car based on its condition." },
      { title: "We handle the paperwork", text: "You avoid ads and viewings with strangers." },
      { title: "Trade in for a new car", text: "You can deduct the value from the price of one of our cars." },
    ],
    faqTitle: "Questions about selling",
    faq: [
      { q: "What is my car worth?", a: "It depends on make, model, year, mileage and condition. Send us the details and we will give you a price." },
      { q: "Do I need to bring the car?", a: "Yes, we want to see the car before we give a final price. We agree a time that suits you." },
      { q: "What if I have a car loan?", a: "We can usually handle that. Tell us in the form and we will help you pay off the loan as part of the deal." },
    ],
  },

  financeExtra: {
    howTitle: "How it works",
    how: [
      { title: "Calculate", text: "Choose price, down payment and term, and see the payment." },
      { title: "Send", text: "Send your calculation and contact details to us." },
      { title: "Get an offer", text: "We come back with a firm offer that you can accept or decline." },
    ],
  },

  aboutExtra: {
    principlesTitle: "Our principles",
    principles: [
      { title: "Honesty", text: "We tell you what we know about the car, including what is not perfect." },
      { title: "Inspection", text: "We inspect and prepare the cars before they are advertised." },
      { title: "Simplicity", text: "You get a clear price and a sales agreement you can understand." },
      { title: "Service", text: "You can call us, also after the purchase." },
    ],
    factsTitle: "Facts about GD Biler",
    facts: { name: "Name", cvr: "CVR", address: "Address", hours: "Open" },
    openEveryDay: "Every day",
  },
};
