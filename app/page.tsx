"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ROUTES } from "@/app/constants/routes";
import { ASSET_LIST } from "@/app/constants/assets";
import {
  BrainCircuit,
  Activity,
  GitCompare,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";

const MARKET_NEWS = [
  {
    id: 1,
    source: "Bloomberg",
    time: "2H AGO",
    headline: "Federal Reserve Signals Potential Rate Cuts by Q3 Amidst Cooling Inflation",
    impact: "HIGH",
    color: "#CCFF00"
  },
  {
    id: 2,
    source: "Reuters",
    time: "4H AGO",
    headline: "Bitcoin Institutional Inflows Reach Record Highs Following ETF Approvals",
    impact: "HIGH",
    color: "#FF0055"
  },
  {
    id: 3,
    source: "Financial Times",
    time: "6H AGO",
    headline: "Gold Surges Past $2,300 as Geopolitical Tensions Drive Safe-Haven Demand",
    impact: "MEDIUM",
    color: "#FFFFFF"
  },
  {
    id: 4,
    source: "WSJ",
    time: "12H AGO",
    headline: "Tech Stocks Rally While Forex Markets Brace for ECB Policy Shift",
    impact: "LOW",
    color: "#C0C0C0"
  }
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">

      {/* NAVBAR */}
      <nav
        className={clsx(
          "fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center",
          scrolled
            ? "top-4 px-4"
            : "top-0 px-0 mix-blend-difference"
        )}
      >
        <div
          className={clsx(
            "w-full flex items-center justify-between transition-all duration-300",
            scrolled
              ? "max-w-[1400px] bg-[#111111]/90 backdrop-blur-md border border-white/20 outline outline-4 outline-black/50 rounded-full px-8 py-3 shadow-2xl"
              : "p-6 md:px-12 bg-transparent border border-transparent outline outline-0 outline-transparent rounded-none"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#CCFF00] text-black font-black text-xl rotate-3">
              C
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              Crypto<br />Forex
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={ROUTES.LOGIN}
              className="hidden md:block text-sm font-bold uppercase tracking-widest text-white hover:text-[#CCFF00] transition-colors"
            >
              Login
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className="px-6 py-3 text-sm font-black uppercase tracking-widest hover:-translate-y-1 transition-all bg-[#CCFF00] text-black rounded-full hover:shadow-[4px_4px_0_0_#FFF]"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-[#CCFF00] mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 md:w-80 md:h-80 rounded-full bg-[#FF0055] mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 w-full max-w-[1400px]">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-[#CCFF00] font-mono text-xs md:text-sm mb-12 uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            AI-Powered Market Predictions
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-0">
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter uppercase text-transparent stroke-text-white">
              PREDICT
            </h1>
            <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-black tracking-tighter uppercase text-[#CCFF00] rotate-1 scale-110 my-4 md:my-2 shadow-black drop-shadow-2xl">
              THE FUTURE
            </h1>
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter uppercase text-white">
              WITH DATA.
            </h1>
          </div>

          <p className="mt-12 text-lg md:text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed">
            LSTM deep learning models trained on millions of historical data points.
            Forecast <span className="text-white">Bitcoin</span>, <span className="text-[#FFD700]">Gold</span>, and <span className="text-[#C0C0C0]">Silver</span> with unprecedented precision.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={ROUTES.DASHBOARD}
              className="group flex items-center gap-3 px-8 py-5 bg-[#CCFF00] border-4 border-[#CCFF00] text-black font-black uppercase tracking-widest text-lg hover:-translate-y-2 hover:bg-[#FF0055] hover:border-[#FF0055] hover:text-white hover:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition-all"
            >
              Launch Platform
              <ArrowUpRight size={24} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* LIVE MARKET TICKER (MOVED FROM TOP) */}
      <div className="w-full relative z-20 bg-[#111] border-y-2 border-white/10 text-white py-4 mt-8 md:mt-16 overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-[marquee_40s_linear_infinite] text-xs md:text-sm font-mono tracking-widest font-bold items-center">
          <span className="mx-8 text-white">BTC/USD $64,230.50 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+2.4%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $65,150.00 ▲</span></span>
          <span className="mx-8 text-white">XAU/USD $2,340.10 <span className="text-white/40 ml-2">24H: <span className="text-[#FF0055]">-0.8%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#FF0055]">AI TARGET: $2,335.00 ▼</span></span>
          <span className="mx-8 text-white">XAG/USD $28.45 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+1.2%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $29.10 ▲</span></span>
          <span className="mx-8 text-white">ETH/USD $3,450.20 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+4.1%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $3,600.00 ▲</span></span>
          <span className="mx-8 text-white">EUR/USD 1.0845 <span className="text-white/40 ml-2">24H: <span className="text-[#FF0055]">-0.1%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#FF0055]">AI TARGET: 1.0820 ▼</span></span>

          {/* DUPLICATE FOR INFINITE LOOP */}
          <span className="mx-8 text-white">BTC/USD $64,230.50 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+2.4%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $65,150.00 ▲</span></span>
          <span className="mx-8 text-white">XAU/USD $2,340.10 <span className="text-white/40 ml-2">24H: <span className="text-[#FF0055]">-0.8%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#FF0055]">AI TARGET: $2,335.00 ▼</span></span>
          <span className="mx-8 text-white">XAG/USD $28.45 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+1.2%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $29.10 ▲</span></span>
          <span className="mx-8 text-white">ETH/USD $3,450.20 <span className="text-white/40 ml-2">24H: <span className="text-[#CCFF00]">+4.1%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#CCFF00]">AI TARGET: $3,600.00 ▲</span></span>
          <span className="mx-8 text-white">EUR/USD 1.0845 <span className="text-white/40 ml-2">24H: <span className="text-[#FF0055]">-0.1%</span></span> <span className="mx-4 text-white/20">|</span> <span className="text-[#FF0055]">AI TARGET: 1.0820 ▼</span></span>
        </div>
      </div>

      {/* DECORATIVE BANNER (STATIC) */}
      <div className="relative z-20 w-full bg-[#CCFF00] text-black py-5 md:py-8 overflow-hidden flex whitespace-nowrap border-y-4 border-black -rotate-2 scale-105 my-20">
        <div className="flex text-2xl md:text-4xl font-black uppercase tracking-widest justify-center w-full min-w-max">
          <span className="mx-4">BITCOIN</span> •
          <span className="mx-4">GOLD</span> •
          <span className="mx-4">SILVER</span> •
          <span className="mx-4 text-outline-black">LSTM MODELS</span> •
          <span className="mx-4">ARIMA</span> •
          <span className="mx-4 text-outline-black">TECHNICAL INDICATORS</span> •
          <span className="mx-4">AI PREDICTIONS</span> •
          <span className="mx-4 text-outline-black">BITCOIN</span> •
          <span className="mx-4">GOLD</span> •
          <span className="mx-4 text-outline-black">SILVER</span>
        </div>
      </div>

      {/* FEATURES - BRUTALIST GRID */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Engineered for<br />
            <span className="text-[#FF0055]">Performance</span>
          </h2>
          <p className="text-xl text-white/60 font-medium max-w-xl">
            A complete financial analytics platform combining machine learning, technical analysis, and interactive visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1 */}
          <div className="bg-[#111] border-4 border-white/20 p-8 md:p-10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(255,255,255,1)] group relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#CCFF00] text-black flex items-center justify-center font-black text-2xl rotate-12 group-hover:rotate-0 transition-transform border-4 border-[#050505]">
              01
            </div>
            <BrainCircuit size={48} className="mb-8 text-[#CCFF00] group-hover:text-black" />
            <h3 className="text-2xl font-black uppercase tracking-wide mb-4">Deep Learning</h3>
            <p className="text-white/60 group-hover:text-black/80 font-medium leading-relaxed">
              LSTM models trained on historical market data to forecast next-day commodity prices with high accuracy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111] border-4 border-white/20 p-8 md:p-10 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(204,255,0,1)] group relative lg:-translate-y-12">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FF0055] text-white flex items-center justify-center font-black text-2xl -rotate-12 group-hover:rotate-0 transition-transform border-4 border-[#050505]">
              02
            </div>
            <GitCompare size={48} className="mb-8 text-[#FF0055] group-hover:text-black" />
            <h3 className="text-2xl font-black uppercase tracking-wide mb-4">Model Comparison</h3>
            <p className="text-white/60 group-hover:text-black/80 font-medium leading-relaxed">
              Compare LSTM, ARIMA, and ensemble models. View RMSE, MAE, MAPE, and directional accuracy metrics.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111] border-4 border-white/20 p-8 md:p-10 hover:bg-[#FF0055] hover:text-white hover:border-[#FF0055] transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(255,0,85,1)] group relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white text-black flex items-center justify-center font-black text-2xl rotate-6 group-hover:rotate-0 transition-transform border-4 border-[#050505]">
              03
            </div>
            <Activity size={48} className="mb-8 text-white" />
            <h3 className="text-2xl font-black uppercase tracking-wide mb-4">Indicators</h3>
            <p className="text-white/60 group-hover:text-white/90 font-medium leading-relaxed">
              SMA, EMA, RSI, MACD, and Bollinger Bands overlaid on beautifully interactive price charts.
            </p>
          </div>
        </div>
      </section>

      {/* MARKET NEWS SECTION */}
      <section className="py-24 md:py-32 bg-[#050505] text-white border-y-4 border-white/10 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-block bg-[#CCFF00] text-black px-4 py-2 font-black uppercase tracking-widest text-sm mb-6 transform -rotate-2 shadow-[4px_4px_0_0_#FFF]">
                Live Market Pulse
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Global<br/>Intelligence
              </h2>
            </div>
            <p className="text-white/60 font-bold max-w-sm text-lg md:text-xl">
              Real-world events drive market volatility. Stay ahead with AI-curated financial news.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKET_NEWS.map((news) => (
              <div key={news.id} className="bg-[#111] border-4 border-white/20 p-6 hover:bg-[#CCFF00] hover:text-black hover:border-black transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#FFF] group relative flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b-2 border-white/10 group-hover:border-black/20 pb-4">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">{news.source}</span>
                    <span className="font-mono text-xs font-bold text-white/50 group-hover:text-black/60">{news.time}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-6">
                    {news.headline}
                  </h3>
                </div>
                <div className="flex items-center justify-between border-t-2 border-white/10 group-hover:border-black/20 pt-4 mt-auto">
                  <span className="text-xs font-black uppercase tracking-widest">Impact</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-black/60">{news.impact}</span>
                    <div className="w-3 h-3 rounded-full border-2 border-white/20 group-hover:border-black/20" style={{ backgroundColor: news.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSETS SECTION - NEO-BRUTALIST */}
      <section className="py-32 border-y-4 border-black bg-[#111] relative overflow-hidden">
        {/* Background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
          GLOBAL MARKETS
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
            <div className="xl:w-1/3 text-center xl:text-left">
              <div className="inline-block bg-[#CCFF00] text-black px-4 py-2 font-black uppercase tracking-widest text-sm border-2 border-black mb-6 transform -rotate-2">
                Live Data Feeds
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                Trade<br />The<br />World.
              </h2>
              <p className="text-white/60 text-lg font-medium">
                Deep integration with Yahoo Finance provides high-fidelity historical and real-time data for precise AI forecasting.
              </p>
            </div>

            <div className="xl:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {ASSET_LIST.map((asset, index) => (
                <div key={asset.id} className="bg-[#050505] border-4 border-white p-8 group hover:bg-[#CCFF00] hover:border-black transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_0_rgba(255,255,255,1)] relative flex flex-col items-center text-center">
                  <div className="absolute top-4 left-4 text-sm font-black text-white/40 group-hover:text-black/40 font-mono">
                    [{asset.ticker}]
                  </div>
                  <div className="w-20 h-20 mt-4 mb-8 flex items-center justify-center text-5xl bg-[#111] border-4 border-white group-hover:border-black group-hover:bg-white transition-colors" style={{ color: asset.color }}>
                    {asset.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-widest text-white group-hover:text-black mb-2">{asset.name}</h3>
                  <div className="w-12 h-1 bg-white/20 group-hover:bg-black mt-4 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 md:px-12 bg-[#CCFF00] text-black text-center border-y-4 border-black overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.1)_2px,transparent_2px)] bg-[size:40px_40px]" />

        {/* Giant background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none">
          <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap opacity-5">
            EXECUTE
          </h2>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-block border-4 border-black bg-white px-6 py-2 font-black uppercase tracking-widest text-sm mb-10 transform -rotate-3 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            Stop Guessing. Start Computing.
          </div>

          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-16 leading-[0.9]">
            Ready To<br />
            <span
              className="text-transparent transition-colors duration-500 hover:text-black"
              style={{ WebkitTextStroke: '4px black' }}
            >
              Predict?
            </span>
          </h2>

          <Link
            href={ROUTES.REGISTER}
            className="group inline-flex items-center gap-6 px-12 py-8 bg-[#FF0055] text-white font-black uppercase tracking-widest text-2xl hover:bg-white hover:text-black shadow-[16px_16px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black transition-all"
          >
            Create Account
            <ArrowRight size={36} className="group-hover:translate-x-4 transition-transform" />
          </Link>
        </div>

        {/* Decorative Brutalist Elements */}
        <div className="absolute top-24 left-10 md:left-24 animate-[spin_10s_linear_infinite]">
          <svg width="120" height="120" viewBox="0 0 100 100" className="fill-black hidden md:block">
            <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" />
          </svg>
        </div>
        <div className="absolute bottom-24 right-10 md:right-24 animate-[spin_15s_linear_infinite_reverse]">
          <svg width="100" height="100" viewBox="0 0 100 100" className="fill-transparent stroke-black stroke-[4px] hidden md:block">
            <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" />
          </svg>
        </div>
      </section>

      {/* FAT FOOTER */}
      <footer className="bg-[#050505] border-t-4 border-white/10 pt-20 pb-10 px-6 md:px-12 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-20 text-[20vw] font-black text-white/5 pointer-events-none leading-none select-none">
          CRYPTO
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#CCFF00] flex items-center justify-center text-black font-black text-xl rotate-3 border-2 border-black">
                C
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                CryptoForex
              </span>
            </div>
            <p className="text-white/60 text-lg font-medium max-w-sm mb-8 leading-relaxed">
              Institutional-grade market predictions powered by deep learning. Built for the modern trader.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="email"
                placeholder="ENTER EMAIL FOR UPDATES"
                className="bg-[#111] border-2 border-white/20 px-4 py-4 text-sm font-mono uppercase tracking-widest outline-none focus:border-[#CCFF00] w-full sm:max-w-[300px]"
              />
              <button className="bg-[#CCFF00] text-black font-black px-6 py-4 uppercase tracking-widest text-sm border-2 border-[#CCFF00] hover:bg-white hover:border-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#FFF] transition-all">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-[#CCFF00] font-black uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-white/60 font-bold uppercase tracking-wide text-sm">
              <li><Link href={ROUTES.DASHBOARD} className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href={ROUTES.PREDICT} className="hover:text-white transition-colors">AI Predictions</Link></li>
              <li><Link href={ROUTES.MODELS} className="hover:text-white transition-colors">Models</Link></li>
              <li><Link href={ROUTES.INDICATORS} className="hover:text-white transition-colors">Live Charts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#CCFF00] font-black uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-white/60 font-bold uppercase tracking-wide text-sm">
              <li><Link href={ROUTES.HELP} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href={ROUTES.HELP} className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
            © 2026 UNIVERSITY OF LAHORE FINAL YEAR PROJECT
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
            <span>BTC-LSTM-V1.2</span>
            <span>SYSTEM STATUS: <span className="text-[#CCFF00]">ONLINE</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
