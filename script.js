"use strict";
const INSTAGRAM = "https://www.instagram.com/nathaliahiratabeauty?rpxt=OXR3bTJzZjd3bW1k";
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
 modalRoot.innerHTML = `<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button class="modal-close" type="button" aria-label="Fechar detalhes">×</button><div class="section-kicker">${escapeHTML(service.category)}</div><h2 id="modalTitle">${escapeHTML(service.name)}</h2><span class="modal-price">${escapeHTML(service.price)}</span>${service.detail?`<p class="service-detail">${escapeHTML(service.detail)}</p>`:''}<p class="modal-summary">${escapeHTML(service.summary)}</p><h4>Benefícios</h4><ul>${service.benefits.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ul><a class="button primary modal-button" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">Tirar dúvidas pelo Instagram <span>→</span></a></div></div>`;
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
