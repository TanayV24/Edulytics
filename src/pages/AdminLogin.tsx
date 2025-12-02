import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  // Developer Login State
  const [devEmail, setDevEmail] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [devLoading, setDevLoading] = useState(false);

  // Institution Login State
  const [instEmail, setInstEmail] = useState('');
  const [instPassword, setInstPassword] = useState('');
  const [instLoading, setInstLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const { toast } = useToast();

  // Handle Developer Login
  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevLoading(true);

    try {
      const response = await login(devEmail, devPassword);
      
      if (response.admin.role === 'developer_admin') {
        navigate('/admin/developer/entry');
        toast({ 
          title: 'Welcome Developer!', 
          description: 'Entering creative zone...' 
        });
      } else {
        toast({ 
          title: 'Error', 
          description: 'Not a developer account', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Invalid developer credentials', 
        variant: 'destructive' 
      });
    } finally {
      setDevLoading(false);
    }
  };

  // Handle Institution Login
  const handleInstLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setInstLoading(true);

    try {
      const response = await login(instEmail, instPassword);
      
      if (response.admin.role === 'institution_admin') {
        navigate('/admin/dashboard');
        toast({ 
          title: 'Welcome!', 
          description: 'Institution admin access granted' 
        });
      } else {
        toast({ 
          title: 'Error', 
          description: 'Not an institution account', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Invalid institution credentials', 
        variant: 'destructive' 
      });
    } finally {
      setInstLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Edulytics Admin Portal</h1>
          <p className="text-blue-100">Choose your access level and login</p>
        </div>

        {/* Login Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* DEVELOPER ADMIN LOGIN */}
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">👨‍💻 Developer Admin</h2>
              <p className="text-gray-600 text-sm">Full platform access</p>
            </div>

            <form onSubmit={handleDevLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={devEmail}
                  onChange={(e) => setDevEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={devPassword}
                  onChange={(e) => setDevPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={devLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {devLoading ? 'Logging in...' : 'Enter Developer Zone'}
              </button>
            </form>
          </div>

          {/* INSTITUTION ADMIN LOGIN */}
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🏫 Institution Admin</h2>
              <p className="text-gray-600 text-sm">Manage your institution</p>
            </div>

            <form onSubmit={handleInstLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={instEmail}
                  onChange={(e) => setInstEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                  placeholder="admin@school.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={instPassword}
                  onChange={(e) => setInstPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={instLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {instLoading ? 'Logging in...' : 'Access Institution Panel'}
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm mt-8">
          Protected by JWT Authentication • Role-Based Access Control
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;
