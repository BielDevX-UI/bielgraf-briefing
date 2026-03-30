const DEST = 'bielgraff@gmail.com';

const nomes = {
  thumbnail: 'Thumbnail',
  logo: 'Logo / Identidade Visual',
  flyer: 'Flyer',
  banner: 'Banner',
  story: 'Story',
  social: 'Post para Redes Sociais',
  card: 'Cartão de Visita',
  video: 'Vídeo / Reels / Motion'
};

const EMAILJS_SERVICE_ID = 'service_yyjeckm';
const EMAILJS_TEMPLATE_ID = 'template_z6xo68a';
const EMAILJS_PUBLIC_KEY = 'TA7tgU7QLe5aqAkG';

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Falha ao carregar script: ' + url));
    document.head.appendChild(s);
  });
}

function initEmailJS() {
  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    return Promise.resolve();
  }

  const urls = [
    'https://cdn.emailjs.com/sdk/3.2.0/email.min.js',
    'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js'
  ];

  return urls
    .reduce((p, url) => p.catch(() => loadScript(url)), Promise.reject())
    .then(() => {
      if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        return;
      }
      throw new Error('emailjs não disponível após carregar SDK');
    });
}

initEmailJS()
  .then(() => console.log('EmailJS inicializado'))
  .catch(err => {
    console.warn('EmailJS não inicializado:', err);
    showToast(
      '❌ EmailJS não inicializado',
      'Falha ao carregar EmailJS SDK. Verifique conexão ou use versão local',
      '#e63946'
    );
  });

function show(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '—';
}

function getChecks(groupId) {
  const els = document.querySelectorAll(`#${groupId} input[type=checkbox]:checked`);
  return els.length ? Array.from(els).map(e => e.value).join(', ') : '—';
}

function coletarDados(tipo) {
  const m = {};

  if (tipo === 'logo') {
    m.cliente = getVal('logo_cliente');
    m.empresa = getVal('logo_empresa');
    m.ramo = getVal('logo_ramo');
    m.jaTemLogo = getRadio('halogo');
    m.publico = getVal('logo_publico');
    m.concorrentes = getVal('logo_concorrentes');
    m.personalidade = getChecks('logo_personalidade');
    m.referencias = getVal('logo_referencias');
    m.naoQuer = getVal('logo_nao_quer');
    m.cores = getVal('logo_cores');
    m.tipoLogo = getRadio('tipo_logo');
    m.usos = getChecks('logo_usos');
    m.prazo = getRadio('prazo_logo');
    m.obs = getVal('logo_obs');
    m.tel = getVal('logo_tel');
    m.emailCliente = getVal('logo_email_cliente');
  } else if (tipo === 'flyer') {
    m.cliente = getVal('flyer_cliente');
    m.empresa = getVal('flyer_empresa');
    m.objetivo = getRadio('obj_flyer');
    m.evento = getVal('flyer_evento');
    m.data = getVal('flyer_data');
    m.local = getVal('flyer_local');
    m.headline = getVal('flyer_headline');
    m.info = getVal('flyer_info');
    m.cta = getVal('flyer_cta');
    m.formato = getRadio('fmt_flyer');
    m.cores = getVal('flyer_cores');
    m.prazo = getRadio('prazo_flyer');
    m.obs = getVal('flyer_obs');
    m.tel = getVal('flyer_tel');
    m.emailCliente = getVal('flyer_email_cliente');
  } else if (tipo === 'banner') {
    m.cliente = getVal('banner_cliente');
    m.empresa = getVal('banner_empresa');
    m.tipoBanner = getRadio('tipo_banner');
    m.medidas = getVal('banner_medidas');
    m.local = getVal('banner_local');
    m.titulo = getVal('banner_titulo');
    m.slogan = getVal('banner_slogan');
    m.textos = getVal('banner_textos');
    m.cores = getVal('banner_cores');
    m.refs = getVal('banner_refs');
    m.prazo = getRadio('prazo_banner');
    m.tel = getVal('banner_tel');
    m.emailCliente = getVal('banner_email_cliente');
  } else if (tipo === 'story') {
    m.cliente = getVal('story_cliente');
    m.empresa = getVal('story_empresa');
    m.objetivo = getRadio('obj_story');
    m.plataformas = getChecks('story_plataformas');
    m.texto = getVal('story_texto');
    m.cta = getVal('story_cta');
    m.cores = getVal('story_cores');
    m.anim = getRadio('anim_story');
    m.prazo = getRadio('prazo_story');
    m.obs = getVal('story_obs');
    m.tel = getVal('story_tel');
    m.emailCliente = getVal('story_email_cliente');
  } else if (tipo === 'social') {
    m.cliente = getVal('social_cliente');
    m.empresa = getVal('social_empresa');
    m.plataformas = getChecks('social_plataformas');
    m.formato = getRadio('fmt_social');
    m.texto = getVal('social_texto');
    m.cores = getVal('social_cores');
    m.refs = getVal('social_refs');
    m.prazo = getVal('social_prazo');
    m.obs = getVal('social_obs');
    m.tel = getVal('social_tel');
    m.emailCliente = getVal('social_email_cliente');
  } else if (tipo === 'card') {
    m.cliente = getVal('card_cliente');
    m.nomeCartao = getVal('card_nome');
    m.cargo = getVal('card_cargo');
    m.empresa = getVal('card_empresa');
    m.contatos = getVal('card_contatos');
    m.tipoCard = getRadio('tipo_card');
    m.estilo = getChecks('card_estilo');
    m.cores = getVal('card_cores');
    m.refs = getVal('card_refs');
    m.prazo = getRadio('prazo_card');
    m.tel = getVal('card_tel');
    m.emailCliente = getVal('card_email_cliente');
  } else if (tipo === 'video') {
    m.cliente = getVal('video_cliente');
    m.empresa = getVal('video_empresa');
    m.tipoVideo = getRadio('tipo_video');
    m.duracao = getVal('video_duracao');
    m.formato = getRadio('fmt_video');
    m.roteiro = getVal('video_roteiro');
    m.textos = getVal('video_textos');
    m.audio = getRadio('audio');
    m.refs = getVal('video_refs');
    m.prazo = getRadio('prazo_video');
    m.obs = getVal('video_obs');
    m.tel = getVal('video_tel');
    m.emailCliente = getVal('video_email_cliente');
  } else if (tipo === 'thumbnail') {
    m.cliente = getVal('thumbnail_cliente');
    m.titulo_video = getVal('thumbnail_titulo_video');
    m.tema_video = getVal('thumbnail_tema_video');
    m.descricao_conteudo = getVal('thumbnail_descricao_conteudo');
    m.estilo_visual = getRadio('thumbnail_estilo_visual');
    m.elementos_visuais = getChecks('thumbnail_elementos_visuais_group');
    m.cores_preferidas = getVal('thumbnail_cores_preferidas');
    m.referencia_visual = getVal('thumbnail_referencia_visual');
    m.texto_thumbnail = getVal('thumbnail_texto_thumbnail');
    m.tom_mensagem = getRadio('thumbnail_tom_mensagem');
    m.palavras_importantes = getVal('thumbnail_palavras_importantes');
    m.tem_foto = getRadio('thumbnail_tem_foto');
    m.arquivos_adicionais = getChecks('thumbnail_arquivos_adicionais_group');
    m.observacoes = getVal('thumbnail_observacoes');
    m.tel = getVal('thumbnail_tel');
    m.emailCliente = getVal('thumbnail_email_cliente');
  }

  return m;
}

function gerarHTML(tipo, d, hora) {
  const campos = {
    logo: [
      ['Empresa / Marca', d.empresa],
      ['Ramo de Atuação', d.ramo],
      ['Situação do Logo', d.jaTemLogo],
      ['Público-Alvo', d.publico],
      ['Concorrentes', d.concorrentes],
      ['Personalidade da Marca', d.personalidade],
      ['Referências Visuais', d.referencias],
      ['O que NÃO quer', d.naoQuer],
      ['Cores Preferidas', d.cores],
      ['Tipo de Logo', d.tipoLogo],
      ['Usos do Logo', d.usos],
      ['Prazo', d.prazo],
      ['Observações', d.obs],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    flyer: [
      ['Empresa / Marca', d.empresa],
      ['Objetivo', d.objetivo],
      ['Evento / Promoção', d.evento],
      ['Data e Horário', d.data],
      ['Local', d.local],
      ['Headline', d.headline],
      ['Informações Complementares', d.info],
      ['CTA / Contato', d.cta],
      ['Formato', d.formato],
      ['Cores / Estilo', d.cores],
      ['Prazo', d.prazo],
      ['Observações', d.obs],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    banner: [
      ['Empresa / Marca', d.empresa],
      ['Tipo de Banner', d.tipoBanner],
      ['Medidas', d.medidas],
      ['Local de Exposição', d.local],
      ['Título Principal', d.titulo],
      ['Subtítulo / Slogan', d.slogan],
      ['Textos Complementares', d.textos],
      ['Cores / Estilo', d.cores],
      ['Referências', d.refs],
      ['Prazo', d.prazo],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    story: [
      ['Empresa / Marca', d.empresa],
      ['Objetivo', d.objetivo],
      ['Plataformas', d.plataformas],
      ['Mensagem Principal', d.texto],
      ['Call to Action', d.cta],
      ['Cores / Estilo', d.cores],
      ['Formato', d.anim],
      ['Prazo', d.prazo],
      ['Observações', d.obs],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    social: [
      ['Empresa / Perfil', d.empresa],
      ['Plataformas', d.plataformas],
      ['Formato', d.formato],
      ['Texto do Post', d.texto],
      ['Cores', d.cores],
      ['Referências', d.refs],
      ['Prazo', d.prazo],
      ['Observações', d.obs],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    card: [
      ['Nome no Cartão', d.nomeCartao],
      ['Cargo / Função', d.cargo],
      ['Empresa / Marca', d.empresa],
      ['Dados de Contato', d.contatos],
      ['Tipo de Cartão', d.tipoCard],
      ['Estilo', d.estilo],
      ['Cores', d.cores],
      ['Referências', d.refs],
      ['Prazo', d.prazo],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    video: [
      ['Empresa / Marca', d.empresa],
      ['Tipo de Conteúdo', d.tipoVideo],
      ['Duração', d.duracao],
      ['Formato', d.formato],
      ['Roteiro / Mensagem', d.roteiro],
      ['Textos na Tela', d.textos],
      ['Trilha Sonora', d.audio],
      ['Referências', d.refs],
      ['Prazo', d.prazo],
      ['Observações', d.obs],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ],
    thumbnail: [
      ['Cliente', d.cliente],
      ['Título do Vídeo', d.titulo_video],
      ['Tema do Vídeo', d.tema_video],
      ['Descrição do Conteúdo', d.descricao_conteudo],
      ['Estilo Visual', d.estilo_visual],
      ['Elementos Visuais', d.elementos_visuais],
      ['Cores Preferidas', d.cores_preferidas],
      ['Referência Visual', d.referencia_visual],
      ['Texto na Thumbnail', d.texto_thumbnail],
      ['Tom da Mensagem', d.tom_mensagem],
      ['Palavras Importantes', d.palavras_importantes],
      ['Tem Foto?', d.tem_foto],
      ['Arquivos Adicionais', d.arquivos_adicionais],
      ['Observações', d.observacoes],
      ['WhatsApp', d.tel],
      ['E-mail do Cliente', d.emailCliente],
      ['Enviado em', hora]
    ]
  };

  const rows = (campos[tipo] || [])
    .filter(([_, v]) => v && v !== '—')
    .map(([k, v]) => `
      <tr>
        <td style="padding:11px 16px;font-size:13px;color:#6b7280;font-weight:500;width:38%;border-bottom:1px solid #f0f0f0;vertical-align:top;white-space:nowrap">${k}</td>
        <td style="padding:11px 16px;font-size:13px;color:#1a1a2e;border-bottom:1px solid #f0f0f0;vertical-align:top;line-height:1.5">${v}</td>
      </tr>
    `)
    .join('');

  return rows || '<tr><td style="padding:16px;color:#999;font-size:13px">Nenhum campo preenchido.</td></tr>';
}

async function enviarBriefing(tipo) {
  const d = coletarDados(tipo);

  if (!d.cliente) {
    showToast('⚠️ Campo obrigatório', 'Informe o nome do cliente antes de enviar.', '#e63946');
    return;
  }

  if (!d.tel) {
    showToast('⚠️ Campo obrigatório', 'Informe o WhatsApp do cliente.', '#e63946');
    return;
  }

  const btn = document.querySelector(`#panel-${tipo} .btn-submit`);
  if (!btn) return;

  btn.disabled = true;
  btn.classList.add('loading');

  const hora = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!window.emailjs) {
    showToast(
      '❌ EmailJS não carregado',
      'Execute o projeto em http://localhost:5500 ou deploy e tente novamente.',
      '#e63946'
    );
    btn.disabled = false;
    btn.classList.remove('loading');
    return;
  }

  const htmlEmail = gerarHTML(tipo, d, hora);
  const servico = nomes[tipo];
  const assunto = `✦ bielgraf | Briefing de ${servico} - ${d.cliente}`;

  const templateParams = {
    to_name: 'Biel',
    from_name: d.cliente,
    from_email: d.emailCliente || 'noreply@bielgraf.com',
    subject: assunto,
    message_html: htmlEmail,
    servico,
    whatsapp: d.tel,
    whatsapp_raw: (d.tel || '').replace(/\D/g, '')
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    showToast('✓ E-mail enviado', 'O briefing foi enviado para ' + DEST + '.', '#2d6a4f');

    const btnText = btn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = '✓ Enviado!';
      setTimeout(() => {
        btnText.textContent = '📨 Enviar briefing';
      }, 4000);
    }
  } catch (err) {
    console.error('EmailJS error', err);
    showToast('❌ Erro no envio', 'Falha ao enviar. Confira credenciais EmailJS e rede.', '#e63946');
  } finally {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

function showToast(title, msg, color) {
  const t = document.getElementById('toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-title').style.color = color || '#2d6a4f';
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5000);
}

function limpar(tipo) {
  const panel = document.getElementById('panel-' + tipo);
  if (!panel) return;

  panel.querySelectorAll('input[type=text], input[type=email], input[type=tel], textarea')
    .forEach(el => { el.value = ''; });

  panel.querySelectorAll('input[type=radio], input[type=checkbox]')
    .forEach(el => { el.checked = false; });
}
