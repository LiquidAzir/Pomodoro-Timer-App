import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TimerMode } from "@/lib/timer";
import { Clock, Brain, Zap } from "lucide-react";

const ICONS = {
  'pomodoro': Clock,
  'deep-work': Brain,
  'sprint': Zap
};

type ModeSelectorProps = {
  modes: TimerMode[];
  selectedMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
};

export default function ModeSelector({ 
  modes, 
  selectedMode, 
  onModeChange 
}: ModeSelectorProps) {
  return (
    <Card className="w-full max-w-md mt-8">
      <CardContent className="pt-6">
        <RadioGroup 
          value={selectedMode.id}
          onValueChange={(value) => {
            const mode = modes.find(m => m.id === value);
            if (mode) onModeChange(mode);
          }}
        >
          {modes.map((mode) => {
            const Icon = ICONS[mode.id as keyof typeof ICONS];
            return (
              <div 
                key={mode.id}
                className="flex items-center space-x-2 mb-4"
              >
                <RadioGroupItem value={mode.id} id={mode.id} />
                <Label 
                  htmlFor={mode.id}
                  className="flex-1 flex items-center cursor-pointer"
                >
                  <div className="ml-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{mode.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mode.description}
                    </p>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
