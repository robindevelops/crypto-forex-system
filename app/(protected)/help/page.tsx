"use client";

import { useState } from "react";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import clsx from "clsx";

const FAQ_ITEMS = [
  {
    q: "What machine learning model is used for predictions?",
    a: "The system uses an optimized LSTM (Long Short-Term Memory) deep learning model, trained on historical market data. An ensemble model combining LSTM and ARIMA is also available, which typically achieves the best performance.",
  },
  {
    q: "How accurate are the predictions?",
    a: "Model accuracy varies by asset. The Ensemble model achieves MAPE of ~1.24% for Bitcoin, ~0.58% for Gold, and ~1.26% for Silver. Directional accuracy (predicting whether the price goes up or down) ranges from 73-78% depending on the asset.",
  },
  {
    q: "What are the supported assets?",
    a: "Currently, the system supports Bitcoin (BTC-USD), Gold (GC=F), and Silver (SI=F). All data is sourced from Yahoo Finance.",
  },
  {
    q: "What technical indicators are available?",
    a: "The dashboard supports SMA (Simple Moving Average), EMA (Exponential Moving Average), RSI (Relative Strength Index), MACD (Moving Average Convergence Divergence), and Bollinger Bands.",
  },
  {
    q: "How often is the data updated?",
    a: "You can manually sync data using the 'Sync Live Data' button, which fetches the latest market data from Yahoo Finance. Automatic scheduled syncing will be available in a future release.",
  },
  {
    q: "What is the difference between user roles?",
    a: "Traders can view dashboards and run predictions. Analysts additionally access full model comparison and reports. Students have read-only access to model comparison. Developers and Admins can manage model artifacts and system settings.",
  },
];

const TROUBLESHOOTING = [
  {
    issue: "Charts not loading",
    solution: "Ensure your browser has JavaScript enabled and try refreshing the page. If the issue persists, clear your browser cache.",
  },
  {
    issue: "Prediction returns an error",
    solution: "Make sure the selected asset has a trained model available. If model files are missing, an administrator needs to run the training pipeline first.",
  },
  {
    issue: "Data sync fails",
    solution: "This usually means the Yahoo Finance API is temporarily unavailable. Wait a few minutes and try again. Check your internet connection.",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <HelpCircle size={28} className="text-primary" />
          Help & Documentation
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          User manual, frequently asked questions, and troubleshooting guides
        </p>
      </div>

      {/* Quick Start */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-primary" />
          Quick Start Guide
        </h2>
        <div className="space-y-4 text-sm text-text-secondary">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <p><strong className="text-text-primary">Select an Asset</strong> — Use the asset selector in the sidebar to choose Bitcoin, Gold, or Silver.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <p><strong className="text-text-primary">Explore the Dashboard</strong> — View price history, toggle technical indicators, and check key metrics.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <p><strong className="text-text-primary">Run a Prediction</strong> — Go to the Prediction page and click &ldquo;Run AI Prediction&rdquo; to get a next-day price forecast.</p>
          </div>
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <p><strong className="text-text-primary">Compare Models</strong> — Visit Model Comparison to see how LSTM, ARIMA, and ensemble models perform.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <MessageCircle size={18} className="text-info" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-surface-hover/50 transition-colors"
              >
                <span className="text-sm font-medium text-text-primary">{item.q}</span>
                {openFaq === i ? <ChevronDown size={16} className="text-text-muted shrink-0" /> : <ChevronRight size={16} className="text-text-muted shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
          <AlertTriangle size={18} className="text-warning" />
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {TROUBLESHOOTING.map((item, i) => (
            <div key={i} className="p-4 rounded-lg border border-border">
              <p className="text-sm font-medium text-text-primary mb-1">{item.issue}</p>
              <p className="text-xs text-text-secondary">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
