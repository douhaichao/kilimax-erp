import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  CheckCircle2, 
  Lock, 
  Trophy, 
  Star,
  MessageCircle,
  Play,
  Clock
} from 'lucide-react';
import { OnboardingData, OnboardingStep } from '@/pages/OnboardingJourney';

interface MissionControlProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onGoToStep: (step: OnboardingStep) => void;
  data: OnboardingData;
}

interface TaskCard {
  id: string;
  icon: any;
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'active' | 'locked';
  estimatedTime: string;
  badge?: string;
}

const tasks: TaskCard[] = [
  {
    id: 'add-product',
    icon: Package,
    title: 'Add First Product',
    description: 'Create your first product in the system',
    progress: 70,
    status: 'active',
    estimatedTime: '2-3 minutes',
    badge: 'Almost there!'
  },
  {
    id: 'create-customer',
    icon: Users,
    title: 'Create a Customer',
    description: 'Add your first customer profile',
    progress: 0,
    status: 'active',
    estimatedTime: '1-2 minutes'
  },
  {
    id: 'generate-order',
    icon: ShoppingCart,
    title: 'Generate an Order',
    description: 'Create your first sales order',
    progress: 0,
    status: 'locked',
    estimatedTime: '3-4 minutes'
  }
];

const achievements = [
  {
    id: 'novice',
    title: 'Novice Explorer',
    description: 'Complete your first task',
    icon: Star,
    unlocked: false
  },
  {
    id: 'champion',
    title: 'Setup Champion',
    description: 'Complete all startup missions',
    icon: Trophy,
    unlocked: false
  }
];

export const MissionControl: React.FC<MissionControlProps> = ({ onNext, onGoToStep, data }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>(data.completedTasks || []);

  const handleTaskClick = (taskId: string) => {
    if (taskId === 'add-product') {
      setShowProductModal(true);
    } else if (taskId === 'create-customer') {
      onGoToStep('customer-creation');
    }
  };

  const completeTask = (taskId: string) => {
    const newCompleted = [...completedTasks, taskId];
    setCompletedTasks(newCompleted);
    onNext({ completedTasks: newCompleted });
    
    if (taskId === 'add-product') {
      setShowProductModal(false);
    }
  };

  const getTaskStatus = (task: TaskCard) => {
    if (completedTasks.includes(task.id)) return 'completed';
    if (task.id === 'generate-order' && !completedTasks.includes('create-customer')) return 'locked';
    return task.status;
  };

  const completionPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 4 of 7</span>
            <span className="text-sm font-medium text-primary">60% Complete</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Complete your startup mission
          </h1>
          <p className="text-muted-foreground">
            Let's get your business up and running with these essential tasks
          </p>
        </div>

        {/* Progress Overview */}
        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Mission Progress</CardTitle>
              <div className="text-3xl font-bold text-primary">{Math.round(completionPercentage)}%</div>
            </CardHeader>
            <CardContent>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {completedTasks.length} of {tasks.length} tasks completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Task Cards */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tasks.map((task) => {
              const Icon = task.icon;
              const status = getTaskStatus(task);
              const isCompleted = status === 'completed';
              const isLocked = status === 'locked';
              
              return (
                <Card 
                  key={task.id}
                  className={`relative transition-all duration-300 ${
                    isLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : isCompleted
                      ? 'ring-2 ring-secondary bg-secondary/5'
                      : 'cursor-pointer hover:shadow-lg hover:-translate-y-1'
                  }`}
                  onClick={() => !isLocked && !isCompleted && handleTaskClick(task.id)}
                >
                  {/* Status Icon */}
                  <div className="absolute -top-3 -right-3">
                    {isCompleted ? (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    ) : isLocked ? (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ) : null}
                  </div>

                  {/* Badge */}
                  {task.badge && !isCompleted && !isLocked && (
                    <div className="absolute -top-2 left-4">
                      <Badge variant="secondary" className="text-xs">
                        {task.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      isCompleted 
                        ? 'bg-secondary/10' 
                        : isLocked 
                        ? 'bg-muted' 
                        : 'bg-primary/10'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isCompleted 
                          ? 'text-secondary' 
                          : isLocked 
                          ? 'text-muted-foreground' 
                          : 'text-primary'
                      }`} />
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Progress Bar */}
                    {!isCompleted && !isLocked && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}

                    {/* Estimated Time */}
                    {!isCompleted && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{task.estimatedTime}</span>
                      </div>
                    )}

                    {/* Completed Status */}
                    {isCompleted && (
                      <div className="text-center">
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievement Preview */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-center mb-4">Achievement Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              const isUnlocked = completedTasks.length >= 1 || (achievement.id === 'champion' && completedTasks.length === tasks.length);
              
              return (
                <Card key={achievement.id} className={`text-center ${isUnlocked ? 'bg-secondary/5 border-secondary' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      isUnlocked ? 'bg-secondary/10' : 'bg-muted'
                    }`}>
                      <Icon className={`w-6 h-6 ${isUnlocked ? 'text-secondary' : 'text-muted-foreground'}`} />
                    </div>
                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {isUnlocked && (
                      <Badge variant="secondary" className="mt-2">
                        Unlocked!
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-md mx-auto text-center">
          <Card className="border-dashed">
            <CardContent className="p-6">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                Need help? Ask our AI assistant
              </p>
              <Button variant="outline" size="sm">
                Get Help
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        {completedTasks.length >= 2 && (
          <div className="max-w-md mx-auto mt-8">
            <Button onClick={() => onNext({})} className="w-full h-12 text-lg">
              Continue to Learning Hub
            </Button>
          </div>
        )}
      </div>

      {/* Product Creation Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Your First Product</DialogTitle>
            <DialogDescription>
              Let's create a simple product to get you started.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Product Creation Form */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <input 
                    className="w-full px-3 py-2 border rounded-md text-sm" 
                    placeholder="Premium Coffee Beans"
                    defaultValue="Premium Coffee Beans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <input 
                    className="w-full px-3 py-2 border rounded-md text-sm" 
                    placeholder="$29.99"
                    defaultValue="$29.99"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full px-3 py-2 border rounded-md text-sm">
                    <option>Food & Beverage</option>
                  </select>
                </div>
              </div>
              
              {/* Live System Preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Live Preview - Product in System</h4>
                
                {/* Product Card Preview */}
                <div className="bg-card border rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Premium Coffee Beans</h4>
                      <p className="text-xs text-muted-foreground">Food & Beverage</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium text-primary">$29.99</span>
                        <Badge variant="secondary" className="text-xs">In Stock</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Inventory Preview */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <h5 className="text-xs font-medium mb-2">Inventory Status</h5>
                  <div className="flex justify-between text-xs">
                    <span>Stock Level:</span>
                    <span className="font-medium">50 units</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Reorder Point:</span>
                    <span className="font-medium">10 units</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => completeTask('add-product')} 
              className="w-full"
            >
              Create Product & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};