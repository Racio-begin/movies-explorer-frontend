//*	Регулярные выражения *//

// Регулярное выражение для проверки E-mail //
// export const REGEX_EMAIL = '^[a-zA-Z0-9]+[a-zA-Z0-9\\-_.]+@[a-z]+\\.[a-z]{2,4}$';
export const REGEX_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;