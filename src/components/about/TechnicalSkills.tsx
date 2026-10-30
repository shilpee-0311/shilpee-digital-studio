"use client";

import { useState } from "react";
import {
  Code2,
  Database,
  BarChart3,
  Brain,
  Terminal,
  Palette,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "prog-db" | "analytics" | "ml-nlp" | "devops" | "design";
  categoryLabel: string;
  roleScope: string;
  levelBadge: string;
}

const SKILLS: SkillItem[] = [
  // Programming & Database
  {
    name: "Python",
    category: "prog-db",
    categoryLabel: "Programming & Database",
    roleScope: "Core scripting, automation workflows, data structures, and algorithmic logic.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "MySQL",
    category: "prog-db",
    categoryLabel: "Programming & Database",
    roleScope: "Relational database structuring, table normalization, and foreign key relations.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "SQL",
    category: "prog-db",
    categoryLabel: "Programming & Database",
    roleScope: "Analytical querying, multi-table JOINs, GROUP BY aggregations, and filtering.",
    levelBadge: "Working Proficiency",
  },

  // Data Analytics
  {
    name: "Pandas",
    category: "analytics",
    categoryLabel: "Data Analytics",
    roleScope: "Data cleaning, DataFrame transformation, missing value handling, and restructuring.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "NumPy",
    category: "analytics",
    categoryLabel: "Data Analytics",
    roleScope: "Multi-dimensional array manipulation, vectorized operations, and numerical computations.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "Microsoft Excel",
    category: "analytics",
    categoryLabel: "Data Analytics",
    roleScope: "Spreadsheet modeling, pivot tables, lookup formulas, and business summaries.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "Power BI",
    category: "analytics",
    categoryLabel: "Data Analytics",
    roleScope: "Interactive business intelligence dashboards, KPI visualization cards, and report views.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "Exploratory Data Analysis",
    category: "analytics",
    categoryLabel: "Data Analytics",
    roleScope: "Data profiling, anomaly detection, statistical distribution review, and trend identification.",
    levelBadge: "Working Proficiency",
  },

  // Machine Learning & NLP
  {
    name: "Scikit-learn",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Dataset splitting, standard estimators, model evaluation metrics, and basic pipelines.",
    levelBadge: "Foundational & Applied",
  },
  {
    name: "Regression & Classification Concepts",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Linear and logistic principles, decision boundaries, accuracy, and confusion matrix analysis.",
    levelBadge: "Conceptual Understanding",
  },
  {
    name: "Feature Engineering",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Feature scaling, one-hot encoding, imputation, and feature extraction techniques.",
    levelBadge: "Foundational & Applied",
  },
  {
    name: "TF-IDF",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Term Frequency-Inverse Document Frequency weighting for textual importance scoring.",
    levelBadge: "Applied Prototype",
  },
  {
    name: "Cosine Similarity",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Vector space angle calculation for document comparison and profile-job matching.",
    levelBadge: "Applied Prototype",
  },
  {
    name: "Text Preprocessing",
    category: "ml-nlp",
    categoryLabel: "Machine Learning & NLP",
    roleScope: "Tokenization, stop-word removal, regex text cleaning, and vocabulary normalization.",
    levelBadge: "Applied Prototype",
  },

  // Development & Deployment
  {
    name: "Streamlit",
    category: "devops",
    categoryLabel: "Development & Deployment",
    roleScope: "Rapid web application development for Python analytics tools and NLP prototypes.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "Git",
    category: "devops",
    categoryLabel: "Development & Deployment",
    roleScope: "Local version control, branch management, merge conflict resolution, and clean commit history.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "GitHub",
    category: "devops",
    categoryLabel: "Development & Deployment",
    roleScope: "Remote repository management, open-source code publishing, README documentation, and collaboration.",
    levelBadge: "Working Proficiency",
  },
  {
    name: "Jupyter Notebook",
    category: "devops",
    categoryLabel: "Development & Deployment",
    roleScope: "Interactive Python code development, data visualization, and step-by-step experimentation.",
    levelBadge: "Working Proficiency",
  },

  // Design
  {
    name: "Canva",
    category: "design",
    categoryLabel: "Design",
    roleScope: "Marketing graphics, presentation slide decks, event invitations, brochures, and brand template systems.",
    levelBadge: "Working Proficiency",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Skills (19)" },
  { id: "prog-db", label: "Programming & Database" },
  { id: "analytics", label: "Data Analytics" },
  { id: "ml-nlp", label: "Machine Learning & NLP" },
  { id: "devops", label: "Development & Deployment" },
  { id: "design", label: "Design" },
];

export function TechnicalSkills() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSkills =
    selectedCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/20"
                  : "border border-line bg-white text-navy-800 hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="group relative flex flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600">
                  {skill.categoryLabel}
                </span>
                <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 border border-purple-200/50">
                  {skill.levelBadge}
                </span>
              </div>

              <h4 className="font-display mt-2.5 text-base font-semibold text-navy-900 group-hover:text-purple-700 transition-colors">
                {skill.name}
              </h4>

              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {skill.roleScope}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-1.5 text-[11px] text-navy-700">
              <CheckCircle2 size={13} className="text-purple-600 shrink-0" />
              <span>Applied in studio codebase &amp; prototypes</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-cream p-4 text-xs text-muted leading-relaxed">
        <strong className="text-navy-900 font-semibold">Integrity &amp; Proficiency Statement:</strong>{" "}
        This skill matrix reflects genuine hands-on practice, academic coursework, and functional prototype implementations. Advanced enterprise claims or unverified senior competencies are intentionally avoided to ensure transparent client collaboration.
      </div>
    </div>
  );
}
