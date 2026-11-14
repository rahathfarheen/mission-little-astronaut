import React, { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { NASA_EXHIBITS, NASA_QUIZ } from '../data/scienceData';
import { soundFx } from '../utils/audio';

export const ScienceCentreScreen = () => {
  const { navigateTo, unlockBadge } = useGame();
  const [activeExhibit, setActiveExhibit] = useState(NASA_EXHIBITS[0]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const handleExhibitClick = (exhibit) => {
    soundFx.play('click');
    setActiveExhibit(exhibit);
  };

  const handleSelectOption = (questionId, option) => {
    soundFx.play('click');
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    NASA_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id]?.correct) {
        score += 1;
      }
    });

    setQuizScore(score);
    if (score >= 3) {
      soundFx.play('success');
      unlockBadge('nasa-scholar');
    } else {
      soundFx.play('alert');
    }
  };

  return (
    <div className="game-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="badge-pill" style={{ background: 'rgba(6, 214, 160, 0.15)', color: 'var(--nebula-teal)', marginBottom: '4px' }}>
            🔬 NASA Official Science Exhibits
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#FFF' }}>
            NASA Lunar Science Learning Centre
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Discover real space exploration science, the Artemis missions, and human survival beyond Earth.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigateTo(SCREENS.OUTPOST)}
        >
          ← Return to Outpost
        </Button>
      </div>

      {/* Exhibit Category Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {NASA_EXHIBITS.map((exhibit) => {
          const isSelected = activeExhibit.id === exhibit.id;

          return (
            <div
              key={exhibit.id}
              onClick={() => handleExhibitClick(exhibit)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '16px',
                background: isSelected ? 'rgba(58, 134, 255, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: `2px solid ${isSelected ? exhibit.accent : 'rgba(255, 255, 255, 0.1)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '2rem' }}>{exhibit.icon}</span>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                  {exhibit.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: exhibit.accent, fontWeight: 700 }}>
                  {exhibit.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Exhibit Viewer */}
      <Card style={{ padding: '32px', marginBottom: '32px', border: `2px solid ${activeExhibit.accent}55` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2.8rem' }}>{activeExhibit.icon}</span>
          <div>
            <h3 style={{ fontSize: '1.6rem', color: activeExhibit.accent }}>
              {activeExhibit.title}
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              {activeExhibit.summary}
            </p>
          </div>
        </div>

        {/* Exhibit Sections */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          {activeExhibit.sections.map((sec, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '18px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <h4 style={{ fontSize: '1.05rem', color: '#FFF', marginBottom: '8px' }}>
                {sec.heading}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Fun Fact Callout Box */}
        <div
          style={{
            background: `radial-gradient(ellipse at 10% 50%, ${activeExhibit.accent}22 0%, rgba(0,0,0,0.4) 100%)`,
            border: `2px dashed ${activeExhibit.accent}`,
            padding: '16px 20px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '2rem' }}>💡</span>
          <div>
            <span style={{ fontWeight: 700, color: activeExhibit.accent, fontSize: '0.9rem' }}>
              Did You Know?
            </span>
            <div style={{ fontSize: '0.95rem', color: '#FFF', marginTop: '2px' }}>
              {activeExhibit.funFact}
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive NASA Cadet Science Quiz */}
      <Card style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--starlight-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span> NASA Cadet Knowledge Challenge
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Answer the questions correctly to earn the official <strong>NASA Science Scholar Badge</strong>!
            </p>
          </div>

          {quizScore !== null && (
            <div className="badge-pill" style={{ background: quizScore >= 3 ? 'rgba(6, 214, 160, 0.2)' : 'rgba(255, 209, 102, 0.2)', color: quizScore >= 3 ? '#06D6A0' : 'var(--starlight-gold)' }}>
              Score: {quizScore} / {NASA_QUIZ.length} Correct
            </div>
          )}
        </div>

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {NASA_QUIZ.map((q, qIndex) => {
            const selected = selectedAnswers[q.id];

            return (
              <div key={q.id} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '14px' }}>
                  {qIndex + 1}. {q.question}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                  {q.options.map((opt) => {
                    const isChosen = selected?.text === opt.text;
                    const showResult = quizScore !== null;

                    let btnStyle = {
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'var(--text-secondary)'
                    };

                    if (isChosen) {
                      btnStyle = {
                        background: 'rgba(58, 134, 255, 0.25)',
                        borderColor: '#3A86FF',
                        color: '#FFF'
                      };
                    }

                    if (showResult) {
                      if (opt.correct) {
                        btnStyle = { background: 'rgba(6, 214, 160, 0.25)', borderColor: '#06D6A0', color: '#FFF' };
                      } else if (isChosen && !opt.correct) {
                        btnStyle = { background: 'rgba(239, 71, 111, 0.25)', borderColor: '#EF476F', color: '#FFF' };
                      }
                    }

                    return (
                      <div
                        key={opt.label}
                        onClick={() => handleSelectOption(q.id, opt)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: `2px solid ${btnStyle.borderColor}`,
                          background: btnStyle.background,
                          color: btnStyle.color,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontWeight: 800 }}>{opt.label}.</span>
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                {quizScore !== null && (
                  <div style={{ fontSize: '0.85rem', color: selected?.correct ? '#06D6A0' : '#FFD166', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '10px' }}>
                    💡 <strong>NASA Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <Button
            variant="gold"
            size="lg"
            icon="⭐"
            onClick={handleGradeQuiz}
          >
            {quizScore !== null ? 'Re-Check Answers' : 'Submit Answers & Calculate Score'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
