export const USER_MESSAGES = {
  USER_ALREADY_REGISTERED: 'Usuário já existe.',
  REGISTRATION_SUCCESS: 'Cadastro realizado com sucesso.',
  EMAIL_ALREADY_REGISTERED: 'Este e-mail já foi cadastrado.',
  EMAIL_INVALID_FORMAT: ' O e-mail inserido é inválido.',
  PASSWORD_RULES:
    'Senha precisa conter: uma letra maiúscula, minúscula, número, e um caractere especial(@#$%).',
  PASSWORD_MIN_LENGTH: 'A senha deve ter no mínimo 6 caracteres.',
  PASSWORD_MAX_LENGTH: 'A senha deve ter no máximo 20 caracteres.',
  CONFIRM_PASSWORD_MUST_MATCH: ' As senhas não conferem.',
  PIN_CODE_RULES: 'O PIN deve conter exatamente 4 dígitos.',
  EMAIL_OR_PASSWORD_INCORRECT: 'E-mail ou senha incorretos.',
  EMAIL_UPDATE_SUCESS: 'Email atualizado com sucesso.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  USER_FOUND: 'Usuário encontrado.',
  USER_ID_INVALID: 'ID de usuário inválido.',
  PIN_ALREADY_REGISTERED: 'O novo PIN não pode ser igual ao PIN atual.',
  PIN_INCORRECT: 'PIN incorreto.',
  PIN_UPDATE_SUCCESS: 'PIN atualizado com sucesso.',
  PIN_REQUIRED: 'O PIN é obrigatório.',
  PIN_RULES: 'O PIN deve conter 4 dígitos.',
  PIN_MUST_BE_NUMERIC: 'O PIN deve conter apenas números.',
  DELETE_ACCOUNT_SUCCESS: 'Conta deletada com sucesso.',
  LOGIN_SUCCESS: 'Login realizado com sucesso.',

  FIELD_REQUIRED: (field: string) => `O campo ${field} é obrigatório.`,
  FIELD_ACCEPTS_ONLY: (field: string, what: string) =>
    `O campo ${field} aceita apenas ${what}.`,
  FIELD_IS_STRING: (field: string) => `O campo ${field} deve ser uma string.`,
  FIELD_LENGTH_BETWEEN: (field: string, min: number, max: number) =>
    `O campo ${field} deve ter entre ${min} e ${max} caracteres.`,
  FIELD_ONLY_LETTERS_SPACES: (field: string) =>
    `O campo ${field} deve conter apenas letras e espaços.`,
};
