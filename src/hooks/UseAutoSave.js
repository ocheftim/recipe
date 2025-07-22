// useAutoSave.js
import { useEffect } from 'react';

export function useAutoSave({ isDirty, isSaving, onSave }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty && !isSaving) {
        onSave();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDirty, isSaving, onSave]);
}
