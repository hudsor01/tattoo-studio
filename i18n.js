module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/booking': ['booking'],
    '/contact': ['contact'],
    '/gallery': ['gallery'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
  // Add proper HTML lang attribute to help browser translation
  htmlLang: true,
}
