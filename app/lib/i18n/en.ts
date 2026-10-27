import type { Dict } from "./index";
import { enPages } from "./en-pages";

export const en: Dict = {
  ...enPages,
  siteName: "GD Biler",
  htmlLang: "en",
  skipToContent: "Skip to content",

  nav: {
    cars: "Cars",
    finance: "Finance",
    sell: "Sell your car",
    about: "About us",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    language: "Dansk",
  },

  common: {
    call: "Call us",
    seeCars: "View cars",
    seeAllCars: "View all cars",
    seeCar: "View car",
    contactUs: "Contact us",
    home: "Home",
    price: "Price",
    km: "km",
    hp: "hp",
    closed: "Closed",
    optional: "optional",
    required: "required",
    openHours: "Opening hours",
    address: "Address",
    phone: "Phone",
    email: "Email",
    page: "Page",
    previous: "Previous",
    next: "Next",
  },

  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

  fuel: { Benzin: "Petrol", Diesel: "Diesel", Hybrid: "Hybrid", El: "Electric" },
  gearbox: { Manuel: "Manual", Automatisk: "Automatic" },
  body: {
    Sedan: "Saloon",
    SUV: "SUV",
    Stationcar: "Estate",
    Coupe: "Coupé",
    Hatchback: "Hatchback",
    Cabriolet: "Convertible",
    Van: "Van",
  },
  status: { available: "For sale", reserved: "Reserved", sold: "Sold" },

  home: {
    metaTitle: "Used cars in Horsens",
    search: {
      brand: "Make",
      body: "Type",
      price: "Max. price",
      allBrands: "All makes",
      allTypes: "All types",
      anyPrice: "Any price",
      button: "Search cars",
    },
    book: "Book a visit",
    featured: { title: "A selection from our showroom", empty: "We have no cars in stock right now. Call us and we will help you." },
    why: {
      title: "Peace of mind, quality and service",
      items: [
        {
          title: "Checked used cars",
          text: "Every car is thoroughly inspected, so you get a reliable car without nasty surprises.",
        },
        {
          title: "Honest prices",
          text: "We sell at fair, transparent prices – with no hidden fees or extra costs.",
        },
        {
          title: "Ready to drive",
          text: "The cars are prepared and serviced, so you can get in and drive away right away.",
        },
      ],
    },
    about: { title: "Quality cars in Horsens", more: "Read more about us" },
    stats: [
      { value: "100+", label: "Cars sold" },
      { value: "98%", label: "Satisfied customers" },
      { value: "3 mo.", label: "Warranty" },
      { value: "3+ yrs", label: "in the business" },
    ],
    process: {
      title: "How to buy",
      steps: [
        { title: "Find your car", text: "Browse our selection of carefully chosen used cars." },
        { title: "Book a test drive", text: "Visit our showroom in Horsens and try the car on the road." },
        { title: "Agree the deal", text: "We go through the car together and make the deal simple and safe." },
        { title: "Get the keys", text: "We prepare and deliver the car, so you can drive off quickly." },
      ],
    },
    services: {
      title: "More than cars",
      items: [
        { title: "Finance", text: "Calculate your monthly payment and get an offer from us.", cta: "Calculate payment", path: "/finansiering" },
        { title: "Sell your car", text: "Get a price on your car with no obligation. We also buy cars with faults.", cta: "Get a price", path: "/saelg-din-bil" },
      ],
    },
    reviews: { title: "What our customers say", rating: "4.9 / 5", count: "50+ reviews" },
    contact: { title: "Visit the showroom", text: "We are open every day. You are also welcome to call first." },
  },

  cars: {
    metaTitle: "Used cars for sale",
    metaDescription: "Browse all used cars for sale at GD Biler in Horsens. Filter by make, fuel, price and year.",
    title: "Cars for sale",
    intro: "Used cars from GD Biler in Horsens. Every car is inspected and prepared, and you can finance them, have them delivered or trade in your old car.",
    count: (n: number) => (n === 1 ? "1 car" : `${n} cars`),
    filters: {
      search: "Search",
      searchPlaceholder: "Make or model",
      brand: "Make",
      fuel: "Fuel",
      body: "Type",
      gearbox: "Gearbox",
      maxPrice: "Max. price",
      minYear: "From year",
      maxKm: "Max. km",
      sort: "Sort",
      all: "All",
      any: "Any",
      apply: "Show cars",
      reset: "Reset",
      show: "Filters",
    },
    sorts: {
      new: "Newest first",
      "price-asc": "Price: low to high",
      "price-desc": "Price: high to low",
      "year-desc": "Year: newest first",
      "km-asc": "Mileage: lowest first",
    },
    empty: "No cars match your search.",
    emptyHint: "Try removing a filter, or call us – we can often find a car for you.",
    noStock: "We have no cars in stock right now. Call us and we will help you.",
  },

  car: {
    back: "All cars",
    specs: "Specifications",
    year: "Year",
    km: "Mileage",
    fuel: "Fuel",
    gearbox: "Gearbox",
    body: "Type",
    color: "Colour",
    hp: "Power",
    description: "Description",
    noDescription: "Call or write to us if you want to know more about the car.",
    interested: "Interested in this car?",
    interestedText: "Write to us and we will get back to you as soon as possible. You can also call or visit and try the car.",
    messagePlaceholder: (title: string) => `Hello, I am interested in ${title}. Can you contact me?`,
    financing: "Calculate finance",
    soldTitle: "This car has been sold",
    soldText: "Have a look at our other cars, or write to us if you are looking for something similar.",
    reservedTitle: "This car is reserved",
    reservedText: "Write to us if you want to be first in line.",
    similar: "Similar cars",
    gallery: { image: "Image", of: "of", prev: "Previous image", next: "Next image" },
  },

  contact: {
    metaTitle: "Contact",
    metaDescription: "Contact GD Biler in Horsens. Call, write or visit the showroom at Langmarksvej 36A.",
    title: "Contact us",
    lead: "Call, write or drop by. We usually reply the same day.",
    form: "Send us a message",
    findUs: "Find us",
  },

  map: {
    title: "Map of GD Biler",
    consent: "The map is from Google Maps. When you show it, your browser sends data to Google.",
    show: "Show map",
    open: "Open in Google Maps",
  },

  sell: {
    metaTitle: "Sell your car",
    metaDescription: "Sell your car to GD Biler in Horsens. Get a price with no obligation – we also buy cars with faults.",
    title: "Sell your car to us",
    lead: "Tell us about your car and we will come back with a price. It is free and with no obligation.",
    steps: {
      title: "How it works",
      items: [
        { title: "Send details", text: "Fill in the form with make, model, year and mileage." },
        { title: "Get a price", text: "We call or write to you, usually within one working day." },
        { title: "Visit us", text: "We look at the car together and you get an answer on the spot." },
        { title: "Get paid", text: "We handle the paperwork. You are paid when the deal is done." },
      ],
    },
    form: "Details about your car",
    fields: {
      brand: "Make",
      model: "Model",
      year: "Year",
      km: "Mileage",
      price: "Your asking price",
      pricePlaceholder: "Optional",
    },
    messageLabel: "Anything we should know about the car?",
    messagePlaceholder: "E.g. condition, service history, damage or equipment",
  },

  finance: {
    metaTitle: "Finance",
    metaDescription: "Calculate the monthly payment on your car and get a finance offer from GD Biler in Horsens.",
    title: "Finance",
    lead: "Calculate what the car costs per month. The result is a guide – we make a firm offer once you have chosen a car.",
    calc: {
      title: "Calculate your payment",
      price: "Car price",
      down: "Down payment",
      months: "Term",
      monthsUnit: "mo.",
      rate: "Interest per year",
      monthly: "Monthly payment",
      financed: "Loan amount",
      interest: "Total interest",
      total: "Total repayment",
      disclaimer:
        "The calculation is an example with a fixed rate and no fees. The actual rate and payment depend on your situation and are set in the final offer.",
    },
    form: "Get an offer",
    formText: "Send us your calculation and we will come back with a firm offer.",
    messagePlaceholder: "Please tell us which car you are interested in.",
    faq: {
      title: "Questions and answers",
      items: [
        {
          q: "What do I need to get an offer?",
          a: "Send us your contact details and an idea of the car, down payment and term. We will then come back with the next step.",
        },
        {
          q: "Can I pay off the car early?",
          a: "It depends on the agreement. We go through the terms with you before you sign.",
        },
        {
          q: "Can you take my current car?",
          a: "Yes, you can trade in your old car. Use the Sell your car page to get a price.",
        },
      ],
    },
  },

  about: {
    metaTitle: "About us",
    metaDescription: "GD Biler is a local car dealer in Horsens with carefully selected used cars, honest advice and a simple buying process.",
    title: "About GD Biler",
    lead: "A local car dealer in Horsens, focused on peace of mind.",
    values: { title: "What we care about" },
    cta: { title: "Want to see the cars?", text: "Visit the showroom or browse the selection on this site." },
  },

  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    consent: "I accept that GD Biler stores my details so it can reply to me.",
    consentLink: "Read the privacy policy",
    submit: "Send",
    sending: "Sending…",
    successTitle: "Thank you for your enquiry",
    successText: "We have received your message and will get back to you as soon as possible.",
    sendAnother: "Send another message",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "The phone number does not look right.",
      message: "Please write a message of at least 10 characters.",
      consent: "You must accept that we store your details.",
      date: "Choose a date today or later (within the next 4 months).",
      tooMany: "You have sent many messages. Please wait a moment and try again.",
      generic: "Something went wrong. Please try again, or call us.",
      fields: "Please fill in the fields marked with *.",
    },
  },

  footer: {
    about: "Car dealer in Horsens focused on quality, finance and service.",
    menu: "Menu",
    contact: "Contact",
    hours: "Opening hours",
    rights: "All rights reserved.",
    cvr: "CVR",
    legal: { returns: "Complaints", terms: "Terms of sale", privacy: "Privacy policy", cookies: "Cookies" },
  },


  legal: {
    updated: "Last updated",
    terms: {
      slug: "handelsbetingelser",
      title: "Terms of sale",
      description: "Terms of sale for used cars at GD Biler.",
      updated: "27 October 2026",
      sections: [
        {
          h: "1. General",
          p: [
            "These terms apply to the purchase of cars from {company}, CVR {cvr}, {address}.",
            "Cars on the website are advertised subject to errors and to the car possibly being sold. An advertisement is not a binding offer.",
          ],
        },
        {
          h: "2. Price and payment",
          p: [
            "The price is the price stated in the sales agreement. Prices, equipment and mileage on the website are a guide until the sales agreement is signed.",
            "Payment is made as agreed: cash, bank transfer or finance.",
          ],
        },
        {
          h: "3. Delivery",
          p: ["The car is delivered prepared on the agreed date. Change of ownership and registration are agreed in the sales agreement."],
        },
        {
          h: "4. Defects and complaints",
          p: [
            "If you buy as a consumer, the Danish Sale of Goods Act applies to defects and complaints. You must tell us within a reasonable time after you discover a defect.",
            "Any warranty and its scope are stated in the sales agreement. The warranty does not limit your statutory rights as a consumer.",
          ],
        },
        {
          h: "5. Right of withdrawal",
          p: [
            "If you buy a car by signing in our showroom, there is no automatic right of withdrawal. If the agreement is made at a distance, you will be told about your rights before you buy.",
          ],
        },
        {
          h: "6. Complaints",
          p: [
            "Please contact us first if you are dissatisfied, and we will try to solve it. You can also complain to the Danish Center for Complaint Resolution (Center for Klageløsning), Nævnenes Hus, Toldboden 2, 8800 Viborg, or via naevneneshus.dk.",
          ],
        },
        {
          h: "7. Reservation and trade-in",
          p: [
            "You can agree to reserve a car. The terms of the reservation, such as the deadline and any deposit, are agreed in writing.",
            "If you trade in a car, we value it based on its condition. The final price is agreed once we have seen the car, and it is written into the sales agreement.",
          ],
        },
        {
          h: "8. Company details",
          p: ["{company}, CVR {cvr}, {address}. Phone {phone}, email {email}."],
        },
        {
          h: "9. Governing law",
          p: ["Danish law applies to the agreement."],
        },
      ],
    },
    privacy: {
      slug: "privatlivspolitik",
      title: "Privacy policy",
      description: "How GD Biler processes your personal data.",
      updated: "27 October 2026",
      sections: [
        {
          h: "1. Data controller",
          p: ["{company}, CVR {cvr}, {address}. You can reach us at {email} or {phone}."],
        },
        {
          h: "2. What we process",
          p: [
            "When you use a form on the website, we store what you write: name, email, phone number and your message. If you use the form for selling a car or for finance, we also store the details about the car or the calculation that you enter.",
          ],
        },
        {
          h: "3. Purpose and legal basis",
          p: [
            "We use the details to answer your enquiry and follow up on it. The basis is your consent (GDPR art. 6(1)(a)) and, if the enquiry is about a purchase or sale, our need to prepare an agreement with you (art. 6(1)(b)).",
          ],
        },
        {
          h: "4. How long we keep the data",
          p: ["We delete your enquiry when it is closed, and no later than 12 months after we received it. Details in a sales agreement are kept for as long as the law requires."],
        },
        {
          h: "5. Who we share data with",
          p: [
            "We do not sell your data. We use a provider to run and host the website. The provider only processes the data on our instructions.",
            "If you show the map on the contact page, your browser loads content from Google Maps and Google receives information about your visit. The map is only shown when you click it.",
          ],
        },
        {
          h: "6. Server logs and security",
          p: [
            "Our hosting provider may temporarily store technical information such as IP address and time in server logs, so we can secure and troubleshoot the website. We do not use them to follow you across pages.",
            "We protect the data with access control, and only staff who handle enquiries have access. The website uses an encrypted connection (HTTPS).",
          ],
        },
        {
          h: "7. Your rights",
          p: [
            "You can ask for access to, correction of or deletion of your data, and you can withdraw your consent at any time. You can also object and ask for your data to be handed over. Contact us at {email}.",
            "If you are unhappy with how we process your data, you can complain to the Danish Data Protection Agency (Datatilsynet), Carl Jacobsens Vej 35, 2500 Valby, datatilsynet.dk.",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookies",
      description: "Which cookies GD Biler uses.",
      updated: "27 October 2026",
      sections: [
        {
          h: "We do not track you",
          p: [
            "The website does not set any cookies for statistics, marketing or tracking visitors. That is why there is no cookie banner.",
          ],
        },
        {
          h: "Necessary cookies",
          p: ["When staff log in to the administration, we set a cookie so the system remembers they are logged in. It is only used for login and is removed when they log out."],
        },
        {
          h: "Google Maps",
          p: [
            "The map on the contact page is from Google. It is only loaded when you click Show map. Google may set its own cookies once the map is shown. Read more in Google's privacy policy.",
          ],
        },
      ],
    },
  },
};
