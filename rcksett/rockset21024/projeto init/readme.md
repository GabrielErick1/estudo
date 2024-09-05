gympass  

## requissitos funcionais 
- [] dever ser possivel se cadastar
- [] deve ser possivel logar
- [] deve ser possivel obter o perfil de um usuario logado
- [] deve ser possivel obter o numero de chequin realizados pelo isiarios logado
- [] deve ser possivel obter historico de chekin 
- [] deve ser possivel o suario buscar academia proxima 
- [] deve ser possivel o usuario busca a academia pelo nome 
- [] deve ser possivel o usario realizar chekin em uma academia 
- [] deve ser possivel validar o chekin de um usuario
- [] dever ser possivel o usuario altera os dados de cadastro 
- [] deve ser possivel cadastar uma academia 

## requisitos nao funcionais 

- [] password tem que esta criptografada
- [] banco postgres
- [] orm prisma 
- [] todas as lista de dados precisa estar paginadsa com 20 itens por pagina
- [] o usuario precisa ser identificado por um jwt
- [] 

## regra de negocios

- [] o usuario nao deve se cadastar com email duplicado
- [] o usuario nao pode fazer 2 chekin no mesmo dia
- [] o usuario nao pode fazer chekin se ele nao estiver a 100 metro da academia 
- [] o chekin so pode ser validado a pos 20 minutos a ser criado
- [] o chekin so poder ser validado por administrador
- [] a academia so pode ser cadastrada por administrador 