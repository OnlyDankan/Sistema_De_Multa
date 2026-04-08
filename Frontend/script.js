// Relógio em tempo real
function atualizarRelogio() {
  const agora = new Date();
  document.getElementById('relogio').textContent =
    agora.toLocaleTimeString('pt-BR', { hour12: false });
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Barra visual de velocidade
function atualizarBarra() {
  const vel = parseInt(document.getElementById('velocidade').value) || 0;
  const display = document.getElementById('speedDisplay');
  const bar = document.getElementById('speedBar');

  if (vel > 0) {
    display.style.display = 'block';
    const pct = Math.min((vel / 300) * 100, 100);
    bar.style.width = pct + '%';
    if (vel <= 60)       bar.style.background = '#168821';
    else if (vel <= 90)  bar.style.background = '#f59e0b';
    else if (vel <= 130) bar.style.background = '#f97316';
    else                 bar.style.background = '#E52207';
  } else {
    display.style.display = 'none';
  }
}

// Gerar número de protocolo aleatório
function gerarProtocolo() {
  const ano = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000000 + 1000000);
  return `INF-${ano}-${num}`;
}

// Validação dos campos
function validar(nome, idCNH, velocidade) {
  let ok = true;

  const fNome = document.getElementById('nome').closest('.field');
  const fId   = document.getElementById('idCNH').closest('.field');
  const fVel  = document.getElementById('velocidade').closest('.field');
  [fNome, fId, fVel].forEach(f => f.classList.remove('has-error'));

  if (!nome.trim())                              { fNome.classList.add('has-error'); ok = false; }
  if (!idCNH || isNaN(idCNH) || idCNH <= 0)     { fId.classList.add('has-error');   ok = false; }
  if (!velocidade || isNaN(velocidade) || velocidade < 0) { fVel.classList.add('has-error'); ok = false; }

  return ok;
}

// Processar autuação (mesma lógica do C#)
async function processar() {
  const nome       = document.getElementById('nome').value.trim();
  const idCNH      = parseInt(document.getElementById('idCNH').value);
  const velocidade = parseInt(document.getElementById('velocidade').value);

  if (!validar(nome, idCNH, velocidade)) return;

  document.getElementById('protocolo').textContent = gerarProtocolo();

  const statusBanner  = document.getElementById('status-banner');
  const resumoGrid    = document.getElementById('resumo-grid');
  const penalidadeBox = document.getElementById('penalidade-box');
  const badge         = document.getElementById('badge-resultado');

  if (velocidade <= 60) {
    resumoGrid.style.display = 'none';
    penalidadeBox.innerHTML  = '';
    statusBanner.innerHTML   = `
      <div class="status-banner ok">
        <div class="status-banner-icon">✅</div>
        <div class="status-banner-text">
          <h4>Sem Infração — Velocidade Regular</h4>
          <p>Velocidade de <strong>${velocidade} km/h</strong> está dentro do limite de 60 km/h.
          Nenhuma autuação necessária para <strong>${nome}</strong> (CNH: ${idCNH}).</p>
        </div>
      </div>`;
    badge.textContent        = 'Sem Infração';
    badge.style.background   = '#d1fae5';
    badge.style.color        = '#065f46';

  } else {
    const excesso    = velocidade - 60;
    const valorMulta = 7 * excesso;

    document.getElementById('r-nome').textContent    = nome;
    document.getElementById('r-id').textContent      = idCNH;
    document.getElementById('r-vel').textContent     = `${velocidade} km/h`;
    document.getElementById('r-excesso').textContent = `+${excesso} km/h acima do limite`;
    document.getElementById('r-multa').textContent   =
      `R$ ${valorMulta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    resumoGrid.style.display = 'grid';

    badge.textContent      = 'Autuado';
    badge.style.background = '#fef2f2';
    badge.style.color      = '#991b1b';

    let bannerHTML     = '';
    let penalidadeHTML = '';

    if (valorMulta <= 30) {
      bannerHTML = `
        <div class="status-banner multa">
          <div class="status-banner-icon">⚠️</div>
          <div class="status-banner-text">
            <h4>Infração Leve — Multa Emitida</h4>
            <p>Motorista <strong>${nome}</strong> autuado. Multa de <strong>R$ ${valorMulta}</strong> gerada com sucesso.</p>
          </div>
        </div>`;
      penalidadeHTML = `
        <div class="penalidade-box leve">
          <div class="penalidade-box-icon">🟡</div>
          <div class="penalidade-box-text">
            <strong>Penalidade: 20 Pontos na CNH</strong>
            <span>Infração leve. 20 pontos serão registrados na carteira do condutor.</span>
          </div>
        </div>`;

    } else if (valorMulta <= 80) {
      bannerHTML = `
        <div class="status-banner multa">
          <div class="status-banner-icon">🚨</div>
          <div class="status-banner-text">
            <h4>Infração Média — Multa Emitida</h4>
            <p>Motorista <strong>${nome}</strong> autuado. Multa de <strong>R$ ${valorMulta}</strong> gerada com sucesso.</p>
          </div>
        </div>`;
      penalidadeHTML = `
        <div class="penalidade-box media">
          <div class="penalidade-box-icon">🟠</div>
          <div class="penalidade-box-text">
            <strong>Penalidade: 40 Pontos na CNH</strong>
            <span>Infração média. 40 pontos serão adicionados ao prontuário do condutor.</span>
          </div>
        </div>`;

    } else if (valorMulta <= 150) {
      bannerHTML = `
        <div class="status-banner multa">
          <div class="status-banner-icon">🔴</div>
          <div class="status-banner-text">
            <h4>Infração Grave — Multa Emitida</h4>
            <p>Motorista <strong>${nome}</strong> autuado. Multa de <strong>R$ ${valorMulta}</strong> gerada com sucesso.</p>
          </div>
        </div>`;
      penalidadeHTML = `
        <div class="penalidade-box grave">
          <div class="penalidade-box-icon">🔴</div>
          <div class="penalidade-box-text">
            <strong>Penalidade: 80 Pontos na CNH</strong>
            <span>Infração grave. 80 pontos no prontuário. Risco de suspensão iminente.</span>
          </div>
        </div>`;

    } else {
      bannerHTML = `
        <div class="status-banner suspensa">
          <div class="status-banner-icon">🚫</div>
          <div class="status-banner-text">
            <h4>CARTEIRA SUSPENSA — Gravíssima</h4>
            <p>A CNH de <strong>${nome}</strong> foi <strong>suspensa no sistema</strong>. Auto encaminhado ao setor jurídico.</p>
          </div>
        </div>`;
      penalidadeHTML = `
        <div class="penalidade-box suspensa">
          <div class="penalidade-box-icon">🚫</div>
          <div class="penalidade-box-text">
            <strong>CNH SUSPENSA IMEDIATAMENTE</strong>
            <span>Infração gravíssima. O condutor não está autorizado a dirigir até regularização junto ao DETRAN.</span>
          </div>
        </div>`;
      badge.textContent      = 'CNH Suspensa';
      badge.style.background = '#7f1d1d';
      badge.style.color      = '#fca5a5';
    }

    statusBanner.innerHTML  = bannerHTML;
    penalidadeBox.innerHTML = penalidadeHTML;
  }

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Limpar e voltar ao formulário
function novaAutuacao() {
  document.getElementById('nome').value      = '';
  document.getElementById('idCNH').value     = '';
  document.getElementById('velocidade').value = '';
  document.getElementById('speedDisplay').style.display = 'none';
  document.getElementById('resultado').style.display    = 'none';

  ['nome', 'idCNH', 'velocidade'].forEach(id => {
    document.getElementById(id).closest('.field').classList.remove('has-error');
  });

  document.getElementById('formulario-card').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('nome').focus();
}