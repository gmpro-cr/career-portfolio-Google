import React from 'react';
import { Project } from '../types';
import { X, Lightbulb, Target, TrendingUp, Users, BarChart3, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    if (!project) return null;

    const isCaseStudy = project.category === 'case-study';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 px-6 md:px-8 py-6 border-b border-gray-100 ${isCaseStudy
                        ? 'bg-gradient-to-r from-purple-50 to-indigo-50'
                        : 'bg-gradient-to-r from-blue-50 to-cyan-50'
                    }`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all hover:scale-110"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl ${isCaseStudy ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                            {isCaseStudy ? <BarChart3 className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${isCaseStudy
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {isCaseStudy ? 'Case Study' : 'Build Project'}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">{project.date}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900">{project.title}</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">{project.description}</p>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 shadow-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-6 md:px-8 py-6 space-y-8">

                    {/* Problem Statement */}
                    {project.problem && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <Target className="w-5 h-5 text-red-500" />
                                <h3 className="font-bold text-gray-900">The Problem</h3>
                            </div>
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <p className="text-gray-700 leading-relaxed">{project.problem}</p>
                            </div>
                        </section>
                    )}

                    {/* Approach */}
                    {project.approach && project.approach.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <Layers className="w-5 h-5 text-blue-500" />
                                <h3 className="font-bold text-gray-900">Approach</h3>
                            </div>
                            <div className="space-y-3">
                                {project.approach.map((step, i) => (
                                    <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            {i + 1}
                                        </span>
                                        <p className="text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Key Insights */}
                    {project.keyInsights && project.keyInsights.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-bold text-gray-900">Key Insights</h3>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {project.keyInsights.map((insight, i) => (
                                    <div key={i} className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                        <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* User Research */}
                    {project.userResearch && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-5 h-5 text-green-500" />
                                <h3 className="font-bold text-gray-900">User Research</h3>
                            </div>
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                <p className="text-gray-700 leading-relaxed">{project.userResearch}</p>
                            </div>
                        </section>
                    )}

                    {/* Competitive Analysis */}
                    {project.competitiveAnalysis && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <BarChart3 className="w-5 h-5 text-indigo-500" />
                                <h3 className="font-bold text-gray-900">Competitive Analysis</h3>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <p className="text-gray-700 leading-relaxed">{project.competitiveAnalysis}</p>
                            </div>
                        </section>
                    )}

                    {/* Outcomes */}
                    {project.outcomes && project.outcomes.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <h3 className="font-bold text-gray-900">Outcomes & Impact</h3>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {project.outcomes.map((outcome, i) => (
                                    <div key={i} className="flex gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <span className="text-emerald-500">✓</span>
                                        <p className="text-gray-700 text-sm">{outcome}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Frameworks */}
                    {project.frameworks && project.frameworks.length > 0 && (
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <Layers className="w-5 h-5 text-purple-500" />
                                <h3 className="font-bold text-gray-900">Frameworks Used</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.frameworks.map((framework, i) => (
                                    <span key={i} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                        {framework}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Link */}
                    {project.link && (
                        <div className="pt-4 border-t border-gray-100">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                            >
                                View Live Project →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
