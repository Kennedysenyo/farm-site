import { BookOpenCheck, MapPin, Sprout, Tractor } from "lucide-react";

export const products = [
  {
    id: "1",
    name: "Seedlings",
    description: "Well-nurtured seedlings ready for transplant.",
    image: "/img/home/products/seedlings.jpg",
  },
  {
    id: "2",
    name: "Organic Fertilizers",
    description: "Boost soil health with nutrient-rich organic fertilizers.",
    image: "/img/home/products/fertilizers.jpg",
  },
  {
    id: "3",
    name: "Pesticides / Weedicide",
    description: "Effective weed and pest control for small and large farms.",
    image: "/img/home/products/pesticides.jpg",
  },
  {
    id: "4",
    name: "Farm Tools Set",
    description: "Durable tools to support daily farm operations.",
    image: "/img/home/products/tools.jpg",
  },
];

export const testimonials = [
  {
    name: "John Mensah",
    role: "Cocoa Farmer",
    service: "Premium Seedlings",
    location: "Ashanti Region",
    content:
      "The seedlings I got from StartAgri have exceeded my expectations. 98% survival rate and excellent growth. My farm has never looked better!",
    rating: 5,
    image: "/img/home/testimonials/user1.jpg",
  },
  {
    name: "Mary Asante",
    role: "Agricultural Entrepreneur",
    service: "Expert Consultation",
    location: "Eastern Region",
    content:
      "Their consultation services helped me increase my yield by 40%. The team is knowledgeable and always available when I need support.",
    rating: 5,
    image: "/img/home/testimonials/user2.jpg",
  },
  {
    name: "Samuel Osei",
    role: "Farm Manager",
    location: "Central Region",
    content:
      "StartAgri helped me secure the perfect farmland and provided ongoing support. Their expertise in land development is unmatched.",
    rating: 5,
    image: "/img/home/testimonials/user3.jpg",
  },
];

export const services = [
  {
    id: "seedlings",
    icon: Sprout,
    title: "Premium Seedlings",
    subtitle: "High-Quality, Disease-Resistant Varieties",
    description:
      "We provide top-grade seedlings with proven genetics and exceptional survival rates for maximum yield potential.",
    features: [
      "95% survival rate guarantee",
      "Disease-resistant varieties",
      "Certified organic options",
      "Expert growing guidance",
      "Delivery to your farm",
      "Post-planting support",
    ],
    pricing: {
      basic: {
        name: "Basic Package",
        price: 25,
        unit: "per seedling",
        features: ["Quality seedlings", "Basic guidance", "Delivery included"],
      },
      premium: {
        name: "Premium Package",
        price: 35,
        unit: "per seedling",
        features: [
          "Premium varieties",
          "Expert consultation",
          "Delivery & planting",
          "6-month support",
        ],
      },
      enterprise: {
        name: "Enterprise Package",
        price: "Custom",
        unit: "bulk orders",
        features: [
          "Volume discounts",
          "Custom varieties",
          "Full farm setup",
          "Ongoing partnership",
        ],
      },
    },
    process: [
      "Consultation & soil analysis",
      "Variety selection & recommendation",
      "Seedling preparation & quality check",
      "Delivery & planting guidance",
      "Follow-up support & monitoring",
    ],
    image: "/img/services/seedlings.jpg",
  },
  {
    id: "consultation",
    icon: BookOpenCheck,
    title: "Expert Consultation",
    subtitle: "Professional Agricultural Guidance",
    description:
      "Get expert advice from experienced agronomists and farming specialists to optimize your agricultural operations.",
    features: [
      "Soil analysis & testing",
      "Crop selection guidance",
      "Farming best practices",
      "Pest & disease management",
      "Yield optimization strategies",
      "Market analysis & planning",
    ],
    pricing: {
      basic: {
        name: "Basic Consultation",
        price: 150,
        unit: "per session",
        features: [
          "1-hour consultation",
          "Basic recommendations",
          "Follow-up email",
        ],
      },
      premium: {
        name: "Comprehensive Plan",
        price: 500,
        unit: "per farm",
        features: [
          "Full farm assessment",
          "Detailed action plan",
          "3 follow-up sessions",
          "Written report",
        ],
      },
      enterprise: {
        name: "Ongoing Partnership",
        price: "Custom",
        unit: "monthly retainer",
        features: [
          "Monthly consultations",
          "24/7 support",
          "Priority assistance",
          "Custom solutions",
        ],
      },
    },
    process: [
      "Initial farm assessment",
      "Soil & environmental analysis",
      "Custom strategy development",
      "Implementation guidance",
      "Ongoing monitoring & support",
    ],
    image: "/img/services/consultations.jpg",
  },
  {
    id: "farmland",
    icon: MapPin,
    title: "Farmland Solutions",
    subtitle: "Land Acquisition & Development",
    description:
      "Complete farmland services from acquisition to development, helping you secure and optimize agricultural properties.",
    features: [
      "Land sourcing & evaluation",
      "Legal documentation support",
      "Soil quality assessment",
      "Infrastructure development",
      "Title verification",
      "Investment analysis",
    ],
    pricing: {
      basic: {
        name: "Land Sourcing",
        price: 2000,
        unit: "per search",
        features: [
          "Property identification",
          "Basic evaluation",
          "Legal verification",
        ],
      },
      premium: {
        name: "Full Service",
        price: 5000,
        unit: "per transaction",
        features: [
          "Complete acquisition support",
          "Due diligence",
          "Documentation",
          "Development planning",
        ],
      },
      enterprise: {
        name: "Investment Package",
        price: "Custom",
        unit: "large projects",
        features: [
          "Portfolio development",
          "Investment analysis",
          "Project management",
          "Ongoing support",
        ],
      },
    },
    process: [
      "Requirements assessment",
      "Property identification & evaluation",
      "Due diligence & verification",
      "Negotiation & acquisition",
      "Development & optimization",
    ],
    image: "/img/services/farmlands.jpg",
  },
  {
    id: "equipment",
    icon: Tractor,
    title: "Equipment Support",
    subtitle: "Modern Farming Equipment & Tools",
    description:
      "Access to modern farming equipment, tools, and machinery with maintenance support and training services.",
    features: [
      "Equipment rental & sales",
      "Maintenance & repair services",
      "Operator training programs",
      "Technology integration",
      "Financing options available",
      "24/7 technical support",
    ],
    pricing: {
      basic: {
        name: "Equipment Rental",
        price: 200,
        unit: "per day",
        features: ["Basic equipment", "Operator included", "Fuel included"],
      },
      premium: {
        name: "Seasonal Package",
        price: 1500,
        unit: "per month",
        features: [
          "Multiple equipment",
          "Maintenance included",
          "Training provided",
          "Priority booking",
        ],
      },
      enterprise: {
        name: "Purchase Program",
        price: "Custom",
        unit: "financing available",
        features: [
          "Equipment purchase",
          "Financing options",
          "Full warranty",
          "Training & support",
        ],
      },
    },
    process: [
      "Equipment needs assessment",
      "Selection & recommendation",
      "Training & orientation",
      "Deployment & setup",
      "Ongoing maintenance & support",
    ],
    image: "/img/services/equipments.jpg",
  },
];
