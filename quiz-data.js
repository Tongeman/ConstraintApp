// Quiz Configuration and Data
const quizConfig = {
  title: "Find Your Business Growth Constraint",
  introduction: {
    paragraphs: [
      "Every business typically has a single constraint limiting its growth. If you want to scale, you have to find and resolve that constraint.",
      "Most CEOs waste resources improving areas that don't actually matter while the real bottleneck quietly chokes their progress. This quick quiz will help you identify exactly where your growth is stuck, so you can focus your efforts where they'll actually make a difference."
    ],
    benefits: [
      "Takes less than 5 minutes to complete",
      "Get instant, actionable insights specific to your business",
      "Identify your #1 constraint with precision",
      "Discover exactly where to focus for maximum growth impact"
    ]
  },
  
  questions: [
    {
      id: 'cash',
      title: 'How well do you know your cash position 8–13 weeks ahead.',
      category: 'Cash Flow',
      introduction: 'Cash is the lifeblood of your business. If you can\'t predict your cash position weeks ahead, you\'re flying blind and one unexpected expense or late payment could put you in crisis.', 
      options: [
        { value: 1, text: 'No visibility – I don\'t track this at all.' },
        { value: 2, text: 'Vague sense – I have only a rough idea, not based on reliable data.' },
        { value: 3, text: 'Ad-hoc – I can work it out if needed, but it\'s not a regular report.' },
        { value: 4, text: 'Monthly forecasting – I track cash monthly and can project a few weeks ahead.' },
        { value: 5, text: 'Clear foresight – I run accurate weekly forecasts and know my cash position 8–13 weeks out.' }
      ]
    },
    {
      id: 'sales',
      title: 'How did your sales in the past 12 months compare to the previous 12 months?',
      category: 'Sales Growth',
      introduction: 'Growth doesn\'t happen by accident—it requires intentional planning and execution. Your recent sales trend reveals whether your growth strategy is actually working or if you\'re stuck in place.',
      options: [
        { value: 1, text: 'Declining – Sales have dropped; we\'re shrinking rather than growing.' },
        { value: 2, text: 'Flat – Sales are about the same as the year before; we\'re not growing.' },
        { value: 3, text: 'Small growth – Sales grew slightly (under 10%), but not in line with our ambitions.' },
        { value: 4, text: 'Healthy growth – Sales grew steadily (10–25%) and we can see what\'s working.' },
        { value: 5, text: 'Scalable growth – Sales grew significantly (25%+), and we have a clear, repeatable growth model driving results.' }
      ]
    },
    {
      id: 'dependency',
      title: 'If you stepped away from the business for 3 months, what would happen?',
      category: 'Business Dependency',
      introduction: 'If your business can\'t run without you, you don\'t own a business—you own a job. A company that depends entirely on the CEO has limited value and traps you in daily operations instead of strategic leadership.',
      options: [
        { value: 1, text: 'Chaos – The business would grind to a halt without me.' },
        { value: 2, text: 'Firefighting – Some things would get done, but major issues would pile up.' },
        { value: 3, text: 'Partial stability – The team could manage day-to-day, but growth or strategy would stall.' },
        { value: 4, text: 'Well-managed – The business would run smoothly with regular meetings, processes, and accountability in place.' },
        { value: 5, text: 'Exit-ready – The business could operate and grow without me, making it attractive to a buyer or investor.' }
      ]
    },
    {
      id: 'marketing',
      title: 'How consistently does your marketing hit or exceed your lead generation targets?',
      category: 'Marketing Performance',
      introduction: 'Without a steady flow of new leads, your sales pipeline runs dry and growth stalls. Consistent lead generation is the foundation of predictable revenue—if you can\'t count on new prospects coming in, everything else becomes a scramble.',
      options: [
        { value: 1, text: 'No formal targets – We don\'t set lead targets or track performance against them.' },
        { value: 2, text: 'Unpredictable – We have targets but rarely hit them; results are inconsistent month to month.' },
        { value: 3, text: 'Hit occasionally – We hit targets some months but miss others; roughly 50/50.' },
        { value: 4, text: 'Consistently hit – We meet our lead targets most months (75%+ of the time).' },
        { value: 5, text: 'Consistently exceed – We regularly surpass targets and have capacity to generate more when needed.' }
      ]
    },
    {
      id: 'salesProcess',
      title: 'If you doubled your leads tomorrow, how confident are you that your sales process would convert them into paying customers?',
      category: 'Sales Process',
      introduction: 'More leads mean nothing if you can\'t convert them into customers. A weak sales process wastes your marketing investment and leaves money on the table—no matter how many prospects you attract.',
      options: [
        { value: 1, text: 'No process – We don\'t have a defined sales process; results depend on me or one key person.' },
        { value: 2, text: 'Inconsistent – We sometimes close sales, but conversion rates are unpredictable.' },
        { value: 3, text: 'Basic process – We have a repeatable sales method, but it depends heavily on individual effort.' },
        { value: 4, text: 'Reliable process – We have a consistent, measurable sales process that delivers steady conversion rates.' },
        { value: 5, text: 'Scalable machine – We can confidently scale; adding more leads produces more customers without breaking our sales system.' }
      ]
    },
    {
      id: 'customerSatisfaction',
      title: 'Do you consistently delight customers with your products and service?',
      category: 'Customer Satisfaction',
      introduction: 'Happy customers buy again and refer others—unhappy ones disappear silently or damage your reputation online. Consistent customer delight isn\'t just nice to have; it\'s your most cost-effective growth engine.',
      options: [
        { value: 1, text: 'No visibility – I don\'t know — we don\'t track customer satisfaction, reviews, or repeat business.' },
        { value: 2, text: 'Mixed signals – We get some positive feedback, but also complaints or one-star reviews.' },
        { value: 3, text: 'Generally satisfied – Most customers seem happy, but delight is inconsistent and repeat business is patchy.' },
        { value: 4, text: 'Consistently positive – We reliably get good reviews, repeat purchases, and strong customer satisfaction.' },
        { value: 5, text: 'Delight at scale – We consistently generate five-star reviews, repeat customers, and referrals as a result of our systems.' }
      ]
    },
    {
      id: 'leadership',
      title: 'How well are you performing as a leader — creating culture, supporting your team, and focusing on your strengths?',
      category: 'Leadership',
      introduction: 'Your business can only grow as fast as you do as a leader. If you\'re stuck doing work that drains you or aren\'t developing your leadership skills, you become the ceiling on your company\'s potential.',
      options: [
        { value: 1, text: 'No clarity – I don\'t know how I\'m performing as a leader; I haven\'t had feedback or measured it.' },
        { value: 2, text: 'Reactive leader – I set the tone day to day, but I often get dragged into tasks I\'m not good at.' },
        { value: 3, text: 'Developing leader – I try to build culture and support the team, but I still carry too much of the load myself.' },
        { value: 4, text: 'Effective leader – I focus mainly on leading, creating culture, and enabling others to perform, while avoiding tasks outside my strengths.' },
        { value: 5, text: 'Strategic leader – I set vision, culture, and direction, while the team thrives because I work almost entirely in my strengths.' }
      ]
    },
    {
      id: 'team',
      title: 'How competent are the team who work with you?',
      category: 'Team Competence',
      introduction: 'You can\'t scale a business on your own—you need a team that drives performance, not just follows orders. Without capable managers who own results and push the company forward, growth requires your constant involvement.',
      options: [
        { value: 1, text: 'No visibility – I don\'t really know how well my team performs; I\'m not tracking or measuring it.' },
        { value: 2, text: 'Dependent on me – The team relies on me for most decisions; without me, progress stalls.' },
        { value: 3, text: 'Operational support – I have some good people, but they mostly manage tasks, not drive performance.' },
        { value: 4, text: 'Accountable team – I have a leadership team that takes ownership, drives performance, and holds regular reviews.' },
        { value: 5, text: 'High-performance culture – The team operates at a high level with accountability, shared leadership, and a culture that drives results without me needing to push.' }
      ]
    },
    {
      id: 'systems',
      title: 'How well are your systems defined? Are they efficient and able to flag problems before they grow?',
      category: 'Systems & Processes',
      introduction: 'Without clear systems, your business runs on chaos and heroics—problems hide until they become crises, and quality depends on who\'s working that day. Documented processes create consistency, catch issues early, and allow you to scale without everything falling apart.',
      options: [
        { value: 1, text: 'Ad-hoc processes – Work gets done, but every person does it differently and we don\'t have regular management meetings.' },
        { value: 2, text: 'Some structure – A few workflows are documented, but most are informal and meetings are irregular or unfocused.' },
        { value: 3, text: 'Defined but patchy – Most jobs are defined and meetings happen regularly, but efficiency is inconsistent and problems often escalate before being noticed.' },
        { value: 4, text: 'Well-managed systems – Clear workflows and regular management rhythms drive efficiency and highlight issues early enough to act.' },
        { value: 5, text: 'Optimised & scalable – We run efficient, documented systems with strong communication and management processes that consistently surface and solve problems before they grow.' }
      ]
    }
  ],
  
  recommendations: {
    cash: {
      title: 'Cash Flow',
      description: 'Your cash flow visibility needs immediate attention. Without clear cash forecasting, you\'re flying blind and risking sudden cash crunches that could derail your growth.',
      quickWins: 'Implement weekly cash flow forecasting. Set up a simple spreadsheet tracking your cash position for the next 8-13 weeks. Review it every Monday morning.',
      nextLevel: 'Consider cash flow management software and work with your accountant to establish rolling 13-week cash forecasts with scenario planning.'
    },
    sales: {
      title: 'Sales Growth',
      description: 'Sales growth is your constraint. Until you crack predictable revenue growth, everything else takes a back seat.',
      quickWins: 'Analyze your best customers from the past year. What do they have in common? Double down on acquiring more customers that fit this profile.',
      nextLevel: 'Build a sales growth model that identifies your key growth levers (pricing, volume, new products) and test strategies to move each lever systematically.'
    },
    dependency: {
      title: 'Business Dependency',
      description: 'Your business is too dependent on you. This limits growth and makes your business less valuable. You\'re the bottleneck.',
      quickWins: 'Document your three most critical processes this week. Record a video walkthrough of each. Delegate one of them to someone on your team.',
      nextLevel: 'Build a second-in-command or management team that can handle operations while you focus on strategy. Create systems and standard operating procedures for all key functions.'
    },
    marketing: {
      title: 'Marketing Performance',
      description: 'Marketing performance is holding you back. Without consistent lead generation, your sales team has nothing to work with.',
      quickWins: 'Set a specific monthly lead target. Track it weekly. Test one new lead generation channel this month and measure results rigorously.',
      nextLevel: 'Build a marketing system with multiple proven channels that consistently deliver qualified leads. Implement proper attribution tracking to know what\'s actually working.'
    },
    salesProcess: {
      title: 'Sales Process',
      description: 'Your sales process can\'t scale. Even if you doubled your leads tomorrow, you wouldn\'t be able to convert them effectively.',
      quickWins: 'Document your current sales process step-by-step. Identify where prospects get stuck or drop off. Fix the biggest leak first.',
      nextLevel: 'Create a standardized sales process with clear stages, scripts, and conversion metrics. Train your team on it and measure performance at each stage.'
    },
    customerSatisfaction: {
      title: 'Customer Satisfaction',
      description: 'Customer satisfaction and delivery need work. If you can\'t consistently delight customers, growth will always be harder than it should be.',
      quickWins: 'Implement a simple Net Promoter Score (NPS) survey. Ask every customer: "How likely are you to recommend us?" (0-10). Follow up with the lowest scorers immediately.',
      nextLevel: 'Build systematic feedback loops, quality control processes, and customer success systems that ensure every customer has a great experience.'
    },
    leadership: {
      title: 'Leadership',
      description: 'Your leadership effectiveness is the constraint. Everything flows from how well you lead, and right now you\'re not operating at full capacity.',
      quickWins: 'Get 360-degree feedback from your team, peers, and mentors. Identify your top three leadership strengths and weaknesses. Commit to spending 80% of your time on your strengths.',
      nextLevel: 'Work with an executive coach. Build a personal development plan. Create a culture document and live it daily. Focus ruthlessly on strategy and culture while delegating everything else.'
    },
    team: {
      title: 'Team Competence',
      description: 'Your team\'s competence is limiting growth. You can\'t scale beyond the capability of your people.',
      quickWins: 'Assess each team member\'s performance objectively. Identify your A-players and give them more responsibility. Address underperformance directly - coach them up or move them out.',
      nextLevel: 'Build a high-performance culture with clear expectations, regular reviews, and accountability. Upgrade your hiring process to attract A-players. Create development paths for your best people.'
    },
    systems: {
      title: 'Systems & Processes',
      description: 'Your systems and processes are holding you back. Without solid systems, you\'re constantly firefighting instead of growing.',
      quickWins: 'Document your three most important business processes. Schedule weekly management meetings with a clear agenda. Implement a simple project management tool for visibility.',
      nextLevel: 'Build comprehensive standard operating procedures (SOPs) for all key functions. Implement management rhythms (daily huddles, weekly reviews, monthly planning). Create dashboards that surface problems early.'
    }
  }
};