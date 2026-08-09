import React, { useState } from 'react';
import AppShell from './components/AppShell';
import Step1Login from './components/Step1Login';
import Step1bPresetSelection from './components/Step1bPresetSelection';
import Step2TrackSelection from './components/Step2TrackSelection';
import Step3FrontendSkills from './components/Step3FrontendSkills';
import Step4BackendSkills from './components/Step4BackendSkills';
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
  const [activeTab, setActiveTab]     = useState('landing');
  const [isLoggedIn, setIsLoggedIn]   = useState(false);

  /* Candidate selection for preset interviews */
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  /* Track / skill selection */
  const [selectedTrack,   setSelectedTrack]   = useState(null);
  const [selectedSkills,  setSelectedSkills]  = useState([]);
  const [selectedBackend, setSelectedBackend] = useState([]);

  /* Claim tree */
  const [claimTree, setClaimTree] = useState({
    frontend: {
      'React & Vite': 'CONFIDENT',
      'Streamlit': 'WEAK',
    },
    backend: {
      'FastAPI': 'CONFIDENT',
      'Vector Databases': 'FAMILIAR',
      'Retrieval Engine': 'CONFIDENT',
    },
    aiCore: {
      'Embeddings': 'CONFIDENT',
      'Multi-Agent Orchestration': 'FAMILIAR',
      'Model Context Protocol (MCP)': 'WEAK',
    },
    devOps: {
      'Docker & Kubernetes': 'WEAK',
      'Security Guardrails': 'FAMILIAR',
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Login
            onContinue={() => { setIsLoggedIn(true); setCurrentStep(1.5); }}
            onNavigateStep={(step) => {
              setIsLoggedIn(true);
              setCurrentStep(step);
            }}
          />
        );
      case 1.5:
        return (
          <Step1bPresetSelection
            onSelectPreset={(cand) => {
              setSelectedCandidate(cand);
              setCurrentStep(11);
            }}
            onCreateCustomStack={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2TrackSelection
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
            onContinue={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <Step3FrontendSkills
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            onContinue={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <Step4BackendSkills
            selectedBackend={selectedBackend}
            setSelectedBackend={setSelectedBackend}
            onGenerateTree={() => setCurrentStep(5)}
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
            selectedCandidate={selectedCandidate}
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
            onNavigateStep={step => setCurrentStep(step)}
          />
        );
    }
  };

  return (
    <AppShell
      currentStep={currentStep}
      setStep={setCurrentStep}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isLoggedIn={isLoggedIn}
    >
      {renderStep()}
    </AppShell>
  );
}
