import React, { useState } from 'react';
import { Bell, Menu, Search, X, CheckCheck, Inbox, Clock } from 'lucide-react';
import { Button, Avatar, Badge } from './ui/Primitives';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
      { id: 1, type: 'critical', title: 'Critical Compliance Alert', msg: 'The PF Wage Cap revision requires immediate attention. Impact analysis suggests a 15% increase in liability.', time: '2 hours ago', read: false },
      { id: 2, type: 'critical', title: 'Action Required: ESI Filing', msg: 'Monthly ESI return filing for Jan 2025 is due in 2 days.', time: '5 hours ago', read: false },
      { id: 3, type: 'critical', title: 'Policy Update Pending', msg: 'New sexual harassment policy draft needs approval from Internal Committee.', time: '6 hours ago', read: false },
      { id: 4, type: 'success', title: 'Audit Successfully Completed', msg: 'Q4 Internal Audit for Payroll compliance has been marked as passed.', time: 'Yesterday', read: true },
      { id: 5, type: 'info', title: 'System Maintenance', msg: 'The dashboard will be under maintenance on Sunday from 2 AM to 4 AM.', time: 'Yesterday', read: true },
  ]);

  const markAllRead = () => {
      setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const markAsRead = (id: number) => {
      setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-slate-900 hidden sm:block">Compliance Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-64 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
            />
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-slate-100 rounded-full"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white ring-1 ring-white"></span>
              )}
            </Button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
                  <p className="text-xs text-slate-500">HR Manager</p>
              </div>
              <Avatar 
                  src="https://picsum.photos/200" 
                  fallback="AM" 
                  className="cursor-pointer ring-2 ring-transparent hover:ring-slate-200 transition-all"
              />
          </div>
        </header>

      {/* Right Side Notification Drawer (Sheet) */}
      {showNotifications && (
        <>
            <div 
                className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-[90] transition-opacity"
                onClick={() => setShowNotifications(false)}
            />
            <div className="fixed inset-y-0 right-0 z-[100] w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 animate-in slide-in-from-right flex flex-col">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                                    {unreadCount} New
                                </span>
                            )}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Stay updated with compliance alerts</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-900">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 space-y-4">
                    
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="bg-slate-100 p-4 rounded-full mb-3">
                                <Inbox className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">No notifications</p>
                            <p className="text-xs text-slate-500">You're all caught up!</p>
                        </div>
                    ) : (
                        <>
                             {/* Today Section */}
                            <div>
                                <div className="flex items-center justify-between px-1 mb-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
                                    {unreadCount > 0 && (
                                        <button onClick={markAllRead} className="text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                            Mark all as read
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {notifications.filter(n => !n.read).map((notification) => (
                                        <div 
                                            key={notification.id} 
                                            className="group relative flex gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer"
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="mt-1 relative shrink-0">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                                            </div>
                                            <div className="flex-1 pr-6">
                                                <p className="text-sm font-semibold text-slate-900 leading-snug">{notification.title}</p>
                                                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                                    {notification.msg}
                                                </p>
                                                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {notification.time}
                                                </p>
                                            </div>
                                            <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600" title="Mark as read">
                                                    <CheckCheck className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Earlier Section */}
                            <div>
                                <div className="flex items-center justify-between px-1 mb-2 mt-4">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Earlier</span>
                                </div>
                                <div className="space-y-2">
                                    {notifications.filter(n => n.read).map((notification) => (
                                        <div 
                                            key={notification.id} 
                                            className="flex gap-3 p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-200 transition-colors"
                                        >
                                            <div className="mt-1 shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">{notification.title}</p>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                                    {notification.msg}
                                                </p>
                                                <p className="text-[10px] text-slate-400 mt-2">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <Button variant="outline" className="w-full text-slate-600 border-slate-200 hover:bg-slate-50">
                        View All Activity History
                    </Button>
                </div>
            </div>
        </>
      )}
    </>
  );
};