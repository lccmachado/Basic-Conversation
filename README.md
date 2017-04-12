# **Conversation Básico**

## Template para uso da api Watson Conversation

1) É preciso uma conta no Bluemix, http://www.bluemix.net
2) Crie um serviço de Watson Conversation
3) Crie um Workspace, com seus Intents e Entities, mais o diálogo de seu bot.
4) Pegue as credenciais do serviço e workspace_id.
5) Faça fork deste código, ou o clone em seu computaodr.
6) Edit o programa app.js, alterando as seguintes linhas com os dados de crendenciais e workspace:

var conversation = watson.conversation({
  username:'<username> ',//substitua pelo username do seu serviço
  password:'<password> ',//substitua pelo password do seu serviço
  version: 'v1',
  version_date: '2016-07-11'
});

//Worskpace ID a ser mudado pelo seu Conversation
var workspace = '<workspace_id>';

7) Faça o deploy da aplicação e teste.
