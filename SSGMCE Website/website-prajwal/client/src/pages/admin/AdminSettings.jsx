import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  FaCog, FaDatabase, FaShieldAlt, FaPalette, FaBell, FaMoon, FaSun, FaDesktop,
} from "react-icons/fa";

const AdminSettings = () => {
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);

  const themeOptions = [
    { value: "light", label: "Light", icon: FaSun, desc: "Clean light interface" },
    { value: "dark", label: "Dark", icon: FaMoon, desc: "Easy on the eyes" },
    { value: "auto", label: "System", icon: FaDesktop, desc: "Follows OS setting" },
  ];

  const settingsSections = [
    {
      title: "General Settings",
      icon: FaCog,
      color: "blue",
      settings: [
        { label: "Site Title", value: "SSGMCE - Official Website", type: "text" },
        { label: "Site Description", value: "Shri Sant Gajanan Maharaj College of Engineering", type: "text" },
        { label: "Contact Email", value: "info@ssgmce.ac.in", type: "email" },
      ],
    },
    {
      title: "Database",
      icon: FaDatabase,
      color: "green",
      settings: [
        { label: "Auto Backup", value: true, type: "toggle" },
        { label: "Backup Frequency", value: "Daily", type: "select", options: ["Hourly", "Daily", "Weekly"] },
        { label: "Last Backup", value: "2 hours ago", type: "readonly" },
      ],
    },
    {
      title: "Security",
      icon: FaShieldAlt,
      color: "red",
      settings: [
        { label: "Two-Factor Authentication", value: false, type: "toggle" },
        { label: "Session Timeout (minutes)", value: "30", type: "number" },
        { label: "Max Login Attempts", value: "5", type: "number" },
      ],
    },
    {
      title: "Notifications",
      icon: FaBell,
      color: "yellow",
      settings: [
        { label: "Email Notifications", value: true, type: "toggle" },
        { label: "Browser Notifications", value: false, type: "toggle" },
        { label: "Notification Sound", value: true, type: "toggle" },
      ],
    },
  ];

  const colorVariants = {
    blue: { light: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
    green: { light: "bg-green-50 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
    red: { light: "bg-red-50 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400" },
    purple: { light: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
    yellow: { light: "bg-yellow-50 dark:bg-yellow-900/30", text: "text-yellow-600 dark:text-yellow-400" },
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Manage system configuration and preferences</p>
        </div>

        {/* Appearance / Theme Section */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FaPalette className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Appearance</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Customize the admin panel look</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme Mode</p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const selected = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50"
                    }`}
                  >
                    <Icon className={`text-xl ${selected ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`} />
                    <span className={`text-sm font-semibold ${selected ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}>
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">{opt.desc}</span>
                    {selected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Other Settings */}
        <div className="grid grid-cols-1 gap-6">
          {settingsSections.map((section, idx) => {
            const Icon = section.icon;
            const colors = colorVariants[section.color];
            return (
              <div key={idx} className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.light} rounded-lg flex items-center justify-center`}>
                    <Icon className={colors.text} />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{section.title}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {section.settings.map((setting, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div className="flex-1">
                        <label className="block font-medium text-sm text-gray-700 dark:text-gray-300 mb-0.5">{setting.label}</label>
                        {setting.type === "readonly" && (
                          <p className="text-xs text-gray-400 dark:text-gray-500">{setting.value}</p>
                        )}
                      </div>
                      <div className="ml-4">
                        {setting.type === "text" && (
                          <input type="text" defaultValue={setting.value}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-colors" />
                        )}
                        {setting.type === "email" && (
                          <input type="email" defaultValue={setting.value}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-colors" />
                        )}
                        {setting.type === "number" && (
                          <input type="number" defaultValue={setting.value}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-32 transition-colors" />
                        )}
                        {setting.type === "select" && (
                          <select defaultValue={setting.value}
                            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 transition-colors">
                            {setting.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        )}
                        {setting.type === "toggle" && (
                          <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                          }`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.value ? "translate-x-6" : "translate-x-1"
                            }`} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save */}
        <div className="flex items-center justify-end gap-3 bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 p-6">
          <button className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
              saved
                ? "bg-green-500 text-white"
                : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
            }`}
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
