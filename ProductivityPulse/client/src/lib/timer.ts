import { create } from 'zustand'

export type TimerMode = {
  id: string;
  name: string;
  workMinutes: number;
  breakMinutes: number;
  description: string;
}

export type TimerPhase = 'work' | 'break' | 'idle';

type TimerState = {
  timeLeft: number;
  phase: TimerPhase;
  isRunning: boolean;
  selectedMode: TimerMode;
  setMode: (mode: TimerMode) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  adjustTime: (seconds: number) => void;
}

export const TIMER_MODES: TimerMode[] = [
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    workMinutes: 25,
    breakMinutes: 5,
    description: 'Classic 25/5 minute intervals for focused work'
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    workMinutes: 45,
    breakMinutes: 15,
    description: 'Longer sessions for complex tasks'
  },
  {
    id: 'sprint',
    name: 'Sprint',
    workMinutes: 15,
    breakMinutes: 3,
    description: 'Short bursts for quick tasks'
  }
];

const useTimer = create<TimerState>((set, get) => ({
  timeLeft: TIMER_MODES[0].workMinutes * 60,
  phase: 'idle',
  isRunning: false,
  selectedMode: TIMER_MODES[0],

  setMode: (mode) => {
    set({ selectedMode: mode, timeLeft: mode.workMinutes * 60, phase: 'idle', isRunning: false });
  },

  start: () => {
    const state = get();
    if (state.phase === 'idle') {
      set({ phase: 'work', isRunning: true });
    } else {
      set({ isRunning: true });
    }
  },

  pause: () => {
    set({ isRunning: false });
  },

  reset: () => {
    const { selectedMode } = get();
    set({ 
      timeLeft: selectedMode.workMinutes * 60,
      phase: 'idle',
      isRunning: false
    });
  },

  adjustTime: (seconds) => {
    const state = get();
    const newTime = Math.max(0, state.timeLeft + seconds);
    set({ timeLeft: newTime });
  },

  tick: () => {
    const state = get();
    if (!state.isRunning) return;

    if (state.timeLeft > 0) {
      set({ timeLeft: state.timeLeft - 1 });
    } else {
      // Phase transition
      const newPhase = state.phase === 'work' ? 'break' : 'work';
      const minutes = newPhase === 'work' 
        ? state.selectedMode.workMinutes 
        : state.selectedMode.breakMinutes;

      // Play notification sound
      new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play()
        .catch(() => {
          // Fallback to beep if the audio fails to load
          new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play()
            .catch(() => {});
        });

      set({ 
        phase: newPhase,
        timeLeft: minutes * 60
      });
    }
  }
}));

export default useTimer;