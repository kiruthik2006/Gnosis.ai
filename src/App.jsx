import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Step1TargetProfile from './components/Step1TargetProfile';
import Step2AppStack from './components/Step2AppStack';
import Step3AICoreDevOps from './components/Step3AICoreDevOps';
import Step4ClaimTreePayload from './components/Step4ClaimTreePayload';
import Step5SkillTree from './components/Step5SkillTree';
import Step6Assessment from './components/Step6Assessment';
import Step7UpdatedTree from './components/Step7UpdatedTree';
import Step8Roadmap from './components/Step8Roadmap';
import Step9Courses from './components/Step9Courses';
import Step10Progress from './components/Step10Progress';
import Step11AIInterview from './components/Step11AIInterview';
import Step12Evaluation from './components/Step12Evaluation';
import Step13FinalTreeUpdate from './components/Step13FinalTreeUpdate';
import Step14FuturePath from './components/Step14FuturePath';
import Step15Dashboard from './components/Step15Dashboard';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Selected candidate profile state (Default: Sarah Johnson -> CAND-001)
  const [candidateId, setCandidateId] = useState('CAND-001');

  // Initial Claim Tree state (3-state confidence levels per category)
  const [claimTree, setClaimTree] = useState({
    frontend: {
      "React & Vite": "CONFIDENT",
      "Streamlit": "WEAK"
    },
    backend: {
      "FastAPI": "CONFIDENT",
      "Vector Databases": "FAMILIAR",
      "Retrieval Engine": "CONFIDENT"
    },
    aiCore: {
      "Embeddings": "CONFIDENT",
      "Multi-Agent Orchestration": "FAMILIAR",
      "Model Context Protocol (MCP)": "WEAK"
    },
    devOps: {
      "Docker & Kubernetes": "WEAK",
      "Security Guardrails": "FAMILIAR"
    }
  });

  // Handler to update skill proficiency state
  const handleUpdateSkill = (category, skillTitle, level) => {
    setClaimTree((prev) => {
      const updatedCat = { ...prev[category] };
      if (!level) {
        delete updatedCat[skillTitle];
      } else {
        updatedCat[skillTitle] = level;
      }
      return {
        ...prev,
        [category]: updatedCat
      };
    });
  };

  // Compiled payload output function
  const getCompiledPayload = () => ({
    candidateId,
    initialClaimTree: claimTree
  });

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1TargetProfile
            candidateId={candidateId}
            setCandidateId={setCandidateId}
            onContinue={() => setCurrentStep(2)}
          />
        );

      case 2:
        return (
          <Step2AppStack
            claimTree={claimTree}
            onUpdateSkill={handleUpdateSkill}
            onContinue={() => setCurrentStep(3)}
          />
        );

      case 3:
        return (
          <Step3AICoreDevOps
            claimTree={claimTree}
            onUpdateSkill={handleUpdateSkill}
            onContinue={() => setCurrentStep(4)}
          />
        );

      case 4:
        return (
          <Step4ClaimTreePayload
            payload={getCompiledPayload()}
            onProceed={() => setCurrentStep(5)}
          />
        );

      case 5:
        return (
          <Step5SkillTree
            claimTree={claimTree}
            onStartAssessment={() => setCurrentStep(6)}
          />
        );

      case 6:
        return (
          <Step6Assessment
            onCompleteAssessment={() => setCurrentStep(7)}
          />
        );

      case 7:
        return (
          <Step7UpdatedTree
            onGoToRoadmap={() => setCurrentStep(8)}
          />
        );

      case 8:
        return (
          <Step8Roadmap
            onStartCourse={() => setCurrentStep(9)}
            onGoToCourses={() => setCurrentStep(9)}
          />
        );

      case 9:
        return (
          <Step9Courses
            onCompleteCourse={() => {}}
            onProceedToInterview={() => setCurrentStep(10)}
          />
        );

      case 10:
        return (
          <Step10Progress
            onStartInterview={() => setCurrentStep(11)}
            onReviewTree={() => setCurrentStep(7)}
          />
        );

      case 11:
        return (
          <Step11AIInterview
            onFinishInterview={() => setCurrentStep(12)}
          />
        );

      case 12:
        return (
          <Step12Evaluation
            onUpdateTree={() => setCurrentStep(13)}
          />
        );

      case 13:
        return (
          <Step13FinalTreeUpdate
            onGoToFuturePath={() => setCurrentStep(14)}
          />
        );

      case 14:
        return (
          <Step14FuturePath
            onGoToDashboard={() => setCurrentStep(15)}
          />
        );

      case 15:
      default:
        return (
          <Step15Dashboard
            onNavigateStep={(stepNum) => setCurrentStep(stepNum)}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar
        currentStep={currentStep}
        setStep={setCurrentStep}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
      />
      <main>
        {renderStepComponent()}
      </main>
    </div>
  );
}
