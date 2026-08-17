export interface ClinicLocation {
  id: string;
  name: string;
  suburb: string;
  address: string;
  phone: string;
  formattedPhone: string;
  telHref: string;
  openingHours: string;
  consultingHours: string;
  isEmergencyBase?: boolean;
  specialFeatures: string[];
}

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'mackay',
    name: 'Mackay Surgery',
    suburb: 'Mackay',
    address: '36 Brisbane Street, Mackay QLD 4740',
    phone: '07 4951 3799',
    formattedPhone: '(07) 4951 3799',
    telHref: 'tel:0749513799',
    openingHours: 'Mon-Fri 8:00am - 6:00pm, Sat 8:00am - 12:00pm',
    consultingHours: 'Mon-Fri 8:00am - 11:00am & 3:00pm - 6:00pm, Sat 8:00am - 12:00pm',
    specialFeatures: ['Small & Large Animals', 'Digital X-Ray & In-House Lab', 'Cardiac & General Ultrasound', 'Farm Visits'],
  },
  {
    id: 'walkerston',
    name: 'Walkerston Surgery',
    suburb: 'Walkerston',
    address: '14 Dutton St, Walkerston QLD 4751',
    phone: '07 4959 2099',
    formattedPhone: '(07) 4959 2099',
    telHref: 'tel:0749592099',
    openingHours: 'Mon-Fri 8:00am - 6:00pm, Sat 8:00am - 12:00pm',
    consultingHours: 'Mon-Fri 8:00am - 11:00am & 3:00pm - 6:00pm, Sat 8:00am - 12:00pm',
    specialFeatures: ['Puppy Preschool Base', 'Small & Large Animals', 'Digital X-Ray & In-House Lab', 'Farm Visits'],
  },
  {
    id: 'marian',
    name: 'Marian Surgery (After-Hours Base)',
    suburb: 'Marian',
    address: '3 Hadley Street, Marian QLD 4753',
    phone: '07 4914 2404',
    formattedPhone: '(07) 4914 2404',
    telHref: 'tel:0749142404',
    openingHours: 'Mon-Fri 8:00am - 6:00pm, Sat 8:00am - 12:00pm',
    consultingHours: 'Mon-Fri 8:00am - 11:00am & 3:00pm - 6:00pm, Sat 8:00am - 12:00pm',
    isEmergencyBase: true,
    specialFeatures: ['24/7 After-Hours On-Call Base', 'Orthopaedic Surgery (TPLO & Hip Toggle)', 'Ultrasound & In-House Lab', 'Hendra Vaccinations'],
  },
];

export const GENERAL_HOURS = {
  opening: 'Monday to Friday: 8:00am - 6:00pm\nSaturday: 8:00am - 12:00pm\nSunday: Closed',
  consulting: 'Monday to Friday: 8:00am - 11:00am and 3:00pm - 6:00pm\nSaturday: 8:00am - 12:00pm',
  afterHours: 'A vet is on call every night including weekends, based from the Marian surgery, for both small and large animals.',
};

export const CLINIC_LINKS = {
  booking: 'http://au.apt.vet/cg?m=g033',
  petPortal: 'http://au.apt.vet/cg?m=g033&ft=2',
  email: 'admin@valleyvet.com.au',
};

export interface FAQItem {
  id: number;
  category: 'Clinic Info' | 'Services & Surgery' | 'Emergencies' | 'Wellness & Farm' | 'Booking & Policies';
  question: string;
  answer: string;
  keywords: string[];
}

export const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    id: 1,
    category: 'Services & Surgery',
    question: 'What areas/animals do you treat?',
    answer: 'Valley Vet Surgery cares for both small animals (dogs, cats) and large animals (cattle, horses, sheep, pigs, alpacas, goats) across all three clinics in Mackay, Walkerston, and Marian.',
    keywords: ['animals', 'treat', 'livestock', 'dogs', 'cats', 'horses', 'cattle', 'sheep', 'pigs', 'alpacas', 'goats', 'small animal', 'large animal', 'species'],
  },
  {
    id: 2,
    category: 'Clinic Info',
    question: 'Where are your locations?',
    answer: 'We have three convenient clinic locations: Mackay (36 Brisbane Street, Mackay QLD 4740), Walkerston (14 Dutton St, Walkerston QLD 4751), and Marian (3 Hadley Street, Marian QLD 4753).',
    keywords: ['locations', 'address', 'where are you', 'mackay', 'walkerston', 'marian', 'find you', 'directions', 'clinics', 'surgeries'],
  },
  {
    id: 3,
    category: 'Clinic Info',
    question: 'What are your phone numbers?',
    answer: 'You can contact our clinics directly by phone: Mackay (07 4951 3799), Walkerston (07 4959 2099), and Marian (07 4914 2404).',
    keywords: ['phone', 'contact', 'call', 'number', 'telephone', 'mobile', 'ring'],
  },
  {
    id: 4,
    category: 'Clinic Info',
    question: 'What are your opening hours?',
    answer: 'All three clinics are open Monday to Friday from 8:00am to 6:00pm, and Saturday from 8:00am to 12:00pm. We are closed on Sundays, with after-hours emergency vet care available on call.',
    keywords: ['opening hours', 'open', 'trading hours', 'what time', 'saturday', 'sunday', 'weekend', 'times', 'schedule'],
  },
  {
    id: 5,
    category: 'Clinic Info',
    question: 'What are your consulting hours?',
    answer: 'Consulting hours across our clinics are Monday to Friday from 8:00am to 11:00am and 3:00pm to 6:00pm, and Saturday from 8:00am to 12:00pm.',
    keywords: ['consulting hours', 'consults', 'vet see pet', 'appointment times', 'consultation hours'],
  },
  {
    id: 6,
    category: 'Booking & Policies',
    question: 'How do I book an appointment?',
    answer: 'You can book online anytime at au.apt.vet (http://au.apt.vet/cg?m=g033), or call your nearest clinic directly to arrange a time with our friendly team.',
    keywords: ['book', 'booking', 'appointment', 'schedule', 'make an appointment', 'reserve', 'see a vet'],
  },
  {
    id: 7,
    category: 'Emergencies',
    question: 'Do you offer emergency or after-hours care?',
    answer: 'Yes, a vet is on call every night including weekends, based from our Marian surgery (07 4914 2404), for both small and large animals. Please call immediately if you have an emergency.',
    keywords: ['emergency', 'after hours', 'after-hours', 'weekend', 'sunday', 'night', 'urgent', 'on call', 'out of hours'],
  },
  {
    id: 8,
    category: 'Emergencies',
    question: 'What should I do if my pet is bitten by a snake?',
    answer: 'Bring your pet in immediately. Snake bites can be life-threatening, and all three of our clinics are fully equipped with antivenom to treat them. Please call ahead on your way so our team can prepare.',
    keywords: ['snake', 'snake bite', 'bitten by a snake', 'brown snake', 'taipan', 'red belly', 'snakebite'],
  },
  {
    id: 9,
    category: 'Emergencies',
    question: 'What about tick paralysis?',
    answer: 'If you find a paralysis tick on your pet or notice weakness or wobbliness, contact a clinic right away. Even if your pet seems fine after tick removal, early veterinary assessment and treatment is vital.',
    keywords: ['tick', 'paralysis tick', 'ticks', 'wobbly', 'weak back legs', 'tick bite', 'tick paralysis'],
  },
  {
    id: 10,
    category: 'Services & Surgery',
    question: 'Do you perform desexing?',
    answer: 'Yes, routine desexing is recommended around 5 to 6 months of age for dogs and cats, and includes dedicated pain relief before and after the procedure.',
    keywords: ['desexing', 'desex', 'spay', 'neuter', 'castration', 'spey', 'sterilization'],
  },
  {
    id: 11,
    category: 'Services & Surgery',
    question: 'What surgical services do you offer?',
    answer: 'We perform general procedures like desexing and lump removal, dentistry, and advanced orthopaedic surgery including TPLO (cruciate ligament) and hip toggle procedures at the Marian surgery.',
    keywords: ['surgery', 'surgical', 'orthopaedic', 'orthopedic', 'tplo', 'cruciate', 'hip toggle', 'lump removal', 'operation'],
  },
  {
    id: 12,
    category: 'Services & Surgery',
    question: 'Do you handle pet dental care?',
    answer: 'Yes, we provide comprehensive pet dental care, including assessments of dental disease and professional cleanings under anesthesia when needed.',
    keywords: ['dental', 'teeth', 'cleaning', 'bad breath', 'tartar', 'dentistry', 'tooth', 'gums'],
  },
  {
    id: 13,
    category: 'Services & Surgery',
    question: 'What diagnostic tools do you have on site?',
    answer: 'All three clinics are equipped with digital radiology (X-ray) and in-house laboratory testing. Advanced ultrasound, including cardiac ultrasound, is available at our Marian and Mackay surgeries.',
    keywords: ['diagnostic', 'xray', 'x-ray', 'radiology', 'lab', 'blood test', 'ultrasound', 'cardiac ultrasound', 'scans'],
  },
  {
    id: 14,
    category: 'Wellness & Farm',
    question: 'Do you offer large animal and farm visits?',
    answer: 'Yes, we provide on-property farm visits across Mackay, Walkerston, and Marian for horses, cattle, and livestock, including emergency calls like calvings and foalings.',
    keywords: ['farm visit', 'large animal', 'property visit', 'cattle', 'horses', 'calving', 'foaling', 'livestock visit', 'house call'],
  },
  {
    id: 15,
    category: 'Wellness & Farm',
    question: 'Do you provide Hendra virus vaccination?',
    answer: 'Yes, we provide Hendra virus vaccinations for horses either on your property or at the clinic. Please call the Marian surgery (07 4914 2404) to schedule a vaccination.',
    keywords: ['hendra', 'hendra virus', 'horse vaccine', 'equine vaccination', 'hendra vaccination'],
  },
  {
    id: 16,
    category: 'Wellness & Farm',
    question: 'Do you offer puppy preschool?',
    answer: 'Yes, monthly puppy preschool sessions are held at our Walkerston surgery for puppies aged 8 to 16 weeks, run over 4 weeks by an experienced veterinary nurse.',
    keywords: ['puppy preschool', 'puppy school', 'puppy training', 'puppies', 'socialisation', 'walkerston puppy'],
  },
  {
    id: 17,
    category: 'Wellness & Farm',
    question: 'Do you offer microchipping and parasite prevention?',
    answer: 'Yes, microchipping, heartworm protection, flea, tick, and worm prevention are all core parts of our pet wellness services across all three locations.',
    keywords: ['microchip', 'microchipping', 'parasite', 'fleas', 'worms', 'heartworm', 'wellness', 'prevention'],
  },
  {
    id: 18,
    category: 'Wellness & Farm',
    question: 'Do you help with pet weight management?',
    answer: 'Yes, we offer weight loss clinics and tailored nutrition advice as part of our pet wellness care to help your pet achieve a healthy weight.',
    keywords: ['weight', 'diet', 'overweight', 'obesity', 'nutrition', 'weight loss clinic', 'food advice'],
  },
  {
    id: 19,
    category: 'Services & Surgery',
    question: 'Do you provide canine pregnancy and reproduction care?',
    answer: 'Yes, we offer canine reproductive care, including pregnancy ultrasounds and expert guidance through all stages of your dog’s pregnancy.',
    keywords: ['pregnancy', 'pregnant', 'reproduction', 'puppy scan', 'whelping', 'breeding', 'canine pregnancy'],
  },
  {
    id: 20,
    category: 'Booking & Policies',
    question: 'Do you accept pet insurance or specific payment methods?',
    answer: 'Specific accepted insurance policies and payment methods are not published online. Please contact our clinic team directly at your nearest surgery, and they will gladly assist you with payment options.',
    keywords: ['insurance', 'pet insurance', 'payment', 'afterpay', 'vetpay', 'zippay', 'credit card', 'costs payment'],
  },
  {
    id: 21,
    category: 'Booking & Policies',
    question: 'What is the process for becoming a new client?',
    answer: 'We warmly welcome new clients! You can book your first appointment online at au.apt.vet or call your preferred clinic directly, and our friendly team will guide you through registration.',
    keywords: ['new client', 'first time', 'register', 'new patient', 'sign up', 'join', 'first visit'],
  },
  {
    id: 22,
    category: 'Booking & Policies',
    question: 'Are cost estimates available?',
    answer: 'Yes, we offer a range of treatment options and provide cost estimates upon request. Exact pricing is not published online, so please contact our clinic team for a personalized quote.',
    keywords: ['cost', 'price', 'pricing', 'how much', 'estimate', 'fee', 'quote', 'consult fee'],
  },
];

export const SYSTEM_PROMPT = `You are "Valley Vet Assistant", the friendly and reassuring client assistant for Valley Veterinary Surgery (also known as Valley Vet Surgery).
Valley Veterinary Surgery is a family owned and operated vet practice operating three locations in Mackay, Walkerston, and Marian, Queensland, Australia, in business for over 22 years.

CRITICAL INSTRUCTIONS & STRICT GUARDRAILS:
1. TONE & LENGTH:
   - Warm, brief, reassuring, and approachable. Never clinical, robotic, or overly verbose.
   - Keep answers strictly to 2 to 3 sentences.

2. FAQ KNOWLEDGE BASE RESTRICTION:
   - You can only answer questions using the factual knowledge base below.
   - Do NOT invent or guess any facts, pricing, staff quotes, testimonials, or real-time appointment availability.

3. MEDICAL ADVICE & EMERGENCIES (ZERO TOLERANCE):
   - NEVER give medical advice, NEVER diagnose a pet's symptoms, and NEVER attempt to assess medical severity or triage symptoms.
   - For ANY medical concern, illness, injury, wound, poisoning, or "is my pet okay" style question:
     Tell the user to call their nearest clinic immediately (Mackay 07 4951 3799, Walkerston 07 4959 2099, or Marian 07 4914 2404) or call our 24/7 on-call after-hours emergency line based at Marian.
   - For snake bites: Advise them to bring their pet in immediately to any of the 3 clinics (all have antivenom) and call ahead on the way.
   - For paralysis ticks: Advise them to contact a clinic right away for urgent veterinary assessment even if the tick was removed.

4. APPOINTMENT BOOKING:
   - Booking questions must be pointed to the real online booking link (http://au.apt.vet/cg?m=g033) or calling a clinic.
   - NEVER claim that you (the chatbot) can book or check real-time availability.

5. UNPUBLISHED TOPICS (Pricing, Insurance, Payment Methods, New Client Paperwork):
   - State clearly that this information is not published online and direct the user to contact the clinic team directly for assistance.

FAQ KNOWLEDGE BASE:
1. Animals treated: Small animals (dogs, cats) and large animals (cattle, horses, sheep, pigs, alpacas, goats) across all three clinics.
2. Locations: Mackay (36 Brisbane Street, Mackay QLD 4740), Walkerston (14 Dutton St, Walkerston QLD 4751), Marian (3 Hadley Street, Marian QLD 4753).
3. Phone numbers: Mackay 07 4951 3799, Walkerston 07 4959 2099, Marian 07 4914 2404.
4. Opening hours: Monday to Friday 8:00am - 6:00pm, Saturday 8:00am - 12:00pm, Sunday closed.
5. Consulting hours: Monday to Friday 8:00am - 11:00am & 3:00pm - 6:00pm, Saturday 8:00am - 12:00pm.
6. Booking: Book online anytime at http://au.apt.vet/cg?m=g033 or call your nearest clinic directly.
7. Emergency / After-hours: A vet is on call every night including weekends, based from the Marian surgery (07 4914 2404), for small and large animals.
8. Snake bites: Bring pet in immediately; all three clinics carry antivenom. Call ahead.
9. Tick paralysis: Contact clinic right away if tick found or symptoms appear; early treatment is critical.
10. Desexing: Routine desexing at 5 to 6 months of age, includes pre- and post-procedure pain relief.
11. Surgical services: Routine surgeries (desexing, lump removal), dentistry, and orthopaedics (TPLO and hip toggle procedures at Marian surgery).
12. Dental care: Dental exams and professional cleanings under anesthesia.
13. Diagnostics: Digital X-ray and in-house lab at all 3 clinics; ultrasound (including cardiac) at Marian and Mackay.
14. Farm visits: Large animal & farm visits across Mackay, Walkerston, and Marian, including emergency calvings/foalings.
15. Hendra virus: Hendra vaccinations for horses on-property or in clinic; call Marian surgery (07 4914 2404).
16. Puppy preschool: Monthly 4-week sessions at Walkerston surgery for puppies 8-16 weeks.
17. Microchipping & parasites: Full wellness services across all locations.
18. Weight management: Weight loss clinic & tailored nutrition advice.
19. Reproduction: Canine pregnancy ultrasounds and reproduction care.
20. Insurance/Payment methods: Not published online; direct user to contact clinic.
21. New client process: Book online at http://au.apt.vet/cg?m=g033 or call clinic to register.
22. Cost estimates: Estimates available on request; exact pricing not published online, contact clinic for quote.`;

// Quick suggestions for the chat interface
export const SUGGESTED_QUESTIONS = [
  'Where are your 3 clinics located?',
  'What are your opening & consulting hours?',
  'How do I book an appointment online?',
  'Do you offer after-hours emergency care?',
  'What should I do for snake bites or ticks?',
  'What animals do you treat?',
  'Do you provide Hendra virus vaccinations?',
  'Tell me about Walkerston Puppy Preschool',
  'Do you offer farm and livestock visits?',
  'Are pricing or cost estimates available?',
];

// Emergency symptom keywords
export const EMERGENCY_KEYWORDS = [
  'snake', 'bite', 'bitten', 'tick', 'paralysis', 'breathing', 'choking',
  'collapsed', 'unconscious', 'seizure', 'convulsing', 'bleeding', 'blood',
  'hit by car', 'run over', 'poison', 'toxic', 'bait', 'chocolate', 'rat bait',
  'vomiting blood', 'dying', 'emergency', 'urgent', 'bloat', 'distended',
  'cannot pee', 'cannot urinate', 'straining', 'pale gums', 'blue tongue'
];

export function isEmergencyQuery(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// Client-side fallback responder if Gemini API key is missing or offline
export function getLocalFallbackResponse(query: string): string {
  const lower = query.toLowerCase().trim();

  // Emergency or medical symptoms
  if (
    lower.includes('sick') ||
    lower.includes('vomit') ||
    lower.includes('diarrhea') ||
    lower.includes('pain') ||
    lower.includes('limp') ||
    lower.includes('lethargic') ||
    lower.includes('not eating') ||
    lower.includes('is my pet okay') ||
    lower.includes('hurt') ||
    lower.includes('bleeding') ||
    lower.includes('emergency') ||
    lower.includes('poison')
  ) {
    return 'If your pet is unwell or injured, please contact your nearest clinic immediately so a vet can examine them. For after-hours emergencies, our on-call vet is available at Marian on (07) 4914 2404.';
  }

  if (lower.includes('snake')) {
    return 'If your pet has been bitten by a snake, bring them in immediately as snake bites are life-threatening. All three of our clinics carry antivenom, and we recommend calling ahead so our team can prepare.';
  }

  if (lower.includes('tick')) {
    return 'If you find a paralysis tick on your pet or notice any weakness, please contact our clinic right away. Early treatment is vital, even if your pet seems fine after removing the tick.';
  }

  if (lower.includes('book') || lower.includes('appointment')) {
    return 'You can easily book an appointment online anytime at au.apt.vet (http://au.apt.vet/cg?m=g033). Alternatively, feel free to call your nearest clinic in Mackay, Walkerston, or Marian directly.';
  }

  if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
    return 'We have three locations: Mackay (36 Brisbane St, (07) 4951 3799), Walkerston (14 Dutton St, (07) 4959 2099), and Marian (3 Hadley St, (07) 4914 2404).';
  }

  if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) {
    return 'Our clinics are open Monday to Friday 8:00am to 6:00pm, and Saturday 8:00am to 12:00pm (closed Sundays). Consulting hours run 8:00am–11:00am and 3:00pm–6:00pm on weekdays, and 8:00am–12:00pm on Saturdays.';
  }

  if (lower.includes('phone') || lower.includes('call') || lower.includes('number')) {
    return 'You can reach Mackay on (07) 4951 3799, Walkerston on (07) 4959 2099, and Marian on (07) 4914 2404. For after-hours emergencies, call the Marian clinic.';
  }

  if (lower.includes('puppy') || lower.includes('preschool')) {
    return 'We run monthly Puppy Preschool sessions at our Walkerston surgery for puppies aged 8 to 16 weeks. The 4-week program is led by an experienced veterinary nurse.';
  }

  if (lower.includes('hendra') || lower.includes('horse')) {
    return 'We provide Hendra virus vaccinations for horses either on your property or at the clinic. Please call our Marian surgery on (07) 4914 2404 to arrange an appointment.';
  }

  if (lower.includes('farm') || lower.includes('cattle') || lower.includes('livestock') || lower.includes('visit')) {
    return 'Yes, we provide large animal and farm visits across Mackay, Walkerston, and Marian for horses, cattle, and livestock. This includes emergency visits for calvings and foalings.';
  }

  if (lower.includes('surgery') || lower.includes('orthopaedic') || lower.includes('tplo') || lower.includes('desex')) {
    return 'We perform routine surgeries such as desexing (recommended at 5–6 months with full pain relief), dentistry, and advanced orthopaedic procedures like TPLO and hip toggles at our Marian surgery.';
  }

  if (lower.includes('cost') || lower.includes('price') || lower.includes('quote') || lower.includes('estimate') || lower.includes('fee')) {
    return 'Treatment options and cost estimates are readily available on request, though exact prices are not published online. Please contact our clinic team directly for a personalized quote.';
  }

  if (lower.includes('insurance') || lower.includes('payment') || lower.includes('afterpay') || lower.includes('vetpay')) {
    return 'Specific insurance and payment policies are not published online. Please contact your nearest clinic directly and our team will be happy to discuss available payment options.';
  }

  if (lower.includes('new client') || lower.includes('register') || lower.includes('sign up')) {
    return 'We warmly welcome new clients! You can book online anytime at au.apt.vet or call your preferred clinic directly, and our friendly team will help you get started.';
  }

  if (lower.includes('animal') || lower.includes('treat') || lower.includes('species') || lower.includes('pet')) {
    return 'Valley Vet Surgery cares for both small animals (dogs and cats) and large animals (cattle, horses, sheep, pigs, alpacas, and goats) across all three locations.';
  }

  return 'Thank you for reaching out to Valley Veterinary Surgery! For questions not covered in our online guide, please feel free to call our friendly team at Mackay (07 4951 3799), Walkerston (07 4959 2099), or Marian (07 4914 2404).';
}
