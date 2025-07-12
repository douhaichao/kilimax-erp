import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Package, 
  Calculator, 
  Star, 
  Play, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Lightbulb,
  Target
} from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface PersonalizedLearningHubProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  progress: number;
  isRecommended: boolean;
  isLocked: boolean;
  modules: string[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'inventory',
    title: 'Inventory Pro',
    description: 'Master inventory management and stock control',
    icon: Package,
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    progress: 0,
    isRecommended: true,
    isLocked: false,
    modules: ['Product Setup', 'Stock Levels', 'Reorder Points', 'Inventory Reports']
  },
  {
    id: 'financial',
    title: 'Financial Wizard',
    description: 'Learn accounting and financial reporting',
    icon: Calculator,
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    progress: 0,
    isRecommended: false,
    isLocked: true,
    modules: ['Chart of Accounts', 'Invoicing', 'Payment Processing', 'Financial Reports']
  }
];

const resources = [
  {
    id: 'inventory-101',
    title: 'Inventory Management 101',
    type: 'Video',
    duration: '2 min',
    description: 'Quick overview of inventory basics',
    icon: Play
  },
  {
    id: 'po-guide',
    title: 'Quick Guide: PO Processing',
    type: 'Article',
    duration: '3 min read',
    description: 'Step-by-step purchase order workflow',
    icon: BookOpen
  }
];

const skillLevels = [
  { name: 'Setup Confidence', current: 3, max: 5 },
  { name: 'System Navigation', current: 4, max: 5 },
  { name: 'Data Management', current: 2, max: 5 }
];

export const PersonalizedLearningHub: React.FC<PersonalizedLearningHubProps> = ({ onNext, data }) => {
  const [selectedPath, setSelectedPath] = useState<string>('');

  const getStarRating = (current: number, max: number) => {
    return Array.from({ length: max }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < current ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const startLearningPath = (pathId: string) => {
    setSelectedPath(pathId);
    // In a real app, this would navigate to the learning module
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 6 of 7</span>
            <span className="text-sm font-medium text-primary">85% Complete</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your recommended next steps
          </h1>
          <p className="text-muted-foreground">
            Personalized learning paths based on your business needs and progress
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Recommended Learning Paths</h2>
              <div className="space-y-4">
                {learningPaths.map((path) => {
                  const Icon = path.icon;
                  const isSelected = selectedPath === path.id;
                  
                  return (
                    <Card 
                      key={path.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        path.isLocked 
                          ? 'opacity-60 cursor-not-allowed' 
                          : isSelected
                          ? 'ring-2 ring-primary shadow-lg'
                          : 'hover:shadow-md hover:-translate-y-1'
                      }`}
                      onClick={() => !path.isLocked && startLearningPath(path.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              path.isLocked 
                                ? 'bg-muted' 
                                : path.isRecommended 
                                ? 'bg-secondary/10' 
                                : 'bg-primary/10'
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                path.isLocked 
                                  ? 'text-muted-foreground' 
                                  : path.isRecommended 
                                  ? 'text-secondary' 
                                  : 'text-primary'
                              }`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <CardTitle className="text-lg">{path.title}</CardTitle>
                                {path.isRecommended && (
                                  <Badge variant="secondary" className="text-xs">
                                    Recommended
                                  </Badge>
                                )}
                                {path.isLocked && (
                                  <Badge variant="outline" className="text-xs">
                                    Locked
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="mb-3">
                                {path.description}
                              </CardDescription>
                              
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{path.difficulty}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{path.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {!path.isLocked && (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                      
                      {!path.isLocked && (
                        <CardContent>
                          <div className="space-y-3">
                            {/* Progress */}
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{path.progress}%</span>
                              </div>
                              <Progress value={path.progress} className="h-2" />
                            </div>
                            
                            {/* Modules */}
                            <div>
                              <p className="text-sm font-medium mb-2">What you'll learn:</p>
                              <div className="flex flex-wrap gap-1">
                                {path.modules.map((module, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {module}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quick Resources */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => {
                  const Icon = resource.icon;
                  
                  return (
                    <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {resource.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Skill Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillLevels.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-1">
                        {getStarRating(skill.current, skill.max)}
                      </div>
                    </div>
                    <Progress value={(skill.current / skill.max) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-secondary">
                  <Lightbulb className="w-5 h-5" />
                  <span>AI Insight</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Based on your actions, we suggest focusing on supply chain workflows next. 
                  You've shown strong engagement with product and customer management.
                </p>
              </CardContent>
            </Card>

            {/* Continue Button */}
            <Button onClick={() => onNext({})} className="w-full h-12 text-lg">
              Continue to Trial Success
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};