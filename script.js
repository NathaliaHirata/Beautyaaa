"use strict";
const INSTAGRAM = "https://www.instagram.com/nathaliahiratabeauty?rpxt=OXR3bTJzZjd3bW1k";
const WHATSAPP_NUMBER = "5519989611995";
const whatsappLink = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const services = [
  { category: "Sobrancelhas", name: "Brow Lamination", price: "R$ 140,00", summary: "Alinha e modela os fios para criar sobrancelhas mais preenchidas.", benefits: ["Fios visualmente mais volumosos", "Formato alinhado e elegante", "Realça a expressão"] },
  { category: "Sobrancelhas", name: "Buço", price: "R$ 35,00", summary: "Remoção cuidadosa dos pelos da região acima dos lábios.", benefits: ["Acabamento delicado", "Visual mais limpo", "Procedimento rápido"] },
  { category: "Pele", name: "Dermaplaning", price: "R$ 120,00", summary: "Esfoliação superficial que remove células mortas e pelos finos.", benefits: ["Pele com toque mais macio", "Melhor aparência da textura", "Prepara a pele para maquiagem"] },
  { category: "Sobrancelhas", name: "Design de Sobrancelha", price: "R$ 65,00", summary: "Modelagem personalizada respeitando os traços naturais do rosto.", benefits: ["Harmoniza a expressão", "Formato personalizado", "Visual mais definido"] },
  { category: "Sobrancelhas", name: "Design com Henna", price: "R$ 70,00", summary: "Design associado à pigmentação temporária para destacar as sobrancelhas.", benefits: ["Mais definição visual", "Preenche pequenas falhas", "Resultado prático no dia a dia"] },
  { category: "Sobrancelhas", name: "Design com Coloração", price: "R$ 80,00", summary: "Coloração dos fios para valorizar o desenho e a tonalidade das sobrancelhas.", benefits: ["Fios visualmente destacados", "Mais uniformidade", "Aparência natural"] },
  { category: "Cílios", name: "Cílios Efeito Rímel", price: "R$ 180,00", summary: "Extensão que busca um olhar definido e semelhante ao efeito de máscara de cílios.", benefits: ["Olhar mais marcante", "Definição no dia a dia", "Efeito elegante"] },
  { category: "Cílios", name: "Cílios Efeito Sirena", price: "R$ 100,00", summary: "Estilo pensado para criar um olhar expressivo e personalizado.", benefits: ["Visual diferenciado", "Destaque para os olhos", "Mapeamento personalizado"] },
  { category: "Cílios", name: "Cílios Efeito Fox", price: "R$ 200,00", summary: "Mapeamento que valoriza o alongamento visual do olhar.", benefits: ["Olhar alongado", "Efeito moderno", "Resultado personalizado"] },
  { category: "Cílios", name: "Cílios Efeito Brasileiro", price: "R$ 150,00", summary: "Técnica com textura e destaque para um resultado cheio de personalidade.", benefits: ["Mais presença no olhar", "Textura visual", "Estilo personalizado"] },
  { category: "Lábios & Cílios", name: "Hydra Gloss", price: "R$ 100,00", summary: "Tratamento de hidratação e cuidado para valorizar a aparência dos lábios.", benefits: ["Aspecto mais hidratado", "Lábios com aparência saudável", "Sensação de cuidado"] },
  { category: "Lábios & Cílios", name: "Lash Lifting", price: "R$ 180,00", summary: "Curvatura dos cílios naturais para um olhar mais aberto.", benefits: ["Valoriza os cílios naturais", "Olhar mais aberto", "Praticidade na rotina"] },
  { category: "Sobrancelhas", name: "Reconstrução de Sobrancelha", price: "R$ 500,00", detail: "Pacote com 4 sessões.", summary: "Plano de cuidados voltado à recuperação e valorização das sobrancelhas.", benefits: ["Acompanhamento em sessões", "Cuidado personalizado", "Valorização gradual dos fios"] },
  { category: "Sobrancelhas", name: "Nano Fios Personalizado", price: "R$ 500,00", summary: "Procedimento personalizado para criar um efeito de fios e maior definição.", benefits: ["Resultado personalizado", "Aparência detalhada", "Valorização do desenho"] },
  { category: "Maquiagem", name: "Maquiagem", price: "R$ 160,00", summary: "Produção personalizada para valorizar seus traços em ocasiões especiais.", benefits: ["Acabamento profissional", "Estilo adaptado ao evento", "Valorização da beleza natural"] }
];
const categories = ["Todos", ...new Set(services.map(s => s.category))];
const $ = (s, root=document) => root.querySelector(s);
const escapeHTML = (v) => String(v).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

let active = "Todos";
let selected = null;
const filters = $("#filters");
const grid = $("#serviceGrid");
const modalRoot = $("#modalRoot");
const menu = $("#navLinks");
const menuButton = $("#menuButton");

function renderFilters() {
  filters.innerHTML = categories.map(c => `<button class="filter ${c===active?'active':''}" type="button" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
}
function renderServices() {
  const filtered = active === "Todos" ? services : services.filter(s => s.category === active);
  grid.innerHTML = filtered.map(s => `<article class="service-card"><div class="service-meta"><span>${escapeHTML(s.category)}</span><strong>${escapeHTML(s.price)}</strong></div><h3>${escapeHTML(s.name)}</h3>${s.detail?`<small class="service-detail">${escapeHTML(s.detail)}</small>`:''}<p>${escapeHTML(s.summary)}</p><button class="learn-more" type="button" data-service="${escapeHTML(s.name)}">Saiba mais <span aria-hidden="true">→</span></button></article>`).join("");
}
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }
function openModal(service) {
 selected = service;
 const message = `Olá, Nathalia! Vi o site e tenho interesse em ${service.name} (${service.price}). Pode me passar mais informações e os horários disponíveis?`;
 modalRoot.innerHTML = `<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button class="modal-close" type="button" aria-label="Fechar detalhes">×</button><div class="section-kicker">${escapeHTML(service.category)}</div><h2 id="modalTitle">${escapeHTML(service.name)}</h2><span class="modal-price">${escapeHTML(service.price)}</span>${service.detail?`<p class="service-detail">${escapeHTML(service.detail)}</p>`:''}<p class="modal-summary">${escapeHTML(service.summary)}</p><h4>Benefícios</h4><ul>${service.benefits.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ul><a class="button primary modal-button" href="${whatsappLink(message)}" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i> Agendar pelo WhatsApp <span>→</span></a></div></div>`;
 document.body.classList.add('modal-open');
 $('.modal-close', modalRoot).focus();
 $('.modal-close', modalRoot).addEventListener('click', closeModal);
 $('.modal-backdrop', modalRoot).addEventListener('mousedown', e => { if(e.target === e.currentTarget) closeModal(); });
}
function closeModal() { selected=null; modalRoot.innerHTML=''; document.body.classList.remove('modal-open'); }

filters.addEventListener('click', e => { const b=e.target.closest('[data-category]'); if(!b)return; active=b.dataset.category; renderFilters(); renderServices(); });
grid.addEventListener('click', e => { const b=e.target.closest('[data-service]'); if(!b)return; const s=services.find(x=>x.name===b.dataset.service); if(s)openModal(s); });
menuButton.addEventListener('click', () => { const isOpen=menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); document.body.classList.toggle('menu-open',isOpen); });
menu.addEventListener('click', e => { if(e.target.matches('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') { closeMenu(); closeModal(); } });
$("#year").textContent = new Date().getFullYear();
renderFilters(); renderServices();

// Arrange the page in the intended discovery-to-booking journey.
const mainContent = document.querySelector('main');
const heroSection = document.getElementById('inicio');
const identityStrip = document.querySelector('.marquee-strip');
const servicesSection = document.getElementById('servicos');
const resultsSection = document.getElementById('resultados');
const budgetSection = document.getElementById('orcamento');
const experienceSection = document.querySelector('.experience');
const testimonialsSection = document.querySelector('.testimonials');
const locationSection = document.getElementById('localizacao');
const faqSection = document.getElementById('duvidas');
const bookingSection = document.getElementById('agendar');
const socialSection = document.querySelector('.cta');
if(mainContent && heroSection && identityStrip) heroSection.after(identityStrip);
if(mainContent && servicesSection && resultsSection) mainContent.insertBefore(servicesSection, resultsSection);
if(resultsSection && testimonialsSection) resultsSection.after(testimonialsSection);
if(budgetSection && experienceSection) budgetSection.after(experienceSection);
if(mainContent && locationSection && faqSection) mainContent.insertBefore(locationSection, faqSection);
if(faqSection && socialSection && bookingSection){faqSection.after(socialSection);socialSection.after(bookingSection);}

// Ensure the identity strip always has enough repeated content for the viewport.
const marqueeTrack=document.querySelector('.marquee-track');
if(marqueeTrack){
 const fillMarquee=()=>{
  const firstGroup=marqueeTrack.querySelector('.marquee-group');
  if(!firstGroup)return;
  const groupWidth=firstGroup.getBoundingClientRect().width;
  const needed=Math.max(4,Math.ceil((window.innerWidth+groupWidth)/groupWidth));
  while(marqueeTrack.querySelectorAll('.marquee-group').length<needed){
   const copy=firstGroup.cloneNode(true);
   copy.setAttribute('aria-hidden','true');
   marqueeTrack.append(copy);
  }
  const count=marqueeTrack.querySelectorAll('.marquee-group').length;
  marqueeTrack.style.setProperty('--marquee-shift',`${-100/count}%`);
 };
 fillMarquee();
 window.addEventListener('resize',fillMarquee,{passive:true});
}

// Premium usability enhancements
const scrollTopButton = document.querySelector('#scrollTop');
const toastRoot = document.querySelector('#toastRoot');
function showToast(message){
  toastRoot.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;
  const toast = toastRoot.firstElementChild;
  requestAnimationFrame(()=>toast.classList.add('show'));
  setTimeout(()=>{toast.classList.remove('show');setTimeout(()=>toastRoot.innerHTML='',300)},2600);
}
window.addEventListener('scroll',()=>scrollTopButton?.classList.toggle('show',window.scrollY>500),{passive:true});
scrollTopButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.intro-grid,.section-header,.service-card,.cta-box').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});
// Highlight active navigation section
const sections=document.querySelectorAll('main section[id]');
const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav-links a[href^="#"]').forEach(a=>a.classList.toggle('active-link',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s));


const copyAddress = document.getElementById("copyAddress");
if(copyAddress){copyAddress.addEventListener("click", async()=>{const address="Instituto Kell, Rua Francisco Xavier de Souza Júnior, 87, Jardim das Paineiras, Campinas - SP, CEP 13092-300";try{await navigator.clipboard.writeText(address);copyAddress.innerHTML='<i class="bi bi-check2"></i> Endereço copiado';setTimeout(()=>copyAddress.innerHTML='<i class="bi bi-copy"></i> Copiar endereço',2200)}catch(e){window.prompt("Copie o endereço:",address)}})}

// Dynamic theme, budget calculator and premium desktop interactions
const priceValue = value => Number(String(value).replace(/[^\d,]/g,'').replace(',','.')) || 0;
const budgetOptions = document.getElementById('budgetOptions');
const budgetTotal = document.getElementById('budgetTotal');
const budgetSummary = document.getElementById('budgetSummary');
const selectedBudget = new Set();
if(budgetOptions){
 const serviceGroups = [...new Set(services.map(service => service.category))];
 budgetOptions.innerHTML = serviceGroups.map(category => `<section class="budget-category" aria-label="${escapeHTML(category)}"><h4>${escapeHTML(category)}</h4>${services.map((service,index)=>service.category===category?`<label class="budget-option"><span class="budget-option-name"><input type="checkbox" data-budget="${index}"><span>${escapeHTML(service.name)}</span></span><strong>${escapeHTML(service.price)}</strong></label>`:'').join('')}</section>`).join('');
 const updateBudget=()=>{let total=0;selectedBudget.clear();budgetOptions.querySelectorAll('input:checked').forEach(input=>{const s=services[Number(input.dataset.budget)];selectedBudget.add(s);total+=priceValue(s.price)});const formattedTotal=total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});budgetTotal.textContent=formattedTotal;if(budgetSummary){budgetSummary.innerHTML=selectedBudget.size?[...selectedBudget].map(s=>`<li><span>${escapeHTML(s.name)}</span><strong>${escapeHTML(s.price)}</strong></li>`).join(''):'<li class="budget-empty">Selecione um ou mais procedimentos para ver o resumo.</li>';}const chosen=selectedBudget.size?[...selectedBudget].map(s=>`${s.name} (${s.price})`).join(', '):'um atendimento de beleza';document.getElementById('sendBudget').href=whatsappLink(`Olá, Nathalia! Vi o site e gostaria de agendar ${chosen}. Estimativa: ${formattedTotal}. Quais horários estão disponíveis?`);};
 budgetOptions.addEventListener('change',updateBudget);
}
document.querySelectorAll('a[href^="https://pade144.gendo.app"]').forEach(link=>{link.href=whatsappLink('Olá, Nathalia! Vi o site e gostaria de agendar um atendimento. Pode me ajudar a escolher o procedimento e consultar os horários disponíveis?');if(link.closest('.booking-cta'))link.innerHTML='<i class="bi bi-whatsapp"></i> Agendar pelo WhatsApp · (19) 98961-1995';});
const dynamicSections=[['inicio','#9b735f'],['servicos','#8f7a68'],['orcamento','#a9786b'],['localizacao','#627b72']];
const themeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const match=dynamicSections.find(x=>x[0]===entry.target.id);if(match)document.documentElement.style.setProperty('--dynamic-accent',match[1]);}}),{threshold:.45});
dynamicSections.forEach(([id])=>{const el=document.getElementById(id);if(el)themeObserver.observe(el)});
const blockObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');blockObserver.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal-block').forEach(el=>blockObserver.observe(el));
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){document.body.classList.add('premium-cursor');const c=document.createElement('div');c.id='premiumCursor';document.body.appendChild(c);window.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});document.querySelectorAll('a,button,input,label,.service-card').forEach(el=>el.addEventListener('mouseenter',()=>c.classList.add('active')));document.querySelectorAll('a,button,input,label,.service-card').forEach(el=>el.addEventListener('mouseleave',()=>c.classList.remove('active')));}

// Gallery lightbox: supports pointer, keyboard, escape, and focus return.
function openResultImage(img){
 const overlay=document.createElement('div');
 overlay.className='photo-lightbox';
 overlay.setAttribute('role','dialog');
 overlay.setAttribute('aria-modal','true');
 overlay.setAttribute('aria-label','Resultado ampliado');
 overlay.innerHTML=`<button type="button" aria-label="Fechar imagem ampliada">×</button><img src="${img.src}" alt="${escapeHTML(img.alt)}">`;
 const closeButton=overlay.querySelector('button');
 const close=()=>{overlay.remove();img.focus();};
 closeButton.addEventListener('click',close);
 overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
 overlay.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 document.body.appendChild(overlay);
 closeButton.focus();
}
document.querySelectorAll('.result-card img').forEach(img=>{
 img.style.cursor='zoom-in';
 img.tabIndex=0;
 img.setAttribute('role','button');
 img.setAttribute('aria-label',`${img.alt}. Toque para ampliar.`);
 img.addEventListener('click',()=>openResultImage(img));
 img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openResultImage(img);}});
});
const resultsGrid=document.querySelector('.results-grid');
if(resultsGrid){
 const moreResults=document.createElement('button');
 moreResults.type='button';
 moreResults.className='button ghost gallery-more';
 moreResults.innerHTML='Ver resultado completo <i class="bi bi-arrows-fullscreen" aria-hidden="true"></i>';
 moreResults.addEventListener('click',()=>{const firstImage=resultsGrid.querySelector('.result-card img');if(firstImage)openResultImage(firstImage);});
 resultsGrid.after(moreResults);
}
