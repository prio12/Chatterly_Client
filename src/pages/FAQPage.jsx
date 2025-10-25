import { useState } from 'react';
import { BiHelpCircle, BiSearch, BiChevronDown } from 'react-icons/bi';

const FAQPage = () => {
  const faqs = [
    {
      id: 1,
      question: 'Can I sign up with Google or email/password?',
      answer:
        "Yes! You can sign up using Google or your email. Google sign-in users won't have a password in Chatterly, so the password change option will only be available for email/password accounts.",
    },
    {
      id: 2,
      question: 'Do I have to use my Google profile picture?',
      answer:
        "No. You can upload your own profile picture at any time. Google profile pictures are optional and won't be used unless you choose.",
    },
    {
      id: 3,
      question: 'Who can see my posts?',
      answer:
        'By default, posts are visible on your feed to your connections. Community posts are visible to everyone',
    },
    {
      id: 4,
      question: 'Can I like or comment on community posts?',
      answer:
        "Yes, you can interact with community posts even if they are from users you're not connected with.",
    },
    {
      id: 5,
      question: 'What happens if I have no connections yet?',
      answer:
        'Your feed will show community posts. Once you have connections, your feed will prioritize posts from your connections and your own posts.',
    },
    {
      id: 6,
      question: 'Can I edit or delete my post after posting?',
      answer: 'Yes, you can edit or delete your posts anytime from your feed.',
    },
    {
      id: 7,
      question: 'Can I log in from multiple devices?',
      answer:
        'Yes, your Chatterly account can be accessed from any device using your login credentials.',
    },
    {
      id: 8,
      question: 'How do I report inappropriate content?',
      answer:
        'A reporting feature is coming soon. In the meantime, if you encounter any inappropriate content, please reach out through available support channels.',
    },
    {
      id: 9,
      question: 'How do I reset my password if I signed up with email?',
      answer:
        "You can use the password reset option in the Settings page. Google sign-in users won't have a password, so this option doesn't apply to them.",
    },
    {
      id: 10,
      question: 'How do I add or remove connections?',
      answer:
        "You can send connection requests from user profiles. Once accepted, they'll appear in your connections list. You can remove connections anytime from your connections page.",
    },
    {
      id: 11,
      question: "What's the difference between my feed and community posts?",
      answer:
        "Your feed shows posts from your connections and yourself. Community posts are from all users and appear when you don't have connections yet or in the community section.",
    },
    {
      id: 12,
      question: 'How do I change my username?',
      answer:
        'You can update your username and email from your profile settings page.',
    },
    {
      id: 13,
      question: 'What types of content can I post?',
      answer:
        'You can post text updates, images, videos and share your thoughts with your connections or the community.',
    },
  ];

  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <BiHelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about Chatterly
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 rounded-lg transition-colors duration-150"
                >
                  <span className="font-semibold text-slate-900 text-lg">
                    {faq.question}
                  </span>
                  <BiChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      openId === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openId === faq.id && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                No results found for {searchQuery}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-slate-600 text-lg">
            Check out our{' '}
            <span className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700">
              Guidelines
            </span>{' '}
            page for more detailed information
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
