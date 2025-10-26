import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  PlayIcon, 
  BookOpenIcon, 
  QuestionMarkCircleIcon,
  ExternalLinkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const LearningCenter = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('videos');

  // Mock data - in real app, this would come from API
  const videoCategories = [
    {
      id: 'cultivation',
      title: 'Cultivation Techniques',
      videos: [
        {
          id: 1,
          title: 'Best Practices for Turmeric Farming',
          description: 'Learn the essential techniques for growing high-quality turmeric',
          duration: '15:30',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: false
        },
        {
          id: 2,
          title: 'Soil Preparation and Planting',
          description: 'Step-by-step guide to preparing soil and planting turmeric',
          duration: '12:45',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: true
        },
        {
          id: 3,
          title: 'Irrigation and Water Management',
          description: 'Proper irrigation techniques for optimal turmeric growth',
          duration: '18:20',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: false
        }
      ]
    },
    {
      id: 'harvesting',
      title: 'Harvesting and Processing',
      videos: [
        {
          id: 4,
          title: 'When and How to Harvest Turmeric',
          description: 'Learn the right time and methods for harvesting turmeric',
          duration: '14:15',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: false
        },
        {
          id: 5,
          title: 'Post-Harvest Processing',
          description: 'Processing techniques to maintain quality and value',
          duration: '16:30',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: true
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing and Sales',
      videos: [
        {
          id: 6,
          title: 'Understanding Market Prices',
          description: 'How to track and understand turmeric market prices',
          duration: '11:45',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: false
        },
        {
          id: 7,
          title: 'Direct Marketing Strategies',
          description: 'Selling directly to buyers for better prices',
          duration: '13:20',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          watched: false
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: 'What is the best time to plant turmeric?',
      answer: 'Turmeric is typically planted in April-May during the pre-monsoon period. The soil should be well-prepared with organic matter.'
    },
    {
      question: 'How long does it take for turmeric to mature?',
      answer: 'Turmeric takes about 7-9 months to mature. The leaves start turning yellow and drying up when it\'s ready for harvest.'
    },
    {
      question: 'What is the ideal soil type for turmeric cultivation?',
      answer: 'Turmeric grows best in well-drained, loamy soil with good organic content. The soil should have a pH between 5.5 to 7.5.'
    },
    {
      question: 'How much water does turmeric need?',
      answer: 'Turmeric requires regular watering, especially during the growing season. However, avoid waterlogging as it can cause root rot.'
    },
    {
      question: 'What are the common pests and diseases in turmeric?',
      answer: 'Common pests include rhizome scale and shoot borer. Diseases include leaf spot and rhizome rot. Proper field hygiene and crop rotation help prevent these issues.'
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Storage Guide',
      description: 'How to store turmeric properly to maintain quality',
      icon: '📦',
      steps: [
        'Clean and dry the turmeric rhizomes',
        'Store in a cool, dry place',
        'Use proper containers to prevent moisture',
        'Check regularly for any signs of spoilage'
      ]
    },
    {
      id: 2,
      title: 'Transportation Tips',
      description: 'Best practices for transporting turmeric to market',
      icon: '🚚',
      steps: [
        'Use clean, dry bags or containers',
        'Avoid direct sunlight during transport',
        'Ensure proper ventilation',
        'Handle with care to prevent damage'
      ]
    },
    {
      id: 3,
      title: 'Quality Standards',
      description: 'Understanding quality parameters for better prices',
      icon: '⭐',
      steps: [
        'Check for uniform color and size',
        'Ensure proper drying',
        'Remove damaged or diseased rhizomes',
        'Maintain cleanliness throughout'
      ]
    }
  ];

  const handleVideoClick = (video) => {
    // In a real app, this would open a video player or redirect to YouTube
    console.log('Playing video:', video.title);
  };

  const renderVideos = () => (
    <div className="space-y-8">
      {videoCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {category.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <PlayIcon className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {video.watched && (
                    <div className="absolute top-2 left-2">
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFAQ = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{item.question}</h4>
                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
              </div>
            </button>
            <div className="px-4 pb-4">
              <p className="text-gray-600 text-sm">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="space-y-6">
      {guides.map((guide) => (
        <div key={guide.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{guide.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <div className="space-y-2">
                {guide.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('learning')}
          </h1>
          <p className="text-gray-600">
            Learn farming techniques, market strategies, and best practices
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setSelectedCategory('videos')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              selectedCategory === 'videos'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <PlayIcon className="h-5 w-5" />
              <span>Videos</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedCategory('faq')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              selectedCategory === 'faq'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <QuestionMarkCircleIcon className="h-5 w-5" />
              <span>FAQ</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedCategory('guides')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              selectedCategory === 'guides'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BookOpenIcon className="h-5 w-5" />
              <span>Guides</span>
            </div>
          </button>
        </div>

        {/* Content */}
        {selectedCategory === 'videos' && renderVideos()}
        {selectedCategory === 'faq' && renderFAQ()}
        {selectedCategory === 'guides' && renderGuides()}

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-turmeric-500 to-primary-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Contact Extension Officer</div>
              <div className="text-sm opacity-90">Get personalized farming advice</div>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Join Farmer Community</div>
              <div className="text-sm opacity-90">Connect with other farmers</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
