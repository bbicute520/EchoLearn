import { Outlet, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white font-medium' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Language Learner 📖</h2>
        
        <nav className="flex justify-center gap-2 mb-6">
          <Link to="/add" className={getLinkClass('/add')}>Thêm từ</Link>
          <Link to="/study" className={getLinkClass('/study')}>Học tập</Link>
          <Link to="/" className={getLinkClass('/')}>Menu</Link>
        </nav>

        <hr className="opacity-20 my-6 border-gray-300" />

        <main>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
