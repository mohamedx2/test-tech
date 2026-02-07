/**
 * ============================================
 * 🪝 HOOK : useTypingEffect
 * ============================================
 * 
 * Simule l'effet de frappe au clavier (typewriter).
 * Parfait pour le thème Cyberpunk/Terminal !
 * 
 * FONCTIONNALITÉS :
 * - Délai configurable entre caractères
 * - Support de plusieurs textes en boucle
 * - Pause entre les textes
 * - Mode suppression (backspace)
 */

"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  /** Textes à afficher en boucle */
  texts: string[];
  /** Vitesse de frappe en ms */
  typingSpeed?: number;
  /** Vitesse de suppression en ms */
  deletingSpeed?: number;
  /** Pause après avoir écrit un texte complet */
  pauseAfterTyping?: number;
  /** Pause avant de commencer à supprimer */
  pauseBeforeDeleting?: number;
  /** Boucler sur les textes */
  loop?: boolean;
  /** Démarrer automatiquement */
  autoStart?: boolean;
}

interface TypingEffectState {
  /** Texte actuellement affiché */
  displayText: string;
  /** Index du texte actuel dans le tableau */
  currentIndex: number;
  /** Est-ce qu'on est en train de supprimer */
  isDeleting: boolean;
  /** Est-ce que l'animation est terminée */
  isComplete: boolean;
  /** Est-ce qu'on est en pause */
  isPaused: boolean;
}

export function useTypingEffect(options: UseTypingEffectOptions): TypingEffectState & {
  /** Redémarrer l'animation */
  restart: () => void;
  /** Mettre en pause */
  pause: () => void;
  /** Reprendre */
  resume: () => void;
} {
  const {
    texts,
    typingSpeed = 50,
    deletingSpeed = 30,
    pauseAfterTyping = 2000,
    pauseBeforeDeleting = 500,
    loop = true,
    autoStart = true,
  } = options;
  
  const [state, setState] = useState<TypingEffectState>({
    displayText: "",
    currentIndex: 0,
    isDeleting: false,
    isComplete: false,
    isPaused: !autoStart,
  });
  
  useEffect(() => {
    if (state.isPaused || state.isComplete || texts.length === 0) return;
    
    const currentText = texts[state.currentIndex];
    
    let timeout: NodeJS.Timeout;
    
    if (!state.isDeleting) {
      // Mode frappe
      if (state.displayText.length < currentText.length) {
        // Continuer à taper
        timeout = setTimeout(() => {
          setState(prev => ({
            ...prev,
            displayText: currentText.slice(0, prev.displayText.length + 1),
          }));
        }, typingSpeed);
      } else {
        // Texte complet - pause puis supprimer
        timeout = setTimeout(() => {
          if (!loop && state.currentIndex === texts.length - 1) {
            // Dernier texte et pas de boucle
            setState(prev => ({ ...prev, isComplete: true }));
          } else {
            setState(prev => ({ ...prev, isDeleting: true }));
          }
        }, pauseAfterTyping);
      }
    } else {
      // Mode suppression
      if (state.displayText.length > 0) {
        timeout = setTimeout(() => {
          setState(prev => ({
            ...prev,
            displayText: prev.displayText.slice(0, -1),
          }));
        }, deletingSpeed);
      } else {
        // Texte supprimé - passer au suivant
        timeout = setTimeout(() => {
          setState(prev => ({
            ...prev,
            isDeleting: false,
            currentIndex: (prev.currentIndex + 1) % texts.length,
          }));
        }, pauseBeforeDeleting);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [
    state.displayText,
    state.currentIndex,
    state.isDeleting,
    state.isPaused,
    state.isComplete,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseBeforeDeleting,
    loop,
  ]);
  
  const restart = useCallback(() => {
    setState({
      displayText: "",
      currentIndex: 0,
      isDeleting: false,
      isComplete: false,
      isPaused: false,
    });
  }, []);
  
  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);
  
  const resume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);
  
  return { ...state, restart, pause, resume };
}

export default useTypingEffect;
