// src/utils/notifications.js
// Professional notifications without browser alert prefixes

// Create a professional notification overlay
export const showNotification = (message, type = 'success', duration = 4000) => {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.toqueworks-notification');
    existingNotifications.forEach(n => n.remove());
  
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'toqueworks-notification';
    
    // Styling based on type
    const styles = {
      success: {
        background: 'linear-gradient(135deg, #8AC732 0%, #7FB82C 100%)',
        color: '#FFFFFF',
        icon: '✅'
      },
      error: {
        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        color: '#FFFFFF', 
        icon: '❌'
      },
      info: {
        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        color: '#FFFFFF',
        icon: 'ℹ️'
      }
    };
  
    const style = styles[type] || styles.success;
  
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${style.background};
      color: ${style.color};
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
  
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 16px;">${style.icon}</span>
        <span>${message}</span>
      </div>
    `;
  
    document.body.appendChild(notification);
  
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
  
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  };
  
  // Professional confirmation dialog
  export const showConfirmation = (message, onConfirm, onCancel) => {
    return new Promise((resolve) => {
      // Remove any existing confirmations
      const existingConfirmations = document.querySelectorAll('.toqueworks-confirmation');
      existingConfirmations.forEach(c => c.remove());
  
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'toqueworks-confirmation';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.2s ease;
      `;
  
      // Create dialog
      const dialog = document.createElement('div');
      dialog.style.cssText = `
        background: #FFFFFF;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transform: scale(0.9);
        transition: transform 0.2s ease;
      `;
  
      dialog.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px 0; color: #1F2D38; font-size: 18px; font-weight: 600;">
            Confirm Action
          </h3>
          <p style="margin: 0; color: #2A3E51; font-size: 14px; line-height: 1.5;">
            ${message}
          </p>
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button id="cancel-btn" style="
            padding: 8px 16px;
            border: 1px solid #BBBFC2;
            background: #F6F8F8;
            color: #2A3E51;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          ">
            Cancel
          </button>
          <button id="confirm-btn" style="
            padding: 8px 16px;
            border: none;
            background: #8AC732;
            color: #FFFFFF;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          ">
            Confirm
          </button>
        </div>
      `;
  
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
  
      // Animate in
      setTimeout(() => {
        overlay.style.opacity = '1';
        dialog.style.transform = 'scale(1)';
      }, 10);
  
      // Event handlers
      const cleanup = () => {
        overlay.style.opacity = '0';
        dialog.style.transform = 'scale(0.9)';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 200);
      };
  
      const confirmBtn = dialog.querySelector('#confirm-btn');
      const cancelBtn = dialog.querySelector('#cancel-btn');
  
      confirmBtn.addEventListener('click', () => {
        cleanup();
        resolve(true);
        if (onConfirm) onConfirm();
      });
  
      cancelBtn.addEventListener('click', () => {
        cleanup();
        resolve(false);
        if (onCancel) onCancel();
      });
  
      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          cleanup();
          resolve(false);
          if (onCancel) onCancel();
        }
      });
  
      // Handle escape key
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          cleanup();
          resolve(false);
          if (onCancel) onCancel();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);
    });
  };
  
  // Quick notification helpers
  export const showSuccess = (message) => showNotification(message, 'success');
  export const showError = (message) => showNotification(message, 'error');
  export const showInfo = (message) => showNotification(message, 'info');