import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

type TimerControlsProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function TimerControls({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset 
}: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      {isRunning ? (
        <Button 
          size="lg"
          variant="outline"
          onClick={onPause}
        >
          <Pause className="mr-2 h-5 w-5" />
          Pause
        </Button>
      ) : (
        <Button 
          size="lg"
          onClick={onStart}
        >
          <Play className="mr-2 h-5 w-5" />
          Start
        </Button>
      )}
      
      <Button
        size="lg"
        variant="ghost"
        onClick={onReset}
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  );
}
