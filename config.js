// ============================================================================
// WEDDING WEBSITE CONFIG
// Edit everything in this file — names, dates, links, text — without touching
// the components. Save, refresh, done.
// ============================================================================

window.WEDDING_CONFIG = {
  // --------------------------------------------------------------------------
  // The Basics
  // --------------------------------------------------------------------------
  couple: {
    one: "[NAME 1]",
    two: "[NAME 2]",
    hashtag: "#TheirHappilyEverAfter",
  },

  // ISO date/time of the wedding (used for countdown).
  // Format: YYYY-MM-DDTHH:MM:SS
  weddingDate: "2026-09-19T16:00:00",
  weddingDateDisplay: "September 19, 2026",

  venue: {
    name: "[VENUE NAME]",
    cityState: "[CITY, STATE]",
  },

  // --------------------------------------------------------------------------
  // Navigation
  // --------------------------------------------------------------------------
  nav: [
    { id: "story", label: "Our Story" },
    { id: "details", label: "Details" },
    { id: "party", label: "Wedding Party" },
    { id: "rsvp", label: "RSVP" },
    { id: "registry", label: "Registry" },
    { id: "travel", label: "Travel" },
    { id: "faq", label: "FAQ" },
  ],

  // --------------------------------------------------------------------------
  // Hero
  // --------------------------------------------------------------------------
  hero: {
    intro: "We're getting married",
    tagline: "Come celebrate with us under the open sky.",
  },

  // --------------------------------------------------------------------------
  // Our Story — timeline milestones
  // --------------------------------------------------------------------------
  story: {
    heading: "Our Story",
    subheading: "A few of the moments that got us here.",
    milestones: [
      {
        date: "Spring 2019",
        title: "How We Met",
        body: "A rainy Tuesday, a crowded coffee shop, and exactly one open seat. The rest, as they say, is history.",
      },
      {
        date: "Summer 2019",
        title: "First Date",
        body: "Mini golf, terrible pizza, and a four-hour conversation that neither of us wanted to end.",
      },
      {
        date: "Fall 2021",
        title: "Moving In",
        body: "Two apartments became one (and somehow, three houseplants became seventeen).",
      },
      {
        date: "Winter 2024",
        title: "The Proposal",
        body: "A sunset hike, a hidden ring box, and a very enthusiastic 'YES' — scared a nearby deer, honestly.",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Event Details
  // --------------------------------------------------------------------------
  details: {
    heading: "The Details",
    subheading: "Here's everything you need to know for the big day.",
    ceremony: {
      title: "Ceremony",
      time: "4:00 PM",
      location: "[VENUE NAME] — Garden Lawn",
      address: "123 Example Lane, [CITY, STATE]",
    },
    reception: {
      title: "Reception",
      time: "6:00 PM – 11:00 PM",
      location: "[VENUE NAME] — Main Hall",
      address: "123 Example Lane, [CITY, STATE]",
    },
    // Used for the "Get Directions" button and embed
    mapsQuery: "123 Example Lane",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=Central+Park+New+York&output=embed",
    dressCode: {
      title: "Dress Code",
      body: "Garden formal. Bring your softest pastels and your comfiest shoes — we'll be on grass for part of the night.",
    },
  },

  // --------------------------------------------------------------------------
  // Wedding Party
  // --------------------------------------------------------------------------
  party: {
    heading: "The Wedding Party",
    subheading: "The people who make us us.",
    members: [
      {
        name: "Jamie Rivers",
        role: "Maid of Honor",
        bio: "Best friend since the sandbox. Known for spontaneous karaoke and excellent snack curation.",
        photo: "",
      },
      {
        name: "Sam Oak",
        role: "Best Man",
        bio: "College roommate, fellow trail runner, and the only person who can beat the groom at chess.",
        photo: "",
      },
      {
        name: "Riley Bloom",
        role: "Bridesmaid",
        bio: "Sister, sounding board, and the reason we eat dessert first.",
        photo: "",
      },
      {
        name: "Alex Fern",
        role: "Groomsman",
        bio: "Brother from another mother. Will absolutely crash the dance floor first.",
        photo: "",
      },
      {
        name: "Morgan Wren",
        role: "Bridesmaid",
        bio: "The friend who plans every trip and remembers every birthday. A true gem.",
        photo: "",
      },
      {
        name: "Casey Thorne",
        role: "Groomsman",
        bio: "Childhood neighbor turned lifelong sidekick. Tell him a pun; he'll love it.",
        photo: "",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // RSVP
  // --------------------------------------------------------------------------
  rsvp: {
    heading: "RSVP",
    subheading: "Kindly respond by August 15, 2026.",
    // Option A (recommended): Formspree
    //   1. Create a form at https://formspree.io
    //   2. Paste your endpoint URL below
    formspreeEndpoint: "https://formspree.io/f/your-form-id",
    // Option B: Google Sheets via Apps Script Web App
    //   1. Create a Google Sheet + Apps Script doPost() handler
    //   2. Deploy as a Web App and paste the /exec URL below
    //   If both are set, googleSheetsEndpoint takes priority.
    googleSheetsEndpoint: "",
  },

  // --------------------------------------------------------------------------
  // Registry
  // --------------------------------------------------------------------------
  registry: {
    heading: "Registry",
    subheading:
      "Your presence is the only present we need — but if you'd like to send a little something, here are a few places we're registered.",
    stores: [
      {
        name: "Zola",
        icon: "🎁",
        url: "https://www.zola.com",
        blurb: "The main event — everything in one place.",
      },
      {
        name: "Crate & Barrel",
        icon: "🍽️",
        url: "https://www.crateandbarrel.com/gift-registry",
        blurb: "For the kitchen we're building together.",
      },
      {
        name: "Amazon",
        icon: "📦",
        url: "https://www.amazon.com/wedding",
        blurb: "Everyday essentials and the small stuff.",
      },
      {
        name: "Honeymoon Fund",
        icon: "✈️",
        url: "https://www.honeyfund.com",
        blurb: "Help us toast to forever from a faraway beach.",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Travel & Accommodations
  // --------------------------------------------------------------------------
  travel: {
    heading: "Travel & Stay",
    subheading: "Making the trip? Here's how to make it easy.",
    hotels: [
      {
        name: "The Garden Inn",
        details: "Room block available under '[NAME 1] & [NAME 2] Wedding'",
        price: "From $179/night",
        url: "#",
      },
      {
        name: "Rosemont Boutique Hotel",
        details: "A short 10-minute drive from the venue.",
        price: "From $229/night",
        url: "#",
      },
    ],
    directions: {
      airport: "Nearest airport: [AIRPORT CODE], about 25 minutes by car.",
      driving:
        "Free parking is available on-site. GPS will get you to the front gate — look for the white signs along the driveway.",
    },
    thingsToDo: [
      "Wander the historic downtown district and its farmers' market.",
      "Hike the nearby riverside trail (easy, ~2 miles).",
      "Grab coffee at Little Finch Café, our absolute favorite.",
      "Tour the local winery — tastings every afternoon.",
    ],
  },

  // --------------------------------------------------------------------------
  // FAQ
  // --------------------------------------------------------------------------
  faq: {
    heading: "Frequently Asked",
    subheading: "Answers to the things everyone's wondering.",
    items: [
      {
        q: "What's the dress code?",
        a: "Garden formal! Think florals, linen, soft colors, and shoes you can dance in. We'll be partly outdoors on grass.",
      },
      {
        q: "Can I bring a plus-one?",
        a: "Because of venue limits, we're only able to accommodate the guests named on your invitation. Thank you for understanding!",
      },
      {
        q: "Are kids welcome?",
        a: "We love your little ones, but this will be a mostly adults-only celebration. Immediate family children are of course welcome.",
      },
      {
        q: "Where should I park?",
        a: "There's free on-site parking right next to the venue. Arrive 20–30 minutes before the ceremony to settle in.",
      },
      {
        q: "Will the ceremony be outside?",
        a: "Yes — weather permitting. We have a beautiful covered backup plan if the clouds don't cooperate.",
      },
      {
        q: "Do you have a registry?",
        a: "We do! Scroll up to the Registry section for all the links. Honestly though, just showing up is the best gift.",
      },
      {
        q: "What time should I arrive?",
        a: "Please plan to be seated by 3:45 PM so we can start the ceremony right at 4:00.",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Footer
  // --------------------------------------------------------------------------
  footer: {
    madeWith: "Made with love (and a lot of iced coffee).",
  },
};
