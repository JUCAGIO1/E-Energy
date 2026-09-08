/**
 * ⚡ E-ENERGY - Script Principal da Landing Page
 * Implementa Navegação Responsiva, Calculadora Interativa e Efeitos de Interface
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Menu Mobile Hamburguer & Acessibilidade
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('active');
      
      // Alterna ícone entre barras e X
      const svgIcon = mobileToggle.querySelector('svg');
      if (svgIcon) {
        if (!isExpanded) {
          svgIcon.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          `;
        } else {
          svgIcon.innerHTML = `
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          `;
        }
      }
    });

    // Fecha o menu mobile ao clicar em qualquer link simples
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        resetMobileIcon();
      });
    });

    // Suporte a clique nos itens de dropdown para fechar o menu mobile
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        resetMobileIcon();
      });
    });

    function resetMobileIcon() {
      const svgIcon = mobileToggle.querySelector('svg');
      if (svgIcon) {
        svgIcon.innerHTML = `
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        `;
      }
    }

    // Suporte a clique / touch nos toggles de dropdown
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = toggle.closest('.nav-dropdown');
        const isOpen = parent.classList.contains('open');

        // Fecha outros dropdowns abertos
        dropdownToggles.forEach(other => {
          if (other !== toggle) {
            other.setAttribute('aria-expanded', 'false');
            other.closest('.nav-dropdown')?.classList.remove('open');
          }
        });

        toggle.setAttribute('aria-expanded', String(!isOpen));
        parent.classList.toggle('open', !isOpen);
      });
    });

    // Fecha dropdowns se clicar fora no documento
    document.addEventListener('click', () => {
      dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.closest('.nav-dropdown')?.classList.remove('open');
      });
    });

    // Fecha ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          resetMobileIcon();
          mobileToggle.focus();
        }
        dropdownToggles.forEach(toggle => {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.closest('.nav-dropdown')?.classList.remove('open');
        });
      }
    });
  }

  // Efeito de sombra e contraste na Navbar ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ====================================================
  // 2. Destaque de Link Ativo no Scroll (Scrollspy)
  // ====================================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 80;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ====================================================
  // 3. Calculadora Interativa de Consumo e Economia ANEEL
  // ====================================================
  const inputPotencia = document.getElementById('calcPotencia');
  const inputHoras = document.getElementById('calcHoras');
  const inputDias = document.getElementById('calcDias');
  const inputTarifa = document.getElementById('calcTarifa');

  const outKwh = document.getElementById('resKwh');
  const outValor = document.getElementById('resValor');
  const outDiario = document.getElementById('resDiario');
  const outAnual = document.getElementById('resAnual');
  const outEconomia = document.getElementById('resEconomia');

  const presetButtons = document.querySelectorAll('.preset-btn');

  // Presets de aparelhos comuns
  const presets = {
    chuveiro: { potencia: 5500, horas: 1, dias: 30 },
    ar: { potencia: 1400, horas: 8, dias: 30 },
    geladeira: { potencia: 250, horas: 24, dias: 30 },
    pc: { potencia: 350, horas: 6, dias: 30 },
    tv: { potencia: 130, horas: 5, dias: 30 },
    microondas: { potencia: 1200, horas: 0.5, dias: 30 }
  };

  function calcularConsumo() {
    if (!inputPotencia || !inputHoras || !inputDias) return;

    const potencia = Math.max(0, parseFloat(inputPotencia.value) || 0);
    const horas = Math.max(0, Math.min(24, parseFloat(inputHoras.value) || 0));
    const dias = Math.max(0, Math.min(31, parseFloat(inputDias.value) || 0));
    const tarifa = Math.max(0, parseFloat(inputTarifa ? inputTarifa.value : 0.85) || 0.85);

    // Consumo kWh mensal = (Watts * horas * dias) / 1000
    const kwhMensal = (potencia * horas * dias) / 1000;
    const custoMensal = kwhMensal * tarifa;
    const custoDiario = dias > 0 ? custoMensal / dias : 0;
    const custoAnual = custoMensal * 12;
    const economiaEstimada = custoMensal * 0.25; // 25% de economia média com E-Energy

    if (outKwh) outKwh.textContent = `${kwhMensal.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kWh`;
    if (outValor) outValor.textContent = `R$ ${custoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (outDiario) outDiario.textContent = `R$ ${custoDiario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (outAnual) outAnual.textContent = `R$ ${custoAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (outEconomia) outEconomia.textContent = `R$ ${economiaEstimada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / mês`;
  }

  // Eventos de entrada
  [inputPotencia, inputHoras, inputDias, inputTarifa].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        // Remove estado ativo dos botões preset se o usuário customizar
        presetButtons.forEach(btn => btn.classList.remove('active'));
        calcularConsumo();
      });
    }
  });

  // Botões de Preset
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      if (presets[presetKey]) {
        const item = presets[presetKey];
        if (inputPotencia) inputPotencia.value = item.potencia;
        if (inputHoras) inputHoras.value = item.horas;
        if (inputDias) inputDias.value = item.dias;
        calcularConsumo();
      }
    });
  });

  // Executa o primeiro cálculo
  calcularConsumo();

  // ====================================================
  // 4. Efeito de Medição ao Vivo no Mockup do Celular
  // ====================================================
  const gaugeEl = document.getElementById('liveGaugeWatts');
  if (gaugeEl) {
    let baseWatts = 428;
    setInterval(() => {
      // Flutuação realista de ±15W simulando medição de sensor SCT-013 em tempo real
      const jitter = Math.floor(Math.random() * 25) - 12;
      const currentWatts = Math.max(380, baseWatts + jitter);
      gaugeEl.textContent = `${currentWatts} W`;
    }, 2500);
  }
});
