// -----------------------------------------------------------------------------
// ATENÇÃO: AÇÃO NECESSÁRIA
// -----------------------------------------------------------------------------
// Para habilitar o compartilhamento de listas em tempo real, você precisa
// criar um projeto GRATUITO no Firebase e colar suas credenciais abaixo.
//
// 1. Vá para https://firebase.google.com/ e crie um novo projeto.
// 2. No painel do seu projeto, crie um "Cloud Firestore" no modo de teste.
// 3. Vá para as "Configurações do Projeto" (ícone de engrenagem).
// 4. Na aba "Geral", role para baixo até "Seus apps".
// 5. Clique no ícone da Web (`</>`) para criar um novo app da Web.
// 6. O Firebase fornecerá um objeto `firebaseConfig`. Copie e cole os valores
//    desse objeto aqui, substituindo os valores de exemplo.
//
// O aplicativo funcionará perfeitamente no modo local sem esta etapa, mas
// a tentativa de publicar uma lista falhará.
// -----------------------------------------------------------------------------

// This file should ONLY export the configuration object.
// Firebase initialization is handled lazily in `services/firebase.ts`.

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};