
import React from 'react';

const Footer = () => {
  return (
    <footer id="contacts" className="relative bg-brand-black text-white pt-32 pb-12 overflow-hidden">
      
      {/* Top Curve Mask using Clip Path defined in index.html styles */}
      <div className="absolute top-[-1px] left-0 w-full h-16 md:h-32 bg-white clip-curve-bottom z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-12">
         <div className="grid lg:grid-cols-2 gap-16 mb-24">
             
             {/* Contact / CTA Area */}
             <div>
                 <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Contacts</h2>
                 <p className="text-brand-yellow font-bold text-lg mb-8">Start validating today.</p>
                 
                 <div className="space-y-6 mb-12">
                     <div>
                        <span className="text-brand-yellow font-bold text-sm uppercase tracking-wider">Email</span>
                        <p className="text-2xl font-medium mt-1">hello@menufight.com</p>
                     </div>
                     <div>
                        <span className="text-brand-yellow font-bold text-sm uppercase tracking-wider">Support</span>
                        <p className="text-xl font-medium mt-1">+1 (555) MENU-WIN</p>
                     </div>
                 </div>

                 <div className="flex gap-4">
                    <a href="/dashboard" className="bg-white text-brand-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-brand-yellow transition-colors">
                        Get Started Free
                    </a>
                    <a href="/login" className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                        Log In
                    </a>
                 </div>
             </div>

             {/* Image/Decoration Area - Floating Food */}
             <div className="relative hidden lg:block">
                 <div className="absolute right-10 top-10 w-64 h-64 bg-brand-yellow rounded-full opacity-20 blur-3xl animate-pulse"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Footer Food" 
                    className="relative z-10 rounded-full border-8 border-brand-darkGray shadow-2xl w-80 h-80 object-cover float-right hover:scale-105 transition-transform duration-700"
                 />
                 
                 {/* Floating Elements */}
                 <div className="absolute bottom-0 right-[350px] w-24 h-24 bg-brand-darkGray rounded-full flex items-center justify-center border-4 border-brand-black shadow-xl animate-float">
                    <span className="text-3xl">🥑</span>
                 </div>
             </div>
         </div>

         {/* Bottom Links & Copyright */}
         <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black font-extrabold text-sm">M</div>
                 <span className="font-bold text-xl tracking-tight">MenuFight.</span>
             </div>

             <div className="flex gap-8 text-sm text-gray-400 font-medium">
                 <a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-brand-yellow transition-colors">Terms of Service</a>
                 <a href="#" className="hover:text-brand-yellow transition-colors">Cookies</a>
             </div>

             <div className="flex gap-4">
                 {/* Social Icons */}
                 {['FB', 'IG', 'TW'].map(social => (
                     <div key={social} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-brand-yellow hover:text-brand-black transition-colors cursor-pointer">
                        {social}
                     </div>
                 ))}
             </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
