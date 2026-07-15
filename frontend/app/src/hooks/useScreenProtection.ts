import { useEffect } from 'react';

/**
 * Blacks out the page whenever a screenshot or screen recording is attempted.
 * Covers:
 *  - PrintScreen key (Windows/Linux)
 *  - Cmd+Shift+3/4/5 (macOS screenshots)
 *  - Ctrl+PrintScreen / Alt+PrintScreen
 *  - visibilitychange (screen recording software grabs focus)
 */
export function useScreenProtection() {
  useEffect(() => {
    let blackoutEl: HTMLDivElement | null = null;

    const blackout = () => {
      if (blackoutEl) return;
      blackoutEl = document.createElement('div');
      Object.assign(blackoutEl.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '999999',
        background: '#000',
        pointerEvents: 'none',
      });
      document.body.appendChild(blackoutEl);
    };

    const unblackout = () => {
      if (blackoutEl) {
        const el = blackoutEl;
        blackoutEl = null; // Prevent duplicate timeouts
        setTimeout(() => {
          el.remove();
        }, 500);
      }
    };

    // ── PrintScreen + keyboard combos ──────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScreen = e.key === 'PrintScreen';
      const isMacScreenshot =
        (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key));
      const isCtrlPrint = e.ctrlKey && e.key === 'PrintScreen';
      const isAltPrint = e.altKey && e.key === 'PrintScreen';

      if (isPrintScreen || isMacScreenshot || isCtrlPrint || isAltPrint) {
        e.preventDefault();
        blackout();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const releaseKeys = ['PrintScreen', '3', '4', '5', 'Meta', 'Shift', 'Control', 'Alt'];
      if (releaseKeys.includes(e.key)) {
        unblackout();
      }
    };

    // ── Visibility change (screen-recording tool grabs focus) ──────────────
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        blackout();
      } else {
        unblackout();
      }
    };

    // ── CSS: disable context menu, text selection, drag ───────────────────
    const style = document.createElement('style');
    style.id = 'screen-protection-styles';
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        user-select: none !important;
      }
      img, video, iframe {
        pointer-events: none;
        -webkit-user-drag: none;
        user-drag: none;
      }
    `;
    document.head.appendChild(style);

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.getElementById('screen-protection-styles')?.remove();
      unblackout();
    };
  }, []);
}
