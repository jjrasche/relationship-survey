export const diagnosticQuestions = [
  {
    id: 1,
    category: "Foundation",
    question: "Think about that time when things between you and your partner were at their best. Looking back, would you now say that things were really very good between you then?",
    guideline: "If, when your relationship was at its 'best,' things between you didn't feel right or work well, the prognosis is poor.",
    quickTake: "If it never was very good, it'll never be very good.",
    weight: 3,
    reversed: true // "No" is the concerning answer
  },
  {
    id: 2,
    category: "Safety",
    question: "Has there been more than one incident of physical violence in your relationship?",
    guideline: "Abuse that happens more than once means you must leave the relationship. Otherwise, it will happen again and again.",
    quickTake: "Physical abuse means love is dead.",
    weight: 5,
    critical: true // This is a deal-breaker question
  },
  {
    id: 3,
    category: "Commitment",
    question: "Have you already made a concrete commitment to pursue a course of action or lifestyle that definitely excludes your partner?",
    guideline: "If you've actually made a concrete commitment to pursue a course of action or lifestyle that excludes your partner, then on some level you've already decided.",
    quickTake: "If you look like you're leaving your relationship and act like you're leaving it, you're leaving it.",
    weight: 4
  },
  {
    id: 4,
    category: "Clarity",
    question: "If God or some omniscient being said it was okay to leave, would you feel tremendously relieved and have a strong sense that finally, you could end your relationship?",
    guideline: "If this suddenly gives you a strong sense that it's all right for you to end your relationship, you'll most likely feel you've discovered what's best for you if you choose to leave.",
    quickTake: "If God's saying 'Hey, whatever you want is okay with me' is all you'd need to feel it's okay to leave, it's okay to leave.",
    weight: 4
  },
  {
    id: 5,
    category: "Connection",
    question: "In spite of your problems, do you and your partner have even one positively pleasurable activity or interest (besides children) you currently share and look forward to sharing in the future?",
    guideline: "If there's even one thing you experience together and look forward to that reliably feels good and makes you feel close, there's possibility.",
    quickTake: "Real love needs real loving experiences.",
    weight: 3,
    reversed: true
  },
  {
    id: 6,
    category: "Attraction",
    question: "Would you say that to you your partner is basically nice, reasonably intelligent, not too neurotic, okay to look at, and most of the time smells all right?",
    guideline: "When people say yes to this question, the possibility of love still exists.",
    quickTake: "You just can't love someone who's mean, dumb, crazy, ugly, or stinky.",
    weight: 2,
    reversed: true
  },
  {
    id: 7,
    category: "Power",
    question: "Does your partner bombard you with difficulties when you try to get even the littlest thing you want?",
    guideline: "If almost any need you have gets obliterated, and getting what you want is such an ordeal that it's not worth the effort, you'll be happy if you leave.",
    quickTake: "Power people poison passion.",
    weight: 3
  },
  {
    id: 8,
    category: "Respect",
    question: "Do you have a basic, recurring, never-completely-going-away feeling of humiliation or invisibility in your relationship?",
    guideline: "If your partner gives you a recurring feeling of humiliation or invisibility, you're in a situation people are happy they left.",
    quickTake: "Humiliation is the barometer of hatred.",
    weight: 4
  },
  {
    id: 9,
    category: "Communication",
    question: "Does it seem to you that your partner generally and consistently blocks your attempts to bring up topics or raise questions?",
    guideline: "If your partner constantly prevents you from talking about things that are important to you, this destructive problem will not get better by itself.",
    quickTake: "You'll suffocate if the dirt hits the fan whenever you try to shoot the breeze.",
    weight: 3
  },
  {
    id: 10,
    category: "Trust",
    question: "Have you gotten to the point where you usually feel it's more likely that your partner is lying than telling the truth?",
    guideline: "If you find yourself thinking 'He's probably lying' whenever your partner says anything, nothing good is going to happen in that relationship.",
    quickTake: "When you're married to a liar, your marriage is a lie.",
    weight: 4
  },
  {
    id: 11,
    category: "Affection",
    question: "In spite of admirable qualities, do you genuinely like your partner, and does your partner seem to like you?",
    guideline: "If it's clear that basically you just don't like your partner, or they don't like you, then your love is a ghost.",
    quickTake: "In the long run—no like, no love.",
    weight: 3,
    reversed: true
  },
  {
    id: 12,
    category: "Generosity",
    question: "Do you feel willing to give your partner more than you're giving already, without any expectation of being paid back?",
    guideline: "If you are still willing to deliver a concrete expression of love without expecting anything back, there's a real chance of aliveness in your relationship.",
    quickTake: "When there's nothing left to give, there's nothing left at all.",
    weight: 2,
    reversed: true
  },
  {
    id: 13,
    category: "Physical",
    question: "Do both you and your partner want to touch each other and look forward to touching each other?",
    guideline: "If either has stopped wanting to touch or be touched by the other for several months, you're making a profound statement about alienation.",
    quickTake: "If someone makes your flesh crawl, it's time to crawl out of the relationship.",
    weight: 3,
    reversed: true
  },
  {
    id: 14,
    category: "Attraction",
    question: "Do you feel a unique sexual attraction to your partner?",
    guideline: "If you feel a physical, sexual attraction that puts your partner in a special category, you'll be happy if you stay.",
    quickTake: "If you're especially attracted to your partner, there's something special about your relationship.",
    weight: 2,
    reversed: true
  },
  {
    id: 15,
    category: "Awareness",
    question: "Does your partner neither see nor admit things you've tried to get them to acknowledge that make your relationship too bad to stay in?",
    guideline: "If your partner cannot and does not acknowledge problems you've pointed out, those problems will just get worse over time.",
    quickTake: "If your partner can't even see what makes you want to get out, it's time to get out.",
    weight: 3
  },
  {
    id: 16,
    category: "Change",
    question: "Is there something your partner does that makes your relationship too bad to stay in that they acknowledge but are unwilling to change?",
    guideline: "If your partner acknowledges a deal-breaking problem but is unwilling to do anything about it for at least six months, you'll be happier if you leave.",
    quickTake: "If you're waiting for your partner to want to change, you're waiting for Godot.",
    weight: 3
  },
  {
    id: 17,
    category: "Acceptance",
    question: "Have you tried to let go of the problem that bothers you most, ignore it, stop letting it bother you? Were you successful?",
    guideline: "If you can really let go of the problem that's most making you want to leave, there's a real chance this relationship is too good to leave.",
    quickTake: "In a relationship with a future, people can let go of the problems they can't solve.",
    weight: 2,
    reversed: true
  },
  {
    id: 18,
    category: "Change",
    question: "Does your partner acknowledge their problem, are they willing to do something about it, and are they able to change?",
    guideline: "If your partner shows real signs of being able to change, there's something healthy and alive at the core of your relationship.",
    quickTake: "It's the ability to change that turns frogs into princes.",
    weight: 3,
    reversed: true
  },
  {
    id: 19,
    category: "Boundaries",
    question: "Has your partner violated what for you is a bottom line?",
    guideline: "If you've made clear your real bottom lines and your partner's violated them anyway, by definition you will not be happy if you stay.",
    quickTake: "The bottom line is the end of the line.",
    weight: 5
  },
  {
    id: 20,
    category: "Lifestyle",
    question: "Is there a clearly formulated, passionately held difference between you about how to live?",
    guideline: "If you have profoundly divergent preferences about how to live, and your preferred lifestyle is impossible with your partner, you'll be happy if you leave.",
    quickTake: "You live a life, you don't live a relationship.",
    weight: 3
  },
  {
    id: 21,
    category: "Compatibility",
    question: "Would you say that deep down your partner is someone just like you in a way you feel good about?",
    guideline: "If you truly feel your partner is like you in some meaningful way that you feel good about, there's a real chance your relationship is too good to leave.",
    quickTake: "When you look deep in your partner's eyes you've got to be able to see yourself.",
    weight: 2,
    reversed: true
  },
  {
    id: 22,
    category: "Practicality",
    question: "Looking realistically at leaving, have you discovered it seems impossibly difficult or unpleasant?",
    guideline: "If a fresh, realistic look makes leaving seem too difficult and staying seem desirable, you know you'll be happier staying.",
    quickTake: "If staying makes sense when you really check into it, it makes sense to stay.",
    weight: 2,
    reversed: true
  },
  {
    id: 23,
    category: "Practicality",
    question: "Looking realistically at leaving, have you discovered it seems easier and more attractive?",
    guideline: "If looking realistically at leaving makes it seem easier and more attractive, you've gotten the clarity you were looking for.",
    quickTake: "If leaving makes sense when you really check into it, then it makes sense to leave.",
    weight: 2
  },
  {
    id: 24,
    category: "Self-Worth",
    question: "Does your partner convince you that you're a nut, jerk, loser, or idiot about important parts of yourself?",
    guideline: "If your partner is damaging the way you see yourself through disrespectful words and actions, they're cutting your legs out from under you.",
    quickTake: "If someone is starting to cut your legs out from under you, walk out while you still have legs.",
    weight: 4
  },
  {
    id: 25,
    category: "Avoidance",
    question: "Do you do everything possible to limit your contact with your partner, except when you absolutely must interact?",
    guideline: "If you realize you avoid your partner whenever possible, the level of disrespect has spoiled your relationship atmosphere.",
    quickTake: "The water's too bad to drink when you find you've stopped drinking the water.",
    weight: 3
  },
  {
    id: 26,
    category: "Support",
    question: "Does your partner show concrete support for and genuine interest in things that are important to you?",
    guideline: "If your partner shows substantial support and interest in ways that make a real difference, you're in a relationship that's too good to leave.",
    quickTake: "Being there when it counts is respect that delivers.",
    weight: 3,
    reversed: true
  },
  {
    id: 27,
    category: "Value",
    question: "Would you lose anything important if your partner were no longer your partner?",
    guideline: "If you wouldn't lose anything you couldn't do without, your partner doesn't have anything real to offer you.",
    quickTake: "There's no need to keep something you wouldn't miss or don't value.",
    weight: 2,
    reversed: true
  },
  {
    id: 28,
    category: "Healing",
    question: "Whatever hurt was caused, do you sense that the pain and damage have lessened with time?",
    guideline: "If there continues to be a lessening in pain, hurt, fear, and anger over time, your relationship can heal.",
    quickTake: "Time heals all healable wounds.",
    weight: 3,
    reversed: true
  },
  {
    id: 29,
    category: "Forgiveness",
    question: "Is there a demonstrated capacity and mechanism for genuine forgiveness in your relationship?",
    guideline: "If there's demonstrated capacity for genuine forgiveness, including letting go and feeling sorry, this relationship can survive injury.",
    quickTake: "If you can't find your way back to forgiveness, you can't find your way back to each other.",
    weight: 3,
    reversed: true
  },
  {
    id: 30,
    category: "Needs",
    question: "Is it likely that you and your partner can work out ways to meet reasonable needs without too painful a struggle?",
    guideline: "If you've lost hope of getting reasonable needs met without painful struggle, you'll be happy if you leave.",
    quickTake: "Frustration, fear, and deprivation tell you this relationship is not your home.",
    weight: 3,
    reversed: true
  },
  {
    id: 31,
    category: "Life Goals",
    question: "Is there a need so important that without it your life won't be satisfying, and you're discouraged about getting it met?",
    guideline: "If your partner blocks a life-defining need and you can't work out a resolution, you'll be happy if you leave.",
    quickTake: "Beware of unmet needs so important they sow the seeds of hate.",
    weight: 4
  },
  {
    id: 32,
    category: "Intimacy",
    question: "Does it feel like your partner's main interest in getting close is subjecting you to anger and criticism?",
    guideline: "If your partner mainly uses closeness to express anger and criticism, you'll never feel close or safe.",
    quickTake: "If getting close feels like entering a boxing ring, it's time to end the match.",
    weight: 3
  },
  {
    id: 33,
    category: "Intimacy",
    question: "When intimacy comes up, is there generally a battle over what it is and how to get it?",
    guideline: "If you cannot agree about intimacy and holding positions is more important than bridging differences, most are happy they left.",
    quickTake: "If getting close drives you apart, you can never get close.",
    weight: 2
  },
  {
    id: 34,
    category: "Joy",
    question: "Does your relationship support you having fun together?",
    guideline: "If having fun together is no longer a possibility and you live without hope of fun again, most are happy they leave.",
    quickTake: "Fun is the glue of love.",
    weight: 2,
    reversed: true
  },
  {
    id: 35,
    category: "Future",
    question: "Do you currently share goals and dreams for your life together?",
    guideline: "If you share a meaningful goal or dream that gives satisfaction and meaning, your relationship is too good to leave.",
    quickTake: "Sharing a passion makes it easier to share a life.",
    weight: 3,
    reversed: true
  },
  {
    id: 36,
    category: "Ambivalence",
    question: "If all problems were magically solved today, would you still feel ambivalent about staying or leaving?",
    guideline: "If you'd still be ambivalent even without problems, you're indicating deep discomfort with your partner or relationship.",
    quickTake: "If you don't know whether you want to stay even if nothing were wrong, then you don't want to stay.",
    weight: 4
  }
];

export const categories = [
  { id: "Foundation", name: "Relationship Foundation", icon: "🏗️" },
  { id: "Safety", name: "Safety & Security", icon: "🛡️" },
  { id: "Trust", name: "Trust & Honesty", icon: "🤝" },
  { id: "Communication", name: "Communication", icon: "💬" },
  { id: "Respect", name: "Respect & Value", icon: "🙏" },
  { id: "Connection", name: "Connection & Intimacy", icon: "❤️" },
  { id: "Support", name: "Support & Care", icon: "🤗" },
  { id: "Change", name: "Growth & Change", icon: "🌱" },
  { id: "Future", name: "Shared Future", icon: "🎯" },
  { id: "Joy", name: "Joy & Fun", icon: "🎉" }
];

export const getQuestionsByCategory = (categoryId) => {
  return diagnosticQuestions.filter(q => q.category === categoryId);
};

export const getCriticalQuestions = () => {
  return diagnosticQuestions.filter(q => q.critical);
};

export const calculateScore = (answers) => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  let redFlags = [];
  let greenFlags = [];

  diagnosticQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      maxPossibleScore += question.weight;
      
      // For reversed questions, "Yes" is good
      // For normal questions, "No" is good
      const isPositive = question.reversed ? answer === true : answer === false;
      
      if (isPositive) {
        totalScore += question.weight;
        if (question.weight >= 3) {
          greenFlags.push(question);
        }
      } else {
        if (question.critical || question.weight >= 4) {
          redFlags.push(question);
        }
      }
    }
  });

  const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  return {
    score: totalScore,
    maxScore: maxPossibleScore,
    percentage: Math.round(percentage),
    redFlags,
    greenFlags,
    recommendation: getRecommendation(percentage, redFlags)
  };
};

const getRecommendation = (percentage, redFlags) => {
  const hasCriticalIssues = redFlags.some(q => q.critical);
  
  if (hasCriticalIssues) {
    return {
      type: "critical",
      title: "Immediate Attention Required",
      message: "Your relationship has critical issues that require immediate attention or intervention."
    };
  }
  
  if (percentage >= 80) {
    return {
      type: "healthy",
      title: "Healthy Relationship",
      message: "Your relationship shows strong signs of health and resilience."
    };
  } else if (percentage >= 60) {
    return {
      type: "work-needed",
      title: "Work Needed",
      message: "Your relationship has potential but needs attention in several areas."
    };
  } else if (percentage >= 40) {
    return {
      type: "serious-concerns",
      title: "Serious Concerns",
      message: "There are serious concerns about the health of your relationship."
    };
  } else {
    return {
      type: "danger",
      title: "Relationship in Danger",
      message: "Your relationship shows multiple signs of being unhealthy or unsustainable."
    };
  }
};