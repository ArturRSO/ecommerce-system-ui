export enum RegexEnum {
  CPF = '(^(\\d{3}.\\d{3}.\\d{3}-\\d{2})|(\\d{11})$)',
  CNPJ = '\\d{2}.?\\d{3}.?\\d{3}/?\\d{4}-?\\d{2}',
  NAME = '[A-zÀ-ú]',
  PASSWORD = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,16}$',
  IMAGE_FILE = 'image-*'
}
