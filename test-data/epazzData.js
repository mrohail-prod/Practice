/**
 * Epazz Contact Form Test Data
 */
export const epazzTestData = {
  url: 'https://www.epazz.com/',
  formSubmissions: [
    {
      fullName: 'Epazz Tester',
      email: 'tester@epazz.com',
      phone: '0992355051',
      message: 'This is a test message from Tester',
      description: 'Standard form submission',
    },
    {
      fullName: 'Epazz QA Team',
      email: 'qa@epazz.com',
      phone: '0992355052',
      message: 'Testing contact form functionality',
      description: 'QA team form submission',
    },
  ],
  validationRules: {
    fullNameMinLength: 2,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneMinLength: 10,
    messageMinLength: 5,
  },
};
