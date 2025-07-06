import { Link } from 'react-router-dom';

const SimpleHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-brand shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-12 w-auto flex items-center">
              <img 
                src="/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png" 
                alt="Bluewater Group Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;