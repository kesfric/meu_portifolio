# Guia de design

## O que o esboço define

O esboço é uma tela só, dentro de uma moldura de navegador desenhada à mão.

- **Hierarquia:** a maior coisa da página é o "hi!, oi!", não o nome. A saudação bilíngue vem antes de qualquer credencial.
- **Navegação:** não há barra de menu. O "ester" no canto funciona como logo. O site mantém isso no topo e só mostra uma barra fina depois que você rola.
- **Formas:** a foto é uma bolha irregular e cada card de projeto tem um formato diferente. Os cards têm alturas diferentes, mas apoiados na mesma linha de base.
- **Projetos na primeira tela:** é exatamente o que um recrutador precisa nos primeiros 30 segundos.
- **Nota "BR":** virou o botão EN/PT.

O que foi acrescentado (Sobre, Experiência, Habilidades, Currículo, Contato) fica abaixo da moldura, então a primeira tela continua sendo o esboço.

## Cores

| Nome | Claro | Escuro | Uso |
|---|---|---|---|
| paper | `#FFFFFF` | `#17181A` | fundo, com grade de pontos |
| ink | `#1A1A1A` | `#F1F1EC` | texto, traços, bordas |
| graphite | `#5C5C57` | `#A6A6A0` | texto secundário |
| leaf | `#007A45` | `#00FF88` | links e destaques em verde |
| marker | `#00FF88` a 60% | `#00FF88` a 28% | marca-texto atrás do texto |

Todos passam o contraste AA do WCAG (o menor é 5,4:1).

O verde é marca-texto, não neon: aparece no filtro ativo, no papel que está girando, nos números da experiência, nos botões principais e no hover. Nunca brilha.

O modo claro é caneta numa página de iPad. O modo escuro é giz na lousa.

## Tipografia

- **A sua letra** (SVG traçado do esboço): logo, saudação, título "projects".
- **La Belle Aurore:** títulos de seção e notas da margem, até você trocar pela sua letra.
- **Geist:** todo o resto. Uma família só, com hierarquia por tamanho e peso.

Linhas de texto limitadas a ~54–64 caracteres.

## Movimento

**Um momento orquestrado, só no carregamento:** a moldura se desenha, o "ester" e o "hi!, oi!" são escritos da esquerda para a direita, e os cards caem no lugar.

Depois disso, o movimento só responde ao visitante:

- o card muda de forma no hover e cresce até virar o estudo de caso no clique;
- a linha da timeline se preenche conforme a rolagem;
- o check do formulário se desenha quando a mensagem é enviada;
- os botões principais puxam levemente em direção ao mouse.

Quem ativa "reduzir movimento" no sistema vê tudo parado.

**O que ficou de fora de propósito:** GSAP, Lenis, partículas, parallax de fundo e animação de entrada em cada seção. Eles pesam no Lighthouse e brigam com a meta de acessibilidade.

## Acessibilidade

- Foco visível em verde.
- Link "pular para o conteúdo".
- O estudo de caso é um diálogo de verdade: o foco fica preso dentro, Esc fecha e o foco volta para o card.
- As habilidades são uma lista de abas que funciona com as setas do teclado.
- Os campos do formulário têm rótulos visíveis.
- Os alvos de toque têm pelo menos 44px.

## Sugestões de imagens e materiais

1. **Foto:** luz natural, fundo simples, do peito para cima. Ela é recortada em bolha, então deixe espaço em volta do rosto.
2. **Mais palavras com a sua letra:** "about", "experience", "skills", "resume", "contact" e as versões em PT ("sobre", "experiência"…). Veja o passo 5 do README.
3. **Uma imagem ou GIF por projeto** no estudo de caso:
   - o painel do Paulie;
   - a AccessIA respondendo;
   - o e-mail do job tracker;
   - a home do site da BRASA.

   Um GIF curto mostrando o produto funcionando vale mais que um parágrafo.
4. **Logos das organizações** na timeline: SVG quadrado em `public/logos/`, sempre em versão que funcione no fundo claro e no escuro.
5. **O esboço** já está no rodapé ("This site started as a sketch"). Em entrevista de produto, essa é uma boa história de processo: do esboço ao site no ar.
