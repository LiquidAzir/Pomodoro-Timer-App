import { useEffect } from "react";
import useTimer, { TIMER_MODES } from "@/lib/timer";
import TimerDisplay from "@/components/timer/display";
import TimerControls from "@/components/timer/controls";
import ModeSelector from "@/components/timer/mode-selector";

export default function Home() {
  const timer = useTimer();

  useEffect(() => {
    const interval = setInterval(() => {
      timer.tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer.timeLeft / 60);
  const seconds = timer.timeLeft % 60;

  // Update document title with timer
  useEffect(() => {
    const formatNumber = (n: number) => n.toString().padStart(2, '0');
    document.title = timer.phase === 'idle'
      ? 'Pomodoro Timer'
      : `${formatNumber(minutes)}:${formatNumber(seconds)} - ${timer.phase === 'work' ? 'Focus' : 'Break'}`;
  }, [minutes, seconds, timer.phase]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
        Focus Timer
      </h1>

      <TimerDisplay
        minutes={minutes}
        seconds={seconds}
        phase={timer.phase}
        onAdjustTime={timer.adjustTime}
      />

      <TimerControls
        isRunning={timer.isRunning}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
      />

      <ModeSelector
        modes={TIMER_MODES}
        selectedMode={timer.selectedMode}
        onModeChange={timer.setMode}
      />
    </div>
  );
}