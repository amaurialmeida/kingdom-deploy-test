export const CHILD_MESSAGES = {
  CHILD_CREATED_SUCCESS: 'Criança cadastrada com sucesso!',

  DUPLICATE_REGISTRATION:
    'O responsável já atingiu o limite de 10 crianças cadastradas.',

  MAX_CHILDREN_REACHED: 'O responsável pode cadastrar no máximo 10 crianças.',

  FIELD_REQUIRED: (field: string) => `O campo ${field} é obrigatório.`,

  FIELD_IS_STRING: (field: string) => `O campo ${field} deve ser uma string.`,

  FIELD_LENGTH_BETWEEN: (field: string, min: number, max: number) =>
    `O campo ${field} deve conter entre ${min} e ${max} caracteres.`,

  FIELD_ACCEPTS_ONLY: (field: string, what: string) =>
    `O campo ${field} aceita apenas ${what}.`,

  FIELD_INITIAL_CAPITAL: (field: string) =>
    `O campo ${field} deve iniciar com letra maiúscula.`,

  FIELD_ONLY_LETTERS_SPACES: (field: string) =>
    `O campo ${field} aceita apenas letras e espaços.`,

  FIELD_DATE_INVALID: (field: string) =>
    `O campo ${field} deve conter uma data válida.`,

  AVATAR_REQUIRED: 'É necessário escolher um avatar.',
};
