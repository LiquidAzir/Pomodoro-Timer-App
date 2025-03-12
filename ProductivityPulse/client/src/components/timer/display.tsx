import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TimerPhase } from "@/lib/timer";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type TimerDisplayProps = {
  minutes: number;
  seconds: number;
  phase: TimerPhase;
  onAdjustTime: (seconds: number) => void;
};

export default function TimerDisplay({ minutes, seconds, phase, onAdjustTime }: TimerDisplayProps) {
  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <Badge 
            variant={phase === 'work' ? 'default' : 'secondary'}
            className="text-lg px-4 py-1"
          >
            {phase === 'work' ? 'Focus Time' : phase === 'break' ? 'Break Time' : 'Ready'}
          </Badge>

          <motion.div 
            className="text-6xl font-bold font-mono tracking-wider"
            key={`${minutes}:${seconds}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {formatNumber(minutes)}:{formatNumber(seconds)}
          </motion.div>

          <div className="flex gap-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAdjustTime(-60)}
            >
              <Minus className="h-4 w-4 mr-1" />
              1m
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAdjustTime(-10)}
            >
              <Minus className="h-4 w-4 mr-1" />
              10s
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAdjustTime(10)}
            >
              <Plus className="h-4 w-4 mr-1" />
              10s
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAdjustTime(60)}
            >
              <Plus className="h-4 w-4 mr-1" />
              1m
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}