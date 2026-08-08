import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Step1Login from './components/Step1Login';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // User flow state variables
  const [selectedTrack, setSelectedTrack] = useState('BOTH');
  const [selectedFrontend, setSelectedFrontend] = useState(['html', 'css', 'javascript', 'react']);
  const [selectedBackend, setSelectedBackend] = useState(['nodejs', 'express', 'mongodb']);

  // Skill Tree state
  const [treeState, setTreeState] = useState({
    root: 'not_started',
    fe: 'strong',
    be: 'not_started',
    html: 'not_started',
    css: 'not_started',
    javascript: 'moderate',
    nodejs: 'not_started',
    db: 'locked',
    react: 'locked',
    express: 'locked',
    mongodb: 'locked'
  });

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Login
            onContinue={() => {
              setIsLoggedIn(true);
              setCurrentStep(2);
            }}
          />
        );

      case 2:
        return (
          <Step2TrackSelection
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
            onContinue={() => {
              if (selectedTrack === 'BACKEND') {
                setCurrentStep(4);
              } else {
                setCurrentStep(3);
              }
            }}
          />
        );

      case 3:
        return (
          <Step3FrontendSkills
            selectedSkills={selectedFrontend}
            setSelectedSkills={setSelectedFrontend}
            onContinue={() => {
              if (selectedTrack === 'BOTH' || selectedTrack === 'BACKEND') {
                setCurrentStep(4);
              } else {
                setCurrentStep(5);
              }
            }}
          />
        );

      case 4:
        return (
          <Step4BackendSkills
            selectedBackend={selectedBackend}
            setSelectedBackend={setSelectedBackend}
            onGenerateTree={() => {
              setCurrentStep(5);
            }}
          />
        );

      case 5:
        return (
          <Step5SkillTree
            treeState={treeState}
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
