import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  AcademicCapIcon, 
  PlayIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const LearningPage = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('videos');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { language } = useLanguage();

  const videos = [
    {
      id: 1,
      title: language === 'te' ? 'పసుపు వ్యవసాయం - పూర్తి మార్గదర్శకం' : 'Complete Turmeric Farming Guide',
      duration: '15:30',
      category: language === 'te' ? 'వ్యవసాయం' : 'cultivation',
      thumbnail: '🌱',
      youtubeId: 'mbZMrg8NIQk'
    },
    {
      id: 2,
      title: language === 'te' ? 'పసుపు నాటడం - సరైన సమయం మరియు పద్ధతులు' : 'Turmeric Planting - Right Time & Methods',
      duration: '12:45',
      category: language === 'te' ? 'వ్యవసాయం' : 'cultivation',
      thumbnail: '🌿',
      youtubeId: 'mbZMrg8NIQk'
    },
    {
      id: 3,
      title: language === 'te' ? 'పసుపు పంట కోత - ఉత్తమ పద్ధతులు' : 'Turmeric Harvesting - Best Practices',
      duration: '14:15',
      category: language === 'te' ? 'పంట కోత' : 'harvesting',
      thumbnail: '🌾',
      youtubeId: 'oIL24Ip3Lic'
    },
    {
      id: 4,
      title: language === 'te' ? 'పసుపు నిల్వ మరియు విక్రయం' : 'Turmeric Storage & Selling',
      duration: '18:20',
      category: language === 'te' ? 'నిల్వ' : 'storage',
      thumbnail: '📦',
      youtubeId: 'AloRGEx3eE8'
    },
    {
      id: 5,
      title: language === 'te' ? 'పసుపు వ్యవసాయంలో సాధారణ సమస్యలు' : 'Common Problems in Turmeric Farming',
      duration: '16:10',
      category: language === 'te' ? 'సమస్యలు' : 'problems',
      thumbnail: '🔧',
      youtubeId: 'mC2qwYkTatY'
    }
  ];

  const faqs = [
    {
      question: language === 'te' ? 'పసుపు నాటడానికి ఉత్తమ సమయం ఏది?' : 'What is the best time to plant turmeric?',
      answer: language === 'te' ? 'పసుపు సాధారణంగా వర్షాకాలం ముందు కాలంలో ఏప్రిల్-మే నెలల్లో నాటుతారు.' : 'Turmeric is typically planted in April-May during the pre-monsoon period.'
    },
    {
      question: language === 'te' ? 'పసుపు పరిపక్వతకు ఎంత సమయం పడుతుంది?' : 'How long does it take for turmeric to mature?',
      answer: language === 'te' ? 'పసుపు పరిపక్వతకు సుమారు 7-9 నెలలు పడుతుంది.' : 'Turmeric takes about 7-9 months to mature.'
    }
  ];

  const VideoCard = ({ video }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => setSelectedVideo(video)}
    >
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <div className="text-6xl">{video.thumbnail}</div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <PlayIcon className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <span>▶</span>
          <span>{language === 'te' ? 'YouTube' : 'YouTube'}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600 capitalize">{video.category}</p>
        <p className="text-xs text-blue-600 mt-2 font-medium">
          {language === 'te' ? 'వీడియో చూడటానికి క్లిక్ చేయండి' : 'Click to watch video'}
        </p>
      </div>
    </motion.div>
  );

  return (
    <AnimatedPage 
      title={language === 'te' ? 'నేర్చుకోండి' : 'Learning Center'} 
      onBack={onBack} 
      icon={AcademicCapIcon}
    >
      {/* Category Tabs */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-8">
        <button
          onClick={() => setSelectedCategory('videos')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            selectedCategory === 'videos'
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <PlayIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'వీడియోలు' : 'Videos'}</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedCategory('faq')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            selectedCategory === 'faq'
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'ప్రశ్నలు' : 'FAQ'}</span>
          </div>
        </button>
      </div>

      {/* Content */}
      {selectedCategory === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>
      )}

      {selectedCategory === 'faq' && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <button className="bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg">
          {language === 'te' ? 'నిపుణుడిని సంప్రదించండి' : 'Contact Expert'}
        </button>
        <button className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
          {language === 'te' ? 'సంఘంలో చేరండి' : 'Join Community'}
        </button>
      </motion.div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'te' ? 'వ్యవసాయ వీడియో' : 'Farming Video'} • {selectedVideo.duration}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{selectedVideo.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`, '_blank')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    {language === 'te' ? 'YouTube లో తెరవండి' : 'Open in YouTube'}
                  </button>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    {language === 'te' ? 'మూసివేయండి' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default LearningPage;
