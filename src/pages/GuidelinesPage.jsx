import { useState } from 'react';
import { Link } from 'react-router';

const GuidelinesPage = () => {
  const guidelines = [
    {
      id: 1,
      emoji: '💬',
      title: 'Be Respectful',
      points: [
        'Treat others with kindness, empathy, and respect.',
        'No harassment, hate speech, or discrimination of any kind.',
        'Debate ideas, not people.',
      ],
    },
    {
      id: 2,
      emoji: '🚫',
      title: 'No Harmful or Inappropriate Content',
      points: [
        'Do not post explicit, violent, or offensive materials.',
        'Avoid spam, fake news, or misleading information.',
        'Personal attacks or bullying are strictly prohibited.',
      ],
    },
    {
      id: 3,
      emoji: '🧠',
      title: 'Keep It Real',
      points: [
        'Share your original thoughts, experiences, and ideas.',
        'Avoid impersonating other users or creating fake accounts.',
        "Be authentic — that's what makes Chatterly valuable.",
      ],
    },
    {
      id: 4,
      emoji: '🧩',
      title: 'Posting Guidelines',
      points: [
        'Posts should be meaningful — not random or purely promotional.',
        'You can share photos, videos, or text — but keep them relevant.',
        'Always review your post before publishing to ensure clarity and respect.',
      ],
    },
    {
      id: 5,
      emoji: '👥',
      title: 'Connections & Interactions',
      points: [
        'You can connect with others to expand your network.',
        "Respect someone's privacy — don't spam connection requests or messages.",
        'Liking and commenting are encouraged — but keep it constructive.',
      ],
    },
    {
      id: 6,
      emoji: '🛡️',
      title: 'Safety & Privacy',
      points: [
        'Never share your personal data (like passwords, phone numbers, or emails) publicly.',
        'Report suspicious or abusive users to maintain a healthy environment.',
        'Your account security is your responsibility — use strong passwords and avoid sharing credentials.',
      ],
    },
    {
      id: 7,
      emoji: '📢',
      title: 'Community Feed & Thought Posts',
      points: [
        'Share your thoughts and experiences freely, but responsibly.',
        'Community posts are public — so be mindful of what you share.',
        'If you prefer privacy, use "Thought Mode" to keep it light and personal.',
      ],
    },
    {
      id: 8,
      emoji: '💡',
      title: 'Need Help or Have Feedback?',
      points: [
        "We're constantly improving Chatterly. If you face any issue or want to share an idea, reach out to the support team or drop your feedback through the in-app contact form.",
      ],
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleSection = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              {/* Guidelines Icon */}
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Community Guidelines
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Together, let's make Chatterly a place for meaningful
              conversations and positive vibes
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {guidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(guideline.id)}
                className="w-full px-6 py-5 text-left flex items-center gap-4 hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="text-3xl flex-shrink-0">
                  {guideline.emoji}
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">
                    {guideline.id}. {guideline.title}
                  </h2>
                </div>
                {/* Chevron Icon */}
                <svg
                  className={`w-6 h-6 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    expandedId === guideline.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedId === guideline.id && (
                <div className="px-6 pb-6 pt-2">
                  <ul className="space-y-3">
                    {guideline.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-500 mt-1 flex-shrink-0">
                          •
                        </span>
                        <span className="text-slate-700 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center text-white shadow-lg">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 rounded-full mb-4">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Thank You for Being Part of Chatterly
          </h3>
          <p className="text-purple-100 text-lg">
            Your respect and participation help build a welcoming community for
            everyone
          </p>
        </div>

        {/* FAQ Link */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-lg">
            Have questions?{' '}
            <Link to="/faq">
              <span className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700">
                Check our FAQ
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
