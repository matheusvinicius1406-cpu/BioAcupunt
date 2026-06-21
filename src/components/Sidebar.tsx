import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  Wallet, 
  Settings,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pacientes', label: 'Pacientes', icon: Users },
  { path: '/agenda', label: 'Agenda', icon: Calendar },
  { path: '/anamnese', label: 'Atendimento', icon: ClipboardList },
  { path: '/chat', label: 'IA Chat', icon: MessageSquare },
  { path: '/sinergia', label: 'Sinergia', icon: Sparkles },
  { path: '/conhecimento', label: 'Conhecimento', icon: BookOpen },
  { path: '/financeiro', label: 'Financeiro', icon: Wallet },
  { path: '/ajustes', label: 'Ajustes', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-40
        w-64 bg-white border-r border-emerald-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">B</span>
              </div>
              BioAcupunt
            </h1>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'}
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-emerald-50">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                DC
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Dra. Camila</p>
                <p className="text-xs text-gray-500">Acupunturista</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
