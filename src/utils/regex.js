//*	Регулярные выражения *//

// Регулярное выражение для проверки E-mail //
// export const REGEX_EMAIL = '^[a-zA-Z0-9]+[a-zA-Z0-9\\-_.]+@[a-z]+\\.[a-z]{2,4}$';
// export const REGEX_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const REGEX_EMAIL = '[a-z0-9]+@[a-z]+.[a-z]{2,5}';
// export const REGEX_EMAIL = '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)';
// export const REGEX_EMAIL = '/.+@.+\..+/i';
// export const REGEX_EMAIL = /^[\w]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
// export const REGEX_EMAIL = /^https?:\/\/(www\.)?[a-z0-9-]+\.[a-z]+[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/i;

export const REGEX_NAME = '[ёЁA-Za-zа-яА-Я0-9 -\u2010]{2,}';