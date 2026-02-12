import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dxh0pRbF.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const team = [
    {
      name: "Dr. Rockson Samuel",
      role: "Founder & Chief Dental Officer",
      icon: "\u{1F468}\u200D\u2695\uFE0F",
      color: "primary-500"
    },
    {
      name: "Dr. Nupur Shrirao",
      role: "Chief Editor",
      icon: "\u{1F4DA}",
      color: "red-500"
    },
    {
      name: "Dr. Zainab Rangawala",
      role: "Media & PR",
      icon: "\u{1F310}",
      color: "primary-500"
    }
  ];
  const techTeam = [
    { name: "Bhavye", role: "Technical Lead", email: "bhavye29@gmail.com" },
    {
      name: "Nehan",
      role: "Full Stack Developer",
      email: "nehanlil06@gmail.com"
    },
    { name: "Nikhil", role: "UI/UX Developer", email: "nikhilgaur@gmail.com" }
  ];
  const objectives = [
    {
      icon: "\u{1F30D}",
      title: "Global Community",
      desc: "Foster a worldwide network of dental professionals sharing knowledge and expertise"
    },
    {
      icon: "\u{1F4D6}",
      title: "Knowledge Sharing",
      desc: "Enable seamless sharing of clinical knowledge, research, and best practices"
    },
    {
      icon: "\u{1F3C6}",
      title: "Professional Growth",
      desc: "Promote career advancement through recognition, collaboration, and learning"
    },
    {
      icon: "\u2764\uFE0F",
      title: "Bridge Education Gaps",
      desc: "Improve access to dental education and resources for professionals worldwide"
    },
    {
      icon: "\u{1F4A1}",
      title: "Drive Innovation",
      desc: "Support digital transformation and innovation in modern dentistry"
    }
  ];
  const features = [
    {
      icon: "\u{1F4D6}",
      title: "Knowledge & Content",
      items: [
        "Peer-reviewed articles & clinical case studies",
        "Journals and research archives",
        "Newsletter and educational resources"
      ]
    },
    {
      icon: "\u{1F91D}",
      title: "Community & Networking",
      items: [
        "Professional forums & discussions",
        "Events, webinars, and conferences",
        "Business listings and classifieds"
      ]
    },
    {
      icon: "\u{1F3C6}",
      title: "Recognition & Growth",
      items: [
        "Leaderboard and awards",
        "Profile building and digital reputation",
        "Product showcases and reviews"
      ]
    },
    {
      icon: "\u{1F4F1}",
      title: "Digital Tools",
      items: [
        "Submission and publishing workflow",
        "Advanced search and filtering",
        "Mobile-friendly, modern UI"
      ]
    }
  ];
  const stats = [
    { value: "50K+", label: "Professionals" },
    { value: "100+", label: "Countries" },
    { value: "1000+", label: "Articles" },
    { value: "24/7", label: "Support" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About DentalReach | Our Mission & Vision" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-primary-900 text-white py-24 relative overflow-hidden rounded-b-[40px]"> <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> <div class="container mx-auto px-4 relative z-10"> <div class="grid lg:grid-cols-2 gap-12 items-center"> <div> <h1 class="text-5xl md:text-7xl font-tuio uppercase mb-6 leading-[0.9]">
About<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-red-500">DentalReach</span> </h1> <p class="text-xl text-gray-300 mb-8 font-light leading-relaxed">
Empowering dental professionals worldwide with a
                        collaborative, innovative, and accessible digital
                        platform for education, networking, and growth.
</p> <div class="flex flex-wrap gap-4"> <span class="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 font-medium">🌍 Global Community</span> <span class="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 font-medium">🎯 Professional Growth</span> </div> </div> <div class="bg-white/10 backdrop-blur-sm rounded-[32px] p-8 border border-white/20"> <div class="bg-white rounded-[24px] p-8 text-center"> <div class="text-5xl mb-4">❤️</div> <h3 class="text-2xl font-tuio uppercase text-tuio-navy mb-2">
Our Mission
</h3> <p class="text-gray-600 font-light">
Advancing dental care through collaboration,
                            innovation, and knowledge sharing
</p> </div> </div> </div> </div> </section>  <section class="bg-primary-500 py-12 -mt-8 relative z-20 rounded-[32px] mx-4 md:mx-8 lg:mx-16"> <div class="container mx-auto px-4"> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"> ${stats.map((stat) => renderTemplate`<div> <div class="text-4xl md:text-5xl font-tuio mb-2"> ${stat.value} </div> <div class="text-white/80 uppercase tracking-widest text-sm"> ${stat.label} </div> </div>`)} </div> </div> </section>  <section class="py-20 bg-primary-50"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-4xl font-heading uppercase text-primary-900 mb-4">
Community Leaders
</h2> <div class="w-24 h-1 bg-primary-500 mx-auto"></div> </div> <div class="grid md:grid-cols-3 gap-8"> ${team.map((member) => renderTemplate`<div class="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"> <div class="text-6xl mb-6">${member.icon}</div> <h3 class="font-heading text-2xl uppercase text-primary-900 mb-2"> ${member.name} </h3> <p class="text-primary-500 font-bold uppercase tracking-wide"> ${member.role} </p> </div>`)} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-4xl font-heading uppercase text-primary-900 mb-4">
Our Objectives
</h2> <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div> <p class="text-xl text-gray-500 max-w-3xl mx-auto font-light">
We're committed to transforming the dental profession
                    through these key objectives
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${objectives.map((obj) => renderTemplate`<div class="bg-primary-50/50 rounded-[32px] p-8 hover:shadow-lg transition-all group border border-transparent hover:border-primary-500"> <div class="text-4xl mb-6 group-hover:scale-110 transition-transform"> ${obj.icon} </div> <h3 class="font-heading text-xl uppercase text-primary-900 mb-4"> ${obj.title} </h3> <p class="text-gray-500 font-light">${obj.desc}</p> </div>`)} </div> </div> </section>  <section class="py-20 bg-primary-50"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-4xl font-heading uppercase text-primary-900 mb-4">
Core Features
</h2> <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div> <p class="text-xl text-gray-500 max-w-3xl mx-auto font-light">
Comprehensive tools and features designed specifically for
                    dental professionals
</p> </div> <div class="grid lg:grid-cols-2 gap-8"> ${features.map((feat) => renderTemplate`<div class="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all"> <div class="flex items-start gap-6 mb-6"> <div class="text-4xl">${feat.icon}</div> <div> <h3 class="font-heading text-2xl uppercase text-primary-900 mb-2"> ${feat.title} </h3> </div> </div> <ul class="space-y-3"> ${feat.items.map((item) => renderTemplate`<li class="flex items-start gap-3"> <span class="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0"></span> <span class="text-gray-600"> ${item} </span> </li>`)} </ul> </div>`)} </div> </div> </section>  <section class="py-20 bg-white"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-4xl font-heading uppercase text-primary-900 mb-4">
Technical Team
</h2> <div class="w-24 h-1 bg-primary-500 mx-auto mb-6"></div> <p class="text-xl text-gray-500 max-w-3xl mx-auto font-light">
Our skilled developers and engineers who bring DentalReach
                    to life
</p> </div> <div class="grid md:grid-cols-3 gap-8"> ${techTeam.map((member) => renderTemplate`<div class="bg-primary-50 rounded-[32px] p-8 text-center hover:shadow-lg transition-all group border border-transparent hover:border-primary-500"> <div class="w-20 h-20 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors"> <span class="text-3xl">💻</span> </div> <h3 class="font-heading text-xl uppercase text-primary-900 mb-2"> ${member.name} </h3> <p class="text-primary-500 font-bold mb-3"> ${member.role} </p> <a${addAttribute(`mailto:${member.email}`, "href")} class="text-gray-500 text-sm hover:text-primary-500 transition-colors"> ${member.email} </a> </div>`)} </div> </div> </section>  <section class="py-20 bg-primary-900 text-white rounded-t-[40px]"> <div class="container mx-auto px-4"> <div class="max-w-4xl mx-auto text-center"> <h2 class="text-4xl md:text-5xl font-heading uppercase mb-8 leading-tight">
Advancing<br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-red-500">Global Oral Health</span> </h2> <p class="text-xl text-gray-300 mb-10 font-light leading-relaxed">
Our mission is to empower dental professionals worldwide by
                    providing a collaborative, innovative, and accessible
                    digital platform—enabling them to excel in their practice,
                    advance dental care, and make a meaningful impact on global
                    oral health.
</p> <a href="/community" class="inline-block px-10 py-4 bg-primary-500 text-white rounded-full font-bold hover:bg-white hover:text-primary-500 transition-all uppercase tracking-wide">
Join Our Community
</a> </div> </div> </section> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/about.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
