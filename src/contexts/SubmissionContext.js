import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbHelpers } from '../config/supabase';

const SubmissionContext = createContext();

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
};

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);
  
  // Load submissions from localStorage on mount
  useEffect(() => {
    loadSubmissions();
  }, []);
  
  const loadSubmissions = async () => {
    try {
      // Try to load from localStorage first
      const savedSubmissions = localStorage.getItem('turmerlink_submissions');
      
      if (savedSubmissions) {
        const parsed = JSON.parse(savedSubmissions);
        setSubmissions(parsed);
        console.log('✅ Loaded submissions from localStorage');
      } else {
        // Use demo data if nothing saved
        setSubmissions([
    {
      id: 'SUB001',
      farmerId: 'FARM001',
      farmerName: 'రామయ్య',
      farmerPhone: '+91 9876543210',
      quantity: 5,
      quality: 'Grade A',
      price: 8500,
      location: 'నిజామాబాద్',
      submissionDate: '2024-01-20',
      status: 'approved',
      governmentResponse: '2024-01-21',
      totalValue: 42500,
      description: 'ఉత్తమ నాణ్యత టర్మరిక్'
    },
    {
      id: 'SUB002',
      farmerId: 'FARM002',
      farmerName: 'లక్ష్మయ్య',
      farmerPhone: '+91 9876543211',
      quantity: 3,
      quality: 'Export Grade',
      price: 9200,
      location: 'కరీంనగర్',
      submissionDate: '2024-01-19',
      status: 'pending',
      governmentResponse: null,
      totalValue: 27600,
      description: 'ఎగుమతి నాణ్యత టర్మరిక్'
    },
    {
      id: 'SUB003',
      farmerId: 'FARM003',
      farmerName: 'వెంకటేశ్వర్లు',
      farmerPhone: '+91 9876543212',
      quantity: 7,
      quality: 'Grade B',
      price: 7800,
      location: 'అదిలాబాద్',
      submissionDate: '2024-01-18',
      status: 'rejected',
      governmentResponse: '2024-01-19',
      totalValue: 54600,
      description: 'సాధారణ నాణ్యత టర్మరిక్'
    }
  ]);
      }
    } catch (error) {
      console.error('❌ Failed to load submissions:', error);
    }
  };
  // No auto-refresh needed since we use localStorage

  const addSubmission = async (submission) => {
    const newSubmission = {
      id: `SUB${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      ...submission,
      status: 'pending',
      governmentResponse: null
    };
    
    // Add to local state
    setSubmissions(prev => {
      const updated = [newSubmission, ...prev];
      // Save to localStorage
      localStorage.setItem('turmerlink_submissions', JSON.stringify(updated));
      console.log('✅ Saved submission to localStorage');
      return updated;
    });
    
    // Try to sync to Supabase (optional, won't fail if it doesn't work)
    try {
      await dbHelpers.createSubmission({
        farmer_id: submission.farmerId,
        farmer_name: submission.farmerName,
        farmer_phone: submission.farmerPhone,
        product: 'Turmeric',
        quantity: submission.quantity,
        quality: submission.quality,
        price: submission.price,
        location: submission.location,
        status: 'pending',
        total_value: submission.totalValue || (submission.quantity * submission.price),
        description: submission.description,
        submission_date: newSubmission.submissionDate
      });
      console.log('✅ Synced to Supabase successfully!');
    } catch (error) {
      console.log('ℹ️ Supabase sync failed, using localStorage only:', error.message);
    }
    
    return newSubmission;
  };

  const updateSubmissionStatus = async (submissionId, newStatus) => {
    // Update local state
    setSubmissions(prev => {
      const updated = prev.map(sub => 
        sub.id === submissionId 
          ? { 
              ...sub, 
              status: newStatus,
              governmentResponse: new Date().toISOString().split('T')[0]
            }
          : sub
      );
      // Save to localStorage
      localStorage.setItem('turmerlink_submissions', JSON.stringify(updated));
      return updated;
    });
    
    // Try to sync status update to Supabase (optional)
    try {
      const govResponse = new Date().toISOString().split('T')[0];
      await dbHelpers.updateSubmissionStatus(submissionId, newStatus, govResponse);
      console.log(`✅ Status updated to ${newStatus} in Supabase!`);
    } catch (error) {
      console.log('ℹ️ Supabase update failed, using localStorage only:', error.message);
    }
  };

  const getFarmerSubmissions = (farmerId) => {
    return submissions.filter(sub => sub.farmerId === farmerId);
  };

  const getAllSubmissions = () => {
    return submissions;
  };

  const getPendingSubmissions = () => {
    return submissions.filter(sub => sub.status === 'pending');
  };

  const getApprovedSubmissions = () => {
    return submissions.filter(sub => sub.status === 'approved');
  };

  const getRejectedSubmissions = () => {
    return submissions.filter(sub => sub.status === 'rejected');
  };

  const value = {
    submissions,
    addSubmission,
    updateSubmissionStatus,
    getFarmerSubmissions,
    getAllSubmissions,
    getPendingSubmissions,
    getApprovedSubmissions,
    getRejectedSubmissions
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
};
