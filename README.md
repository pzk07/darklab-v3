# DarkLab - Versão inicial

Projeto Next.js + Supabase pronto para deploy no Vercel.

## O que tem
- Dashboard (Home), Canais, Vídeos, Prompts, Referências, Ferramentas (SRT, Divisor)
- Uso de Supabase (banco + auth)
- Tema escuro com Tailwind CSS
- Front-end simples e funcional (pronto para customização)

## Configurar
1. No Supabase, prepare as tabelas:
- **canais** (id serial PK, nome text, nicho text, status text, data_criacao date)
- **videos** (id serial PK, titulo text, status text, canal_id integer, data_publicacao date, link text)
- **prompts** (id serial PK, titulo text, descricao text, conteudo text)
- **referencias** (id serial PK, titulo text, url text, observacao text)

2. No Vercel, ao criar o projeto, configure as variáveis de ambiente:
- `NEXT_PUBLIC_SUPABASE_URL` = seu Project URL (ex: https://abcxyz.supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua anon public key

3. Deploy:
- Import the project into Vercel (ou use `vercel` CLI)
- Clique em Deploy — o projeto ficará online.

## Observações
- Login por email/senha será feito via Supabase Auth (usar console do Supabase para criar usuários manualmente, ou usar a função de signup que adicionaremos depois).
- Ferramentas: o gerador de SRT gera texto formatado (copiar/colar); download pode ser adicionado posteriormente.

Boa sorte! Qualquer dúvida eu te guio passo a passo.