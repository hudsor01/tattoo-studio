/* eslint-env node */
export default {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/about': ['about'],
    '/booking': ['booking'],
    '/contact': ['contact'],
    '/gallery': ['gallery'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./locales/${locale}/${namespace}`).then((m) => m.default),
  // Add proper HTML lang attribute to help browser translation
  htmlLang: true,
}
