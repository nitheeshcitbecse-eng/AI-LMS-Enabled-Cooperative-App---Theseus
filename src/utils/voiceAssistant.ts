// Browser Web Speech API Utility with Robust Speech Synthesis & Recognition

// Ensure speech synthesis voices are loaded
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const speakText = (text: string, lang: string = 'en') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    // Cancel any current utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Map language tags
    if (lang === 'ta') utterance.lang = 'ta-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'te') utterance.lang = 'te-IN';
    else if (lang === 'bn') utterance.lang = 'bn-IN';
    else utterance.lang = 'en-IN';

    // Find best voice match if available
    if (cachedVoices.length === 0) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
    const matchingVoice = cachedVoices.find(v => v.lang.startsWith(utterance.lang) || v.lang.startsWith(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
};

export interface VoiceRecognizedFields {
  name?: string;
  email?: string;
  role?: 'trainee' | 'trainer' | 'admin';
  institute?: string;
  command?: 'signup' | 'signin' | 'submit' | 'help' | 'unknown';
}

export const parseVoiceInputForAuth = (transcript: string): VoiceRecognizedFields => {
  const lower = transcript.toLowerCase();
  const fields: VoiceRecognizedFields = {};

  // Parse Role
  if (lower.includes('admin') || lower.includes('administrator') || lower.includes('institution')) {
    fields.role = 'admin';
  } else if (lower.includes('trainer') || lower.includes('faculty') || lower.includes('teacher') || lower.includes('suresh')) {
    fields.role = 'trainer';
  } else if (lower.includes('trainee') || lower.includes('student') || lower.includes('learner') || lower.includes('ramesh')) {
    fields.role = 'trainee';
  }

  // Parse Command
  if (lower.includes('sign up') || lower.includes('register') || lower.includes('create account')) {
    fields.command = 'signup';
  } else if (lower.includes('sign in') || lower.includes('login') || lower.includes('access')) {
    fields.command = 'signin';
  } else if (lower.includes('submit') || lower.includes('go') || lower.includes('proceed')) {
    fields.command = 'submit';
  }

  // Parse Institute
  if (lower.includes('chennai')) fields.institute = 'ICM Chennai';
  else if (lower.includes('hyderabad')) fields.institute = 'RICM Hyderabad';
  else if (lower.includes('bengaluru') || lower.includes('bangalore')) fields.institute = 'RICM Bengaluru';
  else if (lower.includes('pune') || lower.includes('vamnicom')) fields.institute = 'VAMNICOM Pune';

  // Extract Name (e.g. "Ramesh Sharma", "Dr. Suresh")
  if (lower.includes('ramesh')) fields.name = 'Ramesh Sharma';
  else if (lower.includes('suresh')) fields.name = 'Dr. Suresh Kumar';
  else if (lower.includes('meena')) fields.name = 'Meena Krishnan';
  else {
    const nameMatch = lower.match(/(?:my name is|name is|i am|name)\s+([a-z\s]+)/i);
    if (nameMatch && nameMatch[1]) {
      const rawName = nameMatch[1].trim();
      if (rawName && !['trainee', 'trainer', 'admin', 'sign up', 'login'].includes(rawName)) {
        fields.name = rawName.replace(/\b\w/g, l => l.toUpperCase());
      }
    }
  }

  // Extract Email
  const emailMatch = lower.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    fields.email = emailMatch[1];
  } else if (fields.name) {
    fields.email = `${fields.name.toLowerCase().replace(/[^a-z]/g, '')}@ncct.gov.in`;
  }

  return fields;
};

// Real Browser Microphone Web Speech Recognition Listener
export const listenToMicrophone = (
  onResult: (transcript: string) => void,
  onError?: (errMessage: string) => void
): (() => void) | null => {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError('Web Speech API is not natively supported in this browser. Please use Google Chrome or Microsoft Edge.');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      if (onError) onError(`Speech recognition error: ${event.error || 'Permission denied'}`);
    };

    recognition.start();

    return () => {
      try {
        recognition.stop();
      } catch (e) {
        // ignore
      }
    };
  } catch (err: any) {
    if (onError) onError(err.message || 'Microphone activation failed');
    return null;
  }
};
