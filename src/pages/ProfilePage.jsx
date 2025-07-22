import React, { useState, useEffect } from 'react';
import { updateProfile, updatePassword, updateEmail } from 'firebase/auth';
import { useAuth } from '../components/AuthWrapper';
import PageLayout from '../components/PageLayout';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Update display name
      if (formData.displayName !== (user.displayName || '')) {
        await updateProfile(user, {
          displayName: formData.displayName
        });
      }

      // Update email if changed
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await updatePassword(user, formData.newPassword);
        // Clear password fields after successful update
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      switch (error.code) {
        case 'auth/requires-recent-login':
          setError('Please sign out and sign in again to make these changes');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already in use by another account');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Failed to update profile. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageLayout 
      title={
        <div className="flex items-center justify-between w-full">
          <span>Profile</span>
          <div className="flex space-x-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    setSuccess('');
                    // Reset form data
                    setFormData(prev => ({
                      ...prev,
                      displayName: user?.displayName || '',
                      email: user?.email || '',
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    }));
                  }}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
      }
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-6 py-4 space-y-6">
          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your display name..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{user?.displayName || 'Not set'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your email address..."
                  />
                ) : (
                  <div className="text-sm text-gray-900">{user?.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <div className="text-sm text-gray-500 font-mono">{user?.uid}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                <div className="text-sm text-gray-900">{formatDate(user?.metadata?.creationTime)}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
                <div className="text-sm text-gray-900">{formatDate(user?.metadata?.lastSignInTime)}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Verified</label>
                <div className="text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.emailVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.emailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          {isEditing && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter new password..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 placeholder:italic placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Confirm new password..."
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Leave password fields empty if you don't want to change your password
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;