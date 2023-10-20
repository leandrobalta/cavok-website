export function validateName(name: string) {
    const unauthorizedCharacters = /[0-9!@#$%^&*()_+={}\[\]|\\/:;"'<>,.?~`]/;
  
    return !unauthorizedCharacters.test(name);
  }