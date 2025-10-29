"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const skillsData = [
  // 10 Technical Skills
  { name: "SQL", category: "Tech" },
  { name: "Python", category: "Tech" },
  { name: "Tableau", category: "Tech" },
  { name: "Power BI", category: "Tech" },
  { name: "AWS", category: "Tech" },
  { name: "Azure", category: "Tech" },
  { name: "R", category: "Tech" },
  { name: "scikit-learn", category: "Tech" },
  { name: "TensorFlow", category: "Tech" },
  { name: "XGBoost", category: "Tech" },
  // 6 Analytics Skills
  { name: "Pricing Analytics", category: "Analytics" },
  { name: "A/B Testing", category: "Analytics" },
  { name: "Forecasting", category: "Analytics" },
  { name: "Causal Inference", category: "Analytics" },
  { name: "Customer Segmentation", category: "Analytics" },
  { name: "Fraud Detection", category: "Analytics" },
  // 4 Soft Skills
  { name: "Storytelling", category: "Soft Skills" },
  { name: "Leadership", category: "Soft Skills" },
  { name: "Stakeholder Mgmt", category: "Soft Skills" },
  { name: "Presentation", category: "Soft Skills" },
];

export default function SkillsGame() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchedPairs === skillsData.length) {
      setGameComplete(true);
      localStorage.setItem("skillsGameBestScore", moves.toString());
    }
  }, [matchedPairs, moves]);

  const initializeGame = () => {
    const shuffled = [...skillsData]
      .sort(() => Math.random() - 0.5)
      .map((skill, index) => ({
        id: index,
        name: skill.name,
        category: skill.category,
        isFlipped: false,
        isMatched: false,
      }));
    setSkills(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      skills[id].isMatched
    ) {
      return;
    }

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newSkills = [...skills];
    newSkills[id].isFlipped = true;
    setSkills(newSkills);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (skills[first].category === skills[second].category) {
        // Match found
        setTimeout(() => {
          const updatedSkills = [...skills];
          updatedSkills[first].isMatched = true;
          updatedSkills[second].isMatched = true;
          setSkills(updatedSkills);
          setMatchedPairs(matchedPairs + 2);
          setFlippedCards([]);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          const updatedSkills = [...skills];
          updatedSkills[first].isFlipped = false;
          updatedSkills[second].isFlipped = false;
          setSkills(updatedSkills);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tech":
        return "from-slate-800 to-blue-950";
      case "Analytics":
        return "from-secondary to-secondary-dark";
      case "Soft Skills":
        return "from-accent to-accent-dark";
      default:
        return "from-primary to-secondary";
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Skills <span className="gradient-text">Game</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Match skills by category to reveal my expertise!
          </p>

          {/* Game Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <div className="text-2xl font-bold font-mono text-primary">
                {moves}
              </div>
              <div className="text-sm text-foreground/60">Moves</div>
            </div>
            <div className="bg-card border border-border rounded-lg px-6 py-3">
              <div className="text-2xl font-bold font-mono text-secondary">
                {matchedPairs}/{skillsData.length}
              </div>
              <div className="text-sm text-foreground/60">Matched</div>
            </div>
          </div>

          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary rounded-lg p-6 mb-8 inline-block"
            >
              <Trophy className="inline text-primary mb-2" size={32} />
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="text-foreground/80">
                You completed the game in {moves} moves!
              </p>
              <button
                onClick={initializeGame}
                className="mt-4 px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary-dark transition-all"
              >
                Play Again
              </button>
            </motion.div>
          )}

          {!gameComplete && (
            <button
              onClick={initializeGame}
              className="px-6 py-2 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-all"
            >
              Reset Game
            </button>
          )}
        </motion.div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: skill.id * 0.05 }}
              onClick={() => handleCardClick(skill.id)}
              className="aspect-square cursor-pointer card-flip-container"
            >
              <div
                className={`card-flip-inner ${
                  skill.isFlipped || skill.isMatched ? "flipped" : ""
                }`}
              >
                {/* Card Back */}
                <div className="card-face card-face-back bg-card border-2 border-border rounded-lg flex items-center justify-center">
                  <div className="text-4xl">?</div>
                </div>

                {/* Card Front */}
                <div
                  className={`card-face card-face-front bg-gradient-to-br ${getCategoryColor(
                    skill.category
                  )} border-2 ${
                    skill.isMatched ? "border-primary" : "border-transparent"
                  } rounded-lg p-4 flex flex-col items-center justify-center`}
                >
                  <div className="text-lg font-extrabold text-center mb-2">
                    {skill.name}
                  </div>
                  <div className="text-base font-bold opacity-90">{skill.category}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-primary to-primary-dark rounded"></div>
              <span className="text-sm">Tech</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-secondary to-secondary-dark rounded"></div>
              <span className="text-sm">Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-accent to-accent-dark rounded"></div>
              <span className="text-sm">Soft Skills</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
