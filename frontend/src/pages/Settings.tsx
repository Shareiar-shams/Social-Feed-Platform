import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validatePassword, validateRequired } from '../utils/RegistrationValidation';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const firstNameValidation = validateRequired(profileData.first_name, 'First name');
    if (!firstNameValidation.isValid) {
      newErrors.first_name = firstNameValidation.message!;
    }

    const lastNameValidation = validateRequired(profileData.last_name, 'Last name');
    if (!lastNameValidation.isValid) {
      newErrors.last_name = lastNameValidation.message!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.current_password) {
      newErrors.current_password = 'Current password is required';
    }

    const passwordValidation = validatePassword(passwordData.new_password);
    if (!passwordValidation.isValid) {
      newErrors.new_password = passwordValidation.message!;
    }

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateProfileForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Update failed');
      }

      const data = await response.json();
      // Update user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      setSuccessMessage('Profile updated successfully!');
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Failed to update profile'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validatePasswordForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password update failed');
      }

      setSuccessMessage('Password updated successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Failed to update password'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <Link to="/feed" style={{ color: '#3498db', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Feed
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#2c3e50', marginTop: '10px' }}>
            Settings
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #e0e0e0'
          }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '16px',
                fontWeight: '500',
                border: 'none',
                background: activeTab === 'profile' ? 'white' : '#f8f9fa',
                color: activeTab === 'profile' ? '#3498db' : '#7f8c8d',
                borderBottom: activeTab === 'profile' ? '3px solid #3498db' : 'none',
                cursor: 'pointer'
              }}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '16px',
                fontWeight: '500',
                border: 'none',
                background: activeTab === 'password' ? 'white' : '#f8f9fa',
                color: activeTab === 'password' ? '#3498db' : '#7f8c8d',
                borderBottom: activeTab === 'password' ? '3px solid #3498db' : 'none',
                cursor: 'pointer'
              }}
            >
              Change Password
            </button>
          </div>

          <div style={{ padding: '30px' }}>
            {/* Success Message */}
            {successMessage && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                backgroundColor: '#d4edda',
                color: '#155724',
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errors.general && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                {errors.general}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleProfileChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  />
                  {errors.first_name && (
                    <small style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.first_name}</small>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleProfileChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  />
                  {errors.last_name && (
                    <small style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.last_name}</small>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: '#f8f9fa',
                      cursor: 'not-allowed'
                    }}
                  />
                  <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Email cannot be changed</small>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#3498db',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  />
                  {errors.current_password && (
                    <small style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.current_password}</small>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  />
                  {errors.new_password && (
                    <small style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.new_password}</small>
                  )}
                  <small style={{ color: '#7f8c8d', fontSize: '12px', display: 'block', marginTop: '4px' }}>
                    Must be at least 8 characters with uppercase, number, and special character
                  </small>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="new_password_confirmation"
                    value={passwordData.new_password_confirmation}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '6px'
                    }}
                  />
                  {errors.new_password_confirmation && (
                    <small style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.new_password_confirmation}</small>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#3498db',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                >
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
