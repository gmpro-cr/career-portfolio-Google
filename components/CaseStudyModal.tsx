import React, { useState } from 'react';
import { X, Users, Layers, Swords, Lightbulb } from 'lucide-react';
import { CaseStudyAnalysis } from '../types';

interface CaseStudyModalProps {
  analysis: CaseStudyAnalysis;
  title: string;
  onClose: () => void;
}

type TabType = 'users' | 'features' | 'competition' | 'takeaways';

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ analysis, title, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Layers className="w-4 h-4" /> },
    { id: 'competition', label: 'Competition', icon: <Swords className="w-4 h-4" /> },
    { id: 'takeaways', label: 'Takeaways', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 md:px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <p className="text-indigo-100 text-sm mt-1">Full Product Analysis</p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[88px] z-10 bg-white border-b border-gray-200 px-6 md:px-8">
          <div className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 md:px-8 py-6">
          {/* User Segments Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                User Segmentation
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Segment</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Needs / Use Cases</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">How Product Addresses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.userSegments.map((segment, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {segment.segment}
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            {segment.needs.map((need, j) => (
                              <li key={j}>{need}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            {segment.addressed.map((addr, j) => (
                              <li key={j}>{addr}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" />
                Key Feature Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Feature</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Problem It Solves</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Why It Works</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.featureBreakdown.map((feature, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {feature.feature}
                        </td>
                        <td className="p-4 border border-gray-200 text-gray-600 text-sm align-top">
                          {feature.problem}
                        </td>
                        <td className="p-4 border border-gray-200 text-gray-600 text-sm align-top">
                          {feature.whyItWorks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Competition Tab */}
          {activeTab === 'competition' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Swords className="w-5 h-5 text-red-500" />
                Competitive Analysis
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-1/4">Platform</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Strengths</th>
                      <th className="text-left p-4 font-semibold text-gray-700 border border-gray-200 w-[37.5%]">Weaknesses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.competitiveAnalysis.map((competitor, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 border border-gray-200 font-medium text-gray-900 align-top">
                          {competitor.platform}
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="space-y-1 text-sm">
                            {competitor.strengths.map((s, j) => (
                              <li key={j} className="flex items-start gap-2 text-green-700">
                                <span className="text-green-500">✓</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 border border-gray-200 align-top">
                          <ul className="space-y-1 text-sm">
                            {competitor.weaknesses.map((w, j) => (
                              <li key={j} className="flex items-start gap-2 text-red-700">
                                <span className="text-red-500">✗</span>
                                {w}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Takeaways Tab */}
          {activeTab === 'takeaways' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Key Takeaways
              </h3>
              <div className="space-y-4">
                {analysis.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
