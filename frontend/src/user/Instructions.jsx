import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Home, 
  Star,
  Trophy,
  PlayCircle,
  Sparkles,
  Rocket,
  Brain,
  Timer,
  ChevronLeft,
  LayoutGrid,
  User,
  Menu,
  
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Instructions = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
  
    const handleLogout = () => {
      logout();
    };
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [gameScore, setGameScore] = useState(0);
  const [gameFeedback, setGameFeedback] = useState('');
  const [answer, setAnswer] = useState({ h: '', m: '', s: '' });

  const sections = [
    { id: 'home', title: 'الرئيسية', icon: <Home size={22} />, color: 'bg-pink-400', borderColor: 'border-pink-500' },
    { id: 'addition', title: 'جمع الزمن', icon: <Plus size={22} />, color: 'bg-orange-400', borderColor: 'border-orange-500' },
    { id: 'subtraction', title: 'طرح الزمن', icon: <Minus size={22} />, color: 'bg-blue-400', borderColor: 'border-blue-500' },
    { id: 'multiplication', title: 'ضرب الزمن', icon: <X size={22} />, color: 'bg-purple-400', borderColor: 'border-purple-500' },
    { id: 'division', title: 'قسمة الزمن', icon: <Divide size={22} />, color: 'bg-green-400', borderColor: 'border-green-500' },
    { id: 'game', title: 'اختبر نفسك', icon: <Gamepad2Icon size={22} />, color: 'bg-yellow-400', borderColor: 'border-yellow-500' },
  ];

  const checkGameAnswer = () => {
    if (answer.h === '4' && answer.m === '6' && answer.s === '20') {
      setGameScore(prev => prev + 10);
      setGameFeedback('أحسنت يا بطل! إجابة صحيحة 🌟🥇');
    } else {
      setGameFeedback('أوه! حاول مرة أخرى، لا تنسَ تحويل الـ 60! 🧐');
    }
  };

  // Precisely Engineered Animated Clock Component
  const SectionClock = ({ type }) => {
    const renderMarkers = () => {
      let markers = [];
      for (let i = 0; i < 12; i++) {
        const isQuarter = i % 3 === 0;
        markers.push(
          <div 
            key={i} 
            className={`absolute bg-gray-300 origin-bottom`} 
            style={{ 
              width: isQuarter ? '3px' : '1.5px',
              height: isQuarter ? '10px' : '6px',
              bottom: '50%', 
              left: '50%', 
              transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-60px)` 
            }}
          />
        );
      }
      return markers;
    };

    return (
      <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-gray-200 blur-md translate-y-3"></div>
        <div className="absolute inset-0 border-[10px] border-gray-800 rounded-full bg-white shadow-inner z-0"></div>
        <div className="absolute inset-3 rounded-full bg-gradient-to-b from-gray-50 to-white shadow-sm z-0"></div>
        {renderMarkers()}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div 
            className={`absolute w-2 h-12 bg-gray-800 rounded-full origin-[center_calc(100%-4px)] shadow-sm transition-all duration-700
              ${type === 'addition' ? 'animate-clock-spin-slow' : type === 'subtraction' ? 'animate-clock-reverse-slow' : ''}`}
            style={{ 
              bottom: '50%', 
              marginBottom: '-4px', 
              transform: 'rotate(45deg)' 
            }}
          ></div>
          <div 
            className={`absolute w-1.5 h-16 bg-blue-600 rounded-full origin-[center_calc(100%-4px)] shadow-sm transition-all duration-700
              ${type === 'addition' ? 'animate-clock-spin' : type === 'subtraction' ? 'animate-clock-reverse' : 'animate-pulse'}`}
            style={{ 
              bottom: '50%', 
              marginBottom: '-4px',
              transform: 'rotate(180deg)'
            }}
          ></div>
          <div 
            className="absolute w-0.5 h-18 bg-red-500 rounded-full origin-[center_calc(100%-4px)] animate-clock-tick"
            style={{ 
              bottom: '50%', 
              marginBottom: '-4px'
            }}
          ></div>
          <div className="w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-md z-20"></div>
        </div>
        <div className="absolute -top-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border-2 border-gray-50 z-30 animate-bounce">
          <span className="text-3xl font-black">
            {type === 'addition' ? '➕' : type === 'subtraction' ? '➖' : type === 'multiplication' ? '✖️' : '➗'}
          </span>
        </div>
      </div>
    );
  };

  const InstructionCard = ({ title, content, example, color, emoji, sectionType }) => (
    <div className={`bg-white rounded-[4rem] shadow-2xl p-10 mb-10 border-b-[16px] border-l-4 transition-all hover:-translate-y-2 ${color}`}>
      <div className="flex flex-col xl:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-5xl font-black mb-8 text-gray-800 flex items-center gap-4">
            <span className="text-6xl drop-shadow-md">{emoji}</span> {title}
          </h3>
          <div className="text-2xl text-gray-700 mb-8 leading-loose bg-white bg-opacity-60 p-8 rounded-[3rem] border-4 border-white shadow-inner">
            {content.split('\n').map((line, i) => (
              <p key={i} className="mb-3 flex items-start gap-3">
                <span className="text-yellow-500 mt-1">⭐</span> {line}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[3rem] border-2 border-white shadow-sm">
           <SectionClock type={sectionType} />
           <p className="font-black text-blue-400 mt-2 uppercase tracking-widest text-sm">التطبيق العملي</p>
        </div>
      </div>
      
      {example && (
        <div className="bg-white p-10 rounded-[3.5rem] border-8 border-dashed border-gray-100 shadow-inner relative overflow-hidden mt-6 group">
          <h4 className="font-black text-gray-800 text-3xl mb-6 flex items-center gap-3">
            <Brain className="text-pink-500" size={40} /> لغز الأبطال:
          </h4>
          <div className="whitespace-pre-line text-gray-800 font-bold text-2xl bg-gradient-to-r from-blue-50 to-white p-8 rounded-3xl border-r-[12px] border-blue-400 shadow-sm">
            {example}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFEFF] flex flex-col font-sans overflow-x-hidden relative" dir="rtl">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-8xl opacity-5 animate-pulse">🕑</div>
        <div className="absolute bottom-40 right-20 text-8xl opacity-5 animate-bounce">🎨</div>
        <div className="absolute top-1/3 right-10 text-8xl opacity-5 animate-spin-slow">🌟</div>
        <div className="absolute bottom-10 left-1/4 text-9xl opacity-5">🔢</div>
      </div>

    <nav className="bg-white shadow-xl px-10 py-6 flex justify-between items-center sticky top-0 z-50 border-b-[10px] border-yellow-300">

        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => setActiveSection("home")}
        >
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-3xl text-white shadow-2xl">
            <Clock size={36} />
          </div>

          <h1 className="text-4xl font-black text-blue-900">
            مدينة <span className="text-yellow-500">الزمن</span>
          </h1>
        </div>

        {/* Desktop Links */}

        <div className="hidden md:flex items-center gap-8">

          <a href="/" className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600">
            <LayoutGrid size={20} />
            صفحة الدروس
          </a>

          <a href="/equations-game" className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600">
            <Rocket size={20} />
            صفحة التحديات
          </a>

          <a href="/family-zone" className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600">
            <User size={20} />
            فضاء الولي
          </a>

        </div>

        {/* Auth */}

        <div className="hidden md:flex bg-white border-4 border-yellow-400 px-8 py-3 rounded-full text-yellow-600 font-black items-center gap-3 shadow-xl">

          {isAuthenticated ? (

            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-indigo-700 font-semibold transition-colors relative group py-1"
            >
              Logout
            </button>

          ) : (

            <a
              href="/login"
              className="text-gray-600 hover:text-indigo-700 font-semibold transition-colors relative group py-1"
            >
              Login
            </a>

          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={30} />
        </button>

      </nav>

      {/* ================= MOBILE NAV ================= */}

      {mobileMenuOpen && (

        <div className="md:hidden bg-white shadow-xl p-6 flex flex-col gap-6">

          <a href="/" className="font-bold text-gray-700">صفحة الدروس</a>

          <a href="/equations-game" className="font-bold text-gray-700">صفحة التحديات</a>

          <a href="/family-zone" className="font-bold text-gray-700">فضاء الولي</a>

          {isAuthenticated ? (

            <button onClick={handleLogout} className="text-left font-bold text-red-500">
              Logout
            </button>

          ) : (

            <a href="/login" className="font-bold text-blue-600">
              Login
            </a>

          )}

        </div>

      )}


      <div className="flex flex-1">
        {/* <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-white border-l-[12px] border-gray-50 transition-all duration-700 hidden lg:block p-6`}>
          <div className="flex flex-col gap-5 sticky top-40">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group flex items-center gap-5 p-5 rounded-[2.5rem] font-black transition-all duration-300 transform hover:scale-105 ${
                  activeSection === section.id 
                  ? `${section.color} text-white shadow-2xl translate-x-4` 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border-4 border-transparent hover:border-gray-200'
                }`}
              >
                <span className={`p-3 rounded-2xl transition-colors ${activeSection === section.id ? 'bg-white bg-opacity-30' : 'bg-gray-100 text-gray-600'}`}>
                  {section.icon}
                </span>
                {isSidebarOpen && <span className="text-xl">{section.title}</span>}
              </button>
            ))}
          </div>
        </aside> */}


          <aside
          className={`
          fixed lg:static top-0 right-0 h-full
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
          bg-white border-l-[12px] border-gray-50
          transition-transform duration-500
          w-80 p-6 z-40
          `}
        >

          {/* <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="font-bold text-lg">القائمة</h2>

            <button onClick={() => setSidebarOpen(false)}>
              <Menu size={28}/>
            </button>
          </div> */}

          <div className="flex flex-col gap-5">

            {sections.map(section => (

              <button
                  key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center gap-5 p-5 rounded-[2.5rem] font-black transition-all duration-300 transform hover:scale-105
                ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-2xl translate-x-4` 
                    : "bg-white text-gray-500 hover:bg-gray-50 border-4 border-transparent hover:border-gray-200"
                }`}
              >
                {section.icon}
                {section.title}
              </button>

            ))}

          </div>

        </aside>


        <main className="flex-1 p-8 md:p-16">
            <button
    className="lg:hidden mb-6 bg-white shadow-lg p-3 rounded-xl"
    onClick={() => setSidebarOpen(true)}
  >
    <Menu size={28} />
  </button>
          {activeSection === 'home' && (
            <div className="max-w-5xl mx-auto text-center py-10">
              <div className="mb-16 relative inline-block group">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-10 animate-pulse"></div>
                <div className="relative z-10 p-10 bg-white rounded-[5rem] shadow-2xl border-[16px] border-blue-50 -rotate-3 transition-all group-hover:rotate-0">
                  <Clock size={200} className="text-blue-500 animate-clock-spin" />
                </div>
                <div className="absolute -top-10 -left-10 bg-pink-500 p-8 rounded-full shadow-2xl animate-bounce">
                  <Star size={50} className="text-white fill-current" />
                </div>
              </div>
              <h2 className="text-8xl font-black text-blue-900 mb-8 tracking-tighter drop-shadow-md">جاهز للمغامرة؟ 🦾</h2>
              <p className="text-4xl text-gray-500 mb-16 max-w-3xl mx-auto font-bold leading-tight">
                تعلم حساب الساعات صار <span className="text-green-500 underline decoration-double">لعبة سهلة</span> وممتعة مع سوبر ساعة!
              </p>
              <button 
                onClick={() => setActiveSection('addition')}
                className="group bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-20 py-10 rounded-[4rem] text-5xl font-black shadow-2xl transition-all transform hover:scale-110 flex items-center gap-6 mx-auto border-b-[16px] border-green-800"
              >
                <Rocket className="animate-pulse" size={50} /> 
                هيا نطير!
              </button>
            </div>
          )}

          {activeSection === 'addition' && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard 
                sectionType="addition"
                title="أبطال الجمع"
                emoji="🚀"
                color="border-orange-400"
                content={`1. ترتيب الوحدات (ساعة فوق ساعة، دقيقة فوق دقيقة).
                2. نجمع من الأصغر (ثواني) للأكبر (ساعات).
                3. سر القوة: إذا وصل الناتج لـ 60، نحوله فوراً للوحدة المجاورة كـ "هدية"!`}
                example={`2 س و 45 دق + 1 س و 20 دق.
                💎 الدقائق: 45 + 20 = 65 دق.
                💎 التحويل: نأخذ 60 دق (ساعة واحدة) ونترك 5 دق.
                💎 النتيجة: 4 ساعات و 5 دقائق.`}
              />
            </div>
          )}

          {activeSection === 'subtraction' && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard 
                sectionType="subtraction"
                title="تحدي الطرح"
                emoji="🕵️‍♂️"
                color="border-blue-400"
                content={`1. نبدأ الطرح من الثواني.
                2. إذا كان العدد في الأعلى أصغر، نستلف من الجار الأكبر.
                3. قاعدة الاستلاف العبقرية: 1 ساعة تعطينا 60 دقيقة كاملة!`}
                example={`الساعة 5:10 - الساعة 2:40.
                💎 الدقائق: 10 - 40 (صغير!).
                💎 الاستلاف: نأخذ 1 ساعة من الـ 5 (تصبح 4) ونضيف 60 للـ 10 (تصبح 70).
                💎 الآن: 70 - 40 = 30 دقيقة. و 4 - 2 = 2 ساعة.`}
              />
            </div>
          )}

          {activeSection === 'multiplication' && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard 
                sectionType="multiplication"
                title="مضاعف الزمن"
                emoji="⚡"
                color="border-purple-400"
                content={`نضرب كل وحدة في الرقم بشكل مستقل، ثم نعيد ترتيب الساعات إذا تجاوزت الدقائق 60.`}
                example={`3 س و 20 دق × 3:
                💎 20 دق × 3 = 60 دق (تتحول لساعة كاملة).
                💎 النتيجة: 10 ساعات بالضبط!`}
              />
            </div>
          )}

          {activeSection === 'division' && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard 
                sectionType="division"
                title="مقسم الوقت"
                emoji="🍕"
                color="border-green-400"
                content={`نقسم الساعات أولاً، وإذا بقي شيء نحوله لدقائق ونضيفه للدقائق الموجودة قبل القسمة.`}
                example={`5 س و 20 دق ÷ 4:
                💎 النتيجة: ساعة و 20 دقيقة.`}
              />
            </div>
          )}

          {activeSection === 'game' && (
            <div className="max-w-4xl mx-auto bg-white p-16 rounded-[5rem] shadow-2xl text-center border-b-[24px] border-yellow-400 relative">
              <h3 className="text-6xl font-black text-blue-900 mb-12 flex items-center justify-center gap-5">
                <span className="animate-bounce text-7xl">🎮</span> مـلـعـب الأذكياء
              </h3>
              <div className="bg-yellow-50 p-12 rounded-[4rem] mb-12 border-8 border-dashed border-yellow-200">
                <p className="text-4xl font-black text-gray-700 mb-8">أوجد ناتج الجمع العبقري:</p>
                <div className="text-5xl font-black text-blue-700 bg-white inline-block px-12 py-8 rounded-[3rem] shadow-2xl border-4 border-blue-50">
                  2 س 45 دق 30 ث + 1 س 20 دق 50 ث
                </div>
              </div>
              <div className="grid grid-cols-3 gap-10 mb-16">
                {['h', 'm', 's'].map((unit, idx) => (
                  <div key={unit} className="space-y-4">
                    <label className="text-2xl font-black text-gray-400">{unit === 'h' ? 'ساعات' : unit === 'm' ? 'دقائق' : 'ثواني'}</label>
                    <input 
                      type="number" 
                      value={answer[unit]} 
                      onChange={(e) => setAnswer({...answer, [unit]: e.target.value})}
                      className="w-full text-center p-8 border-[6px] border-gray-100 rounded-[3rem] focus:border-blue-400 outline-none text-5xl font-black text-gray-700 bg-gray-50" 
                      placeholder="00"
                    />
                  </div>
                ))}
              </div>
              <button 
                onClick={checkGameAnswer}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-black py-10 rounded-[4rem] shadow-3xl text-4xl border-b-[12px] border-blue-900"
              >
                تحقق يا بطل! 🔥
              </button>
              {gameFeedback && (
                <div className={`mt-12 p-10 rounded-[4rem] text-4xl font-black ${gameFeedback.includes('أحسنت') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {gameFeedback}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t-[16px] border-yellow-300 py-24 px-16 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-8">
            <div className="bg-yellow-400 p-6 rounded-[2.5rem] shadow-3xl rotate-6">
              <Clock size={60} className="text-white" />
            </div>
            <span className="text-5xl font-black text-blue-900 block">مغامرة الزمن مع كابتن زمن</span>
          </div>
          <p className="text-blue-500 font-black text-3xl">صُنع بحب لأجمل الأبطال ❤️</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes clock-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clock-tick {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clock-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-clock-spin { animation: clock-spin 10s linear infinite; }
        .animate-clock-spin-slow { animation: clock-spin 60s linear infinite; }
        .animate-clock-tick { animation: clock-tick 60s steps(60) infinite; }
        .animate-clock-reverse { animation: clock-reverse 10s linear infinite; }
        .animate-clock-reverse-slow { animation: clock-reverse 60s linear infinite; }
        .animate-spin-slow { animation: clock-spin 20s linear infinite; }
      `}} />
    </div>
  );
};

const Gamepad2Icon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);


export default Instructions
