import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Calendar, Play } from 'react-feather';
import { Sparkles } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ size: number }>;
  number: string;
  label: string;
}

const Hero3 = () => {
    const stats: StatItem[] = [
      { icon: Sparkles, number: '500+', label: 'Happy Clients' },
      { icon: Sparkles, number: '50+', label: 'Designs' },
      { icon: Sparkles, number: '10+', label: 'Artists' },
      { icon: Sparkles, number: '5+', label: 'Awards' }
    ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brown-900/90 via-brown-800/80 to-brown-900/90 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/1612513/pexels-photo-1612513.jpeg" 
          alt="Beautiful mehandi design" 
          className="w-full h-full object-cover"
        />
      </div>

       {/* Floating elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brown-400/20 rounded-full animate-bounce delay-500"></div>
      </div>

       {/* Content */}
       <div className="container mx-auto px-4 relative z-20">
         <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm font-medium">Premium Henna Experience Since 2020</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Discover the</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Art of Mehandi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-brown-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium henna products, professional artists, and expert classes - all in one place. 
            Create beautiful traditions with authentic, natural henna.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/shop" 
              className="group bg-white text-brown-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Shop Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/book-artist" 
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>Book Artist</span>
            </Link>

            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Play size={16} />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles size={20} className="text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm text-brown-200">{stat.label}</div>
              </div>
            ))}
          </div>
         </div>
       </div> 

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>     

    </section>
  );
};

export default Hero3;

// const Hero3 = () => {

//   return (
//     <>jfkldjslkj</>
    {/* Hero Section */}
    // <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brown-900/90 via-brown-800/80 to-brown-900/90 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/1021140/pexels-photo-1021140.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" 
          alt="Beautiful mehandi design" 
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Floating elements */}
      {/* <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brown-400/20 rounded-full animate-bounce delay-500"></div>
      </div> */}

      {/* Content */}
    //   <div className="container mx-auto px-4 relative z-20">
    //     <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          {/* <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm font-medium">Premium Henna Experience Since 2020</span>
          </div> */}

          {/* Main heading */}
          {/* <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Discover the</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Art of Mehandi
            </span>
          </h1> */}

          {/* Subtitle */}
          {/* <p className="text-xl md:text-2xl text-brown-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium henna products, professional artists, and expert classes - all in one place. 
            Create beautiful traditions with authentic, natural henna.
          </p> */}

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/shop" 
              className="group bg-white text-brown-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Shop Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/book-artist" 
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>Book Artist</span>
            </Link>

            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Play size={16} />
              <span>Watch Demo</span>
            </button>
          </div> */}

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <stat.icon size={20} className="text-yellow-400" />
                </div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm text-brown-200">{stat.label}</div>
              </div>
            ))}
          </div> */}
    //     </div>
    //   </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div> */}
    {/* </section> */}
//   );
// };

// export default Hero3;